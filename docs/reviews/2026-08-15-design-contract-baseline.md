# jingyuan.dev Design Contract Baseline Review

- Date: 2026-08-15
- Source commit: `cf76f0d13d4a05714f2a785cf2bc3c31cbb48ec4`
- Scope: Review only; no visible-site modification authorized
- Contracts: [Site Contract](../plans/2026-08-15-personal-site-design-contract-design.md), [Page Profiles](../plans/2026-08-15-personal-site-page-profiles.md), [Evaluator](../plans/2026-08-15-personal-site-evaluator.md)

## Hard gates

| Gate | Result | Evidence |
| --- | --- | --- |
| G1 Authorization | 通过 | 本次仅获授权创建并提交本审查报告；浏览器审查未改动页面、运行时代码、测试或配置，也未推送或部署。 |
| G2 Scope control | 通过 | 审查范围限定为三份契约、当前首页呈现、规定视口、键盘路径、链接/focus 与 reduced-motion。最终范围检查只允许本报告。 |
| G3 Truth and attribution | 待用户核实 | 浏览器可确认文案实际呈现，但不能重新证明个人经历、职责边界、指标与奖项。首页呈现的 `4` 个项目、`200+`、`70%`、`25%`、`30,000+`、`61%`、`20+`、软著编号及 Recognition 奖项均缺少本次审查可用的外部来源映射；不推测、不强化。 |
| G4 Ten-second comprehension | 通过 | 初始快照在 hero 内直接呈现姓名“张靖远”、主定位“AI 产品经理”、次定位“AI Builder”、4 个项目的能力方向，以及“查看精选项目”“下载中文简历”、GitHub、X 入口；主定位字号与字重高于次定位。 |
| G5 Evidence uniqueness | 通过 | 在本次逐区检查的首页中，项目结果数字集中在 Selected work；Product judgment 使用判断与案例解释而未复制这些数字；Contact 仅重复契约允许的联系入口。此结果不替代 G3 的来源核实。 |
| G6 Interaction and keyboard | 通过 | hero GitHub/X 默认计算样式为 `text-decoration-line: underline`、装饰色 `rgb(155, 167, 182)`；代表性 GitHub hover 从文字 `rgb(27, 54, 93)` / 下划线 `rgb(155, 167, 182)` 变为文字与下划线均 `rgb(45, 90, 138)`，其可见文本含 `↗`，实际 `target="_blank"`、`rel="noopener noreferrer"`。writing 的 2 个 article 与 3 个 tool 链接实际均为 `target="_blank"`，默认下划线为 `1px rgb(183, 181, 173)`；代表性 article hover 从文字 `rgb(20, 20, 19)` / 下划线 `rgb(183, 181, 173)` 变为两者均 `rgb(27, 54, 93)`。390px 下 Tab 真实经过移动菜单、5 个菜单项、两个 hero 按钮、GitHub、X、项目区外链及第一张项目卡，全部匹配 `:focus-visible`。写作链接 focus 从 `outline:none` 变为 `2px solid rgb(228, 236, 245)`、offset `2.66667px`；其他经过控件显示浏览器 `auto` focus outline。Enter 展开菜单后 `aria-expanded=true`、菜单 `display:flex`；Enter 激活首项目卡到 `/projects/deepwisdom.html`，随后成功返回。 |
| G7 Responsive and accessibility | 待用户确认 | 1440x1000：`innerWidth/clientWidth/scrollWidth = 1440/1425/1425`；1024x900：`1024/1009/1009`；390x844：`390/375/375`。每档 `scrollWidth === clientWidth`，关键内容未见越界、重叠或截断；390px 视觉与 DOM 顺序一致，锚点标题未被 sticky header 遮挡。390px 实测 bounding box：菜单 `42×42`；两个 hero 按钮均 `342.7×48`；hero GitHub/X 为 `122.7×18` / `115.8×18`；首项目卡 `342.7×433`；writing articles 为 `188.7×48.4`（两行各 `20px` 高）/ `187.7×20`，tools 为 `113.3×20`、分行的 `14.5×20 + 118.7×20`、`80×20`；contact email `293.3×48`，GitHub/X 为 `121.7×25.3` / `118.3×25.3`。契约没有数值化“足够点击区域”标准，不能据此把 18–25.3px 高目标自行判为通过。Playwright accessibility snapshot 同时确认这 14 个目标均以非空名称暴露：打开菜单、查看精选项目、下载中文简历、GitHub @to-real、X @Potatoloogs、首项目完整名称、2 个 article 标题、RSSWebReader、x-article-formatter、jobpilot-cn、邮箱及 contact GitHub/X。对比度仅作基线参考：本报告采用普通文字 `4.5:1`、大文字 `3:1` 阈值；基于浏览器 computed 前景色与最近不透明 CSS 背景色，hero 正文 `9.88:1`、hero social `10.99:1`、writing link `16.72:1`、主按钮 `11.51:1`、次按钮 `10.34:1`、contact 正文 `7.89:1`、contact social `11.51:1`，均高于普通文字参考阈值。但 `body::before` 纸纹覆盖层实际存在且 computed opacity 为 `0.28`，本次未做像素级采样，因此最终纹理像素上的精确对比度仍待确认。reduced-motion 下 12/12 个 `.reveal` 均为 `opacity:1`、`transform:none`，animation/transition 为 0.01ms，已收敛。 |

