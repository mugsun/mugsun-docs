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

## 部署

### GitHub Pages（当前）

推送 `main` 后由 Actions 自动构建并发布。

- 临时地址：<https://mugsun.github.io/mugsun-docs/>
- 构建：`npm ci` → `DOCS_BASE=/mugsun-docs/ npm run docs:build`
- 产物：`.vitepress/dist`
- 工作流：`.github/workflows/deploy-docs.yml`

本地若要模拟项目页路径：

```bash
DOCS_BASE=/mugsun-docs/ npm run docs:build && npm run docs:preview
```

### 自定义域 docs.mugsun.com

域名目前不在本 Cloudflare 账号 DNS 里时，在**域名注册商**（或实际 DNS 面板）添加：

| 类型 | 主机记录 | 值 |
| --- | --- | --- |
| CNAME | `docs` | `mugsun.github.io` |

并在仓库 Settings → Pages → Custom domain 填入 `docs.mugsun.com`，按 GitHub 提示加 TXT 校验。  
若自定义域指向站点根路径，把工作流里的 `DOCS_BASE` 改为 `/` 后重新部署。

### Cloudflare Pages（备选）

| 项 | 值 |
| --- | --- |
| Build command | `npm run docs:build` |
| Build output directory | `.vitepress/dist` |
| Root | 仓库根 |
| `DOCS_BASE` | 若挂在域名根用 `/`；子路径则设对应前缀 |

## 范围

第一期：脚手架、首页三条路径、导航、中英空壳页。各仓完整手册不在本 PR 灌入。

## License

MIT · mugsun
