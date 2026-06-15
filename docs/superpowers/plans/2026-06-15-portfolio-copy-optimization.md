# Portfolio Copy Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Chinese portfolio homepage and four case-study pages in a natural first-person voice while preserving every verified fact, result, link, and responsive layout.

**Architecture:** Keep the existing static HTML/CSS/JavaScript site and its page hierarchy. Extend the current Python site checker with content-contract assertions, then update page copy in small commits and synchronize the verified site into the output directory.

**Tech Stack:** Static HTML5, CSS, vanilla JavaScript, Python 3 validation script, Git, Codex in-app browser.

---

## File Map

- `work/jingyuan-portfolio/scripts/check_site.py`: validate local references and the new content contracts.
- `work/jingyuan-portfolio/site/index.html`: homepage positioning, project summaries, working method, writing, recognition, and contact copy.
- `work/jingyuan-portfolio/site/projects/deepwisdom.html`: Agent evaluation case study.
- `work/jingyuan-portfolio/site/projects/funloom.html`: AI game-generation SaaS case study.
- `work/jingyuan-portfolio/site/projects/media-system.html`: digital-media data and retrieval case study.
- `work/jingyuan-portfolio/site/projects/pearl-ai.html`: pearl quality assessment and 3D commerce case study.
- `work/jingyuan-portfolio/site/llms.txt`: concise machine-readable site summary.
- `work/jingyuan-portfolio/site/assets/styles.css`: only adjust typography or spacing when the rewritten text exposes a layout problem.
- `outputs/jingyuan-portfolio/`: synchronized final deliverable after verification.

### Task 1: Establish the Site Baseline in Git

**Files:**
- Add: `work/jingyuan-portfolio/**`
- Add: `outputs/jingyuan-portfolio/**`

- [ ] **Step 1: Run the existing site checker**

Run:

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
```

Expected: `SITE CHECK PASSED` and all six HTML pages resolve local references.

- [ ] **Step 2: Record the current deliverable in Git**

Run:

```powershell
git add work outputs
git commit -m "chore: add portfolio site baseline"
```

Expected: a commit containing the current source site, validation script, generated PDF, image assets, and output copy.

### Task 2: Add Content Contract Tests

**Files:**
- Modify: `work/jingyuan-portfolio/scripts/check_site.py`

- [ ] **Step 1: Add failing homepage assertions**

Add checks that `index.html` contains these approved phrases:

```python
required_homepage_text = [
    "你好，我是张靖远。",
    "模型出错之后，产品怎么把任务接回来？",
    "这几年，我主要做了四件事。",
    "我写的东西，大多来自我自己需要弄懂的问题。",
    "先弄明白，再写下来。",
    "2027 届 AI 产品经理实习和校招机会",
]
```

Add a loop that reports each missing phrase and makes the script exit non-zero.

- [ ] **Step 2: Add failing prohibited-copy assertions**

Add checks across all five content pages for stale or overly packaged phrases:

```python
prohibited_text = [
    "四种把 AI 变成产品的方式",
    "我关心的不是“能否生成”",
    "模型能力会变，产品判断必须可复用",
    "从模型能力到用户价值的闭环",
]
```

The checker must name the file and phrase when one is present.

- [ ] **Step 3: Add required case-study section assertions**

For every project page, require visible headings or labels that cover:

```python
required_case_sections = ["问题", "我做了什么", "结果", "现在怎么看"]
```

Allow extra project-specific sections, but every case must include these four concepts.

- [ ] **Step 4: Run the checker and verify RED**

Run:

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
```

Expected: FAIL because the approved homepage phrases and new case-study section labels are not present yet.

- [ ] **Step 5: Commit the failing contract tests**

Run:

```powershell
git add work\jingyuan-portfolio\scripts\check_site.py
git commit -m "test: define portfolio copy contracts"
```

### Task 3: Rewrite the Homepage

