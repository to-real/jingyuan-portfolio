# 张靖远个人网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付一个可直接部署的中文 AI 产品经理个人网站，包含首页和四个项目案例页。

**Architecture:** 无构建静态站点，页面内容使用语义化 HTML，样式与交互分别集中在单独 CSS/JS 文件。项目页使用同一信息结构与导航系统，所有链接采用相对路径。

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Playwright/Chromium browser verification.

---

### Task 1: 共享视觉与交互

**Files:**
- Create: `site/assets/styles.css`
- Create: `site/assets/site.js`
- Create: `site/assets/favicon.svg`

- [ ] 定义 Kami 颜色、字体、间距、容器与响应式 token。
- [ ] 实现导航、首屏、指标、项目卡、案例页和页脚组件。
- [ ] 实现移动菜单、滚动显示、当前年份和减少动效模式。

### Task 2: 首页

**Files:**
- Create: `site/index.html`
- Copy: `site/assets/Zhang_Jingyuan_AI_Product_Manager_CN.pdf`

- [ ] 从 Kami landing-page 的编辑语言构建首屏，加入照片预留位。
- [ ] 加入四项量化证据和四个精选项目入口。
- [ ] 加入 AI 产品方法、开源/写作、奖项、简历下载与联系区。

### Task 3: 项目案例页

**Files:**
- Create: `site/projects/deepwisdom.html`
- Create: `site/projects/funloom.html`
- Create: `site/projects/media-system.html`
- Create: `site/projects/pearl-ai.html`

- [ ] 为 DeepWisdom 完成评测对象、数据流与恢复机制案例。
- [ ] 为 FunloomAI 完成用户问题、Agent 流程与增长结果案例。
- [ ] 为数字媒体系统完成资源本体、RAG 流程与权利溯源案例。
- [ ] 为珍珠 AI 完成采集、视觉评估、质量报告与 3D 展示案例。

### Task 4: 部署与可发现性

**Files:**
- Create: `site/404.html`
- Create: `site/robots.txt`
- Create: `site/llms.txt`
- Create: `site/vercel.json`
- Create: `site/README.md`

- [ ] 完成静态站点 404 页、机器可读简介和部署配置。
- [ ] 记录 Vercel、Netlify 和 GitHub Pages 部署方式。
- [ ] 保留域名、canonical 和社交预览图的后续配置说明，不在公开页面留占位符。

### Task 5: 验证与交付

**Files:**
- Create: `scripts/check_site.py`
- Copy: `outputs/jingyuan-portfolio/*`

- [ ] 检查 HTML 语法、站内链接、本地资源、占位符、空链接和绝对本机路径。
- [ ] 启动本地服务，在 1280px 与 375px 对首页和四个项目页截图。
- [ ] 检查水平溢出、菜单、简历下载、项目导航和联系链接。
- [ ] 将验证通过的完整 `site` 目录复制到 `outputs/jingyuan-portfolio`。
