from html import escape
from pathlib import Path

from content import COMMON, VARIANTS


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = Path.home() / ".agents" / "skills" / "kami" / "assets" / "templates" / "resume.html"
OUT = ROOT / "rendered"


def metric_html(metrics):
    return "\n".join(
        f'<div class="metric"><span class="metric-value serif">{value}</span><span class="metric-label">{label}</span></div>'
        for value, label in metrics
    )


def timeline_html(items):
    return "\n".join(
        f'''<div class="tl-step">
          <div class="tl-top"><div class="tl-year serif">{year}</div><div class="tl-head">{head}</div></div>
          <div class="tl-body">{body}</div>
        </div>'''
        for year, head, body in items
    )


def project_html(item):
    name, kind, role, role_text, action, impact = item
    return f'''<div class="project">
      <div class="proj-head">
        <span class="proj-name serif">{name}</span>
        <span class="proj-kind">· {kind}</span>
        <span class="proj-role">{role}</span>
      </div>
      <div class="proj-lines">
        <div class="proj-row"><div class="proj-label">角色</div><div class="proj-text">{role_text}</div></div>
        <div class="proj-row"><div class="proj-label">动作</div><div class="proj-text">{action}</div></div>
        <div class="proj-row"><div class="proj-label">结果</div><div class="proj-text">{impact}</div></div>
      </div>
    </div>'''


def supplementary_html(items):
    return "\n".join(
        f'''<div class="os-item">
          <span class="os-name serif">{name}</span>
          <span class="os-desc">{desc}</span>
        </div>'''
        for name, desc in items
    )


def skills_html(items):
    return "\n".join(
        f'<div class="skill-row"><div class="skill-label">{label}</div><div class="skill-body">{body}</div></div>'
        for label, body in items
    )


def convictions_html(items):
    return "\n".join(
        f'''<div class="conv-card">
          <div class="conv-head">{title}</div>
          <div class="conv-body">{body}</div>
        </div>'''
        for title, body in items
    )


def awards_html():
    return "\n".join(
        f'<div class="skill-row"><div class="skill-label">{award[:4]}</div><div class="skill-body">{award[5:]}</div></div>'
        for award in COMMON["awards"]
    )


def build_body(data):
    return f'''<body>
<div class="header">
  <div><div class="name serif">{COMMON["name"]}<span class="alias">{COMMON["alias"]}</span></div></div>
  <div class="contact">
    <span class="role">{data["role"]}</span><br>
    <a href="{COMMON["github_url"]}">GitHub @{COMMON["github_id"]}</a><span class="sep">·</span>
    <a href="{COMMON["x_url"]}">X @{COMMON["x_id"]}</a><span class="sep">·</span>
    <a href="tel:{COMMON["phone"]}">{COMMON["phone"]}</a><span class="sep">·</span>
    <a href="mailto:{COMMON["email"]}">{COMMON["email"]}</a><span class="sep">·</span>
    <span class="loc">{COMMON["location"]}</span>
  </div>
</div>

<div class="metrics">{metric_html(data["metrics"])}</div>

<section>
  <div class="section-title">个人简介</div>
  <div class="summary">{data["summary"]}</div>
</section>

<section>
  <div class="section-title">核心经历<span class="sub">2024 - 至今 · 从 AI 机制到产品与评测闭环</span></div>
  <div class="timeline">{timeline_html(data["timeline"])}</div>
  {''.join(project_html(item) for item in data["projects"])}
</section>

<section>
  <div class="section-title">代表性产出</div>
  <div class="convictions">{convictions_html(data["deliverables"])}</div>
</section>

<section class="page-break">
  <div class="section-title">补充项目<span class="sub">独立产品 · 开源实践 · 技术写作</span></div>
  <div class="os-grid">{supplementary_html(data["supplementary"])}</div>
  <div class="os-highlight"><span class="tag">持续输出</span>在 X @Potatoloogs 与微信公众号“Ajar”长期写作，聚焦 Agent 工具调用、规划、记忆、上下文工程和评测体系；代表主题包括“AI 评测系统”与“LLM 记忆架构比较”。</div>
</section>

<section>
  <div class="section-title">代表性技术写作<span class="sub">Agent 评测 · 记忆与上下文工程</span></div>
  <div class="os-grid">
    <div class="os-item"><span class="os-name serif">评测体系</span><span class="os-desc">《AI 评测系统：从数据集到生产反馈闭环》，拆解 Task、Dataset、Run、Trace、Evidence、Rubric、Judge 与 Report。</span></div>
    <div class="os-item"><span class="os-name serif">记忆系统</span><span class="os-desc">《LLM 记忆系统技术分析》，比较 ChatGPT、Claude 与 Gemini 的记忆架构、上下文管理和产品取舍。</span></div>
  </div>
</section>

<section>
  <div class="section-title">AI 产品判断</div>
  <div class="convictions">{convictions_html(data["convictions"])}</div>
</section>

<section>
  <div class="section-title">核心能力</div>
  {skills_html(data["skills"])}
</section>

<section>
  <div class="section-title">奖项与认可</div>
  {awards_html()}
</section>

<section class="no-break">
  <div class="section-title">教育背景</div>
  <div class="edu-row">
    <div><span class="school serif">北京邮电大学</span><span class="major">　· {COMMON["education"].split(' · ', 1)[1]}</span></div>
    <div class="date">{COMMON["education_date"]}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">相关课程</div>
    <div class="skill-body">Web 技术基础 97 · 数据科学数学基础 93 · Java 程序设计 91 · Design &amp; Build Project I/II 90/90 · 生成式创意编程 89 · 游戏引擎基础 89</div>
  </div>
</section>
</body>'''


def generate(key, data, template):
    head, _ = template.split("</head>", 1)
    head += "</head>\n"
    head = head.replace("{{姓名}} · 简历", f'{COMMON["name"]} · {data["role"]}简历')
    head = head.replace('content="{{姓名}}"', f'content="{COMMON["name"]}"')
    head = head.replace('content="{{摘要}}"', f'content="{escape(data["description"], quote=True)}"')
    head = head.replace('content="{{关键词}}"', f'content="{escape(data["keywords"], quote=True)}"')
    html = head + build_body(data) + "\n</html>\n"
    path = OUT / f'{data["filename"]}.html'
    path.write_text(html, encoding="utf-8")
    print(f"generated {key}: {path}")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    template = TEMPLATE.read_text(encoding="utf-8")
    for key, data in VARIANTS.items():
        generate(key, data, template)


if __name__ == "__main__":
    main()
