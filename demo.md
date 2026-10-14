# 在线演示

## 本地体验管理台与埋点

在本机按以下命令跑起完整后端（需 Docker 与 JDK 21）：

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

管理台（pc）与验收步骤见 [快速开始](/guide/getting-started)。账号以 [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README.md) 为准，**首次登录请改密**。

## uni-app x（ms-ui） 组件 H5

组件文档页右下角有手机框，嵌入本站托管的 H5 预览（`/demo/index.html`）。例如打开 [Button](/uniappx/components/button)，即可在框内切换组件演示。

也可直接访问完整 H5 入口：[打开 ms-ui 演示](/demo/index.html)（新标签页）。

## 对外展示：只读演示模式

对外展示请用 boot 的 `demo` profile 部署只读环境，并使用非生产密钥：

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod,demo
```

::: warning 目前只支持 PostgreSQL
演示模式暂时只支持 PostgreSQL 部署。达梦、人大金仓、openGauss、MySQL 暂不支持 demo。
:::

开启后（`mugsun.demo.enabled=true`），后端按「默认拒绝」处理请求：

| 类别 | 处理 |
|---|---|
| GET / HEAD / OPTIONS 查询 | 放行 |
| 登录、登出、双因子、验证码校验 | 放行；登录按 IP 限流（默认每分钟 20 次，超出 429 `DEMO_RATE_LIMITED`） |
| 埋点采集 `/track/collect`、`/track/replay`、`/track/api-body` | 默认拒绝；`MUGSUN_DEMO_TRACK_COLLECT=true` 时放行，按 IP 限流（默认每分钟 120 次），埋点库超过容量上限时返回 503 `DEMO_CAPACITY`。在输出转义和敏感词就绪前请保持关闭 |
| 其余 POST / PUT / DELETE / PATCH（注册、改密/找回密码、上传、导入、AI、代码生成与低代码 DDL、任务调度、系统参数等） | HTTP 403，`msg` 为「演示环境只读」，`errorCode` 为 `DEMO_READONLY` |
| `/open/**`、`/oauth2/**`、`/v1/**`、`/system/crypto/**`、`/auth/social/**`、`/system/ai/**` | 任何方法都拒绝 |
| 导出、下载、SSE 流 | 放行，每个实例同时最多 2 个（`MUGSUN_DEMO_HEAVY_CONCURRENCY`），超出 429 `DEMO_BUSY` |
| 带 `X-HTTP-Method-Override` 等方法覆盖头或 `_method` 参数的请求 | 拒绝 |
| WebSocket | 入站消息丢弃（只保留心跳），通道只用于服务端推送；只接受 `MUGSUN_DEMO_WS_ALLOWED_ORIGINS`（默认管理端地址 `mugsun.web.front-url`）来源的握手 |

新增的写接口默认就被拒；boot 仓库的 `docs/demo/readonly-endpoints.md` 是自动生成的全量写端点清单，由测试保证与代码一致。

### 数据库账号与边界

demo 不用 owner 账号连库，而是三个低权限账号（建账号脚本见 boot 仓库 `docs/demo/sql/demo-accounts.sql`）：

| 账号 | 权限 | 用途 |
|---|---|---|
| `mugsun_demo_ro` | 业务库全表只读（SELECT） | 业务数据源 |
| `mugsun_demo_log` | 5 张日志表只插入（INSERT） | 登录日志、接口日志、错误日志、操作日志、常用日志 |
| `mugsun_demo_track` | 埋点库 SELECT + INSERT | 埋点数据源 |

demo 下关闭 Flyway，启动时校验业务库和埋点库的迁移版本，与程序不一致就拒绝启动。升级时先用 owner 账号、不带 demo profile 跑一次迁移：

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod --mugsun.demo.migrate-only=true
```

迁移和启动期初始化做完后进程自动退出（退出码 0），再用 demo profile 和低权限账号启动。

| 边界 | 内容 |
|---|---|
| 放行 | 查询；登录、登出、验证码校验；开启时的埋点采集；服务端推送 |
| 拒绝 | 上表列出的写请求（403 `DEMO_READONLY`）；漏网的写在数据库层报权限不足，也返回 403 `DEMO_READONLY` |
| 内部写入 | 登录、接口、错误、操作日志 → 日志账号（写失败只记 WARN，不影响登录）；登录锁定计数、token、验证码 → Redis 独立 db（默认 4，`MUGSUN_DEMO_REDIS_DB`）；按 IP 限流的令牌桶 → 同一 Redis db；埋点事件 → 埋点账号（只插入） |
| 演示环境关闭 | 写库的启动任务和定时任务（日志清理、通知重试、埋点汇总/分区/清理等）；两步验证；短信、邮件、站内通知发送；社交登录；AI 模型通道 |
| 不保证 | 埋点会话统计只记第一批事件，之后的批次不累加（埋点账号没有 UPDATE 权限），演示站的会话数据不准；打开埋点采集后匿名写入仍有存储型 XSS 风险，等输出转义和敏感词过滤；验证码仍会写 Redis；限流依赖 Redis，Redis 故障时不限流 |

公开的演示账号输错密码时，只锁定该 IP 上的这个账号，其他 IP 仍可登录。

部署注意：

- **反向代理**：按 IP 锁定和限流要拿到访客的真实 IP。demo 默认信任回环和私网段（`127.0.0.0/8`、`10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16`、`::1`、`fc00::/7`）转发的 `X-Forwarded-For`；前面是公网 CDN 或云网关时，必须把 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 设成它的出口网段，否则所有访客共用代理的 IP，一人输错会锁住所有人。没有配置可信代理时启动日志会打 WARN。
- **Redis 故障**：运行中 Redis 不可用时，限流放行（不限流）、登录失败（登录态和验证码都在 Redis）；启动时连不上 Redis，demo 起不来。
- **埋点库容量**：`MUGSUN_DEMO_TRACK_WARN_MB`（默认 2048）超过后打 WARN，`MUGSUN_DEMO_TRACK_MAX_MB`（默认 4096）超过后埋点采集返回 503。只统计埋点数据库大小，不含回放等落文件存储的数据。

::: tip 建设中
每日 04:00（北京时间）重置样例数据、敏感词过滤（词表从外部路径加载，默认空表）、输出转义、访问日志留存 6 个月、管理台的只读提示，会在后续版本陆续提供。在这些就绪之前，请不要把演示环境当作唯一防线。
:::

下一步：[快速开始](/guide/getting-started) · [安全清单](/boot/security-checklist) · [ms-ui](/uniappx/)
