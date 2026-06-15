COMMON = {
    "name": "张靖远",
    "alias": "Jingyuan Zhang",
    "phone": "+86 188-9546-6995",
    "email": "zjy888@bupt.edu.cn",
    "github_url": "https://github.com/to-real",
    "github_id": "to-real",
    "x_url": "https://x.com/Potatoloogs",
    "x_id": "Potatoloogs",
    "location": "北京",
    "education": "北京邮电大学 · 伦敦玛丽女王大学联合培养 · 数字媒体技术工学学士 · GPA 3.37/4.00",
    "education_date": "2023.09 - 2027.07",
    "awards": [
        "2025 挑战杯北京市一等奖",
        "2025 中国国际大学生创新大赛北京赛区一等奖",
        "2025 全国大学生电子商务“三创赛”省级一等奖",
        "2024 北京邮电大学三等奖学金",
    ],
}


VARIANTS = {
    "agent": {
        "filename": "zhang-jingyuan-ai-agent-pm",
        "role": "AI Agent 产品经理",
        "description": "张靖远的 AI Agent 产品经理简历，聚焦 Agent 评测体系、长任务恢复、多智能体与数据反馈闭环。",
        "keywords": "AI Agent 产品经理,Agent Evaluation Harness,多智能体,模型评测,长任务",
        "metrics": [("200+", "并行评测任务"), ("70%", "人工评测工作量降低"), ("30%", "评测耗时缩短"), ("25%", "长任务成功率提升")],
        "summary": "面向 Agent 产品的应届候选人，有 AI 产品与 Agent 评测实习经验。能将模糊的任务完成标准拆解为 <span class=\"hl\">Task / Trace / Evidence / Rubric / Judge</span> 等可执行对象，并围绕轨迹证据、回归评测、失败标签和数据回流搭建迭代闭环。",
        "timeline": [("2024", "建立 Agent 视角", "从 ReAct、Planning、Memory 和 Multi-Agent 的可运行实现理解行为机制。"), ("2025", "转向产品闭环", "将生成能力映射为首次生成、二次编辑、局部修改和结果验收。"), ("2025", "沉淀评测系统", "用结构化证据、自动检查与人工复核把 Agent 行为变成可测量系统。")],
        "projects": [
            ("DeepWisdom Agent Evaluation Harness", "Agent 评测体系", "核心共建", "面向多 Agent 与多模态生成场景，把模糊的完成标准转换为可复现、可追踪的评测对象。", "定义 Task、Dataset、Run、Trace、Evidence、Rubric、Judge、Report 与失败标签；用 JSON Schema 规范 10+ 维评分规则，并设计 Replay / Rollback / Retry / Edit 需求。", "自动化回归与抽样复核使人工评测工作量降低 <span class=\"hl\">70%</span>；长任务成功率提升 <span class=\"hl\">25%</span>，版本恢复时间缩短 60%。"),
            ("FunloomAI", "AI 游戏生成 SaaS", "产品方案负责", "负责“自然语言到可玩原型”的产品架构，将 Agent 能力组织成可见、可编辑、可验证的用户流程。", "访谈 20+ 开发者与创作者，归纳不可控生成、修改断裂、本地编辑弱等问题；比较单模型、模板和多 Agent 方案，制定首次生成与二次编辑验收信号。", "优化注册、首次生成、编辑和发布路径，新用户 7 日留存从 <span class=\"hl\">23% 提升至 61%</span>，支撑 30,000+ 注册用户与多款 TapTap 游戏上线。"),
            ("all-agentic-architectures", "Agent 架构开源实践", "独立开发", "面向现代 Agent 架构建立可运行学习路径，用实例验证产品概念与工程机制。", "覆盖 Reflection、Tool Use、ReAct、Planning、Multi-Agent、PEV、Memory、Tree of Thoughts、dry-run harness 与自改进循环，组织为可运行 Notebook。", "将 LLM-as-a-Judge、轨迹证据和 verifier loop 贯穿实作，形成持续的 <span class=\"hl\">Agent 评测与架构公开知识库</span>。"),
        ],
        "supplementary": [
            ("数字媒体数据集成与管理系统", "独立设计媒体资源本体、RAG 检索与证据溯源流程，获软件著作权 2025SR0148410。"),
            ("AI 工作流工具", "开发 RSS 技术阅读、Markdown 到 X Article 排版与 AI 求职管道工具，连接信息摄取、发布和职位研究。"),
        ],
        "skills": [
            ("Agent 产品建模", "能将任务、轨迹、证据、评分和报告拆解为 <span class=\"em-brand\">可实施产品对象</span>。"),
            ("评测与数据闭环", "掌握 Rubric、LLM-as-a-Judge、回归评测、badcase 分析、人工复核与 <span class=\"em-brand\">SFT 数据筛选</span>。"),
            ("长任务可恢复性", "能定义快照、结构化日志、上下文缓存和 <span class=\"em-brand\">Replay / Rollback / Retry / Edit</span> 机制。"),
            ("产品研究与协作", "可完成用户访谈、PRD、验收指标、A/B 测试，并在产品与算法之间做 <span class=\"em-brand\">能力转译</span>。"),
            ("工具与实作", "Python、JSON Schema、SQL、GitHub、Figma、Notion 与飞书；能用 <span class=\"em-brand\">可运行原型和自动检查</span> 加速产品验证。"),
        ],
        "convictions": [
            ("证据优先", "Agent 结果不能只看最终文本；需同时保留 <span class=\"hl\">轨迹、中间证据与工具状态</span>。"),
            ("恢复即产品", "长任务不可避免地会失败；快照、回放和局部重试应从需求阶段设计。"),
            ("评测驱动迭代", "把 badcase 反馈到提示词、Agent 策略和 SFT 数据，形成 <span class=\"hl\">可对比版本闭环</span>。"),
        ],
        "deliverables": [
            ("8+ 诊断文档", "支持提示词迭代、失败归因与 SFT 数据选择。"),
            ("10+ 维 Rubric", "覆盖完整性、准确性、一致性、指令遵循与格式稳定性。"),
            ("4 类恢复机制", "Replay、Rollback、Retry 与 Edit，配合快照、日志与阶段触发。"),
        ],
    },
    "general": {
        "filename": "zhang-jingyuan-general-ai-pm",
        "role": "AI 产品经理",
        "description": "张靖远的通用 AI 产品经理简历，聚焦用户研究、AI 能力转译、产品增长和跨团队落地。",
        "keywords": "AI 产品经理,用户研究,产品增长,A/B 测试,AI SaaS",
        "metrics": [("30,000+", "产品注册用户"), ("23%→61%", "新用户 7 日留存"), ("20+", "开发者与创作者访谈"), ("3项", "2025 年创新赛一等奖")],
        "summary": "兼具 AI 产品、Agent 评测和数字媒体技术背景。擅长从用户任务出发，把模型能力转换为明确的流程、交互、验收信号与增长指标；已在 AI 游戏生成 SaaS 中完成从 <span class=\"hl\">用户研究到留存提升</span> 的完整产品实践。",
        "timeline": [("2024", "技术与场景基础", "从数字媒体、游戏引擎与生成式编程理解用户创作流程。"), ("2025", "用户问题驱动", "通过 20+ 用户访谈将首用门槛、不可控生成和修改断裂转为产品优先级。"), ("2025", "数据与评测闭环", "用埋点指标、A/B 测试与自动评测同时衡量用户价值和模型质量。")],
        "projects": [],
        "supplementary": [],
        "skills": [
            ("用户研究与定义", "通过访谈、问题分类和任务流程，把需求转换为 <span class=\"em-brand\">产品模块与验收信号</span>。"),
            ("AI 能力转译", "可在单模型、模板方案和多 Agent 之间比较 <span class=\"em-brand\">可控性、成本与扩展性</span>。"),
            ("指标与增长", "有转化漏斗、留存、A/B 测试和反馈机制实践，能将方案对齐到 <span class=\"em-brand\">可观测业务结果</span>。"),
            ("跨团队落地", "能编写 PRD、产品架构、竞品与商业模型分析，并协同算法、开发和设计完成 <span class=\"em-brand\">端到端交付</span>。"),
            ("产品表达", "能用产品架构、Demo 叙事、路演材料和技术长文将复杂 AI 系统转换为 <span class=\"em-brand\">可理解决策信息</span>。"),
        ],
        "convictions": [
            ("先完成首次价值", "优先降低从注册到首次可用结果的摩擦，再扩展功能广度。"),
            ("用户与模型双指标", "留存和转化衡量价值，完整性、一致性与指令遵循衡量 <span class=\"hl\">生成质量</span>。"),
            ("安全边界是产品边界", "在求职工具中保留人工确认，不设计自动投递或平台绕过。"),
        ],
        "deliverables": [
            ("20+ 用户访谈", "形成首用门槛、生成可控性、修改连续性与成功反馈问题树。"),
            ("4 类核心模块", "首次生成、二次编辑、局部修改与结果预览的 PRD 输入。"),
            ("路演与商业分析", "完成竞品、商业模型、产品架构和 Demo 叙事，支持多项创新竞赛。"),
        ],
    },
    "technical": {
        "filename": "zhang-jingyuan-ai-technical-pm",
        "role": "AI 产品技术经理",
        "description": "张靖远的 AI 产品技术经理简历，聚焦评测自动化、数据架构、RAG、视觉 AI 与 Web 3D 产品落地。",
        "keywords": "AI 产品技术经理,Python,JSON Schema,RAG,评测自动化",
        "metrics": [("200+", "并行任务实例"), ("30%", "自动评测耗时缩短"), ("70%", "人工评测工作量降低"), ("2项", "软件著作权")],
        "summary": "能在产品定义与技术实现之间建立可执行边界的 AI 产品候选人。有 Python 自动化、JSON Schema、异步任务、RAG、YOLOv8、SVM / Random Forest 与 Three.js / WebGL 经验，关注 <span class=\"hl\">数据结构、可验证性和系统恢复能力</span>。",
        "timeline": [("2024", "建立技术广度", "从 Java、Web、游戏引擎、Blender 和生成式编程理解交互系统。"), ("2025", "独立定义数据系统", "用媒体资源本体、元数据、版权溯源和 RAG 设计可审计资产管理产品。"), ("2025", "进入评测工程", "用自动检查、异步队列和结构化日志连接产品验收与模型迭代。")],
        "projects": [],
        "supplementary": [],
        "skills": [
            ("评测自动化", "使用 Python、异步执行和任务队列搭建图像完整性与语义一致性检查，支持 <span class=\"em-brand\">200+ 并行任务</span>。"),
            ("数据与接口建模", "能用 JSON Schema 约束输入、轨迹、证据、评分和反馈，并设计 <span class=\"em-brand\">可审计元数据模型</span>。"),
            ("AI / 数字媒体技术", "了解 RAG、YOLOv8、SVM、Random Forest、Three.js / WebGL 与 Blender，能做 <span class=\"em-brand\">技术方案取舍</span>。"),
            ("产品与工程协同", "能把用户流程转为模块、数据、验收和失败处理要求，与算法和开发共建 <span class=\"em-brand\">可运行系统</span>。"),
            ("开发与协作工具", "Python、SQL、Java、HTML / CSS / JavaScript、GitHub、Figma、Stitch、Notion 与飞书，可完成 <span class=\"em-brand\">原型到验收</span>。"),
        ],
        "convictions": [
            ("先定义 Schema", "输入、轨迹、证据和反馈结构稳定后，自动化才能可比较、可回归。"),
            ("人与 AI 明确分工", "人负责范围、取舍和风险；AI 在约束内生成、分类、修复与验证。"),
            ("可恢复性优先", "与其追求一次生成成功，更应设计 <span class=\"hl\">可定位、可重试、可回滚</span> 的系统。"),
        ],
        "deliverables": [
            ("Python 自动检查", "图像完整性、语义一致性、异步执行与任务队列集成。"),
            ("2 项软件著作权", "独立数据管理系统，以及视觉 AI 与 3D 商品设计系统。"),
            ("可运行 Agent Notebook", "覆盖 Reflection、ReAct、Planning、Memory、Multi-Agent、PEV 和 verifier loop。"),
        ],
    },
}


