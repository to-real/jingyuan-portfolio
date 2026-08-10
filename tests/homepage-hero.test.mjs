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
  assert.match(hero, /href="https:\/\/x\.com\/Potatoloogos" target="_blank" rel="noopener noreferrer"/);
  assert.equal(countIn(hero, 'class="button '), 2);
});

test("DeepWisdom highlight states personal scope and shows each metric once", () => {
  assert.match(hero, /DeepWisdom · Agent Evaluation Harness/);
  assert.match(hero, /参与评测系统建设，具体负责评测 Schema、自动检查与长任务恢复机制。/);
  assert.match(hero, /href="#deepwisdom-case"/);
  for (const metric of ["200+", "70%", "25%"]) {
    assert.equal(countIn(hero, metric), 1, `${metric} should appear once in the hero`);
  }
});

test("DeepWisdom case link targets the unique first project card", () => {
  assert.equal(countIn(html, 'id="deepwisdom-case"'), 1);
  assert.match(
    html,
    /<a class="project-card reveal" data-index="01" id="deepwisdom-case" href="projects\/deepwisdom\.html">/
  );
  assert.doesNotMatch(hero, /id="deepwisdom-case"/);
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

test("responsive CSS covers tablet and mobile without dead hero selectors", () => {
  const evidenceTabletStart = css.indexOf("@media (max-width: 1024px)");
  const tabletStart = css.indexOf("@media (max-width: 920px)");
  const mobileStart = css.indexOf("@media (max-width: 560px)");
  const reducedMotionStart = css.indexOf("@media (prefers-reduced-motion: reduce)");
  const evidenceTablet = css.slice(evidenceTabletStart, tabletStart);
  const tablet = css.slice(tabletStart, mobileStart);
  const mobile = css.slice(mobileStart, reducedMotionStart);

  assert.ok(evidenceTabletStart >= 0, "the evidence components need a 1024px tablet breakpoint");
  assert.match(evidenceTablet, /\.deepwisdom-highlight\s*{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(evidenceTablet, /\.capability-grid\s*{[^}]*grid-template-columns:\s*1fr/s);
  assert.doesNotMatch(tablet, /\.deepwisdom-highlight\b/);
  assert.doesNotMatch(tablet, /\.capability-grid\b/);
  assert.match(mobile, /\.hero-role\s*{[^}]*flex-wrap:\s*wrap/s);
  assert.match(mobile, /\.deepwisdom-metrics\s*{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(mobile, /\.capability-panel\s*{[^}]*padding:\s*24px 22px/s);

  assert.doesNotMatch(css, /\.about-block\b/);
  assert.doesNotMatch(css, /\.metrics-strip\b/);
  assert.doesNotMatch(css, /\.metric(?:\s|\.|:|\{|,)/);
});
