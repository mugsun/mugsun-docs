# 项目生成器

mugsun-start 是 mugsun 的项目生成器，基于 Spring Initializr 0.23.0。

选择工程类型和可选模块后，它会生成一个工程压缩包供下载。

::: warning
目前 `/starter.zip` 输出的仍是通用的 Spring Boot 骨架，还没有接入 mugsun 模板。接入 mugsun 模板后，本页会更新。
:::

## 可选项

工程类型有两种：仅后端（`mugsun-backend`）和前后端（`mugsun-fullstack`）。

可选模块有 GIS（`gis`）、埋点（`track`）和 AI（`ai`）。系统管理、认证与安全等常驻模块不能去掉，请求里传了也会被忽略。

## 本地运行

后端在 `server/` 目录，需要 JDK 21：

```bash
git clone https://github.com/mugsun/mugsun-start.git && cd mugsun-start/server
./mvnw spring-boot:run
curl -o demo.zip 'localhost:8080/starter.zip?type=mugsun-backend'
```

后端默认端口为 8080，可以用环境变量 `MUGSUN_START_PORT` 修改。

前端向导在 `web/` 目录，需要 Node.js 22 和 pnpm 11：

```bash
cd mugsun-start/web
pnpm install
pnpm dev
```

浏览器打开 <http://localhost:3093>。本地开发时没有设置 `VITE_API_BASE` 就使用内置的 mock 数据，设置后连接真实后端。

## 生产构建

任何构建（`pnpm build`，包括 `--mode staging`）都必须设置下面两个变量中的一个，否则构建直接失败。

| 变量 | 说明 |
| --- | --- |
| `VITE_API_BASE` | 后端地址。前后端同源部署时设为 `/`，跨域时填完整地址 |
| `VITE_USE_MOCK` | 设为 `1` 时构建使用内置 mock 数据的演示版，优先于 `VITE_API_BASE` |

这两个变量在构建时写进产物，构建完成后再修改不会生效，需要重新构建。

这两个变量可以写在 `web/.env.production.local` 里，格式见 `web/.env.example`。
