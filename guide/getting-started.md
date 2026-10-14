# 快速开始

本页带你从空环境走到三个可验证的结果：**后端健康检查通过 → 管理台登录成功 → 看板出现第一条埋点事件**。每一步都给出验收方式，命令与各仓 README 保持一致。

## 只有 Docker：一条命令起全套

机器上只有 Docker（Compose v2.17+）时，可以在 `mugsun-boot` 仓库根目录一条命令起齐 PostgreSQL（PostGIS + pgvector）、Redis、后端和管理台：

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
docker compose -f docker-compose.full.yml run --rm init show   # 查看首次生成的管理员口令
```

打开 <http://localhost:8088>，用 `admin` 和上面查到的口令登录。端口可用 `MUGSUN_HTTP_PORT` 修改；端口默认只绑 `127.0.0.1`，要让局域网访问需显式设 `MUGSUN_HTTP_BIND=0.0.0.0`。

国内服务器拉不到 Docker Hub 镜像时，在 Docker 的 `daemon.json` 里配置 `registry-mirrors`（例如 `"registry-mirrors": ["https://docker.m.daocloud.io"]`；DaoCloud 是第三方服务，不由本项目维护，可用性与内容以其官方说明为准，请自行评估）后重启 Docker，或给 Docker 配置代理。

- **没有弱口令。** 首次启动时 `init` 服务随机生成数据库和 Redis 口令、管理员口令、SM4/SM2 密钥、审计签名密钥和至少 32 位的文件签名密钥，每个都校验长度，生成失败就停下。密钥按服务拆进三个卷（`secrets-boot`、`secrets-postgres`、`secrets-redis`），文件权限 0600、属主是对应服务的用户，每个服务只挂自己那一个：PostgreSQL 只拿到库口令，Redis 只拿到 `redis.conf`。重启不会变。管理员口令不写进 `init` 的启动日志，用 `docker compose -f docker-compose.full.yml run --rm init show` 查看。注意：`run` 起的容器同样走 Docker 日志驱动，如果配置了 journald、gelf 等会转发日志的驱动，`init show` 的输出也会被收集，查看前请确认，或查看后到日志系统里清理。admin 改过口令后，`init show` 只提示「初始密码已失效」，不再显示初始口令（它用初始口令校验库里 admin 当前的口令；连不上库时照常显示并提示无法确认）。注意「失效」只是说 admin 不能再用它登录：这个初始口令同时是**管理员重置口令时的默认口令和新建租户管理员的初始口令**，仍保存在 `secrets-boot` 卷里并继续生效，请按同等敏感程度保管。
- **首次登录不会强制改口令。** 后端目前只有按到期天数（`security.password.expire-days`，默认 0 即关闭）提示改密，没有首次登录强制改密。请登录后自己到个人中心修改管理员口令。
- 后端以 `prod` profile 运行：缺任一密钥拒绝启动，登录要验证码，OpenAPI 文档关闭。
- 只对外暴露管理台端口。数据库和 Redis 不映射到宿主机。管理台直接用 `mugsun-pc` 仓库自己的镜像：非 root 的 nginx、基础镜像固定 digest、带 CSP，把 `/api` 反代给后端时用真实来源地址覆盖 `X-Forwarded-For`，不保留客户端自带的值。
- compose 网络与 `mugsun-pc` 一致，用固定子网（`MUGSUN_COMPOSE_SUBNET`，默认 `172.30.88.0/24`），管理台容器用固定 IP（`MUGSUN_PC_IP`，默认 `172.30.88.10`），其它容器只从 `MUGSUN_COMPOSE_IP_RANGE`（默认 `172.30.88.128/25`）分配地址；`MUGSUN_OPENAPI_TRUSTED_PROXIES` 只信任管理台这一个 IP。前面再加一层网关时，把网关网段写进 `MUGSUN_GATEWAY_CIDRS`，由管理台的 nginx 判断。
- 构建来源固定：本仓库的基础镜像和 Dockerfile 语法前端都固定 digest（`mugsun-pc` 仓库 Dockerfile 首行的 `# syntax=docker/dockerfile:1.7` 目前没有固定 digest），管理台和埋点 SDK 源码固定到提交 sha 并按锁文件安装依赖，自检脚本的 Python 依赖锁定版本和哈希。后端镜像内置人大金仓和达梦驱动。Redis 口令写在生成的 `redis.conf` 里，不出现在进程参数中。
- 自检：`scripts/compose-full-smoke.sh` 会从零启动，登录，上报一条埋点并在管理端查到，打印耗时，最后 `down -v` 清理。它用独立的项目名，不碰机器上已有的容器。
- 清空重来（会删除数据和密钥）只能用 `docker compose -f docker-compose.full.yml down -v`。不要只删 secrets 卷而保留数据卷：数据库口令只在首次初始化时写入，新生成的口令会对不上，后端连不上库。secrets 卷不完整时 `init` 会拒绝启动并提示用 `down -v`。从旧版本（boot#40，只有一个 `secrets` 卷）升级同样要先 `down -v`；如果当时用了别的方式清理，请确认旧卷已删除：`docker volume rm mugsun-full_secrets`。旧卷里的文件是 0644，存着全部密钥，不能留着。

