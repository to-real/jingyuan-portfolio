# AI 产品经理三版简历 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从 `E:/CV_Zhang_Jingyuan.md` 生成三份面向国内招聘的两页中文 AI 产品经理简历。

**Architecture:** 使用一份可追溯的事实底稿和三组岗位定制内容，填入 Kami 中文 resume 模板。渲染阶段共享同一套 WeasyPrint/Poppler 验证流程，但每版独立调整信息密度。

**Tech Stack:** HTML/CSS, Kami resume template, Python, WeasyPrint, pypdf/pdfplumber, Poppler.

---

### Task 1: 建立内容底稿

**Files:**
- Create: `src/content.py`

- [ ] 录入共享个人信息、可验证数字、项目和教育奖项。
- [ ] 为 Agent、通用产品、产品技术三版定义独立摘要、项目顺序和能力描述。
- [ ] 扫描文本，确认不存在未来自原稿的数字性成果。

### Task 2: 生成 HTML

**Files:**
- Create: `src/generate.py`
- Create: `rendered/zhang-jingyuan-ai-agent-pm.html`
- Create: `rendered/zhang-jingyuan-general-ai-pm.html`
- Create: `rendered/zhang-jingyuan-ai-technical-pm.html`

- [ ] 读取 Kami `resume.html` 并保留原 CSS。
- [ ] 为三版生成完整 body 和 PDF metadata。
- [ ] 运行 Kami `--check-placeholders`，预期每个 HTML 均无未替换占位符。

### Task 3: 渲染 PDF

**Files:**
- Create: `rendered/*.pdf`

- [ ] 使用 WeasyPrint 渲染三份 PDF。
- [ ] 使用 pypdf 检查每份恰好 2 页。
- [ ] 运行 Kami `--check-resume-balance`，根据结果优先修剪重复文字或补入已有证据。

### Task 4: 视觉验收与交付

**Files:**
- Create: `rendered/preview-*.png`
- Copy: `outputs/ai-pm-resumes/*`

- [ ] 使用 Poppler 把六个 PDF 页面渲染为 PNG。
- [ ] 检查页面边界、标题、数字标签、项目行、联系方式和页尾。
- [ ] 使用 pdfplumber 验证姓名、邮箱、电话和核心指标可提取。
- [ ] 将最终三份 HTML 和三份 PDF 复制到 `outputs/ai-pm-resumes`。