DEEPWISDOM = (
    "DeepWisdom Agent Evaluation Harness", "Agent 评测与自动化", "核心共建",
    "面向多 Agent 和多模态场景，负责评测数据模型、自动检查与长任务恢复需求。",
    "定义 Task / Run / Trace / Evidence / Rubric / Judge 等对象；实现 Python 图像完整性与语义一致性检查，接入异步队列和 JSON Schema 规则。",
    "支持 <span class=\"hl\">200+ 并行任务</span>，评测耗时缩短 30%，人工评测工作量降低 <span class=\"hl\">70%</span>，并产出 8+ 诊断文档。"
)

FUNLOOM = (
    "FunloomAI", "AI 游戏生成 SaaS", "产品方案负责",
    "负责“自然语言到可玩游戏原型”的产品架构、用户研究、模型能力需求和核心流程优化。",
    "完成 20+ 用户访谈，建立问题分类；比较单 LLM、模板和多 Agent 方案，输出首次生成、二次编辑、局部修改和结果预览的 PRD 与验收信号。",
    "通过引导流程、入口优化和 A/B 反馈机制，新用户 7 日留存从 <span class=\"hl\">23% 提升至 61%</span>，支撑 <span class=\"hl\">30,000+ 注册用户</span>。"
)

MEDIA = (
    "数字媒体数据集成与管理系统", "RAG 与数据产品", "独立设计 / 著作权人",
    "针对图像、音频、文本与 3D 资产分散、来源难追溯和复用低效问题，独立定义系统。",
    "设计文件类型、来源、标签、项目归属、版权与更新历史的资源本体；规划 RAG 检索、证据链、使用语境摘要和素材包推荐流程。",
    "完成导入、标注、权利跟踪、检索、推荐和复用报告模块设计，获软件著作权 <span class=\"hl\">2025SR0148410</span>。"
)

