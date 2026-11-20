# 管理后台概述

[mugsun-pc](https://github.com/mugsun/mugsun-pc) 是 mugsun 的管理后台，用 Vue 3 和 Element Plus 编写，接口都来自[后端](/boot/)。

系统管理的页面都已经做好。GIS、埋点看板和 AI 管理页是三个可选模块，构建时可以关掉。

![埋点分析里的数据概览页](/readme/track-overview.png)

## 从哪里开始

<div class="ms-cards">

- [本地开发](/pc/development) 启动命令、常用脚本和新增页面的流程。
- [工作台](/pc/workbench) 工作台上各张卡片的含义，以及几处界面细节。
- [GIS 与地图](/pc/gis) 「地理信息」菜单下的地图、图层和场景。
- [Docker 部署](/pc/deploy-docker) 用自带的 Nginx 镜像部署，并把 `/api` 转发到后端。

</div>

## 启动

需要 Node.js 22.13+ 和 pnpm 11.11+。[后端](/boot/)要先在 8080 端口启动。

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
pnpm dev
```

浏览器会自动打开 <http://localhost:3006>。用 `admin` 和启动后端时设置的初始口令登录。

开发时 `/api` 请求转发到 `http://localhost:8080`。要换地址，改 `.env.development` 里的 `VITE_API_PROXY_URL`。

只想看效果时不需要安装 Node.js，[快速开始](/guide/getting-started)里的 Docker 命令会把管理后台一起启动。

## 有哪些页面

| 菜单 | 页面 |
| --- | --- |
| 系统管理 | 用户、角色和菜单，字典、参数和行政区划，各类日志和服务监控 |
| [工作流](/boot/features/workflow) | 流程设计、审批中心和待办工作台 |
| [低代码](/boot/codegen/) | 代码生成、动态建表和表单设计 |
| [租户运营](/boot/tenant/) | 租户、套餐和租户数据源 |
| [开放平台](/boot/open-api) | API 密钥、OAuth 客户端和调用日志 |
| [埋点分析](/track/)（可选） | 数据概览、漏斗和留存，性能分析、错误监控和会话回放 |
| [地理信息](/pc/gis)（可选） | 地图、图层和场景。二维用 OpenLayers，三维用 Cesium |
| [AI 中心](/pc/ai-center)（可选） | 大模型配置、知识库和对话记录 |

界面有中文和英文，有亮色和暗色两套主题。下图是地理信息里的地图页。

![地理信息的地图页](/readme/gis-map.png)

## 关闭可选模块

三个开关在 `.env` 里，默认都是 `true`：

```ini
VITE_ENABLE_GIS = true
VITE_ENABLE_TRACK = true
VITE_ENABLE_AI = true
```

改成 `false` 后重新构建，这个模块的路由和插件就不再注册，`modules/` 下对应的目录也可以删掉。

后端也有对应的开关，见[架构](/guide/architecture#模块装配-两层开关)。

## 代码结构

| 目录 | 内容 |
| --- | --- |
| `src/` | 登录鉴权、路由和系统管理页面 |
| `modules/gis/` | 可选，地图、图层和空间分析 |
| `modules/track/` | 可选，埋点接入管理和分析看板 |
| `modules/ai/` | 可选，模型、知识库和对话等管理页 |
| `e2e/` `e2e-ui/` | Playwright 测试 |
| `docker/` | Nginx 配置和 Compose 文件 |

前端不保存权限数据。侧边栏菜单和按钮权限都由后端的 `/auth/info` 接口返回。

接口类型用 `pnpm gen:api` 按后端的 OpenAPI 文档生成，执行时后端要在运行。

## 目前的限制

- 必须配合 mugsun-boot 使用，没有独立的 mock 后端。
- 没有公网演示环境。

## 许可

MIT。界面在 [art-design-pro](https://github.com/Daymychen/art-design-pro)（MIT）的基础上修改，分发时要保留仓库里的 `NOTICE` 文件。

## 下一步

<div class="ms-cards">

- [设计器](/pc/designer) AI 应用编排和流程定义两种设计器的操作方式。
- [UI 自检](/pc/ui-check) 不依赖后端的界面检查，提交前可以先在本地执行。
- [内容安全策略（CSP）](/pc/csp) 怎样开启 CSP，以及当前的策略和已知限制。
- [第一个事件](/track/first-event) 接入埋点 SDK，在看板里看到第一条数据。

</div>
