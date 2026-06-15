# 张靖远个人作品集

静态中文个人网站，无构建步骤，可直接部署到 Vercel、Netlify 或 GitHub Pages。

## 本地预览

```powershell
python -m http.server 4173
```

访问 `http://127.0.0.1:4173/`。

## 替换个人照片

当前首页使用 `assets/portrait.png` 漫画头像。替换时保持相同文件名即可，推荐 4:5 竖版构图。

## 部署

- Vercel：将本目录作为项目根目录导入，无需构建命令。
- GitHub Pages：上传全部文件，并保留 `.nojekyll`。
- 绑定域名后，再补充 canonical URL、Open Graph 图片和 `sitemap.xml`。