PEARL = (
    "智能珍珠光泽评估与 3D 商品设计系统", "视觉 AI 产品", "产品与技术负责",
    "针对人工光泽评估主观、效率低且难支撑定价的问题，定义从采集到交易支持的产品。",
    "设计标准化拍摄、档案管理、光泽评分、瑕疵检测、质量报告和 3D 展示流程；协调 SVM / Random Forest、YOLOv8 与 Blender / Three.js 方案。",
    "完成产品架构、竞品、商业模型与路演材料，获软件著作权 <span class=\"hl\">2025SR1196543</span>，支撑多项创新类竞赛。"
)

VARIANTS["general"]["projects"] = [FUNLOOM, DEEPWISDOM, PEARL]
VARIANTS["general"]["supplementary"] = [
    ("数字媒体数据管理系统", "独立定义媒体资源本体、版权溯源与 RAG 检索推荐流程，获软件著作权。"),
    ("开源与技术写作", "持续研究 Agent 规划、记忆、工具调用和评测，并开发 RSS 阅读、长文排版与 AI 求职工具。"),
]

VARIANTS["technical"]["projects"] = [DEEPWISDOM, MEDIA, PEARL]
VARIANTS["technical"]["supplementary"] = [
    ("FunloomAI", "将自然语言到游戏原型拆分为意图、规划、代码/素材生成、预览验证和局部编辑，平衡可控性与扩展性。"),
    ("Agent 架构实作", "实现 Reflection、ReAct、Planning、Memory、Multi-Agent、PEV 与 verifier loop，用可运行 Notebook 验证架构决策。"),
]

VARIANTS["agent"]["projects"].append(MEDIA)
VARIANTS["general"]["projects"].append(MEDIA)
VARIANTS["technical"]["projects"].append(FUNLOOM)
