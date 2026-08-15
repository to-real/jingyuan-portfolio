import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const read = (...parts) => readFileSync(join(root, ...parts), "utf8");

const readmePath = join(root, "README.md");
const siteContractPath = join(
  root,
  "docs",
  "plans",
  "2026-08-15-personal-site-design-contract-design.md"
);
const pageProfilesPath = join(
  root,
  "docs",
  "plans",
  "2026-08-15-personal-site-page-profiles.md"
);
const evaluatorPath = join(
  root,
  "docs",
  "plans",
  "2026-08-15-personal-site-evaluator.md"
);

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

const approvedDestinations = [
  "https://mp.weixin.qq.com/s/TvAZ_dbYMgtC8olMnAfTnA",
  "https://mp.weixin.qq.com/s/IHfs9aoAtbdMAjr1V1qIDg",
  "https://github.com/to-real/RSSWebReader",
  "https://github.com/to-real/x-article-formatter",
  "https://github.com/to-real/jobpilot-cn"
];

function stripHtmlComments(source) {
  let output = "";
  let cursor = 0;
  while (cursor < source.length) {
    const opening = source.indexOf("<!--", cursor);
    if (opening === -1) return output + source.slice(cursor);
    output += source.slice(cursor, opening);

    const standardClosing = source.indexOf("-->", opening + 4);
    const bangClosing = source.indexOf("--!>", opening + 4);
    if (standardClosing === -1 && bangClosing === -1) return output;
    if (
      bangClosing !== -1 &&
      (standardClosing === -1 || bangClosing < standardClosing)
    ) {
      cursor = bangClosing + 4;
    } else {
      cursor = standardClosing + 3;
    }
  }
  return output;
}

// Dependency-free scanners cover this contract's static subset; Task 3 verifies
// final browser parsing, rendering, and CSS cascade semantics.
function stripRawTextBlocks(source) {
  const openings = /<\s*(script|style)\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
  let output = "";
  let copyFrom = 0;
  while (copyFrom < source.length) {
    openings.lastIndex = copyFrom;
    const opening = openings.exec(source);
    if (!opening) return output + source.slice(copyFrom);
    output += source.slice(copyFrom, opening.index);

    const closing = new RegExp(`<\\s*\\/\\s*${opening[1]}\\s*>`, "gi");
    closing.lastIndex = openings.lastIndex;
    const match = closing.exec(source);
    if (!match) return output;
    copyFrom = closing.lastIndex;
  }
  return output;
}

function stripElementBlocks(source, elementName) {
  const tags = new RegExp(
    `<\\s*\\/?${elementName}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`,
    "gi"
  );
  let output = "";
  let copyFrom = 0;
  let depth = 0;
  for (const match of source.matchAll(tags)) {
    const tag = match[0];
    const closing = /^<\s*\//.test(tag);
    if (!closing) {
      if (depth === 0) output += source.slice(copyFrom, match.index);
      depth += 1;
    } else if (depth > 0) {
      depth -= 1;
      if (depth === 0) copyFrom = match.index + tag.length;
    }
  }
  if (depth === 0) output += source.slice(copyFrom);
  return output;
}

const stripHtmlRawText = (source) =>
  stripElementBlocks(
    stripRawTextBlocks(stripHtmlComments(source)),
    "template"
  );