这套 compose 适合试用和演示。上生产时自己部署要注入的全部必填项：

| 变量 | 说明 |
| --- | --- |
| `SPRING_PROFILES_ACTIVE=prod` | 生产 profile |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | 主库 |
| `TRACK_JDBC_URL` / `TRACK_JDBC_USERNAME` / `TRACK_JDBC_PASSWORD` | 埋点库 `mugsun_track` 数据源 |
| `REDIS_HOST` / `REDIS_PASSWORD`（可选 `REDIS_PORT` / `REDIS_DB`） | Redis |
| `MUGSUN_FRONT_URL` / `FILE_DOMAIN` | 管理台 origin 与文件访问域名 |
| `MUGSUN_INIT_PASSWORD` | 初始管理员口令，不能是内置默认值 |
| `MUGSUN_SM4_KEY` / `MUGSUN_API_KEY` | 16 位 SM4 密钥 |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | SM2 传输密钥对（hex） |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 审计签名密钥对 |
| `MUGSUN_FILE_SIGN_SECRET` | 文件下载链接签名密钥，至少 32 个字符 |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | 可信反向代理 CIDR，前面有反代时必须配 |
| `SMTP_*` / `SMS_*` | 邮件与短信。compose 里填的是占位值，要用找回密码或短信登录时换成真实值 |

密钥可用仓库里的 `scripts/gen-keys.sh --all >> .env` 生成（两对 SM2、两个 SM4、管理员口令、文件签名密钥，输出可直接贴进 `.env`；需 OpenSSL 1.1.1+），一键全栈的 `init` 也用它。各项含义见 [配置参考](/boot/configuration)。下面是逐个仓库本地开发的步骤。

## 环境要求

| 工具 | 版本 | 用途 |
| --- | --- | --- |
| JDK | 21 | 运行 boot |
| Maven | 3.9+ | 构建 boot（自动从 Maven Central 拉取 `com.mugsun:mugsun-*:0.1.0`） |
| Docker / Docker Compose | 近期版本 | 启动 PostgreSQL 16（含 PostGIS、pgvector）与 Redis 7 |
| Node.js | ≥ 22.13 | 管理台与埋点 SDK（可选） |
| pnpm | ≥ 11.11（管理台锁定 `pnpm@11.28.2`） | 同上 |

推荐目录结构（管理台以 `file:../mugsun-track` 引用 SDK，因此需平级）：

```text
mugsun/
  mugsun-boot/    # 后端 :8080
  mugsun-pc/      # 管理台 :3006（可选）
  mugsun-track/   # 埋点 SDK（管理台启用埋点模块时需要）
```

