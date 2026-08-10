# Homepage Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the homepage hero so recruiters immediately understand Zhang Jingyuan as an AI product manager with hands-on builder ability, supported by visible social proof and a precise DeepWisdom evidence strip.

**Architecture:** Keep the site static and dependency-free. Replace the existing hero/about/metrics HTML with semantic hero, DeepWisdom highlight, and capability-summary components; add component-scoped CSS and responsive rules; protect the approved content and dead-code cleanup with Node's built-in test runner.

**Tech Stack:** Static HTML5, CSS3, existing vanilla JavaScript, Node.js built-in `node:test`, PowerShell/local HTTP server, browser viewport verification.

---

## File map

- Modify `index.html`: hero content, social links, DeepWisdom highlight, capability/background section, stylesheet cache key.
- Modify `assets/styles.css`: new component styles and responsive rules; remove unused `.about-block`, `.metrics-strip`, and `.metric` rules.
- Create `tests/homepage-hero.test.mjs`: dependency-free regression tests for approved copy, structure, links, indicator uniqueness, responsive CSS, and dead selector removal.
- Do not modify `assets/site.js`: the approved design adds no new JavaScript behavior.
- Do not stage or commit `.superpowers/`: it contains brainstorming-session artifacts only.

## Task 1: Lock the approved HTML contract with a failing test

**Files:**

- Create: `tests/homepage-hero.test.mjs`
- Reference: `docs/superpowers/specs/2026-08-10-homepage-hero-redesign-design.md`

- [ ] **Step 1: Create the dependency-free homepage test**

Create `tests/homepage-hero.test.mjs` with this complete content:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "assets", "styles.css"), "utf8");

function countIn(text, literal) {
  return text.split(literal).length - 1;
}

const heroStart = html.indexOf('<section class="hero">');
const capabilityStart = html.indexOf('<section class="capability-section"');
const hero = capabilityStart > heroStart
  ? html.slice(heroStart, capabilityStart)
  : html.slice(heroStart, html.indexOf('<section class="section" id="work">'));

test("hero states the evergreen recruiting status and identity hierarchy", () => {
  assert.match(hero, /实习与校招机会开放 · 2027 届 · 北京/);
  assert.match(hero, /<h1>张靖远<\/h1>/);
  assert.match(hero, /<p class="hero-role"><strong>AI 产品经理<\/strong><span>\/ AI Builder<\/span><\/p>/);
});

test("hero uses the approved fact-first introduction", () => {
  assert.match(
    hero,
    /做过 4 个从问题定义到验收指标的 AI 产品项目。关注的不是 AI 能不能生成，而是生成之后如何验收、修改，以及失败后如何恢复。/
  );
});

test("hero keeps two primary actions and exposes GitHub and X as text links", () => {
  assert.match(hero, /class="button button-primary" href="#work"/);
  assert.match(hero, /class="button button-secondary" href="assets\/Zhang_Jingyuan_AI_Product_Manager_CN\.pdf"/);
  assert.match(hero, /href="https:\/\/github\.com\/to-real" target="_blank" rel="noopener noreferrer"/);
  assert.match(hero, /href="https:\/\/x\.com\/Potatoloogs" target="_blank" rel="noopener noreferrer"/);
  assert.equal(countIn(hero, 'class="button '), 2);
});

test("DeepWisdom highlight states personal scope and shows each metric once", () => {
  assert.match(hero, /DeepWisdom · Agent Evaluation Harness/);
  assert.match(hero, /参与评测系统建设，具体负责评测 Schema、自动检查与长任务恢复机制。/);
  assert.match(hero, /href="projects\/deepwisdom\.html"/);
  for (const metric of ["200+", "70%", "25%"]) {
    assert.equal(countIn(hero, metric), 1, `${metric} should appear once in the hero`);
  }
});