## Soft score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Editorial hierarchy and rhythm | 5/5 | hero 先身份与事实、再行动入口；后续以 01–05 分区，标题、正文、注释与操作层级清楚，三档视口均保持稳定阅读起点。 |
| Personal identity and magazine consistency | 5/5 | 暖纸色、中文衬线回退、深蓝强调、漫画头像、大留白与细分隔共同保持个人杂志感，未呈现通用 SaaS 仪表盘形态。 |
| Information density and whitespace | 4/5 | 桌面与平板分栏清晰，390px 顺序化后无拥挤或截断；长项目卡与 Product judgment 使移动端纵向较长，但未观察到为填充空间而新增的数据容器。 |
| Interaction and motion restraint | 4/5 | 主要动作、默认下划线、键盘路径和 reduced-motion 均有效；部分控件依赖浏览器原生 focus outline，而非更统一的站点级反馈，但本次仍可见。此评分仅为建议，不构成修改授权。 |

## Findings

### 1. Personal claims require source verification

- Location: Homepage / Selected work, Product judgment, Recognition
- Level: 阻塞（核实阻塞，不是页面渲染故障）
- Observation: 本审查只能确认个人经历、职责、指标与奖项已被呈现，不能从仓库或浏览器证据重新证明其真实性与个人归因边界，因此 G3 不能记为通过。
- Contract source: Site Contract §5.3 “Claims must be bounded”；Evaluator §3 G3 “Truth and attribution”与 §6 “数据无法核实”。
- Evidence: 可见内容包含 `200+` 并行任务、`70%` 工作量降低、`25%` 成功率提升、`30,000+` 用户、`7 日留存 61%`、`20+` 访谈、`2025SR0148410` 及 4 项 Recognition；本次范围没有对应外部来源或逐项归因材料。
- Minimal change: 不改页面文案；由张靖远提供或确认逐项来源与职责边界映射，再单独判断是否需要任何呈现修改。
- Status: 待用户核实；等待张靖远确认

### 2. Mobile target-size acceptance criterion is undefined

- Location: Homepage at 390px / hero social links, Writing links, Contact social links
- Level: 应调整（验收标准待确认）
- Observation: 主要按钮与项目卡有较大的实际点击区域，但 hero social、多个 writing 链接和 contact social 的实测高度只有 18–25.3px。Site Contract 只要求点击区域“足够”，没有定义数值阈值或哪些次级入口必须采用同一阈值，因此本审查不能自行宣称这些尺寸通过，也不能直接决定 CSS 修改。
- Contract source: Site Contract §8 “主要链接和按钮具有足够点击区域”；Evaluator §3 G7 “Responsive and accessibility baseline”与 §6 uncertainty handling。
- Evidence: 菜单 `42×42`，hero buttons `342.7×48`，hero GitHub/X `122.7×18` / `115.8×18`，first project `342.7×433`；writing 单行可点击矩形通常为 `20px` 高，contact GitHub/X 为 `25.3px` 高。所有目标均有非空可访问名称，但名称完整不等同于点击区域尺寸合格。
- Minimal change: 仅先由张靖远确认适用于本站的目标尺寸标准及适用控件范围；本审查不提出或实施具体 CSS 改动。
- Status: 等待张靖远确认

### 3. Recognition has no confirmed Page Profile

- Location: Homepage / `04 / Recognition` — “阶段性认可”
- Level: 应调整（契约覆盖问题）
- Observation: 该现有区块可以在浏览器中正常阅读，但已确认的 Page Profiles 没有为 Recognition 定义 Job、Required/Avoid 或 Primary next step。本审查不得自行给它分配职责，也不得决定移除或补建 profile。
- Contract source: Site Contract §5.2 “Every section needs a job”；Page Profiles §1 shared page rules 与 §9 adding a new page or section；Evaluator §6 conflict and uncertainty handling。
- Evidence: 首页快照在 Writing 与 Contact 之间呈现独立 `04 / Recognition` 区块及 4 条奖项；Page Profiles 仅确认 Homepage hero、Selected work、Product perspective、Writing and open source、Résumé、Contact、Navigation，没有 Recognition profile。
- Minimal change: 先由张靖远确认该区块的访问者问题、证据位置与下一步，或确认另行处理；本审查不修改区块、不移除内容、不补 profile。
- Status: 等待张靖远确认

### 4. Existing TsangerJinKai02 CDN requests return 404

- Location: Homepage and opened DeepWisdom project / web-font loading
- Level: 润色建议（既有非阻塞记录）
- Observation: 浏览器 console 记录 TsangerJinKai02 W04/W05 字体资源 404；页面继续使用本地中文衬线与其他 fallback，未导致本次文字截断、横向溢出或核心交互失败。
- Contract source: Site Contract §6 “Preserve”中的中文衬线编辑排版感；Evaluator §8 browser verification scope。
- Evidence: `https://cdn.jsdelivr.net/gh/AlfredoSequeworthy/TsangerJinKai02@main/TsangerJinKai02-W04.woff2` 与 `...-W05.woff2` 在首页 console 均返回 404；本次首页共 2 errors、0 warnings。打开 DeepWisdom 时 W04 亦记录 404。
- Minimal change: 本次不改；若以后单独授权，仅核对这两条字体源或移除失效请求，同时保留现有 fallback，不扩大到排版重构。
- Status: 既有非阻塞记录；等待张靖远确认

除以上 G3 核实项、移动点击区域验收标准、Recognition 契约覆盖问题和既有字体 404 外，本次授权范围内未发现其他需要页面修改的问题。

## Overall

- Hard gates: 需要处理（G3 待用户核实、G7 待用户确认；G1、G2、G4–G6 通过）
- Soft score: 编辑层级 5/5 · 品牌一致性 5/5 · 信息密度 4/5 · 交互动效 4/5（总分 18/20）
- Implementation status: 未授权（仅本审查报告的创建与提交获授权）
- Push/deploy status: 未执行
