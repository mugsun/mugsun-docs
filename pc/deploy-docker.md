# Docker 部署（管理台）

mugsun-pc 自带生产镜像：第一阶段用 Node 22 + pnpm 11.28.2 构建，第二阶段用 `nginxinc/nginx-unprivileged`（非 root，uid 101）托管静态文件并反代后端。基础镜像都固定了 digest。镜像约 120MB。

## 构建镜像

埋点 SDK `@mugsun/track-web` 是 `file:../mugsun-track` 依赖，构建时通过命名构建上下文 `track` 传进去，所以 mugsun-track 要和 mugsun-pc 平级克隆：

```bash
cd mugsun-pc
docker build --build-context track=../mugsun-track -t mugsun/pc:latest .
```

构建需要较大的 Node 堆，Dockerfile 默认 `NODE_MAX_OLD_SPACE=6144`（MB）。Docker 可用内存不足 8GB 时请调大 Docker 的内存配额。

## 运行

```bash
docker run -d -p 8088:8080 -e MUGSUN_API_UPSTREAM=http://<后端地址>:8080 mugsun/pc:latest
```

| 变量 | 时机 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | 运行时 | `http://mugsun-boot:8080` | 后端地址，不带 `/api`。nginx 把 `/api/xxx` 转发为 `<上游>/xxx`，支持 WebSocket |
| `MUGSUN_GATEWAY_CIDRS` | 运行时 | 空 | 前置网关（TLS 终端、负载均衡）所在网段，逗号分隔。只有来自这些地址的 `X-Forwarded-For`、`X-Forwarded-Proto` 才会被采信，见下文「可信代理」 |
| `MUGSUN_CSP_TILE_HOSTS` | 运行时 | 空 | CSP 额外放行的地图瓦片域，空格分隔，如 `https://tile.example.com` |
| `MUGSUN_CSP_TRACK_HOSTS` | 运行时 | 空 | CSP 额外放行的埋点上报域，空格分隔 |
| `VITE_API_URL` | 构建时（`--build-arg`） | `/` | 保持 `/` 即同源，换后端只改上面的运行时变量；前后端不同域名时才改成完整地址（后端需配 CORS） |
| `VITE_BASE_URL` | 构建时（`--build-arg`） | `/` | 部署在子目录时改成如 `/admin/` |

## Nginx 行为

- SPA 回退：未知路径返回 `index.html`，刷新深层地址不会 404；`/assets/` 下缺失的文件仍返回 404。
- 缓存：`/assets/*`（文件名带 hash）缓存一年并标记 `immutable`；`index.html` 不缓存，发版后立即生效。
- 压缩：gzip，并优先使用构建产出的 `.gz` 文件。
- 安全响应头：`X-Content-Type-Options`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy`、`Permissions-Policy`、`Cross-Origin-Opener-Policy`。HSTS 请在终结 HTTPS 的网关上开启。
- 健康检查：`GET /healthz` 返回 `ok`，镜像内置 `HEALTHCHECK`。
- 运行身份：nginx 以非 root 运行，容器内监听 `8080`（宿主机端口自行映射，compose 默认 8088）。
- 隐藏文件：`/.` 开头的路径（如 `/.git/`、`/.env`）一律返回 404，`/.well-known/` 除外。

## 可信代理

后端按客户端 IP 做限流（短信、验证码、登录）和审计。nginx 转发时用 `$remote_addr` **覆盖** `X-Forwarded-For` 和 `X-Real-IP`，不会追加客户端自己带来的值，因此伪造的头不会传到后端。

- compose 网络固定子网 `MUGSUN_COMPOSE_SUBNET`（默认 `172.30.88.0/24`），管理台容器固定 IP `MUGSUN_PC_IP`（默认 `172.30.88.10`），其他容器只从 `MUGSUN_COMPOSE_IP_RANGE`（默认 `172.30.88.128/25`）动态分配。后端的 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 只包含管理台容器这一个 IP，后端才会采信 nginx 传来的客户端 IP。不配置时，所有用户在后端看来都是 nginx 的 IP，按 IP 的限流会变成全站共享。与宿主机网段冲突时，三个变量要一起改。
- 管理台前面还有 TLS 网关或负载均衡时，把网关所在网段写进 `MUGSUN_GATEWAY_CIDRS`。nginx 只对来自这些网段的请求按 `X-Forwarded-For` 还原真实客户端（自右向左取第一个非可信地址），并透传网关的 `X-Forwarded-Proto`；compose 也会把它追加到后端的 `MUGSUN_OPENAPI_TRUSTED_PROXIES`（为空时不追加）。网关必须自己覆盖（而不是追加）`X-Forwarded-For`，或至少保证最右侧是它看到的对端地址。
- `MUGSUN_GATEWAY_CIDRS` 启动时逐项校验：**不能填 `0.0.0.0/0` 或 `::/0`**，IPv4 前缀不能短于 `/8`，IPv6 前缀不能短于 `/32`，地址必须合法。任一项不合格，容器直接拒绝启动。填得过宽等于让任何人都能伪造 IP，绕过限流、污染审计。

::: warning 不要把不可信的容器加入 mugsun 网络
同一网络里的容器可以绕过 nginx 直连后端。后端虽然只信任管理台容器的固定 IP，但网络里的数据库、Redis 也不应暴露给不可信的 sidecar。需要接入其他服务时，另建网络。
:::

```bash
MUGSUN_GATEWAY_CIDRS=10.0.0.0/16,192.168.10.5/32
```

## 内容安全策略（CSP）

目前以 `Content-Security-Policy-Report-Only` 下发：浏览器只在控制台报告违规、不拦截。确认管理台各页面（尤其地图、表单设计器、埋点）没有违规后，再把 `security-headers.inc.template` 里的头名改为 `Content-Security-Policy`。

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: <MUGSUN_CSP_TILE_HOSTS>;
connect-src 'self' <MUGSUN_CSP_TILE_HOSTS> <MUGSUN_CSP_TRACK_HOSTS>;
font-src 'self' data:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'
```

