# mugsun-docs

[![GitHub](https://img.shields.io/badge/GitHub-mugsun%2Fmugsun--docs-181717?logo=github)](https://github.com/mugsun/mugsun-docs)

mugsun 文档站（[VitePress](https://vitepress.dev/)）。**默认中文**，英文在 `/en/`。计划部署：Cloudflare Pages · 建议域名 `docs.mugsun.com`。

品牌资源来自定稿 **logo kit v18**（Saira OFL，见 `public/brand/LICENSE-Saira-OFL.txt`）。

## 本地预览

```bash
pnpm install   # 或 npm install
pnpm docs:dev  # http://localhost:5173
```

构建：

```bash
pnpm docs:build
# 产物目录：.vitepress/dist
pnpm docs:preview
```

## Cloudflare Pages

| 项 | 值 |
| --- | --- |
| Framework preset | VitePress（或 None） |
| Build command | `npm run docs:build` / `pnpm docs:build` |
| Build output directory | `.vitepress/dist` |
| Root | 仓库根 |

自定义域建议：`docs.mugsun.com`（在 Cloudflare 绑定 Pages 项目）。

## 范围

第一期：脚手架、首页三条路径、导航、中英空壳页。各仓完整手册不在本 PR 灌入。

## License

MIT · mugsun
