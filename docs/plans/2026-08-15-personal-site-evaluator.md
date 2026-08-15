# jingyuan.dev Evaluator

- **Status:** Confirmed hybrid evaluator
- **Date:** 2026-08-15
- **Site rules:** [Site Contract](./2026-08-15-personal-site-design-contract-design.md)
**Page responsibilities:** [Page Profiles](./2026-08-15-personal-site-page-profiles.md)

## 1. Evaluator role

Evaluator 只负责检查、解释和提出最小修改建议，不拥有修改权限。

> 审查与实施是两个独立阶段。允许审查不等于允许修改。

任何审查结果都必须引用 Site Contract 或 Page Profiles 中的具体规则。若没有明确问题，应输出“当前无需修改”，不得为了显得有帮助而制造优化项。

## 2. Evaluation flow

1. 确认用户要求和允许检查的范围；
2. 读取 Site Contract、对应 Page Profile 与当前实现；
3. 先检查硬性门槛；
4. 再给出软性评分和非阻塞建议；
5. 按固定格式报告，不修改文件；
6. 等待用户逐项确认；
7. 仅实施获批项目；
8. 在约定尺寸和交互路径下复验；
9. 等待用户决定是否提交、推送或部署。

## 3. Hard gates

任一硬性门槛不通过，结论必须是“需要处理”。软性评分不能抵消硬性问题。

### G1. Authorization

- 审查阶段不得产生页面、代码、测试或配置修改；
- 未经明确要求，不得提交、推送或部署；
- 用户确认的具体项目，才构成实施授权。

### G2. Scope control

- 修改必须与获批项目一一对应；
- 不得顺手重写相邻文案、调整布局或清理无关代码；
- 若必要修改会扩大范围，必须暂停并重新确认。

### G3. Truth and attribution

- 经历、职责和指标必须可核实；
- “参与”“负责”“主导”等动词必须符合实际边界；
- 无法核实的信息标记为待确认，不推测、不强化。

### G4. Ten-second comprehension

首页首次访问应能快速识别：

- 姓名与主定位；
- 能力方向；
- 查看项目、简历或外部证明的入口。

个人观点不能取代首要事实，也不能让技术身份遮蔽产品主定位。

### G5. Evidence uniqueness

- 同一成果、指标或解释不得在多个区块重复展示；
- 导航和联系方式可以重复，但不得重复其说明性内容；
- 为视觉过渡而复制数据，视为不通过。

### G6. Interaction clarity and keyboard access

- 链接在默认状态下可以被识别；
- 悬浮与键盘聚焦反馈可见；
- 主要操作可以仅用键盘完成；
- 链接不能只依靠鼠标光标变化表达可点击性；
- 外链视觉提示与实际行为一致。

### G7. Responsive and accessibility baseline

在 1440px、1024px 和 390px 宽度下：

- 无页面级横向溢出；
- 文字与控件不重叠、不截断；
- 移动端阅读顺序与视觉顺序一致；
- 锚点目标不被固定导航遮挡；
- 主要操作具有语义名称与可见聚焦状态；
- 减少动态效果设置得到尊重。

## 4. Soft score

软性评分只用于比较方案和发现改进空间，不构成修改授权。每项 0–5 分，总分 20 分。

### S1. Editorial hierarchy and rhythm

标题、正文、注释与操作层级是否清楚；纵向节奏是否自然；阅读是否需要反复寻找起点。

### S2. Personal identity and magazine consistency

纸色、中文排版、头像、深蓝强调和个人气质是否一致；是否滑向通用 SaaS 或开发者模板。

### S3. Information density and whitespace

内容是否紧凑但不拥挤；留白是否服务分组；是否存在为填充空间而增加的容器或信息。

### S4. Interaction and motion restraint

反馈是否明确、克制且有目的；动效是否说明状态、方向或层级；是否存在装饰性循环运动。

分数不设置自动通过阈值。即使分数较低，也只能提出建议并等待确认。

## 5. Required report format

每个问题必须使用以下结构：

```text
位置：<页面、区块或元素>
级别：阻塞 / 应调整 / 润色建议
现象：<实际观察到的问题>
依据：<Site Contract 或 Page Profiles 的具体条目>
证据：<截图、尺寸、交互结果或内容比对>
最小修改：<解决问题所需的最小范围>
状态：等待张靖远确认
```

报告末尾给出：

```text
硬性门槛：通过 / 需要处理
软性评分：编辑层级 x/5 · 品牌一致性 x/5 · 信息密度 x/5 · 交互动效 x/5
实施状态：未授权 / 已授权具体项目
```

## 6. Conflict and uncertainty handling

- 用户要求与契约冲突：说明冲突，等待用户选择，不擅自折中；
- 多份历史规格冲突：以最新用户确认和 Site Contract 为准；
- 数据无法核实：标记待确认，不给出确定性文案；
- 审查范围不清楚：先缩小到用户明确指出的区域；
- 没有发现问题：结束审查，不追加无关建议。

## 7. Implementation and rollback boundary

获得授权后：

1. 记录获批项目及其最小文件范围；
2. 只实施对应修改；
3. 检查差异，确认没有夹带其他变化；
4. 完成复验并报告结果；
5. 等待用户决定是否提交、推送或部署。

若修改引起新问题，只回退本次获批范围，不触碰其他用户内容或历史修改。

## 8. Verification matrix

| Area | Minimum verification |
| --- | --- |
| Desktop | 1440px：首屏层级、主要操作、页面级溢出 |
| Tablet | 1024px：栏布局、换行、内容顺序、页面级溢出 |
| Mobile | 390px：阅读顺序、点击区域、文字换行、页面级溢出 |
| Keyboard | Tab 顺序、可见聚焦、Enter 激活主要链接 |
| Links | 目标 URL、站内锚点、外链行为与提示一致 |
| Motion | `prefers-reduced-motion` 下无必要外的运动 |
| Scope | 最终差异只包含获批文件和获批内容 |

## 9. Evaluator non-goals

Evaluator 不得：

- 自动修复问题；
- 根据软性分数重构页面；
- 为提升评分增加卡片、指标或动效；
- 改写未经核实的个人经历；
- 自动提交、推送或部署；
- 把 playbook 的通用偏好置于用户明确要求之上。