**Files:**
- Modify: `work/jingyuan-portfolio/site/index.html`
- Modify if required: `work/jingyuan-portfolio/site/assets/styles.css`

- [ ] **Step 1: Replace the metadata and hero copy**

Use this content direction:

```html
<title>张靖远 · AI 产品经理</title>
<meta name="description" content="张靖远的 AI 产品经理个人网站。项目涉及 Agent 评测、AI 游戏生成、媒体素材检索与视觉 AI。">
```

Hero heading:

```html
<h1>你好，我是张靖远。<span>我在做 AI 产品，也一直在琢磨：模型出错之后，产品怎么把任务接回来？</span></h1>
```

Hero body:

```html
<p class="hero-lede">过去两年，我做过 Agent 评测、AI 游戏生成、媒体素材检索和视觉 AI 项目。比起做一段看起来很顺的 Demo，我更关心它能不能被修改、被复盘，最后真的让人用起来。</p>
```

- [ ] **Step 2: Rewrite project cards around concrete problems and actions**

Use these card headlines:

```text
DeepWisdom: 把“看起来做完了”，变成一套可以重复跑的评测流程。
FunloomAI: 用户生成出第一个游戏后，怎么让他愿意留下来继续改？
数字媒体数据系统: 素材找得到还不够，还得知道它从哪里来、能不能用。
珍珠光泽评估: 一个模型分数，怎么变成买卖双方都看得懂的质量报告？
```

Each summary must use first-person action language and retain its existing verified metrics.

- [ ] **Step 3: Replace the six principle cards with four working questions**

Use these headings:

```text
用户到底想完成什么？
哪些步骤用规则更稳，哪些才需要模型？
它跑偏或中断后，用户怎么继续？
怎么证明这一版真的更好？
```

Keep each answer to two short sentences and avoid English terminology unless needed.

- [ ] **Step 4: Rewrite the writing section using the approved voice**

Use this lead exactly:

```text
我写的东西，大多来自我自己需要弄懂的问题。先弄明白，再写下来。
```

Organize the rest under three factual labels: `最近在看`, `我怎么学`, and `写过的主题`.

- [ ] **Step 5: Simplify recognition and contact copy**

Keep awards unchanged. Replace the contact heading with a direct statement that the candidate is seeking 2027 AI product internships and graduate roles, while remaining open to conversations about agent evaluation and generative products.

- [ ] **Step 6: Run the checker**

Run:

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
```

Expected: still FAIL because the case-study pages have not yet been rewritten; homepage-specific assertions pass.

- [ ] **Step 7: Commit the homepage rewrite**

Run:

```powershell
git add work\jingyuan-portfolio\site\index.html work\jingyuan-portfolio\site\assets\styles.css
git commit -m "feat: rewrite portfolio homepage copy"
```

### Task 4: Rewrite the DeepWisdom Case Study

**Files:**
- Modify: `work/jingyuan-portfolio/site/projects/deepwisdom.html`

- [ ] **Step 1: Rewrite the opening around the evaluation problem**

Use a direct summary:

```text
在多 Agent 和多模态任务里，结果看起来合理，不代表任务真的完成了。我的工作是把这些模糊判断拆成可以记录、评分和重复运行的评测流程。
```

- [ ] **Step 2: Restructure the page**

Use these core headings:

```text
问题：同一个结果，不同人会给出不同判断
我做了什么：先把一次评测需要留下的信息定清楚
自动检查能解决什么，不能解决什么
任务中断后，怎么从出错的位置继续
结果
现在怎么看
```

Preserve Task, Dataset, Run, Trace, Evidence, Rubric, Judge, and Report only in the section that explains the schema.

- [ ] **Step 3: Preserve verified outcomes**

Keep `200+`, `30%`, `70%`, `25%`, `60%`, `10+`, and `8+` with their original meanings from the resume. Do not imply sole ownership.

- [ ] **Step 4: Add a grounded reflection**

State that automated checks work best for stable, observable rules, while subjective quality still needs calibrated model or human review. Do not claim a production capability not present in the resume.

- [ ] **Step 5: Run targeted content checks**

Run:

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
```

