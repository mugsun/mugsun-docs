# mugsun-docs

[![Docs CI](https://github.com/mugsun/mugsun-docs/actions/workflows/docs-ci.yml/badge.svg?branch=main)](https://github.com/mugsun/mugsun-docs/actions/workflows/docs-ci.yml)
[![Deploy docs](https://github.com/mugsun/mugsun-docs/actions/workflows/deploy-docs.yml/badge.svg?branch=main)](https://github.com/mugsun/mugsun-docs/actions/workflows/deploy-docs.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

mugsun 文档站 [docs.mugsun.com](https://docs.mugsun.com/) 的源码，用 VitePress 构建。

中文页面在根路径，英文页面在 `/en/`，两边的页面一一对应。

## 本地预览

需要 Node.js 22 和 pnpm 11。

```bash
git clone https://github.com/mugsun/mugsun-docs.git && cd mugsun-docs
pnpm install --frozen-lockfile
pnpm run docs:dev
```

浏览器打开 <http://localhost:5173>。保存改动后页面会自动刷新。

启动时不要加 `--host`，开发服务器不应该暴露到网络上。

## 有哪些内容

| 路径 | 内容 |
| --- | --- |
| `guide/` | 介绍、快速开始和架构，还有常见问题和升级说明 |
| `boot/` | 后端的配置、功能和教程 |
| `pc/` | 管理后台的开发和部署 |
| `track/` | 埋点 SDK 的接入、插件和隐私说明 |
| `core/` `start/` `uniappx/` | 公共库、项目生成器和 uni-app x 组件库 |
| `en/` | 上面所有页面的英文版，路径相同 |
| `.vitepress/config/` | 站点配置。中文导航在 `zh.ts`，英文导航在 `en.ts` |
| `public/` | 图片和品牌素材。`public/readme/` 是各仓库 README 用的截图 |
| `docs/STYLE.md` | 写作规范 |

## 修改文档

1. 改页面前先读[写作规范](./docs/STYLE.md)。
2. 中文页和 `en/` 下的同名页一起改，结构保持一致。
3. 新增页面时，在 `zh.ts` 和 `en.ts` 里各加一条导航。
4. 命令、端口和配置项要对照各仓库 `main` 分支的源码核对。
5. 在 `CHANGELOG.md` 的 `[Unreleased]` 下加一行说明。

提交前在本地构建一次。站内有死链时，构建会直接报错：

```bash
pnpm run docs:build
```

CI 还会检查中文段落的长度。一段不能超过 80 个字，并且要写在同一行里。

## 部署

推送到 `main` 后，工作流 `deploy-docs.yml` 会构建站点，并发布到 GitHub Pages。

站点的 `base` 由环境变量 `DOCS_BASE` 决定，默认是 `/`，适合挂在域名根路径的站点。

要部署到子路径，构建时改这个变量：

```bash
DOCS_BASE=/mugsun-docs/ pnpm run docs:build
```

构建结果在 `.vitepress/dist`，可以放到任何静态服务器上。

`pnpm run docs:preview` 可以在本地查看构建结果。

<details>
<summary>线上站点的设置</summary>

| 项 | 值 |
| --- | --- |
| 域名 | `docs.mugsun.com` |
| DNS | `docs` 的 CNAME 指向 `mugsun.github.io` |
| 构建用的 Node.js | 22 |
| `DOCS_BASE` | `/` |

换用 Cloudflare Pages 时，构建命令填 `pnpm run docs:build`，输出目录填 `.vitepress/dist`。

</details>

## 相关仓库

| 仓库 | 说明 |
| --- | --- |
| [mugsun-boot](https://github.com/mugsun/mugsun-boot) | 后端 |
| [mugsun-pc](https://github.com/mugsun/mugsun-pc) | 管理后台 |
| [mugsun-track](https://github.com/mugsun/mugsun-track) | 浏览器埋点 SDK |
| [mugsun-core](https://github.com/mugsun/mugsun-core) | 后端的公共库 |

## 参与贡献

提交前请读[贡献指南](./CONTRIBUTING.md)。发现文档和实际行为不一致，可以直接开 Issue。

## 许可

MIT，见 [LICENSE](./LICENSE)。品牌字体的许可见 `public/brand/LICENSE-Saira-OFL.txt`。

## English

This is the source of [docs.mugsun.com](https://docs.mugsun.com/en/), built with VitePress. Chinese pages live at the root and English pages under `en/`, one for one.

```bash
pnpm install --frozen-lockfile
pnpm run docs:dev
```

Pushing to `main` deploys the site to GitHub Pages. When you change a page, change its counterpart in the other language in the same commit.
