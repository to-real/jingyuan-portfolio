from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


DEFAULT_SITE = Path(__file__).resolve().parents[1] / "site"
SITE = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_SITE
EXTERNAL_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript"}
FORBIDDEN = ("{{", "}}", "[DATA NEEDED]", "TODO", "TBD", "file://")


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[tuple[str, str]] = []
        self.h1_count = 0
        self.has_title = False
        self.has_description = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.has_title = True
        if tag == "meta" and attr_map.get("name") == "description":
            self.has_description = True
        for key in ("href", "src"):
            value = attr_map.get(key)
            if value:
                self.refs.append((key, value))


def resolve_ref(page: Path, ref: str) -> Path | None:
    parsed = urlsplit(ref)
    if parsed.scheme.lower() in EXTERNAL_SCHEMES or ref.startswith("#") or ref.startswith("//"):
        return None
    raw_path = unquote(parsed.path)
    if not raw_path:
        return None
    target = SITE / raw_path.lstrip("/") if raw_path.startswith("/") else page.parent / raw_path
    target = target.resolve()
    if target.is_dir():
        target /= "index.html"
    return target


def main() -> int:
    errors: list[str] = []
    html_files = sorted(SITE.rglob("*.html"))
    if len(html_files) != 6:
        errors.append(f"expected 6 HTML pages, found {len(html_files)}")

    for page in html_files:
        text = page.read_text(encoding="utf-8")
        rel = page.relative_to(SITE)
        parser = PageParser()
        parser.feed(text)

        for marker in FORBIDDEN:
            if marker in text:
                errors.append(f"{rel}: forbidden marker {marker!r}")
        if re.search(r"[A-Za-z]:\\", text):
            errors.append(f"{rel}: contains a local absolute path")
        if not parser.has_title:
            errors.append(f"{rel}: missing title")
        if page.name != "404.html" and not parser.has_description:
            errors.append(f"{rel}: missing meta description")
        if parser.h1_count != 1:
            errors.append(f"{rel}: expected one h1, found {parser.h1_count}")

        for attr, ref in parser.refs:
            target = resolve_ref(page, ref)
            if target is not None and not target.exists():
                errors.append(f"{rel}: broken {attr}={ref!r}")

    required = [
        SITE / "assets" / "styles.css",
        SITE / "assets" / "site.js",
        SITE / "assets" / "favicon.svg",
        SITE / "assets" / "Zhang_Jingyuan_AI_Product_Manager_CN.pdf",
        SITE / "robots.txt",
        SITE / "llms.txt",
        SITE / "vercel.json",
    ]
    for path in required:
        if not path.exists() or path.stat().st_size == 0:
            errors.append(f"missing or empty: {path.relative_to(SITE)}")

    if errors:
        print("SITE CHECK FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"SITE CHECK PASSED: {len(html_files)} HTML pages, all local references resolved")
    return 0


if __name__ == "__main__":
    sys.exit(main())
