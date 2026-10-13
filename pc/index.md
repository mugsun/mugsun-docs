# 管理台概述

[mugsun-pc](https://github.com/mugsun/mugsun-pc) 是 mugsun 的管理端：系统管理开箱可用，GIS、埋点看板、AI 管理页作为可选模块装配。

| 项 | 说明 |
| --- | --- |
| 技术栈 | Vue 3.5 · Vite 7 · TypeScript · Element Plus 2.11（按需加载）· Pinia · Vue Router |
| 运行时 | Node.js ≥ 20.19 · pnpm ≥ 8.8（`packageManager` 锁定 `pnpm@11.9.0`） |
| 后端 | [mugsun-boot](/boot/)，开发期 `/api` 代理到 `http://localhost:8080` |
| 版本 | 0.1.0 |
| 许可 | MIT；UI 基座衍生自 [art-design-pro](https://github.com/Daymychen/art-design-pro)（MIT），分发须保留 `NOTICE` |

![工作台](/screenshots/pc-workbench.png)

## 设计要点

- **权限只来自后端。** 侧边栏菜单、按钮权限码与用户信息来自 boot 的 `/api/auth/info` 等接口，前端不维护独立权限模型。
- **模块可拆。** 构建期变量关闭模块后不注册路由与插件，删掉对应目录即可去除源码。
- **类型来自 OpenAPI。** `pnpm gen:api` 从 boot 的 `/v3/api-docs` 生成 `src/types/api/openapi.d.ts`，减少手写类型。
- **首包更轻。** Element Plus 不再全量注册与引入全量 CSS，组件和样式按需加载。
- **凭证不落盘。** token 只存 `sessionStorage`（当前标签页有效），不写入 `localStorage`。

## 目录

```text
mugsun-pc/
  src/                 # 壳层：路由、鉴权、系统管理视图、API 封装
  modules/
    gis/               # 可选：图层、场景、空间分析等
    track/             # 可选：接入管理与分析看板（依赖 @mugsun/track-web）
    ai/                # 可选：模型、对话、知识库、MCP 等管理页
```

## 可选模块开关

| 变量 | 默认 | 作用 |
| --- | --- | --- |
| `VITE_ENABLE_GIS` | 开启 | 注册 GIS 路由与相关别名；关闭后可删除 `modules/gis` |
| `VITE_ENABLE_TRACK` | 开启 | 注册埋点路由与 SDK 插件；关闭后可跳过 `setup:sdk` 并删除 `modules/track` |
| `VITE_ENABLE_AI` | 开启 | 注册 AI 路由与插件；关闭后可删除 `modules/ai` |

## 功能模块一览

以下截图来自本地实际运行的 boot + pc（演示库，数据均为示例），视口 1440×900。

### 系统管理

用户、部门、角色与菜单统一维护；菜单与按钮权限码由后端下发，前端按授权渲染侧边栏。

![用户管理](/screenshots/pc/system-users.png)
![部门管理](/screenshots/pc/system-departments.png)
![角色管理](/screenshots/pc/system-roles.png)
![菜单管理](/screenshots/pc/system-menus.png)

### 低代码

「表单设计」维护表单定义（名称、标识、状态），可进入设计器拖拽字段，设计完成后即可在线填报。

![表单设计](/screenshots/pc/lowcode-forms.png)

### 工作流

流程定义发布后即可发起；审批中心按待办 / 待签 / 我发起 / 已办 / 抄送分栏，运行中的流程可挂起或终止。

![流程定义](/screenshots/pc/workflow-definitions.png)
![审批中心](/screenshots/pc/workflow-approval-center.png)
![运行中的流程](/screenshots/pc/workflow-running.png)

### 监控

服务监控展示 JVM 内存、CPU、线程与请求统计；在线会话支持强制下线（令牌仅显示掩码）；登录日志记录每次登录的方式、终端与结果。

![服务监控](/screenshots/pc/monitor-server.png)
![在线会话](/screenshots/pc/monitor-online-sessions.png)
![登录日志](/screenshots/pc/monitor-login-log.png)

### 开放平台

为第三方系统生成 API 密钥并限定可调用路径；OAuth 客户端支持授权码与客户端凭证两种授权方式。截图中的密钥与客户端编号已替换为占位符。

![API 密钥](/screenshots/pc/open-platform-api-keys.png)
![OAuth 客户端](/screenshots/pc/open-platform-oauth-clients.png)

### 租户

新建租户时一键初始化默认部门、岗位、角色与管理员；租户套餐决定租户可用的功能菜单。

![租户管理](/screenshots/pc/tenant-list.png)
![租户套餐](/screenshots/pc/tenant-packages.png)

## 请求链路

视图与 hooks 经 axios 访问 `/api`，开发期由 Vite 代理至 boot。接口出错时优先展示后端返回的业务消息。管理台自身的埋点经同源 `/api/track/collect` 上报，同样进入 boot 的 track 模块。

## 下一步

[本地开发](/pc/development) · [快速开始](/guide/getting-started)