- 不包含 `unsafe-eval`。`style-src 'unsafe-inline'` 是 Element Plus 运行时内联样式所需；`worker-src blob:` 是 Cesium 所需。
- 地图瓦片（天地图、高德等）全部经同源 `/api/system/gis/tile` 代理，密钥留在服务端，所以 `img-src`、`connect-src` 不放行任何厂商瓦片域。浏览器直连的自定义外部瓦片（如自定义 XYZ）或独立埋点上报域名，用 `MUGSUN_CSP_TILE_HOSTS`、`MUGSUN_CSP_TRACK_HOSTS` 追加。这两个变量只允许字母、数字、`.`、`*`、`:`、`/`、`-` 和空格，含 `;`、引号等字符时容器拒绝启动。

## 一条命令起全套

`mugsun-pc/docker/compose.pc.yml` 编排了管理台、后端（mugsun-boot 的 Dockerfile）、PostgreSQL（PostGIS + pgvector）和 Redis。四个仓库（mugsun-core、mugsun-boot、mugsun-track、mugsun-pc）平级克隆后：

```bash
cd mugsun-pc
touch docker/.env   # 填入下表变量，文件已被 .gitignore / .dockerignore 排除，切勿提交
docker compose -f docker/compose.pc.yml --env-file docker/.env up -d --build
```

compose 不提供任何默认口令或密钥，下列变量缺少时会直接拒绝启动：

| 变量 | 说明 |
| --- | --- |
| `MUGSUN_DB_PASSWORD` | 应用账号 `mugsun` 的数据库密码（主库与埋点库） |
| `MUGSUN_POSTGRES_SUPER_PASSWORD` | PostgreSQL 超级用户密码 |
| `MUGSUN_REDIS_PASSWORD` | Redis 口令，会拼进连接 URI，只用字母数字。启动时写入仅 redis 用户可读的配置文件，不出现在进程参数里 |
| `MUGSUN_INIT_PASSWORD` | 初始管理员口令 |
| `MUGSUN_SM4_KEY`、`MUGSUN_API_KEY` | 16 字符 SM4 密钥 |
| `MUGSUN_SM2_PRIVATE_KEY`、`MUGSUN_SM2_PUBLIC_KEY` | SM2 传输密钥对（hex） |
| `MUGSUN_SIGN_PRIVATE_KEY`、`MUGSUN_SIGN_PUBLIC_KEY` | SM2 审计签名密钥对（hex） |

口令可用 `openssl rand -hex 16` 生成。国密密钥必须固定注入，换密钥会导致历史密文和签名失效。

打开 <http://localhost:8088>。端口可用 `MUGSUN_PC_PORT` 修改。后端的环境变量以 [后端配置](/boot/configuration) 为准，邮件和短信默认是空占位，正式部署请填入真实值。
