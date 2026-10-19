# 管理台概述

[mugsun-pc](https://github.com/mugsun/mugsun-pc) 是 mugsun 的管理后台，自带系统管理页面，GIS、埋点看板和 AI 管理页可以按需开启。

## 本地启动

需要 Node.js 22.13 以上和 pnpm 11.11 以上，后端 [boot](/boot/) 先在 8080 端口启动：

```bash
pnpm setup:sdk   # 构建同级目录的 mugsun-track
pnpm install
pnpm dev         # 打开 http://localhost:3006
```

开发时 `/api` 请求转发到 `http://localhost:8080`。

要改这个地址，编辑 `.env.development` 里的 `VITE_API_PROXY_URL`。

![用户管理（示例数据）](/screenshots/pc-system-users.png)

## 目录

```text
mugsun-pc/
  src/             # 路由、登录鉴权、系统管理页面、接口封装
  modules/
    gis/           # 可选：图层、场景、空间分析
    track/         # 可选：埋点接入管理与分析看板
    ai/            # 可选：模型、对话、知识库、MCP 管理
```

## 关闭可选模块

在 `.env` 里把对应变量改成 `false`，构建时就不注册这个模块的路由：

```ini
VITE_ENABLE_GIS = true
VITE_ENABLE_TRACK = true
VITE_ENABLE_AI = true
```

关闭后可以删掉对应的 `modules/` 目录。关闭埋点后不需要运行 `pnpm setup:sdk`，但同级的 `mugsun-track` 目录仍须存在，`pnpm install` 要解析它。

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

## 权限和接口类型

菜单、按钮权限码和用户信息都来自后端 `/api/auth/info` 接口，前端不另存权限数据。

接口类型从后端 OpenAPI 文档生成：

```bash
pnpm gen:api   # 读取 http://localhost:8080/v3/api-docs
```

## 许可

MIT。界面部分衍生自 [art-design-pro](https://github.com/Daymychen/art-design-pro)（MIT），分发时需要保留 `NOTICE` 文件。

## 下一步

- [本地开发](/pc/development)
- [GIS 与地图](/pc/gis)
- [Docker 部署](/pc/deploy-docker)
