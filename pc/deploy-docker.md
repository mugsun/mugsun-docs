# Docker 部署（管理台）

mugsun-pc 自带生产镜像：第一阶段用 Node 22 + pnpm 11.28.2 构建，第二阶段用 `nginx:alpine` 托管静态文件并反代后端。镜像约 120MB。

## 构建镜像

埋点 SDK `@mugsun/track-web` 是 `file:../mugsun-track` 依赖，构建时通过命名构建上下文 `track` 传进去，所以 mugsun-track 要和 mugsun-pc 平级克隆：

```bash
cd mugsun-pc
docker build --build-context track=../mugsun-track -t mugsun/pc:latest .
```

构建需要较大的 Node 堆，Dockerfile 默认 `NODE_MAX_OLD_SPACE=6144`（MB）。Docker 可用内存不足 8GB 时请调大 Docker 的内存配额。

## 运行

```bash
docker run -d -p 8088:80 -e MUGSUN_API_UPSTREAM=http://<后端地址>:8080 mugsun/pc:latest
```

| 变量 | 时机 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | 运行时 | `http://mugsun-boot:8080` | 后端地址，不带 `/api`。nginx 把 `/api/xxx` 转发为 `<上游>/xxx`，支持 WebSocket |
| `VITE_API_URL` | 构建时（`--build-arg`） | `/` | 保持 `/` 即同源，换后端只改上面的运行时变量；前后端不同域名时才改成完整地址（后端需配 CORS） |
| `VITE_BASE_URL` | 构建时（`--build-arg`） | `/` | 部署在子目录时改成如 `/admin/` |

## Nginx 行为

- SPA 回退：未知路径返回 `index.html`，刷新深层地址不会 404；`/assets/` 下缺失的文件仍返回 404。
- 缓存：`/assets/*`（文件名带 hash）缓存一年并标记 `immutable`；`index.html` 不缓存，发版后立即生效。
- 压缩：gzip，并优先使用构建产出的 `.gz` 文件。
- 安全响应头：`X-Content-Type-Options`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy`、`Permissions-Policy`、`Cross-Origin-Opener-Policy`。HSTS 请在终结 HTTPS 的网关上开启。
- 健康检查：`GET /healthz` 返回 `ok`，镜像内置 `HEALTHCHECK`。

## 一条命令起全套

`mugsun-pc/docker/compose.pc.yml` 编排了管理台、后端（mugsun-boot 的 Dockerfile）、PostgreSQL（PostGIS + pgvector）和 Redis。四个仓库（mugsun-core、mugsun-boot、mugsun-track、mugsun-pc）平级克隆后：

```bash
cd mugsun-pc
docker compose -f docker/compose.pc.yml up -d --build
```

打开 <http://localhost:8088>。端口可用 `MUGSUN_PC_PORT` 修改。后端的环境变量以 [后端配置](/boot/configuration) 为准，邮件和短信默认是空占位，正式部署请填入真实值并修改数据库密码。
