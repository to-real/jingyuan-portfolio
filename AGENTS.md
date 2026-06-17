# AGENTS.md

This repository contains Zhang Jingyuan's static portfolio site. Future agents should treat this file as the operating guide for edits, validation, and deployment.

## Working Directory

- Primary worktree: `C:\Users\张靖远\Documents\Codex\2026-06-15\tw93-kami-git-https-github-com\.worktrees\portfolio-copy`
- Source site: `work\jingyuan-portfolio\site`
- Published mirror: `outputs\jingyuan-portfolio`
- Validation script: `work\jingyuan-portfolio\scripts\check_site.py`
- Production branch: `gh-pages`
- Working branch: `feature/portfolio-copy`
- Remote: `https://github.com/to-real/jingyuan-portfolio.git`
- Live site: `https://jingyuan.dev/`
- GitHub Pages fallback URL: `https://to-real.github.io/jingyuan-portfolio/`

Always run commands from the primary worktree unless a command explicitly says otherwise.

## Project Shape

This is a no-build static site:

- HTML lives directly under `work\jingyuan-portfolio\site`.
- Project case pages live in `work\jingyuan-portfolio\site\projects`.
- Shared CSS and images live in `work\jingyuan-portfolio\site\assets`.
- `outputs\jingyuan-portfolio` is a deployable mirror of the source site.
- `CNAME`, `robots.txt`, and `sitemap.xml` must exist in both source and output.

Do not edit `outputs\jingyuan-portfolio` as the source of truth. Edit `work\jingyuan-portfolio\site` first, then sync the output mirror.

## Style Constraints

This site follows the Kami-inspired style used in the current version:

- Background: warm parchment, currently `#f5f4ed`.
- Primary accent: ink blue, currently `#1B365D`.
- Typography: serif-led hierarchy, with Chinese leaning toward the TsangerJinKai02/Kami feel when available.
- Avoid saturated multi-color UI.
- Avoid generic SaaS gradients, glassmorphism, heavy shadows, and over-polished AI landing page patterns.
- Visual diagrams should be calm, sparse, and use one clear accent. One project diagram is enough unless there is a specific reason to add more.
- Copy should sound like a person explaining what they had to figure out. Avoid phrases like "I possess", "empower", "full-stack capability", "cutting-edge", and other generic AI portfolio wording.

When changing diagrams, keep them aligned with the existing four SVGs:

- `assets\deepwisdom-pipeline.svg`
- `assets\funloom-flow.svg`
- `assets\media-ontology.svg`
- `assets\pearl-pipeline.svg`

Project pages currently inline the SVGs for reliable rendering on GitHub Pages. If replacing a diagram, update both the asset file and the inline SVG in the matching project page, or deliberately move all pages back to `<img>` only after browser verification.

## Content Rules

- Homepage copy should stay concrete and personal: start from specific problems, not broad claims about AI.
- Case pages should preserve the current plain-language structure:
  - `问题`
  - `我做了什么`
  - `结果`
  - `现在怎么看`
- Keep the four main project pages consistent in structure.
- Keep the CTA direct: the user is looking for AI product internships or new-grad opportunities.
- Do not add fabricated metrics, awards, screenshots, publications, or company names. If a claim is not in the existing site, resume, or user-provided material, ask or leave it out.
- Chinese files are UTF-8. PowerShell output may display mojibake; inspect in a UTF-8-aware editor or use scripts that read/write with UTF-8.

## Local Preview

From the source site directory:

