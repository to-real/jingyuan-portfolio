# Personal Site Design Contract Operationalization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让已确认的三层设计契约成为可发现、可自动回归、可人工复验的工作流，同时不改变 `jingyuan.dev` 的任何可见页面。

**Architecture:** 保留当前无构建步骤的静态站结构。使用 Node.js 内置测试补充可自动判断的硬性门槛，在 README 建立契约入口，再用 Playwright CLI 按 Evaluator 运行一次真实浏览器基线审查并记录结果。审查发现的问题只写入报告，未经用户再次确认不得修改页面。

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js `node:test`, Python local HTTP server, Playwright CLI, Markdown.

---

## Scope guard

执行从本地提交 `bdfa8fe` 开始。

本计划允许修改：

- `README.md`
- `tests/site-contract.test.mjs`
- `docs/reviews/2026-08-15-design-contract-baseline.md`

本计划明确禁止修改：

- `index.html`
- `assets/styles.css`
- `assets/site.js`
- `projects/*.html`
- 图片、PDF、CNAME、部署配置

即使审查发现硬性问题，也只能在基线报告中记录为“等待张靖远确认”。本计划不得修复这些问题，不得推送或部署。

执行前必须阅读：

- `docs/plans/2026-08-15-personal-site-design-contract-design.md`
- `docs/plans/2026-08-15-personal-site-page-profiles.md`
- `docs/plans/2026-08-15-personal-site-evaluator.md`

### Task 1: Lock the starting state

**Files:**

- Read: `docs/plans/2026-08-15-personal-site-design-contract-design.md`
- Read: `docs/plans/2026-08-15-personal-site-page-profiles.md`
- Read: `docs/plans/2026-08-15-personal-site-evaluator.md`
- Do not modify files

**Step 1: Verify the branch and starting commit**

Run:

```powershell
git branch --show-current
git rev-parse --short HEAD
git status --short
```

Expected:

```text
gh-pages
bdfa8fe
```

`git status --short` must print nothing. If the branch, commit, or working tree differs, stop and report the difference instead of adapting the plan silently.

**Step 2: Read the three controlling documents completely**

Run:

```powershell
Get-Content docs/plans/2026-08-15-personal-site-design-contract-design.md -Raw -Encoding UTF8
Get-Content docs/plans/2026-08-15-personal-site-page-profiles.md -Raw -Encoding UTF8
Get-Content docs/plans/2026-08-15-personal-site-evaluator.md -Raw -Encoding UTF8
```

Expected: all three files load without decoding errors and cross-link to one another.

**Step 3: Record protected-file hashes for final comparison**

Run:

```powershell
Get-FileHash index.html, assets/styles.css, assets/site.js -Algorithm SHA256
Get-ChildItem projects/*.html | Get-FileHash -Algorithm SHA256
```

Expected: save the printed hashes in the execution notes. Do not write them into the repository yet.

### Task 2: Make the contract discoverable and add static hard-gate tests

Use `@test-driven-development` for this task.

**Files:**

- Create: `tests/site-contract.test.mjs`
- Modify: `README.md:7-12`
- Test: `tests/site-contract.test.mjs`
- Test: `tests/homepage-hero.test.mjs`

**Step 1: Write the contract regression test**

Create `tests/site-contract.test.mjs` with exactly this initial content:

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const read = (...parts) => readFileSync(join(root, ...parts), "utf8");

const html = read("index.html");
const css = read("assets", "styles.css");
const readme = read("README.md");
const siteContract = read(
  "docs",
  "plans",
  "2026-08-15-personal-site-design-contract-design.md"
);
const pageProfiles = read(
  "docs",
  "plans",
  "2026-08-15-personal-site-page-profiles.md"
);
const evaluator = read(
  "docs",
  "plans",
  "2026-08-15-personal-site-evaluator.md"
);