Expected: DeepWisdom section assertions pass; remaining project pages still fail.

- [ ] **Step 6: Commit**

```powershell
git add work\jingyuan-portfolio\site\projects\deepwisdom.html
git commit -m "feat: rewrite DeepWisdom case study"
```

### Task 5: Rewrite the FunloomAI Case Study

**Files:**
- Modify: `work/jingyuan-portfolio/site/projects/funloom.html`

- [ ] **Step 1: Rewrite the opening around retention after first generation**

Use this framing:

```text
第一次生成能让用户看到惊喜，但真正决定他会不会留下来的，是后面能不能继续改，而且不会一改就把原来的内容弄坏。
```

- [ ] **Step 2: Restructure the page**

Use these core headings:

```text
问题：用户生成了一次，为什么没有继续用
我做了什么：先去问用户卡在哪里
从访谈里改出的产品流程
为什么没有一开始就做复杂的多 Agent
结果
现在怎么看
```

- [ ] **Step 3: Preserve verified outcomes and ownership language**

Keep `20+` interviews, `30,000+` users, and `23% → 61%` seven-day retention. Use `参与`, `负责产品方案`, or `帮助` where appropriate instead of claiming individual causation.

- [ ] **Step 4: Run the checker and commit**

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
git add work\jingyuan-portfolio\site\projects\funloom.html
git commit -m "feat: rewrite FunloomAI case study"
```

Expected: only the remaining two project pages fail content contracts.

### Task 6: Rewrite the Media-System Case Study

**Files:**
- Modify: `work/jingyuan-portfolio/site/projects/media-system.html`

- [ ] **Step 1: Rewrite the opening around provenance and permission**

Use this framing:

```text
文件名能帮人找到素材，却回答不了它从哪里来、以前用在哪、现在还能不能商用。这是我做这个系统时最先想解决的问题。
```

- [ ] **Step 2: Restructure the page**

Use these core headings:

```text
问题：素材还在，相关信息却丢了
我做了什么：先给不同类型的素材一套共同结构
搜索结果为什么必须带回来源和授权信息
一次复杂查询是怎么被拆开的
结果
现在怎么看
```

- [ ] **Step 3: Preserve verified facts**

Keep the six modules, sole copyright ownership, registration date, and `2025SR0148410`. Do not retain the unsupported `100%` evidence metric unless it is clearly described as a design requirement rather than measured production performance.

- [ ] **Step 4: Run the checker and commit**

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
git add work\jingyuan-portfolio\site\projects\media-system.html
git commit -m "feat: rewrite media system case study"
```

Expected: only the pearl project page fails content contracts.

### Task 7: Rewrite the Pearl Visual-AI Case Study

**Files:**
- Modify: `work/jingyuan-portfolio/site/projects/pearl-ai.html`

- [ ] **Step 1: Rewrite the opening around an understandable quality report**

Use this framing:

```text
珍珠的光泽判断很依赖经验。在线上交易里，如果系统只给一个分数，买家和卖家还是不知道这个价格是怎么来的。
```

- [ ] **Step 2: Restructure the page**

Use these core headings:

```text
问题：人工判断慢，而且很难解释给买家听
我做了什么：把采集、检测、报告和展示连成一条流程
为什么先统一拍摄条件
模型结果怎么进入质量报告
结果
现在怎么看
```

- [ ] **Step 3: Keep technology subordinate to the product story**

Mention SVM, Random Forest, YOLOv8, Blender, WebGL, and Three.js in one technical-proposal section. The surrounding copy must focus on seller, buyer, and platform-operations use.

- [ ] **Step 4: Preserve verified facts**

Keep role, dates, three user groups, five product stages, and copyright registration `2025SR1196543`. Do not invent model accuracy or commercial revenue.