function stripFencedCodeBlocks(source) {
  const renderedLines = [];
  let openFence;
  for (const line of source.split(/\r?\n/)) {
    if (!openFence) {
      const opening = line.match(/^ {0,3}(`{3,}|~{3,}).*$/);
      if (opening) {
        openFence = {
          marker: opening[1][0],
          length: opening[1].length
        };
      } else {
        renderedLines.push(line);
      }
      continue;
    }

    const closing = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
    if (
      closing &&
      closing[1][0] === openFence.marker &&
      closing[1].length >= openFence.length
    ) {
      openFence = undefined;
    }
  }
  return renderedLines.join("\n");
}
function stripInlineCodeSpans(source) {
  let output = "";
  let cursor = 0;
  while (cursor < source.length) {
    const opening = source.indexOf("`", cursor);
    if (opening === -1) return output + source.slice(cursor);
    output += source.slice(cursor, opening);

    let openingEnd = opening;
    while (source[openingEnd] === "`") openingEnd += 1;
    const delimiterLength = openingEnd - opening;
    let closing = openingEnd;
    while (closing < source.length) {
      if (source[closing] !== "`") {
        closing += 1;
        continue;
      }
      let closingEnd = closing;
      while (source[closingEnd] === "`") closingEnd += 1;
      if (closingEnd - closing === delimiterLength) break;
      closing = closingEnd;
    }

    if (closing >= source.length) {
      output += source.slice(opening, openingEnd);
      cursor = openingEnd;
    } else {
      cursor = closing + delimiterLength;
    }
  }
  return output;
}

function stripMarkdownCode(source) {
  const withoutFences = stripFencedCodeBlocks(stripHtmlComments(source));
  const withoutIndentedCode = withoutFences.replace(/^(?: {4,}|\t).*$/gm, "");
  return stripInlineCodeSpans(withoutIndentedCode);
}
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function assertVisibleContractHeading(source) {
  const visibleProse = stripMarkdownCode(stripHtmlRawText(source));
  assert.match(visibleProse, /^## 设计契约[ \t]*$/m);
}

function assertVisibleVerificationCommand(source) {
  assert.match(
    stripHtmlRawText(source),
    /node --test tests\/homepage-hero\.test\.mjs tests\/site-contract\.test\.mjs/
  );
}

function assertVisibleAuthorization(source) {
  const visibleProse = stripMarkdownCode(stripHtmlRawText(source));
  assert.match(visibleProse, /未经张靖远对具体修改项的明确确认，不得修改/);
}

function assertMarkdownLink(source, sourcePath, label, target) {
  const link = `[${label}](${target})`;
  assert.match(
    stripMarkdownCode(stripHtmlRawText(source)),
    new RegExp(`(?:^|[^!])${escapeRegExp(link)}`, "m"),
    `${sourcePath} should contain the Markdown link ${link}`
  );
  assert.ok(
    existsSync(resolve(dirname(sourcePath), target)),
    `${link} should resolve from ${sourcePath}`
  );
}

function extractTags(source, tagName) {
  const renderedSource = stripHtmlRawText(source);
  const matches = renderedSource.matchAll(
    /<\s*([A-Za-z][\w:-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*>/g
  );
  return [...matches]
    .filter((match) => !tagName || match[1].toLowerCase() === tagName.toLowerCase())
    .map((match) => match[0]);
}

function readAttribute(tag, attributeName) {
  const tagStart = tag.match(/^<\s*[A-Za-z][\w:-]*/);
  assert.ok(tagStart, `${tag} should be an opening tag`);
  const attributes = tag.slice(tagStart[0].length);
  const pattern = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of attributes.matchAll(pattern)) {
    if (match[1].toLowerCase() === attributeName.toLowerCase()) {
      return match[2] ?? match[3] ?? match[4] ?? "";
    }
  }
  return undefined;
}

function parsedHtmlLinks(source) {
  const tags = extractTags(source);
  const anchors = extractTags(source, "a");
  return {
    anchors,
    hrefs: anchors.map((tag) => readAttribute(tag, "href")).filter(Boolean),
    ids: new Set(tags.map((tag) => readAttribute(tag, "id")).filter(Boolean))
  };
}

function assertInternalNavigation(source) {
  const { hrefs, ids } = parsedHtmlLinks(source);
  const internalHrefs = hrefs.filter((href) => href.startsWith("#"));
  assert.ok(internalHrefs.length > 0, "at least one internal anchor should exist");
  for (const href of internalHrefs) {
    assert.notEqual(href, "#", 'href="#" should not be an empty internal target');
    const target = href.slice(1);
    assert.ok(ids.has(target), `#${target} should resolve to an element id`);
  }
}

function assertApprovedDestinations(source) {
  const { hrefs } = parsedHtmlLinks(source);
  for (const destination of approvedDestinations) {
    assert.ok(hrefs.includes(destination), `${destination} should remain linked`);
  }
}

function assertNewTabLinksSafe(source) {
  const links = extractTags(source, "a").filter(
    (tag) => readAttribute(tag, "target")?.toLowerCase() === "_blank"
  );
  assert.ok(links.length > 0, "at least one new-tab link should exist");
  for (const link of links) {
    const relTokens = (readAttribute(link, "rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    assert.ok(relTokens.includes("noopener"), `${link} should protect the opener`);
  }
}

const stripCssComments = (source) => source.replace(/\/\*[\s\S]*?\*\//g, "");

function findCssBrace(source, start, opening) {
  let quote;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = undefined;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === opening) return index;
  }
  return -1;
}

function findMatchingCssBrace(source, openingBrace) {
  let depth = 0;
  let quote;
  for (let index = openingBrace; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = undefined;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function cssBlocks(source) {
  const withoutComments = stripCssComments(source);
  const blocks = [];
  let cursor = 0;
  while (cursor < withoutComments.length) {
    const openingBrace = findCssBrace(withoutComments, cursor, "{");
    if (openingBrace === -1) break;
    const closingBrace = findMatchingCssBrace(withoutComments, openingBrace);
    assert.notEqual(closingBrace, -1, "CSS block should have balanced braces");
    const prelude = withoutComments.slice(cursor, openingBrace).trim();
    if (prelude) {
      blocks.push({
        prelude,
        body: withoutComments.slice(openingBrace + 1, closingBrace)
      });
    }
    cursor = closingBrace + 1;
  }
  return blocks;
}

function selectorsMatch(prelude, expectedSelectors) {
  if (prelude.startsWith("@")) return false;
  const selectors = prelude.split(",").map((selector) => selector.trim());
  return (
    selectors.length === expectedSelectors.length &&
    expectedSelectors.every((selector) => selectors.includes(selector))
  );
}

function cssRuleBody(source, expectedSelectors) {
  const matches = cssBlocks(source).filter(({ prelude }) =>
    selectorsMatch(prelude, expectedSelectors)
  );
  assert.equal(
    matches.length,
    1,
    `${expectedSelectors.join(", ")} should identify one exact CSS rule`
  );
  return matches[0].body;
}

function splitCssDeclarations(body) {
  const declarations = [];
  let quote;
  let parentheses = 0;
  let start = 0;
  for (let index = 0; index <= body.length; index += 1) {
    const character = body[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = undefined;
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "(") parentheses += 1;
    else if (character === ")") parentheses -= 1;
    else if ((character === ";" || index === body.length) && parentheses === 0) {
      declarations.push(body.slice(start, index));
      start = index + 1;
    }
  }
  return declarations;
}

function parseCssDeclarations(body) {
  const declarations = new Map();
  for (const declaration of splitCssDeclarations(body)) {
    const colon = declaration.indexOf(":");
    if (colon === -1) continue;
    const property = declaration.slice(0, colon).trim().toLowerCase();
    const value = declaration.slice(colon + 1).trim().replace(/\s+/g, " ");
    if (property) declarations.set(property, value);
  }
  return declarations;
}

function assertRuleDeclarations(source, selectors, expectedDeclarations) {
  const declarations = parseCssDeclarations(cssRuleBody(source, selectors));
  for (const [property, value] of Object.entries(expectedDeclarations)) {
    assert.equal(
      declarations.get(property),
      value,
      `${selectors.join(", ")} should declare ${property}: ${value}`
    );
  }
}

function assertFocusCoverage(source) {
  assertRuleDeclarations(
    source,
    [".hero-social-links a:hover", ".hero-social-links a:focus-visible"],
    {
      color: "var(--blue-light)",
      "text-decoration-color": "var(--blue-light)"
    }
  );
  assertRuleDeclarations(
    source,
    [".note-list strong a:hover", ".note-list strong a:focus-visible"],
    {
      color: "var(--blue)",
      "text-decoration-color": "var(--blue)"
    }
  );
  assertRuleDeclarations(source, [".note-list strong a:focus-visible"], {
    outline: "2px solid var(--blue-tint)",
    "outline-offset": "3px"
  });
}

function exactReducedMotionBody(source) {
  const matches = cssBlocks(source).filter(({ prelude }) =>
    /^@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*$/i.test(prelude)
  );
  assert.equal(
    matches.length,
    1,
    "CSS should contain one @media block whose only condition is prefers-reduced-motion: reduce"
  );
  return matches[0].body;
}

function assertReducedMotionCoverage(source) {
  const reducedMotion = exactReducedMotionBody(source);
  assertRuleDeclarations(reducedMotion, ["*", "*::before", "*::after"], {
    "animation-duration": "0.01ms !important",
    "transition-duration": "0.01ms !important"
  });
  assertRuleDeclarations(reducedMotion, [".reveal"], {
    opacity: "1",
    transform: "none"
  });
}

test("README exposes the confirmed contract and its verification command", () => {
  assertVisibleContractHeading(readme);
  assert.throws(() => assertVisibleContractHeading("<!--\n## 设计契约\n-->"));
  for (const tag of ["script", "template"]) {
    assert.throws(() =>
      assertVisibleContractHeading(`<${tag}>\n## 设计契约\n</${tag}>`)
    );
  }
  for (const [label, file] of [
    ["Site Contract", "2026-08-15-personal-site-design-contract-design.md"],
    ["Page Profiles", "2026-08-15-personal-site-page-profiles.md"],
    ["Evaluator", "2026-08-15-personal-site-evaluator.md"]
  ]) {
    assertMarkdownLink(readme, readmePath, label, `docs/plans/${file}`);
  }
  const visibleContractLink =
    "[Site Contract](docs/plans/2026-08-15-personal-site-design-contract-design.md)";
  assertMarkdownLink(
    visibleContractLink,
    readmePath,
    "Site Contract",
    "docs/plans/2026-08-15-personal-site-design-contract-design.md"
  );
  for (const hiddenContractLink of [
    `<script>${visibleContractLink}</script>`,
    `<style>${visibleContractLink}</style>`,
    `<template>${visibleContractLink}</template>`,
    `<script>${visibleContractLink}`,
    `<style>${visibleContractLink}`
  ]) {
    assert.throws(() =>
      assertMarkdownLink(
        hiddenContractLink,
        readmePath,
        "Site Contract",
        "docs/plans/2026-08-15-personal-site-design-contract-design.md"
      )
    );
  }
  assertVisibleVerificationCommand(readme);
  assert.throws(() =>
    assertVisibleVerificationCommand(
      "<!-- node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs -->"
    )
  );
  for (const tag of ["script", "style", "template"]) {
    assert.throws(() =>
      assertVisibleVerificationCommand(
        `<${tag}>node --test tests/homepage-hero.test.mjs tests/site-contract.test.mjs</${tag}>`
      )
    );
  }

  assert.throws(() =>
    assertMarkdownLink(
      "Site Contract docs/plans/2026-08-15-personal-site-design-contract-design.md",
      readmePath,
      "Site Contract",
      "docs/plans/2026-08-15-personal-site-design-contract-design.md"
    )
  );
  assert.throws(() =>
    assertMarkdownLink(
      "`[Site Contract](docs/plans/2026-08-15-personal-site-design-contract-design.md)`",
      readmePath,
      "Site Contract",
      "docs/plans/2026-08-15-personal-site-design-contract-design.md"
    )
  );
  const fakeLink =
    "[Site Contract](docs/plans/2026-08-15-personal-site-design-contract-design.md)";
  for (const codeOnlySource of [
    `    ${fakeLink}`,
    `\t${fakeLink}`,
    `double: \`\`${fakeLink}\`\``
  ]) {
    assert.throws(() =>
      assertMarkdownLink(
        codeOnlySource,
        readmePath,
        "Site Contract",
        "docs/plans/2026-08-15-personal-site-design-contract-design.md"
      )
    );
  }
  for (const fencedCodeOnlySource of [
    ["````markdown", "inside", "```", fakeLink, "````"].join("\n"),
    ["```markdown", "inside", "````` not-a-close", fakeLink, "```"].join("\n"),
    ["```markdown", "inside", "    ```", fakeLink, "```"].join("\n"),
    ["```markdown", "inside", "\t```", fakeLink, "```"].join("\n")
  ]) {
    assert.throws(() =>
      assertMarkdownLink(
        fencedCodeOnlySource,
        readmePath,
        "Site Contract",
        "docs/plans/2026-08-15-personal-site-design-contract-design.md"
      )
    );
  }
});

test("the three contract documents remain mutually discoverable", () => {
  assertMarkdownLink(
    siteContract,
    siteContractPath,
    "Page Profiles",
    "./2026-08-15-personal-site-page-profiles.md"
  );
  assertMarkdownLink(
    siteContract,
    siteContractPath,
    "Evaluator",
    "./2026-08-15-personal-site-evaluator.md"
  );
  assertMarkdownLink(
    pageProfiles,
    pageProfilesPath,
    "Site Contract",
    "./2026-08-15-personal-site-design-contract-design.md"
  );
  assertMarkdownLink(
    pageProfiles,
    pageProfilesPath,
    "Evaluator",
    "./2026-08-15-personal-site-evaluator.md"
  );
  assertMarkdownLink(
    evaluator,
    evaluatorPath,
    "Site Contract",
    "./2026-08-15-personal-site-design-contract-design.md"
  );
  assertMarkdownLink(
    evaluator,
    evaluatorPath,
    "Page Profiles",
    "./2026-08-15-personal-site-page-profiles.md"
  );
  assertVisibleAuthorization(siteContract);
  assert.throws(() =>
    assertVisibleAuthorization("<!-- 未经张靖远对具体修改项的明确确认，不得修改 -->")
  );
  for (const tag of ["script", "template"]) {
    assert.throws(() =>
      assertVisibleAuthorization(
        `<${tag}>未经张靖远对具体修改项的明确确认，不得修改</${tag}>`
      )
    );
  }

  assert.throws(() =>
    assertMarkdownLink(
      "[Missing](./missing-contract.md)",
      siteContractPath,
      "Missing",
      "./missing-contract.md"
    )
  );
});

test("internal navigation targets and the résumé asset exist", () => {
  assertInternalNavigation(html);
  assert.ok(
    existsSync(join(root, "assets", "Zhang_Jingyuan_AI_Product_Manager_CN.pdf")),
    "the Chinese résumé should exist"
  );

  assert.equal(readAttribute("<a href = '#work'>", "href"), "#work");
  assert.equal(readAttribute("<a href=#work>", "href"), "#work");
  assert.throws(() =>
    assertInternalNavigation(
      '<a href="#real">real</a><section id="real"></section><a href = \'#missing\'>broken</a>'
    )
  );
  assert.throws(() =>
    assertInternalNavigation(
      '<a href="#real">real</a><section id="real"></section><a href="#">empty</a>'
    )
  );
});

test("writing and open-source evidence keeps the approved destinations", () => {
  assertApprovedDestinations(html);
  const renderedHtml = stripHtmlComments(html);
  assert.doesNotMatch(renderedHtml, /all-agentic-architectures/i);
  const classes = extractTags(renderedHtml)
    .flatMap((tag) => (readAttribute(tag, "class") ?? "").split(/\s+/))
    .filter(Boolean);
  for (const forbiddenClass of [
    "deepwisdom-highlight",
    "capability-section",
    "metrics-strip"
  ]) {
    assert.ok(!classes.includes(forbiddenClass), `${forbiddenClass} should remain absent`);
  }

  const commentedLinks = `<!-- ${approvedDestinations
    .map((href) => `<a href="${href}">fake</a>`)
    .join("")} -->`;
  assert.throws(() => assertApprovedDestinations(commentedLinks));
  for (const commentEnding of ["", " --!>"]) {
    const browserCommentedLinks = `<!-- ${approvedDestinations
      .map((href) => `<a href="${href}">fake</a>`)
      .join("")}${commentEnding}`;
    assert.throws(() => assertApprovedDestinations(browserCommentedLinks));
  }
  const scriptedLinks = `<script>${approvedDestinations
    .map((href) => `<a href="${href}">fake</a>`)
    .join("")}</script>`;
  assert.throws(() => assertApprovedDestinations(scriptedLinks));
  for (const rawTextPrefix of ["<script/>", "<script>", "<style/>", "<style>"]) {
    const unclosedRawTextLinks = `${rawTextPrefix}${approvedDestinations
      .map((href) => `<a href="${href}">fake</a>`)
      .join("")}`;
    assert.throws(() => assertApprovedDestinations(unclosedRawTextLinks));
  }
  const templatedLinks = `<template>${approvedDestinations
    .map((href) => `<a href="${href}">fake</a>`)
    .join("")}</template>`;
  assert.throws(() => assertApprovedDestinations(templatedLinks));
  const nestedTemplatedLinks = `<template><template></template>${approvedDestinations
    .map((href) => `<a href="${href}">fake</a>`)
    .join("")}</template>`;
  assert.throws(() => assertApprovedDestinations(nestedTemplatedLinks));
  const slashTemplatedLinks = `<template/>${approvedDestinations
    .map((href) => `<a href="${href}">fake</a>`)
    .join("")}`;
  assert.throws(() => assertApprovedDestinations(slashTemplatedLinks));
});

test("all new-tab links protect the opener", () => {
  assertNewTabLinksSafe(html);
  for (const unsafeLink of [
    "<a target = '_blank' href='/unsafe'>unsafe</a>",
    "<a target = _blank href=/unsafe>unsafe</a>"
  ]) {
    assert.equal(readAttribute(unsafeLink, "target"), "_blank");
    assert.throws(() =>
      assertNewTabLinksSafe(
        `<a target="_blank" rel="noopener" href="/safe">safe</a>${unsafeLink}`
      )
    );
  }
});

test("approved interaction and reduced-motion declarations remain present", () => {
  assertRuleDeclarations(css, [".hero-social-links a"], {
    "text-decoration": "underline"
  });
  assertRuleDeclarations(css, [".note-list strong a"], {
    "text-decoration": "underline"
  });
  assertFocusCoverage(css);
  assertReducedMotionCoverage(css);

  const commentedUnderlines = `
    /* .hero-social-links a { text-decoration: underline; } */
    /* .note-list strong a { text-decoration: underline; } */
  `;
  assert.throws(() =>
    assertRuleDeclarations(commentedUnderlines, [".hero-social-links a"], {
      "text-decoration": "underline"
    })
  );
  assert.throws(() =>
    assertRuleDeclarations(commentedUnderlines, [".note-list strong a"], {
      "text-decoration": "underline"
    })
  );

  const heroFocusSelectors = [
    ".hero-social-links a:hover",
    ".hero-social-links a:focus-visible"
  ];
  const heroFocusDeclarations = {
    color: "var(--blue-light)",
    "text-decoration-color": "var(--blue-light)"
  };
  for (const ineffectiveDeclarations of [
    "outline: 0 transparent;",
    "color: transparent; text-decoration-color: transparent;",
    "text-decoration-thickness: 0;"
  ]) {
    assert.throws(() =>
      assertRuleDeclarations(
        `${heroFocusSelectors.join(", ")} { ${ineffectiveDeclarations} }`,
        heroFocusSelectors,
        heroFocusDeclarations
      )
    );
  }
  assert.throws(() =>
    assertRuleDeclarations(
      ".note-list strong a:focus-visible { outline: 0 transparent; outline-offset: 0; }",
      [".note-list strong a:focus-visible"],
      {
        outline: "2px solid var(--blue-tint)",
        "outline-offset": "3px"
      }
    )
  );

  const approvedReducedMotionRules = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .reveal { opacity: 1; transform: none; }
  `;
  assert.throws(() =>
    assertReducedMotionCoverage(`
      @media (prefers-reduced-motion: reduce) and (never-matches: true) {
        ${approvedReducedMotionRules}
      }
    `)
  );
  assert.throws(() =>
    assertReducedMotionCoverage(`
      @media (prefers-reduced-motion: reduce) {
        .irrelevant {
          content: "animation-duration: 0.01ms !important; transition-duration: 0.01ms !important";
        }
        .reveal { opacity: 1; transform: none; }
      }
    `)
  );
});
