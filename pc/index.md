# 管理台概述

[mugsun-pc](https://github.com/mugsun/mugsun-pc) 是 mugsun 的管理后台，自带系统管理页面，GIS、埋点看板和 AI 管理页可以按需开启。

## 本地启动

需要 Node.js 22.13 以上和 pnpm 11.11 以上，后端 [boot](/boot/) 先在 8080 端口启动：

```bash
pnpm install
pnpm setup:sdk   # 构建同级目录的 mugsun-track
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

关闭后可以删掉对应的 `modules/` 目录。关闭埋点后不需要运行 `pnpm setup:sdk`。

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
