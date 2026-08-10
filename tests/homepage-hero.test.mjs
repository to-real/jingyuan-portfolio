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
const hero = html.slice(heroStart, html.indexOf('<section class="section" id="work">'));

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
  assert.match(hero, /<a href="https:\/\/github\.com\/to-real" target="_blank" rel="noopener noreferrer">GitHub @to-real <span aria-hidden="true">↗<\/span><\/a>/);
  assert.match(hero, /<a href="https:\/\/x\.com\/Potatoloogs" target="_blank" rel="noopener noreferrer">X @Potatoloogs <span aria-hidden="true">↗<\/span><\/a>/);
  assert.doesNotMatch(hero, /https:\/\/x\.com\/Potatoloogos/);
  assert.equal(countIn(hero, 'class="button '), 2);
});

test("homepage omits the redundant evidence strips and keeps the selected work intact", () => {
  assert.doesNotMatch(html, /class="deepwisdom-highlight/);
  assert.doesNotMatch(html, /class="capability-section/);
  assert.doesNotMatch(html, /id="deepwisdom-case"/);
  assert.match(
    html,
    /<a class="project-card reveal" data-index="01" href="projects\/deepwisdom\.html">/
  );

  for (const selector of [
    ".deepwisdom-highlight",
    ".deepwisdom-title",
    ".deepwisdom-copy",
    ".deepwisdom-link",
    ".deepwisdom-metrics",
    ".deepwisdom-stat",
    ".capability-section",
    ".capability-panel",
    ".capability-grid",
    ".capability-group",
    ".capability-label",
    ".capability-about"
  ]) {
    assert.doesNotMatch(css, new RegExp(`\\${selector}\\b`), `${selector} should be removed`);
  }
  assert.doesNotMatch(css, /#deepwisdom-case\b/);
  assert.doesNotMatch(css, /@media \(max-width: 1024px\)/);
});

test("desktop CSS keeps the approved hero hierarchy and social links", () => {
  for (const selector of [".hero-role", ".hero-social-links"]) {
    assert.match(css, new RegExp(`\\${selector}\\b`), `${selector} should be styled`);
  }
  assert.match(css, /\.hero-role strong\s*{[^}]*font-size:\s*22px/s);
  assert.match(css, /\.hero-role span\s*{[^}]*font-size:\s*16px[^}]*color:\s*#52657e/s);
});

test("responsive CSS covers tablet and mobile without dead hero selectors", () => {
  const mobileStart = css.indexOf("@media (max-width: 560px)");
  const reducedMotionStart = css.indexOf("@media (prefers-reduced-motion: reduce)");
  const mobile = css.slice(mobileStart, reducedMotionStart);

  assert.match(mobile, /\.hero-role\s*{[^}]*flex-wrap:\s*wrap/s);

  assert.doesNotMatch(css, /\.about-block\b/);
  assert.doesNotMatch(css, /\.metrics-strip\b/);
  assert.doesNotMatch(css, /\.metric(?:\s|\.|:|\{|,)/);
});
