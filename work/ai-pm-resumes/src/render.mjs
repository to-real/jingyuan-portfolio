import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const rendered = path.join(root, "rendered");
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
  args: ["--disable-extensions", "--no-first-run", "--no-default-browser-check"],
});

try {
  const files = (await fs.readdir(rendered)).filter((name) => name.endsWith(".html")).sort();
  for (const name of files) {
    const page = await browser.newPage({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: 1 });
    const url = `http://127.0.0.1:8766/rendered/${encodeURIComponent(name)}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const base = name.replace(/\.html$/, "");
    await page.pdf({
      path: path.join(rendered, `${base}.pdf`),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await page.screenshot({ path: path.join(rendered, `${base}-screen.png`), fullPage: true });
    console.log(`rendered ${base}`);
    await page.close();
  }
} finally {
  await browser.close();
}