test("README exposes the confirmed contract and its verification command", () => {
  assert.match(readme, /## 设计契约/);
  for (const file of [
    "2026-08-15-personal-site-design-contract-design.md",
    "2026-08-15-personal-site-page-profiles.md",
    "2026-08-15-personal-site-evaluator.md"
  ]) {
    assert.ok(readme.includes(`docs/plans/${file}`), `${file} should be linked`);
  }
  assert.match(readme, /node --test tests\/homepage-hero\.test\.mjs tests\/site-contract\.test\.mjs/);
});

test("the three contract documents remain mutually discoverable", () => {
  assert.match(siteContract, /Page Profiles/);
  assert.match(siteContract, /Evaluator/);
  assert.match(pageProfiles, /Site Contract/);
  assert.match(pageProfiles, /Evaluator/);
  assert.match(evaluator, /Site Contract/);
  assert.match(evaluator, /Page Profiles/);
  assert.match(siteContract, /未经张靖远对具体修改项的明确确认，不得修改/);
});

test("internal navigation targets and the résumé asset exist", () => {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const targets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(targets.length > 0);
  for (const target of targets) {
    assert.ok(ids.has(target), `#${target} should resolve to an element id`);
  }
  assert.ok(
    existsSync(join(root, "assets", "Zhang_Jingyuan_AI_Product_Manager_CN.pdf")),
    "the Chinese résumé should exist"
  );
});

test("writing and open-source evidence keeps the approved destinations", () => {
  for (const destination of [
    "https://mp.weixin.qq.com/s/TvAZ_dbYMgtC8olMnAfTnA",
    "https://mp.weixin.qq.com/s/IHfs9aoAtbdMAjr1V1qIDg",
    "https://github.com/to-real/RSSWebReader",
    "https://github.com/to-real/x-article-formatter",
    "https://github.com/to-real/jobpilot-cn"
  ]) {
    assert.ok(html.includes(destination), `${destination} should remain linked`);
  }
  assert.doesNotMatch(html, /all-agentic-architectures/i);
  assert.doesNotMatch(html, /class="(?:deepwisdom-highlight|capability-section|metrics-strip)/);
});

test("all new-tab links protect the opener", () => {
  const links = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [];
  assert.ok(links.length > 0);
  for (const link of links) {
    assert.match(link, /rel="[^"]*\bnoopener\b[^"]*"/);
  }
});

test("interactive evidence links and reduced-motion behavior have CSS coverage", () => {
  assert.match(css, /\.hero-social-links a\s*\{[^}]*text-decoration:\s*underline/s);
  assert.match(css, /\.hero-social-links a:focus-visible/);
  assert.match(css, /\.note-list strong a\s*\{[^}]*text-decoration:\s*underline/s);
  assert.match(css, /\.note-list strong a:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
});
```

**Step 2: Run the tests and verify the new README requirement fails**

Run:

```powershell
node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs
```

Expected: the existing hero tests pass. The new test `README exposes the confirmed contract and its verification command` fails because README does not yet contain the contract section. If any other test fails, stop and report the mismatch; do not change the page to make it pass.

**Step 3: Add the contract entry to README**

Insert the following after the local preview section and before “替换个人照片”:

```markdown
## 设计契约

任何页面优化开始前，先阅读：

- [Site Contract](docs/plans/2026-08-15-personal-site-design-contract-design.md)
- [Page Profiles](docs/plans/2026-08-15-personal-site-page-profiles.md)
- [Evaluator](docs/plans/2026-08-15-personal-site-evaluator.md)

允许审查不等于允许修改。审查发现的问题必须先说明依据与最小修改范围，并等待张靖远逐项确认。

运行静态契约检查：

```powershell
node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs
```
```

Do not edit any other README section.

**Step 4: Run the complete static suite**

Run:

```powershell
node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs
```

Expected: 12 tests pass, 0 fail.

**Step 5: Check scope and formatting**

Run:

```powershell
git diff --check
git diff --name-only
```

Expected files only:

```text
README.md
tests/site-contract.test.mjs
```

**Step 6: Commit the discoverability and static gates**

Run:

```powershell
git add README.md tests/site-contract.test.mjs
git commit -m "test: operationalize site design contract"
```

Expected: one commit containing exactly the two files above.

### Task 3: Run the real-browser baseline evaluation

Use `@playwright` for browser work. This task records evidence; it must not fix the page.

**Files:**

- Create: `docs/reviews/2026-08-15-design-contract-baseline.md`
- Do not modify runtime files

**Step 1: Confirm Playwright CLI prerequisites**

Run:

```powershell
Get-Command npx
node --version
npx --yes --package @playwright/cli playwright-cli --help
```

Expected: all commands exit successfully. If `npx` is unavailable, stop and report the prerequisite instead of installing a new project dependency.

**Step 2: Start the local site**

Run in a dedicated terminal session:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Expected: the server listens on `http://127.0.0.1:4173/`. Keep the process available only for this audit.

**Step 3: Open an isolated browser session**

Run:

```powershell
npx --yes --package @playwright/cli playwright-cli --session contract-audit open http://127.0.0.1:4173/ --headed
npx --yes --package @playwright/cli playwright-cli --session contract-audit snapshot
```

Expected: the homepage loads and the snapshot exposes the header, hero, project links, writing links and contact controls.

**Step 4: Check viewport overflow at all required widths**

For each width, run `resize` followed by the same `eval`:

```powershell
npx --yes --package @playwright/cli playwright-cli --session contract-audit resize 1440 1000
npx --yes --package @playwright/cli playwright-cli --session contract-audit eval "({ width: innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth })"

npx --yes --package @playwright/cli playwright-cli --session contract-audit resize 1024 900
npx --yes --package @playwright/cli playwright-cli --session contract-audit eval "({ width: innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth })"

npx --yes --package @playwright/cli playwright-cli --session contract-audit resize 390 844
npx --yes --package @playwright/cli playwright-cli --session contract-audit eval "({ width: innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth })"
```

Expected at every width: `scrollWidth` equals `clientWidth`. Record actual values rather than writing “pass” from assumption.

**Step 5: Verify keyboard order and link activation at 390px**

Reload, take a fresh snapshot, and press Tab sequentially through the visible navigation and hero actions:

```powershell
npx --yes --package @playwright/cli playwright-cli --session contract-audit reload
npx --yes --package @playwright/cli playwright-cli --session contract-audit snapshot
npx --yes --package @playwright/cli playwright-cli --session contract-audit press Tab
npx --yes --package @playwright/cli playwright-cli --session contract-audit eval "({ tag: document.activeElement.tagName, text: document.activeElement.textContent.trim(), href: document.activeElement.href || null })"
```

Repeat the final two commands until the two hero buttons, GitHub, X and the first project link have each received visible focus. Use Enter on the first project link and confirm it resolves to `projects/deepwisdom.html`; then navigate back and take a new snapshot.

Expected: focus follows DOM reading order, every required control has a visible focus state, and Enter activates the intended destination.

**Step 6: Verify reduced-motion behavior**

Run:

```powershell
npx --yes --package @playwright/cli playwright-cli --session contract-audit run-code "await page.emulateMedia({ reducedMotion: 'reduce' }); await page.reload();"
npx --yes --package @playwright/cli playwright-cli --session contract-audit eval "Array.from(document.querySelectorAll('.reveal')).every((element) => { const style = getComputedStyle(element); return style.opacity === '1' && style.transform === 'none'; })"
```

Expected: `true`.

**Step 7: Compare rendered sections against Page Profiles**

Inspect the current homepage section by section. In particular, record any existing section that has no matching profile. Do not silently assign it a purpose and do not remove it.

Expected: the report explicitly notes whether the current “Recognition / 阶段性认可” section is covered by the confirmed Page Profiles. If it is not covered, record it as a contract coverage question with status “等待张靖远确认”; this plan does not decide its fate.

**Step 8: Write the baseline report**

Create `docs/reviews/2026-08-15-design-contract-baseline.md` using this structure and replace every placeholder with observed evidence:

```markdown
# jingyuan.dev Design Contract Baseline Review

- Date: 2026-08-15
- Source commit: <commit>
- Scope: Review only; no visible-site modification authorized
- Contracts: [Site Contract](../plans/2026-08-15-personal-site-design-contract-design.md), [Page Profiles](../plans/2026-08-15-personal-site-page-profiles.md), [Evaluator](../plans/2026-08-15-personal-site-evaluator.md)

## Hard gates

| Gate | Result | Evidence |
| --- | --- | --- |
| G1 Authorization | <result> | <evidence> |
| G2 Scope control | <result> | <evidence> |
| G3 Truth and attribution | <result> | <evidence or requires user source verification> |
| G4 Ten-second comprehension | <result> | <observed hierarchy> |
| G5 Evidence uniqueness | <result> | <section comparison> |
| G6 Interaction and keyboard | <result> | <focus and destination evidence> |
| G7 Responsive and accessibility | <result> | <1440/1024/390 values and reduced-motion result> |

## Soft score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Editorial hierarchy and rhythm | <0-5> | <evidence> |
| Personal identity and magazine consistency | <0-5> | <evidence> |
| Information density and whitespace | <0-5> | <evidence> |
| Interaction and motion restraint | <0-5> | <evidence> |

## Findings

<For each issue, use Location / Level / Observation / Contract source / Evidence / Minimal change / Status. If no issue exists, write “当前无需修改”.>

## Overall

- Hard gates: <通过 / 需要处理 / 待用户核实>
- Implementation status: 未授权
- Push/deploy status: 未执行
```

Do not add a proposed fix that exceeds the observed problem. Do not turn soft-score deductions into authorized work.

**Step 9: Close temporary processes**

Run:

```powershell
npx --yes --package @playwright/cli playwright-cli --session contract-audit close
```

Stop the dedicated Python server with Ctrl+C in its own terminal. Confirm no server or named browser session remains running.

**Step 10: Verify report-only scope**

Run:

```powershell
git diff --check
git diff --name-only
```

Expected file only:

```text
docs/reviews/2026-08-15-design-contract-baseline.md
```

If any runtime file changed, stop and restore only the unapproved change before continuing.

**Step 11: Commit the baseline report**

Run:

```powershell
git add docs/reviews/2026-08-15-design-contract-baseline.md
git commit -m "docs: record design contract baseline review"
```

Expected: one commit containing only the review report.

### Task 4: Final verification and handoff

Use `@verification-before-completion` before making any completion claim.

**Files:**

- Verify all files
- Do not create or modify files

**Step 1: Run the complete automated suite**

Run:

```powershell
node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs
```

Expected: 12 tests pass, 0 fail.

**Step 2: Prove visible-site files are unchanged from the approved contract commit**

Run:

```powershell
git diff --exit-code bdfa8fe..HEAD -- index.html assets/styles.css assets/site.js projects
```

Expected: no output and exit code 0.

Re-run the hashes captured in Task 1:

```powershell
Get-FileHash index.html, assets/styles.css, assets/site.js -Algorithm SHA256
Get-ChildItem projects/*.html | Get-FileHash -Algorithm SHA256
```

Expected: every hash matches the Task 1 value.

**Step 3: Verify commit and working-tree scope**

Run:

```powershell
git status --short
git log --oneline bdfa8fe..HEAD
git diff --name-only bdfa8fe..HEAD
```

Expected:

- clean working tree;
- two implementation commits after `bdfa8fe`;
- changed files limited to `README.md`, `tests/site-contract.test.mjs`, and `docs/reviews/2026-08-15-design-contract-baseline.md`.

**Step 4: Report without pushing**

Report:

- automated test count;
- browser widths and interaction paths checked;
- baseline report path;
- any finding still waiting for user confirmation;
- local commit hashes;
- explicit statement that no runtime file changed and no push/deployment occurred.

Do not begin visible-site fixes. Ask the user to choose which reported findings, if any, should become a separate design and implementation task.