- [ ] **Step 5: Run the checker and verify GREEN**

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
```

Expected: `SITE CHECK PASSED`, including content contracts and local references.

- [ ] **Step 6: Commit**

```powershell
git add work\jingyuan-portfolio\site\projects\pearl-ai.html
git commit -m "feat: rewrite pearl AI case study"
```

### Task 8: Update Machine-Readable Copy and Synchronize Outputs

**Files:**
- Modify: `work/jingyuan-portfolio/site/llms.txt`
- Replace from source: `outputs/jingyuan-portfolio/**`

- [ ] **Step 1: Rewrite `llms.txt`**

Include:

```text
张靖远，2027 届 AI 产品经理候选人，现居北京。
项目包括 Agent 评测、AI 游戏生成、数字媒体素材检索与视觉 AI。
```

List the four project URLs, resume URL, email, GitHub, and X account. Use facts only.

- [ ] **Step 2: Synchronize the verified source site**

Run:

```powershell
Copy-Item -Path work\jingyuan-portfolio\site\* -Destination outputs\jingyuan-portfolio -Recurse -Force
```

- [ ] **Step 3: Run source and output validation**

```powershell
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
python work\jingyuan-portfolio\scripts\check_site.py outputs\jingyuan-portfolio
```

Expected: both commands print `SITE CHECK PASSED`.

- [ ] **Step 4: Commit**

```powershell
git add work\jingyuan-portfolio\site\llms.txt outputs\jingyuan-portfolio
git commit -m "chore: publish rewritten portfolio"
```

### Task 9: Browser and Responsive Verification

**Files:**
- Modify if needed: `work/jingyuan-portfolio/site/assets/styles.css`
- Re-sync if changed: `outputs/jingyuan-portfolio/assets/styles.css`

- [ ] **Step 1: Open the homepage in the in-app browser**

Serve or open `work/jingyuan-portfolio/site/index.html` using the existing local preview approach. Verify the hero, metrics, four cards, working questions, writing section, and contact section are visible.

- [ ] **Step 2: Verify desktop layout at 1280 × 720**

Check:

```text
No horizontal overflow.
Hero copy does not overlap the portrait.
All four metrics remain readable.
Project card headings do not clip.
Navigation anchors still reach the correct sections.
```

- [ ] **Step 3: Verify mobile layout at 375 × 812**

Check:

```text
Menu opens and closes.
Hero heading wraps without single-character orphan lines where avoidable.
Portrait remains visible and proportionate.
Metrics and project cards stack without overflow.
Buttons remain tappable and do not overlap.
```

- [ ] **Step 4: Open every project page**

Verify each page shows its problem, personal actions, tradeoff, result, and reflection; table-of-contents links must target existing section IDs.

- [ ] **Step 5: Verify console and local links**

Confirm no browser console errors and no broken local assets. Test the resume download link and confirm the mail link points to `zjy888@bupt.edu.cn` without sending mail.

- [ ] **Step 6: Apply only necessary layout fixes**

If text causes clipping or overflow, adjust existing CSS spacing, font-size, or grid breakpoints. Do not redesign colors, typography families, or the portrait treatment.

- [ ] **Step 7: Re-sync and run final verification**

```powershell
Copy-Item -Path work\jingyuan-portfolio\site\* -Destination outputs\jingyuan-portfolio -Recurse -Force
python work\jingyuan-portfolio\scripts\check_site.py work\jingyuan-portfolio\site
python work\jingyuan-portfolio\scripts\check_site.py outputs\jingyuan-portfolio
git diff --check
git status --short
```

Expected: both site checks pass, `git diff --check` is silent, and `git status --short` lists only intended final changes if a final CSS correction has not yet been committed.

- [ ] **Step 8: Commit final browser fixes**

```powershell
git add work\jingyuan-portfolio\site outputs\jingyuan-portfolio
git commit -m "fix: refine portfolio responsive copy layout"
```