test("capability section replaces the old about and global metrics blocks", () => {
  assert.match(html, /class="capability-section"/);
  assert.match(html, /产品能力/);
  assert.match(html, /Agent 评测系统 · Harness Engineering · PRD · 用户研究/);
  assert.match(html, /实现能力/);
  assert.match(html, /Python · RAG · JSON Schema · Three\.js · 视觉 AI/);
  assert.match(html, /北邮数字媒体技术 2027 届。从代码转向产品，更关心“该不该做”和“做完如何验收”。持续做开源工具和技术写作。/);
  assert.doesNotMatch(html, /class="about-block/);
  assert.doesNotMatch(html, /class="metrics-strip/);
});
```

- [ ] **Step 2: Run the test and confirm it fails against the current homepage**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: FAIL. The first failure should report that the approved evergreen status or new identity markup is missing.

- [ ] **Step 3: Confirm no implementation file changed yet**

Run:

```powershell
git status --short
```

Expected: `tests/homepage-hero.test.mjs` is untracked; `index.html`, `assets/styles.css`, and `assets/site.js` remain unchanged. `.superpowers/` may also appear and must remain unstaged.

## Task 2: Implement the semantic hero, DeepWisdom highlight, and capability section

**Files:**

- Modify: `index.html:14`
- Modify: `index.html:35-68`
- Test: `tests/homepage-hero.test.mjs`

- [ ] **Step 1: Replace the current hero/about/metrics markup**

Replace the complete current `<section class="hero">...</section>` block with:

```html
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="hero-eyebrow"><span class="status-dot"></span>实习与校招机会开放 · 2027 届 · 北京</p>
            <h1>张靖远</h1>
            <p class="hero-role"><strong>AI 产品经理</strong><span>/ AI Builder</span></p>
            <p class="hero-lede">做过 4 个从问题定义到验收指标的 AI 产品项目。关注的不是 AI 能不能生成，而是生成之后如何验收、修改，以及失败后如何恢复。</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#work">查看精选项目 <span aria-hidden="true">↓</span></a>
              <a class="button button-secondary" href="assets/Zhang_Jingyuan_AI_Product_Manager_CN.pdf" download>下载中文简历</a>
            </div>
            <div class="hero-social-links" aria-label="外部展示入口">
              <a href="https://github.com/to-real" target="_blank" rel="noopener noreferrer">GitHub @to-real <span aria-hidden="true">↗</span></a>
              <a href="https://x.com/Potatoloogs" target="_blank" rel="noopener noreferrer">X @Potatoloogs <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside class="portrait-placeholder portrait-photo" aria-label="张靖远漫画头像">
            <img src="assets/portrait.png" alt="张靖远的暖色手绘漫画头像">
          </aside>
        </div>

        <div class="deepwisdom-highlight reveal" aria-label="DeepWisdom 核心经历">
          <div class="deepwisdom-copy">
            <strong class="deepwisdom-title">DeepWisdom · Agent Evaluation Harness</strong>
            <p>参与评测系统建设，具体负责评测 Schema、自动检查与长任务恢复机制。</p>
            <a class="deepwisdom-link" href="projects/deepwisdom.html">查看核心案例 <span aria-hidden="true">→</span></a>
          </div>
          <div class="deepwisdom-metrics" aria-label="DeepWisdom 关键成果">
            <div class="deepwisdom-stat"><strong>200+</strong><span>并行任务</span></div>
            <div class="deepwisdom-stat"><strong>70%</strong><span>工作量降低</span></div>
            <div class="deepwisdom-stat"><strong>25%</strong><span>成功率提升</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="capability-section" aria-label="能力与背景">
      <div class="container">
        <div class="capability-panel reveal">
          <div class="capability-grid">
            <div class="capability-group">
              <strong class="capability-label">产品能力</strong>
              <p>Agent 评测系统 · Harness Engineering · PRD · 用户研究</p>
            </div>
            <div class="capability-group">
              <strong class="capability-label">实现能力</strong>
              <p>Python · RAG · JSON Schema · Three.js · 视觉 AI</p>
            </div>
          </div>
          <p class="capability-about">北邮数字媒体技术 2027 届。从代码转向产品，更关心“该不该做”和“做完如何验收”。持续做开源工具和技术写作。</p>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Bump the stylesheet cache key**

Change the stylesheet reference in `index.html` to:

```html
  <link rel="stylesheet" href="assets/styles.css?v=20260810-hero">
```

Do not add automatic hashing in this change; the approved specification explicitly leaves cache-management automation out of scope.

- [ ] **Step 3: Run the HTML contract tests**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: 5 tests PASS.

- [ ] **Step 4: Verify the HTML diff contains no unrelated section changes**

Run:

```powershell
git diff --check
git diff -- index.html tests/homepage-hero.test.mjs
```

Expected: only the stylesheet query and hero/about/metrics replacement appear in `index.html`; project, product-judgment, writing, recognition, and contact markup remain unchanged.

- [ ] **Step 5: Commit the tested HTML contract**

Run:

```powershell
git add -- index.html tests/homepage-hero.test.mjs
git commit -m "feat: restructure homepage hero evidence"
```

Expected: one commit containing only `index.html` and `tests/homepage-hero.test.mjs`.

## Task 3: Add desktop styles for the approved components

**Files:**

- Modify: `assets/styles.css:245-371`
- Modify: `tests/homepage-hero.test.mjs`

- [ ] **Step 1: Add desktop CSS assertions to the test file**

Append this test to `tests/homepage-hero.test.mjs`:

```js
test("desktop CSS defines the approved hero and evidence components", () => {
  for (const selector of [
    ".hero-role",
    ".hero-social-links",
    ".deepwisdom-highlight",
    ".deepwisdom-metrics",
    ".deepwisdom-stat",
    ".capability-section",
    ".capability-panel",
    ".capability-grid",
    ".capability-about"
  ]) {
    assert.match(css, new RegExp(`\\${selector}\\b`), `${selector} should be styled`);
  }
  assert.match(css, /\.hero-role strong\s*{[^}]*font-size:\s*22px/s);
  assert.match(css, /\.hero-role span\s*{[^}]*font-size:\s*16px[^}]*color:\s*#52657e/s);
});
```

- [ ] **Step 2: Run the test and confirm the new CSS test fails**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: the existing 5 tests PASS and `desktop CSS defines the approved hero and evidence components` FAILS because `.hero-role` is not defined.

- [ ] **Step 3: Replace the old role, about, and metrics desktop rules**

Delete the existing `.hero h1 span` block and replace it with:

```css
.hero-role {
  margin: 22px 0 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: var(--blue);
  font-family: var(--serif);
  line-height: 1.3;
}
.hero-role strong { font-size: 22px; font-weight: 600; }
.hero-role span { font-size: 16px; font-weight: 400; color: #52657e; }
```

Keep the existing `.hero-lede`, `.hero-actions`, `.button`, portrait, and image rules. Immediately after `.hero-actions`, add:

```css
.hero-social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
  color: var(--blue);
  font: 500 12px/1.5 var(--mono);
}
.hero-social-links a {
  text-decoration: underline;
  text-decoration-color: #9ba7b6;
  text-underline-offset: 0.3em;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}
.hero-social-links a:hover,
.hero-social-links a:focus-visible {
  color: var(--blue-light);
  text-decoration-color: var(--blue-light);
}
```

Delete the complete desktop rule groups for `.about-block`, `.about-block p`, `.about-block p + p`, `.about-block p:first-child`, `.metrics-strip`, `.metric`, `.metric:not(:first-child)`, `.metric:last-child`, `.metric strong`, and `.metric span`.

Insert these component styles before `.project-grid`:

```css
.deepwisdom-highlight {
  margin-top: 56px;
  padding: 24px 0;
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(360px, 0.9fr);
  gap: 36px;
  align-items: center;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.deepwisdom-title {
  display: block;
  color: var(--blue);
  font-family: var(--serif);
  font-size: 17px;
  font-weight: 600;
}
.deepwisdom-copy p {
  margin: 7px 0 0;
  color: var(--olive);
  font-size: 13px;
  line-height: 1.65;
}
.deepwisdom-link {
  display: inline-block;
  margin-top: 9px;
  color: var(--blue);
  font: 500 11px/1.5 var(--mono);
  text-decoration: underline;
  text-decoration-color: #9ba7b6;
  text-underline-offset: 0.3em;
}
.deepwisdom-link:hover,
.deepwisdom-link:focus-visible {
  color: var(--blue-light);
  text-decoration-color: var(--blue-light);
}
.deepwisdom-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.deepwisdom-stat {
  min-width: 0;
  padding: 4px 18px;
  border-left: 1px solid var(--line);
}
.deepwisdom-stat strong {
  display: block;
  color: var(--blue);
  font-family: var(--serif);
  font-size: clamp(25px, 2.5vw, 34px);
  font-weight: 600;
  line-height: 1;
}
.deepwisdom-stat span {
  display: block;
  margin-top: 7px;
  color: var(--stone);
  font-size: 11px;
  line-height: 1.4;
}

.capability-section {
  padding: 72px 0;
  border-top: 1px solid var(--line-soft);
}
.capability-panel {
  padding: 32px;
  border: 1px solid var(--line);
  border-left: 3px solid var(--blue);
  border-radius: 8px;
  background: var(--ivory);
  box-shadow: 0 0 0 1px var(--line-soft);
}
.capability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
}
.capability-group { min-width: 0; padding-right: 32px; }
.capability-group + .capability-group {
  padding-right: 0;
  padding-left: 32px;
  border-left: 1px solid var(--line);
}
.capability-label {
  display: block;
  color: var(--blue);
  font: 500 11px/1.5 var(--mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.capability-group p {
  margin: 8px 0 0;
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.65;
}
.capability-about {
  margin: 24px 0 0;
  padding-top: 20px;
  color: var(--olive);
  font-family: var(--serif);
  font-size: 15px;
  line-height: 1.7;
  border-top: 1px solid var(--line);
}
```

- [ ] **Step 4: Run the tests and verify desktop styles pass**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: 6 tests PASS.

- [ ] **Step 5: Check the desktop CSS diff and commit**

Run:

```powershell
git diff --check
git diff -- assets/styles.css tests/homepage-hero.test.mjs
git add -- assets/styles.css tests/homepage-hero.test.mjs
git commit -m "style: add homepage hero evidence system"
```

Expected: one commit containing only the CSS component changes and the added CSS contract test.

## Task 4: Add responsive behavior and remove all remaining dead CSS

**Files:**

- Modify: `assets/styles.css:534-593`
- Modify: `tests/homepage-hero.test.mjs`

- [ ] **Step 1: Add responsive and dead-selector tests**

Append this test to `tests/homepage-hero.test.mjs`:

```js
test("responsive CSS covers tablet and mobile without dead hero selectors", () => {
  const tabletStart = css.indexOf("@media (max-width: 920px)");
  const mobileStart = css.indexOf("@media (max-width: 560px)");
  const reducedMotionStart = css.indexOf("@media (prefers-reduced-motion: reduce)");
  const tablet = css.slice(tabletStart, mobileStart);
  const mobile = css.slice(mobileStart, reducedMotionStart);

  assert.match(tablet, /\.deepwisdom-highlight\s*{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(tablet, /\.capability-grid\s*{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(mobile, /\.hero-role\s*{[^}]*flex-wrap:\s*wrap/s);
  assert.match(mobile, /\.deepwisdom-metrics\s*{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(mobile, /\.capability-panel\s*{[^}]*padding:\s*24px 22px/s);

  assert.doesNotMatch(css, /\.about-block\b/);
  assert.doesNotMatch(css, /\.metrics-strip\b/);
  assert.doesNotMatch(css, /\.metric(?:\s|\.|:|\{|,)/);
});
```

- [ ] **Step 2: Run the test and confirm it fails on the old responsive rules**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: 6 tests PASS and the new responsive test FAILS because `.metrics-strip` and `.about-block` still appear inside media queries.

- [ ] **Step 3: Replace the tablet-only dead rules with component rules**

Inside `@media (max-width: 920px)`, delete:

```css
  .metrics-strip { grid-template-columns: repeat(2, 1fr); }
  .metric:nth-child(2) { border-right: 0; }
  .metric:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
```

Add after `.portrait-placeholder`:

```css
  .deepwisdom-highlight { grid-template-columns: 1fr; gap: 20px; }
  .deepwisdom-metrics { max-width: 520px; }
  .capability-grid { grid-template-columns: 1fr; gap: 24px; }
  .capability-group { padding-right: 0; }
  .capability-group + .capability-group {
    padding: 24px 0 0;
    border-top: 1px solid var(--line);
    border-left: 0;
  }
```

- [ ] **Step 4: Replace the mobile-only dead rules with component rules**

Inside `@media (max-width: 560px)`, replace:

```css
  .hero h1 span { margin-top: 18px; font-size: 18px; }
```

with:

```css
  .hero-role { margin-top: 18px; flex-wrap: wrap; gap: 6px; }
  .hero-role strong { font-size: 18px; }
  .hero-role span { font-size: 15px; }
```

Delete:

```css
  .about-block { margin-top: 42px; padding: 26px 22px; }
  .metrics-strip { margin-top: 46px; }
  .metric, .metric:not(:first-child) { padding: 20px 14px 20px 0; }
  .metric:nth-child(even) { padding-left: 14px; }
```

Add after `.hero-actions { flex-direction: column; }`:

```css
  .hero-social-links { gap: 12px 18px; }
  .deepwisdom-highlight { margin-top: 42px; padding: 20px 0; }
  .deepwisdom-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .deepwisdom-stat { padding: 4px 10px; }
  .deepwisdom-stat:first-child { border-left: 0; padding-left: 0; }
  .deepwisdom-stat strong { font-size: 24px; }
  .capability-section { padding: 56px 0; }
  .capability-panel { padding: 24px 22px; }
  .capability-group p { font-size: 15px; }
```

- [ ] **Step 5: Run the complete automated test suite**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
```

Expected: 7 tests PASS.

- [ ] **Step 6: Prove dead selectors are gone from production CSS**

Run:

```powershell
rg -n "about-block|metrics-strip|\.metric(?:\s|\.|:|\{|,)" assets/styles.css
```

Expected: no matches and exit code 1. This exit code means the dead CSS was successfully removed.

- [ ] **Step 7: Commit responsive behavior and cleanup**

Run:

```powershell
git diff --check
git add -- assets/styles.css tests/homepage-hero.test.mjs
git commit -m "style: refine responsive homepage evidence"
```

Expected: one commit containing the responsive rules, dead CSS removal, and responsive regression test.

## Task 5: Verify layout, interaction, and scope at three viewports

**Files:**

- Verify: `index.html`
- Verify: `assets/styles.css`
- Verify: `assets/site.js`
- Test: `tests/homepage-hero.test.mjs`

- [ ] **Step 1: Run automated and whitespace checks from a clean index**

Run:

```powershell
node --test tests/homepage-hero.test.mjs
git diff --check HEAD~3..HEAD
git status --short
```

Expected: 7 tests PASS; no whitespace errors; only `.superpowers/` may remain untracked. No production file should be unstaged.

- [ ] **Step 2: Start a local server**

Run in a dedicated terminal:

```powershell
python -m http.server 4173
```

Expected: the site is available at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify the 1440px desktop layout in a browser**

Open `http://127.0.0.1:4173/` at a 1440px-wide viewport and verify:

- status, name, role, lede, two buttons, GitHub, X, and portrait are visible in the hero;
- “AI 产品经理” is visually stronger than “/ AI Builder”;
- DeepWisdom copy and all three metrics are readable on one row;
- the capability panel begins after the hero and does not resemble a tag cloud;
- no old four-column metrics strip appears;
- the existing paper texture, portrait treatment, project cards, and later sections remain unchanged.

Expected: no horizontal scrollbar and no overlapping text.

- [ ] **Step 4: Verify the 1024px tablet layout**

Set the viewport width to 1024px and verify:

- hero columns remain readable or stack according to the existing breakpoint;
- DeepWisdom copy stacks above the three metrics;
- capability groups stack with a horizontal separator;
- buttons and social links wrap without collision.

Expected: no horizontal scrollbar and DOM reading order matches visual order.

- [ ] **Step 5: Verify the 390px mobile layout**

Set the viewport width to 390px and verify this order:

1. recruiting status;
2. name;
3. role hierarchy;
4. lede;
5. two full-width buttons;
6. GitHub and X links;
7. portrait;
8. DeepWisdom copy and metrics;
9. product ability, implementation ability, and short background.

Expected: no horizontal scrollbar; all three DeepWisdom labels remain legible; no link or text is clipped.

- [ ] **Step 6: Verify keyboard and external-link behavior**

Using only the keyboard, tab through the page and confirm:

- GitHub, X, and “查看核心案例” receive a visible focus indicator;
- Enter activates each link;
- GitHub and X open in new tabs;
- “查看核心案例” opens `projects/deepwisdom.html` in the same tab;
- the two main buttons retain their current behavior.

Expected: every interactive item is reachable and visibly focused; no focus trap occurs.

- [ ] **Step 7: Verify scope and commit history**

Run:

```powershell
git diff origin/gh-pages...HEAD -- index.html assets/styles.css assets/site.js tests/homepage-hero.test.mjs
git log --oneline --decorate -5
```

Expected: `assets/site.js` has no diff; the production diff contains only the approved homepage structure/style changes; the latest three implementation commits correspond to Tasks 2-4.

## Task 6: Publish only after explicit approval

**Files:**

- Release: branch `gh-pages`
- Live verification: `https://jingyuan.dev/`

- [ ] **Step 1: Present local verification results and request release approval**

Report the automated test count, three viewport results, keyboard result, exact commit list, and any remaining untracked `.superpowers/` artifacts. Do not stage `.superpowers/` and do not push before the user explicitly approves publication.

- [ ] **Step 2: Push the approved commits**

After explicit approval, run:

```powershell
git push origin gh-pages
```

Expected: `origin/gh-pages` advances to the verified local HEAD.

- [ ] **Step 3: Poll the live homepage until the cache-keyed HTML is deployed**

Run:

```powershell
$deployed = $false
for ($attempt = 1; $attempt -le 6; $attempt++) {
  $html = (Invoke-WebRequest -UseBasicParsing -Uri "https://jingyuan.dev/?verify=homepage-hero-$attempt" -Headers @{'Cache-Control'='no-cache'} -TimeoutSec 20).Content
  if ($html.Contains('assets/styles.css?v=20260810-hero') -and $html.Contains('实习与校招机会开放')) {
    $deployed = $true
    break
  }
  if ($attempt -lt 6) { Start-Sleep -Seconds 5 }
}
if (-not $deployed) { throw 'Homepage hero deployment was not observed' }
```

Expected: the loop exits successfully after the new HTML appears.

- [ ] **Step 4: Repeat the critical live checks**

Open `https://jingyuan.dev/` and repeat the 1440px and 390px checks from Task 5. Also open GitHub, X, resume, and DeepWisdom links once each.

Expected: live rendering matches local rendering and all four targets are correct.

- [ ] **Step 5: Confirm the branch is synchronized**

Run:

```powershell
git status --short --branch
```

Expected: `gh-pages...origin/gh-pages` with no modified or staged production files. `.superpowers/` may remain untracked and must not be published.
