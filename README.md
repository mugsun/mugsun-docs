![mugsun-docs](https://raw.githubusercontent.com/mugsun/mugsun-docs/main/public/brand/banners/repos/mugsun-docs.png)

# mugsun-docs

[![Site](https://img.shields.io/badge/docs-docs.mugsun.com-3e63dd)](https://docs.mugsun.com/)
[![VitePress](https://img.shields.io/badge/VitePress-1.6-5C6BC0?logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

mugsun 官方文档站。用 [VitePress](https://vitepress.dev/) 构建，**根路径为简体中文**，英文在 `/en/`。线上地址：[https://docs.mugsun.com/](https://docs.mugsun.com/)。

**对外状态**：boot · core · pc · track 免费开源；uni-app x 组件库（包名 ms-ui，源码私有）仅开放文档与 H5 演示，入口 `/uniappx/`（旧 `/ms-ui/` 自动跳转）。

本仓只放文档与站点配置，不包含业务运行时。平台后端、管理台、埋点 SDK 分别在兄弟仓。

## 文档范围

| 路径（中文根） | 英文 | 内容 |
| --- | --- | --- |
| `/guide/` | `/en/guide/` | 介绍、快速开始、架构、FAQ |
| `/boot/` | `/en/boot/` | 后端概述、配置、安全清单 |
| `/pc/` | `/en/pc/` | 管理台概述与本地开发 |
| `/track/` | `/en/track/` | 埋点安装、首事件、隐私 |
| `/core/` | `/en/core/` | BOM / starter 概述 |
| `/demo` | `/en/demo` | 本地演示说明（无公网 Demo 时的替代） |
| `/changelog` | `/en/changelog` | 站点与产品相关更新记录 |

免费开源产品线：`boot` · `core` · `pc` · `track`。`cloud`（微服务）与 `uniappx-ui` 在文中标为规划中 / 商业意向，不写成已交付安装包。

## 本地预览

需要 **Node.js 22+**（与 GitHub Actions 一致）。本仓使用 **pnpm 11.28.2**（`packageManager` 已锁定，`corepack enable` 即可；锁文件 `pnpm-lock.yaml`）。

```bash
git clone https://github.com/mugsun/mugsun-docs.git
cd mugsun-docs
pnpm install --frozen-lockfile
pnpm run docs:dev
# 默认 http://localhost:5173
```

构建与本地预览产物：

```bash
pnpm run docs:build      # 输出 .vitepress/dist
pnpm run docs:preview
```

脚本定义见根目录 `package.json`：`docs:dev` / `docs:build` / `docs:preview`。

## `DOCS_BASE`

站点 `base` 由环境变量 `DOCS_BASE` 控制（见 `.vitepress/config/shared.ts`）：

| 场景 | 值 |
| --- | --- |
| 自定义域根路径（当前线上） | `/`（默认） |
| GitHub Pages 项目子路径 `username.github.io/mugsun-docs/` | `/mugsun-docs/` |

```bash
# 子路径构建示例
DOCS_BASE=/mugsun-docs/ pnpm run docs:build
```

自定义域 [docs.mugsun.com](https://docs.mugsun.com/) 挂在站点根时，**必须**使用 `DOCS_BASE=/`，否则资源与路由会错位。

## 部署

### GitHub Pages（当前）

推送 `main`（或手动 `workflow_dispatch`）后，工作流 [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) 会：

1. `pnpm install --frozen-lockfile`
2. `DOCS_BASE=/ pnpm run docs:build`
3. 上传 `.vitepress/dist` 并部署到 GitHub Pages

| 项 | 值 |
| --- | --- |
| 生产域名 | https://docs.mugsun.com/ |
| DNS | `docs` CNAME → `mugsun.github.io` |
| 仓库 Pages 自定义域 | `docs.mugsun.com` |
| Node | 22 |

临时项目页地址仍可能是 `https://mugsun.github.io/mugsun-docs/`；若只走该子路径，需把工作流里的 `DOCS_BASE` 改成 `/mugsun-docs/`。

### Cloudflare Pages（备选）

| 项 | 值 |
| --- | --- |
| Build command | `pnpm run docs:build` |
| Output | `.vitepress/dist` |
| Root | 仓库根 |
| `DOCS_BASE` | 域名根用 `/`；子路径用对应前缀 |

## 如何贡献文档

1. Fork / clone 本仓，在新分支或直接于 `main` 改 Markdown（团队约定以后文档可直接推 `main`）。
2. **中英文成对**：根目录中文页与 `en/` 下同名路径保持平行（例如 `guide/getting-started.md` ↔ `en/guide/getting-started.md`）。
3. 新增章节时同步改导航：
   - 中文：`.vitepress/config/zh.ts`（`nav` / `sidebar`）
   - 英文：`.vitepress/config/en.ts`
   - 共享：`.vitepress/config/shared.ts`（`title`、`base`、logo、搜索等）
   - 入口拼装：`.vitepress/config/index.ts`（`locales.root` = zh-CN，`locales.en` = en-US）
4. 本地 `pnpm run docs:dev` 核对中英链接与侧栏。
5. 品牌资源在 `public/`（logo、favicon、`public/brand/`）；字体许可见 `public/brand/LICENSE-Saira-OFL.txt`。勿在文案中写个体工商户全称或税号。

目录约定（简化）：

```text
mugsun-docs/
  index.md                 # 中文首页
  guide/ boot/ pc/ track/ core/
  en/                      # 英文镜像
  .vitepress/config/       # shared · zh · en · index
  public/brand/            # logo kit
  .github/workflows/deploy-docs.yml
```

文案要求：写清「是什么 / 怎么起 / 依赖谁」；命令以各产品仓当前 README 为准；没有公网 Demo 就写本地路径，不放失效链接。

## 相关仓库

| 仓库 | 说明 |
| --- | --- |
| [mugsun-boot](https://github.com/mugsun/mugsun-boot) | 单体后端 |
| [mugsun-core](https://github.com/mugsun/mugsun-core) | BOM + starter |
| [mugsun-pc](https://github.com/mugsun/mugsun-pc) | PC 管理台 |
| [mugsun-track](https://github.com/mugsun/mugsun-track) | Web 埋点 SDK |
| [mugsun-app](https://github.com/mugsun/mugsun-app) | 移动端（源码尚未发布） |

站点：[https://docs.mugsun.com/](https://docs.mugsun.com/) · 主页：[https://mugsun.com](https://mugsun.com)

## License

[MIT](LICENSE) · © 2026 北京定旭晨 / mugsun

---

## English (short)

**mugsun-docs** is the VitePress documentation site for the mugsun platform. **Default locale is Chinese** at `/`; English lives under `/en/`. Production URL: [https://docs.mugsun.com/](https://docs.mugsun.com/).

```bash
pnpm install --frozen-lockfile && pnpm run docs:dev
```

Build uses `DOCS_BASE` (default `/` for the custom domain). GitHub Pages deploys from `main` via `.github/workflows/deploy-docs.yml` with Node 22 and `DOCS_BASE=/`. Keep ZH/EN pages and `.vitepress/config/zh.ts` / `en.ts` in sync when contributing. Full details above.
