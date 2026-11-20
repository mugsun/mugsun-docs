# Docker 部署

把管理后台打成镜像，用 Nginx 托管页面，并把 `/api` 转发到后端。

只想试用整套系统，用[快速开始](/guide/getting-started)里的那条命令更省事。

## 构建并运行

<div class="ms-steps">

### 构建镜像

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
docker build -t mugsun/pc:local .
```

构建时 Node 的堆内存上限默认是 6144MB。Docker 可用内存不足 8GB 时，先调大 Docker 的内存配额。

### 启动容器

```bash
docker run -d -p 8088:8080 \
  -e MUGSUN_API_UPSTREAM=http://<后端地址>:8080 \
  mugsun/pc:local
```

`MUGSUN_API_UPSTREAM` 填后端的地址，不带 `/api`。

### 确认已经启动

```bash
curl http://localhost:8088/healthz
```

返回 `ok` 说明 Nginx 已经启动。再打开 <http://localhost:8088>，应该看到登录页。

</div>

## 环境变量

下面的变量在容器启动时读取，换环境不用重新构建镜像。

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_API_UPSTREAM` | `http://mugsun-boot:8080` | 后端地址，不带 `/api` |
| `MUGSUN_GATEWAY_CIDRS` | 空 | 前置网关所在的网段，见[前面还有一层网关](#gateway) |
| `MUGSUN_CSP_MODE` | `report-only` | 内容安全策略只报告还是拦截，见 [CSP](/pc/csp) |
| `MUGSUN_CSP_REPORT_URI` | 空 | 违规报告的收集地址 |
| `MUGSUN_CSP_TILE_HOSTS` | 空 | CSP 额外放行的地图瓦片域名 |
| `MUGSUN_CSP_TRACK_HOSTS` | 空 | CSP 额外放行的埋点上报域名 |

下面三个是构建参数，用 `docker build --build-arg` 传入。

| 参数 | 默认 | 说明 |
| --- | --- | --- |
| `VITE_API_URL` | `/` | 接口地址。`/` 表示和页面同源，由 Nginx 转发 |
| `VITE_BASE_URL` | `/` | 页面和静态资源的路径前缀 |
| `NODE_MAX_OLD_SPACE` | `6144` | 构建时 Node 的堆内存上限，单位 MB |

- 管理后台和后端用不同域名时，才把 `VITE_API_URL` 改成后端的完整地址。
- 镜像里的 Nginx 只在根路径提供页面。改了 `VITE_BASE_URL`，要由前置网关去掉这段前缀再转发。

## Nginx 做了什么

| 项目 | 行为 |
| --- | --- |
| 运行身份 | 非 root 用户（uid 101），容器内监听 `8080` |
| 接口转发 | `/api/xxx` 转发为 `<后端>/xxx`，支持 WebSocket，读超时 300 秒 |
| 上传大小 | 请求体最大 50MB |
| 页面路由 | 找不到的路径返回 `index.html` |
| 缓存 | `/assets/` 缓存一年，`/cesiumStatic/` 缓存一天，`index.html` 不缓存 |
| 压缩 | gzip，优先发送构建时生成的 `.gz` 文件 |
| 健康检查 | `GET /healthz` 返回 `ok`，镜像自带 `HEALTHCHECK` |
| 隐藏文件 | `/.` 开头的路径返回 404，`/.well-known/` 除外 |

每个页面和静态文件的响应都带下面几个安全响应头，另外还有 [CSP](/pc/csp)。

```http
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
Cross-Origin-Opener-Policy: same-origin
```

镜像不发 HSTS 头。要用 HSTS，在终结 HTTPS 的网关上加。

## 客户端 IP

后端按客户端 IP 限流和记审计日志，所以要保证传到后端的 IP 是真实的。

- Nginx 转发时用对端地址覆盖 `X-Forwarded-For`，浏览器自己带来的值传不到后端。
- 后端只采信可信代理传来的这个头。要把管理后台容器的 IP 写进后端的可信代理列表。
- 没配可信代理时，所有用户在后端看来都是 Nginx 的 IP，按 IP 的限流变成全站共用。

后端的变量是 `MUGSUN_OPENAPI_TRUSTED_PROXIES`，写法见[客户端 IP 与可信代理](/boot/open-api#客户端-ip-与可信代理)。

### 前面还有一层网关 {#gateway}

管理后台前面还有 TLS 网关或负载均衡时，把网关所在的网段写进 `MUGSUN_GATEWAY_CIDRS`。

```bash
MUGSUN_GATEWAY_CIDRS=10.0.0.0/16,192.168.10.5/32
```

- 只有来自这些网段的请求，Nginx 才按 `X-Forwarded-For` 还原客户端 IP。
- 网关传来的 `X-Forwarded-Proto` 也只在这时才沿用，其他请求按 Nginx 自己收到的协议填。
- 网关要保证 `X-Forwarded-For` 最右边一项是它自己看到的对端地址。
- 多个网段用逗号分隔。不填表示不信任任何前置代理。

容器启动时会逐项检查这个变量，有一项不合格就拒绝启动。

| 规则 | 可以 | 不可以 |
| --- | --- | --- |
| IPv4 前缀不短于 `/8` | `10.0.0.0/8` | `0.0.0.0/0` |
| IPv6 前缀不短于 `/32` | `2001:db8::/32` | `::/0` |
| 地址必须合法 | `192.168.10.5` | `192.168.10.300` |

::: warning 网段不要填宽
网段里的任何机器都能伪造客户端 IP，绕过限流并写进审计日志。只填网关自己的地址。
:::

## 和后端一起启动 {#compose}

`docker/compose.pc.yml` 从源码构建管理后台和后端，并启动 PostgreSQL 和 Redis。

<div class="ms-steps">

### 克隆三个仓库

三个仓库要放在同一个目录下。

```bash
git clone https://github.com/mugsun/mugsun-core.git
git clone https://github.com/mugsun/mugsun-boot.git
git clone https://github.com/mugsun/mugsun-pc.git
```

### 生成密钥和口令

```bash
cd mugsun-pc
../mugsun-boot/scripts/gen-keys.sh --all > docker/.env
for name in MUGSUN_DB_PASSWORD MUGSUN_POSTGRES_SUPER_PASSWORD MUGSUN_REDIS_PASSWORD; do
  echo "$name=$(openssl rand -hex 16)" >> docker/.env
done
```

`docker/.env` 已经被 `.gitignore` 和 `.dockerignore` 排除，不会进仓库和镜像。

### 启动

```bash
docker compose -f docker/compose.pc.yml --env-file docker/.env up -d --build
```

### 登录

打开 <http://localhost:8088>，账号是 `admin`，口令是 `docker/.env` 里的 `MUGSUN_INIT_PASSWORD`。

</div>

Compose 文件不带任何默认口令和密钥。下面的变量缺一个，`up` 就会报错退出。

| 变量 | 说明 |
| --- | --- |
| `MUGSUN_DB_PASSWORD` | 应用账号 `mugsun` 的数据库口令，主库和埋点库共用 |
| `MUGSUN_POSTGRES_SUPER_PASSWORD` | PostgreSQL 超级用户的口令 |
| `MUGSUN_REDIS_PASSWORD` | Redis 口令 |
| `MUGSUN_INIT_PASSWORD` | 初始管理员 `admin` 的口令 |
| `MUGSUN_SM4_KEY` | 字段加密密钥 |
| `MUGSUN_API_KEY` | 接口传输密钥 |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | SM2 传输密钥对 |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 审计签名密钥对 |

四类密钥各自的用途和写法见[密钥与加密](/boot/crypto-keys)。密钥要固定下来，换了以后旧的密文和签名都会失效。

### 可以调整的变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_PC_PORT` | `8088` | 管理后台映射到宿主机的端口 |
| `MUGSUN_FRONT_URL` | `http://localhost:8088` | 用户访问管理后台的地址，换了端口或域名要一起改 |
| `MUGSUN_COMPOSE_SUBNET` | `172.30.88.0/24` | 容器网络的网段 |
| `MUGSUN_PC_IP` | `172.30.88.10` | 管理后台容器的固定 IP |
| `MUGSUN_COMPOSE_IP_RANGE` | `172.30.88.128/25` | 其他容器动态分配 IP 的范围 |

- 管理后台容器的 IP 是固定的，Compose 会把它写进后端的可信代理列表。
- 填了 `MUGSUN_GATEWAY_CIDRS` 时，这些网段也会一起写进去。
- 网段和宿主机冲突时，后三个变量要一起改。
- 邮件和短信默认没有配置，要用时按[短信与邮件](/boot/features/notify)填写。

::: warning 不要把不可信的容器接进这个网络
同一个网络里的容器可以绕过 Nginx，直接访问后端、数据库和 Redis。要接入其他服务，另建一个网络。
:::

## 下一步

<div class="ms-cards">

- [内容安全策略（CSP）](/pc/csp) 先只报告，确认没有违规后改成拦截。
- [配置参考](/boot/configuration) 后端在生产环境要注入的配置。
- [安全清单](/boot/security-checklist) 上线前逐项核对，含可信代理和密钥。
- [本地开发](/pc/development) 不用 Docker，直接在本机启动管理后台。

</div>