::: tip 不需要再本地 install core
`mugsun-core` 0.1.0 已发布至 [Maven Central](https://central.sonatype.com/search?q=com.mugsun)，构建 boot 时由 Maven 自动解析。仅在离线环境才需要平级克隆 core 并执行 `mvn clean install -DskipTests`。
:::

## 第 1 步：启动后端

```bash
git clone https://github.com/mugsun/mugsun-boot.git
cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

- `docker compose up -d` 只启动 PostgreSQL（5432）与 Redis（6379），首次会构建带 PostGIS + pgvector 的数据库镜像。本机端口被占用时见 [常见问题](/guide/faq#本机-5432-6379-已被占用)。
- 打包默认使用 `full` profile（core + gis + track + ai）。
- `java -jar` 必须在仓库根目录执行，才能读到 `config/application-local.yml`。确认 `java -version` 输出 21。

::: details 5432 端口被占用怎么办？
`docker compose up -d` 报端口冲突，通常是本机已有 PostgreSQL 在跑：

- 查占用：macOS / Linux 用 `lsof -nP -iTCP:5432 -sTCP:LISTEN`，Windows 用 `netstat -ano | findstr :5432`。
- 方案一：停掉本机 PostgreSQL（如 `brew services stop postgresql@16`、`sudo systemctl stop postgresql`），再 `docker compose up -d`。
- 方案二：改映射端口。把 `docker-compose.yml` 中 postgres 的 `"5432:5432"` 改为如 `"5433:5432"`，并在 `config/application-local.yml` 中覆盖连接地址：

```yaml
mybatis-flex:
  datasource:
    primary:
      url: jdbc:postgresql://localhost:5433/mugsun
```
:::

::: details 能用 `mvn -pl mugsun-boot-server -am spring-boot:run` 吗？
可以，开发时可在仓库根目录直接运行（[mugsun-boot #13](https://github.com/mugsun/mugsun-boot/pull/13) 起）。部署与验收仍推荐先打包再 `java -jar`。
:::

**验收：**

- `curl http://localhost:8080/ping` 返回正常响应
- 开发环境 OpenAPI：`http://localhost:8080/swagger-ui/index.html`（`prod` 下关闭）

::: warning 初始口令
默认账号 `admin` / `123456`，可通过环境变量 `MUGSUN_INIT_PASSWORD` 覆盖。`prod` 未注入初始口令会拒绝启动。登录后请立刻修改密码，演示口令不要暴露到公网。
:::

启动失败时先看 [常见问题](/guide/faq#启动与构建)。工作目录必须是 boot 仓库根目录，否则读不到 `config/application-local.yml`。

## 第 2 步：启动管理台（可选）

在与 `mugsun-boot` 同级的目录执行：

```bash
git clone https://github.com/mugsun/mugsun-track.git
git clone https://github.com/mugsun/mugsun-pc.git
cd mugsun-pc
pnpm setup:sdk
pnpm install
pnpm dev
```

- `pnpm setup:sdk` 会构建平级的 `mugsun-track`；设置 `VITE_ENABLE_TRACK=false` 时可跳过。
- `pnpm dev` 启动在 `http://localhost:3006` 并自动打开浏览器。

开发期 `/api/**` 由 Vite 代理到 `.env.development` 中的 `VITE_API_PROXY_URL`（默认 `http://localhost:8080`）。

**验收：** 用第 1 步的账号登录（本地配置开启了验证码回显，验证码会自动填好），进入工作台，顶栏出现「埋点分析」「系统管理」等菜单。

![管理台登录页](/screenshots/pc-login.png)

![管理台工作台](/screenshots/pc-workbench.png)

::: info 登录态只在当前标签页
自 0.1.0 起，`accessToken` / `refreshToken` 存于 `sessionStorage`，不再写入 `localStorage`。新开标签页需要重新登录，这是预期行为。
:::

## 第 3 步：发送第一个埋点事件（可选）

1. 在管理台「埋点分析 → 接入管理」创建应用，得到 `appKey`。
2. 在任意 Web 项目里安装并初始化 SDK：

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

```bash [yarn]
yarn add @mugsun/track-web
```

:::

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'http://localhost:8080', // 上报到 {endpoint}/track/collect
  appKey: '<上一步得到的 appKey>',
})

track.track('hello_mugsun', { from: 'getting-started' })
```

**验收：** 浏览器网络面板中 `/track/collect` 返回 2xx；管理台「埋点分析 → 数据概览」选择该应用后出现数据。

![埋点数据概览（演示数据）](/screenshots/track-overview.png)完整排查步骤见 [第一个事件](/track/first-event)。

## 下一步

- 了解各仓分工与数据流：[架构全景](/guide/architecture)
- 调整模块、数据源与安全配置：[Boot 配置](/boot/configuration)
- 上线前逐项核对：[安全清单](/boot/security-checklist)
- 管理台二次开发：[管理台本地开发](/pc/development)
