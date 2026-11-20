# 项目生成器

[mugsun-start](https://github.com/mugsun/mugsun-start) 是 mugsun 的项目生成器，基于 Spring Initializr。选好工程类型和可选模块后，它生成一个工程压缩包供下载。

::: warning 还在开发中
`/starter.zip` 现在输出的是通用的 Spring Boot 骨架，还没有接入 mugsun 的模板。

`start.mugsun.com` 也还没有部署，只能在本机运行。现在要用 mugsun，请看[快速开始](/guide/getting-started)。
:::

![向导页面](/readme/start-wizard.png)

上图是向导页面在本机运行的样子，页面里的内容来自前端内置的模拟数据。

## 在本机运行

<div class="ms-steps">

### 启动生成服务

后端在 `server/` 目录，需要 JDK 21。

```bash
git clone https://github.com/mugsun/mugsun-start.git && cd mugsun-start/server
./mvnw spring-boot:run
```

服务监听 8090 端口，可以用环境变量 `MUGSUN_START_PORT` 修改。

### 下载一个工程

```bash
curl -o demo.zip 'localhost:8090/starter.zip?type=mugsun-backend'
```

### 打开向导页面

向导页面在 `web/` 目录，需要 Node.js 22 和 pnpm 11。

```bash
cd mugsun-start/web
pnpm install
pnpm dev
```

浏览器打开 <http://localhost:3093>。这时页面用的是内置的模拟数据，不需要启动后端。

</div>

要让向导页面连接本机的后端，在 `web/.env.local` 里写上 `VITE_API_BASE=http://localhost:8090`，再重新运行 `pnpm dev`。

## 可以选什么

| 选项 | 取值 |
| --- | --- |
| 工程类型 | 仅后端 `mugsun-backend`，前后端 `mugsun-fullstack` |
| 可选模块 | GIS `gis`，埋点 `track`，AI `ai` |
| 数据库 | 目前只有 PostgreSQL |

系统管理、认证与安全这些常驻模块不能去掉，请求里传了也会被忽略。

## 接口

| 接口 | 说明 |
| --- | --- |
| `GET /metadata/client` | 标准的 Initializr 元数据，IDE 和 curl 可以直接使用 |
| `GET /api/v1/metadata` | 向导页面用的元数据 |
| `POST /api/v1/preview` | 按所选内容返回工程的目录树 |
| `GET /starter.zip`、`POST /starter.zip` | 生成并下载工程压缩包 |

读取标准元数据时要带上 `Accept` 请求头：

```bash
curl -s localhost:8090/metadata/client -H 'Accept: application/vnd.initializr.v2.2+json'
```

同时进行的生成任务有数量上限，超出时返回 429 和 `Retry-After`。

## 构建向导页面

执行 `pnpm build` 时，必须设置下面两个变量中的一个，否则构建直接失败。

| 变量 | 说明 |
| --- | --- |
| `VITE_API_BASE` | 后端地址。前后端同源部署时设为 `/`，跨域时填完整地址 |
| `VITE_USE_MOCK` | 设为 `1` 时构建使用模拟数据的演示版，优先于 `VITE_API_BASE` |

这两个变量在构建时写进产物，构建完成后再修改不会生效，需要重新构建。

它们可以写在 `web/.env.production.local` 里，格式见 `web/.env.example`。

## 目前的限制

- 生成的压缩包还是通用的 Spring Boot 骨架，里面没有 mugsun 的代码。
- 没有线上站点，`start.mugsun.com` 还没有部署。
- 数据库只能选 PostgreSQL。

## 下一步

<div class="ms-cards">

- [快速开始](/guide/getting-started) 用 Docker 启动整套系统，现在要用 mugsun 从这里开始。
- [后端概述](/boot/) 生成的工程将以 mugsun-boot 的发布版本为模板。

</div>