```powershell
Set-Location 'C:\Users\张靖远\Documents\Codex\2026-06-15\tw93-kami-git-https-github-com\.worktrees\portfolio-copy\work\jingyuan-portfolio\site'
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

Use browser verification after meaningful CSS, layout, navigation, or SVG changes. Check at least:

- Desktop homepage
- Mobile homepage
- One project page with a diagram

## Validation

Run both checks before committing:

```powershell
Set-Location 'C:\Users\张靖远\Documents\Codex\2026-06-15\tw93-kami-git-https-github-com\.worktrees\portfolio-copy'
python '.\work\jingyuan-portfolio\scripts\check_site.py' '.\work\jingyuan-portfolio\site'
python '.\work\jingyuan-portfolio\scripts\check_site.py' '.\outputs\jingyuan-portfolio'
```

Expected success:

```text
SITE CHECK PASSED: 6 HTML pages, all local references resolved
```

Also inspect `git diff --stat` and `git diff` before committing. Preserve unrelated user changes.

## Sync Output Mirror

After editing source files, sync the output mirror. A safe PowerShell pattern is:

```powershell
$src = Resolve-Path '.\work\jingyuan-portfolio\site'
$dst = Resolve-Path '.\outputs\jingyuan-portfolio'
Get-ChildItem -Force -LiteralPath $dst | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $src '*') -Destination $dst -Recurse -Force
Copy-Item -LiteralPath (Join-Path $src '.nojekyll') -Destination $dst -Force
```

Before running any recursive delete, confirm `$dst` resolves to the repository's `outputs\jingyuan-portfolio` directory. Do not delete arbitrary computed paths.

## Git Workflow

Normal feature workflow:

```powershell
git status --short --branch
git add -- work\jingyuan-portfolio outputs\jingyuan-portfolio AGENTS.md
git commit -m "<type>: <short description>"
git push origin feature/portfolio-copy
```

Use concise commit messages, for example:

- `docs: add agent handoff guide`
- `copy: refine homepage voice`
- `feat: add project diagram`
- `fix: align portfolio with kami style`

## Deploy To GitHub Pages

Deploy from `outputs\jingyuan-portfolio` to `gh-pages` using a temporary directory:

```powershell
Set-Location 'C:\Users\张靖远\Documents\Codex\2026-06-15\tw93-kami-git-https-github-com\.worktrees\portfolio-copy'
$src = Resolve-Path '.\outputs\jingyuan-portfolio'
$deploy = Join-Path $env:TEMP ('jingyuan-portfolio-pages-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $deploy | Out-Null
git init $deploy | Out-Null
Set-Location $deploy
git checkout -B gh-pages | Out-Null
Get-ChildItem -Force -LiteralPath $src | Copy-Item -Destination $deploy -Recurse -Force
git add -A
git commit -m 'deploy: update site'
git remote add origin https://github.com/to-real/jingyuan-portfolio.git
git push origin gh-pages --force
```

After deploy, verify:

```powershell
Invoke-WebRequest -Uri 'https://jingyuan.dev/' -UseBasicParsing -TimeoutSec 20
Invoke-WebRequest -Uri 'https://jingyuan.dev/sitemap.xml' -UseBasicParsing -TimeoutSec 20
Invoke-WebRequest -Uri 'https://jingyuan.dev/robots.txt' -UseBasicParsing -TimeoutSec 20
```

GitHub Pages and DNS can cache for a few minutes. If `to-real.github.io` has the new file but `jingyuan.dev` is stale, wait and retry with a cache-busting query string.

## Domain Notes

The custom domain is `jingyuan.dev`.

Required DNS setup:

- Apex `jingyuan.dev`: A records to GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www.jingyuan.dev`: CNAME to `to-real.github.io`
- Cloudflare proxy should stay DNS-only for GitHub Pages.

The root `CNAME` file must contain exactly:

```text
jingyuan.dev
```

## Common Pitfalls

- Do not remove `.nojekyll`; GitHub Pages needs it for direct static serving.
- Do not break relative paths. The site must work both at `https://jingyuan.dev/` and during local preview.
- Do not add local absolute paths like `C:\...` inside HTML/CSS.
- Do not rely on screenshots or diagrams that only exist outside the repo.
- Do not introduce a build system unless the user explicitly asks for one.
- Do not enable Cloudflare proxy for this Pages setup unless the deployment strategy changes.
