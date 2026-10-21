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
| `mugsun_demo_log` | 5 张日志表 INSERT；操作日志表和链头表 SELECT，链头表只能改 `update_time` | 登录日志、接口日志、错误日志、操作日志、常用日志 |
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

- **反向代理**：按 IP 锁定和限流要拿到访客的真实 IP。demo 默认**只信任回环**（`127.0.0.0/8`、`::1`）转发的 `X-Forwarded-For`。Nginx 或网关不在本机时，必须把 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 设成它的地址或网段（一键部署和演示叠加文件里是 pc 容器的 `172.30.88.10/32`；公网 CDN 或云网关就写它的出口网段），否则所有访客共用代理的 IP，一人输错会锁住所有人。不要整段信任私网：私网里任何能直连后端的主机都能伪造 XFF，绕过限流、冒充别人的 IP。没配（只有回环默认值）或设为空时，启动日志会打 WARN。
- **Redis 故障**：运行中 Redis 不可用时，限流放行（不限流）、登录失败（登录态和验证码都在 Redis）；启动时连不上 Redis，demo 起不来。
- **Redis 地址**：demo 读 `REDIS_HOST`（和 `REDIS_PORT`、`REDIS_PASSWORD`）连接 Redis，与 prod 相同，只是 db 换成 `MUGSUN_DEMO_REDIS_DB`（默认 4）。
- **埋点库容量**：`MUGSUN_DEMO_TRACK_WARN_MB`（默认 2048）超过后打 WARN，`MUGSUN_DEMO_TRACK_MAX_MB`（默认 4096）超过后埋点采集返回 503。只统计埋点数据库大小，不含回放等落文件存储的数据。

### 连接池与余量

demo 有三个连接池，大小用环境变量调：

| 变量 | 默认 | 连接池 |
|---|---|---|
| `MUGSUN_DEMO_DB_POOL_MAX` | 5 | 业务只读池（`mugsun_demo_ro`） |
| `MUGSUN_DEMO_LOG_POOL_MAX` | 4 | 日志池（`mugsun_demo_log`） |
| `MUGSUN_DEMO_TRACK_POOL_MAX` | 4 | 埋点池（`mugsun_demo_track`） |

日志库必须连主库。`MUGSUN_DEMO_LOG_DB_URL` 默认就是业务库地址，可以换参数，不能换库。

操作日志的哈希链在日志连接上加锁、读上一条哈希。指向只读副本或别的库会断链，所以协议、主机、端口、库名不一致时 demo 拒绝启动。

多主机写法必须和 primary.url 完全一致。

按 `max_connections=30` 算余量：

| 项目 | 连接数 |
|---|---|
| `max_connections` | 30 |
| 超级用户保留（`superuser_reserved_connections`） | 3 |
| 普通账号可用 | 27 |
| demo 三个池合计 | 13 |
| 剩余（迁移、psql、备份） | 14 |

迁移（migrate-only）用非 demo 配置，两个池默认各 10 个，最多占 20，超过余量。

所以先停 demo 再迁移，或者迁移时把池调小，例如：

```bash
--mybatis-flex.datasource.primary.maximum-pool-size=4 --mybatis-flex.datasource.track.maximum-pool-size=3
```

普通账号连满时，`postgres` 超级用户还能用保留的 3 个连接排查。

调大连接池前先算一遍：三个池加迁移不能超过 27，不够就调高 `max_connections` 并重启 PostgreSQL。

::: tip 建设中
每日 04:00（北京时间）重置样例数据、敏感词过滤（词表从外部路径加载，默认空表）、输出转义、访问日志留存 6 个月、管理台的只读提示，会在后续版本陆续提供。在这些就绪之前，请不要把演示环境当作唯一防线。
:::

下一步：[快速开始](/guide/getting-started) · [安全清单](/boot/security-checklist) · [ms-ui](/uniappx/)

### 访问日志留存

演示模式下后端每个请求写一行访问日志到单独文件 `<日志目录>/mugsun-boot-access.log`，内容是 IP、方法、路径、状态码、耗时、用户 ID 和 traceId，**不记录 query 和请求体**。文件按天滚动并 gzip 压缩，默认保留 200 天，**不设总量上限、不会按容量删除**，不受日志库清理任务影响。依据是《网络安全法》第二十一条：留存网络日志不少于六个月。

- **挂载卷**
  - 日志目录必须挂到持久卷，容器重建后日志不会丢失。
  - 用 `MUGSUN_DEMO_ACCESS_LOG_PATH` 修改目录，用 `MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY` 修改保留天数。
  - 保留天数最低为 180。低于 180 的值（包括 0 和负数）或无法解析的值，启动时会改用 180，并记录一条 WARN。
  - 不低于 180 的小数向下取整，例如 `200.5` 按 200 天保留，不会改为 180。超过 2147483647 的值按 2147483647 处理。
- **磁盘估算**：每行约 200 字节，gzip 后约为十分之一（约 20 字节）。所需磁盘 ≈ 日均请求数 × 20 字节 × 保留天数，外加当天未压缩的文件（日请求数 × 200 字节）。例如日均 100 万次请求约 20MB/天，200 天约 4GB，当天未压缩文件约 200MB；按峰值流量估算并至少留一倍余量，例如峰值 500 万次/天、200 天约需 20GB，留余量后按 40GB 准备。
- **备份**：把访问日志目录纳入定期备份（至少每周异地一份）。数据库里的接口日志、登录日志在演示模式下保留期不低于 180 天。
- **应用之外的请求**：真实 IP 与登录锁定、限流同一口径（只信任 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 里的代理传来的 X-Forwarded-For）。在到达应用之前就失败的请求（Nginx 拒绝、400、超时等）不进这个文件，由 Nginx（管理台镜像或前置网关）的访问日志覆盖，同样按 ≥6 个月留存。
- **磁盘余量告警**
  - 180 天留存是硬要求，访问日志只按天数删除。遇到恶意刷量时，日志会持续占用磁盘空间。
  - 后端每小时检查一次日志目录所在磁盘的剩余空间。阈值由 `MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE` 设置（配置键 `mugsun.demo.access-log.min-free-space`），默认 `10GB`。
  - 只在状态变化时记录日志。余量低于阈值时记录一条 WARN，恢复到阈值以上时记录一条 INFO，期间不重复记录。
  - 无法读取磁盘余量（包括权限异常）时，同样只记录一条 WARN，并附上异常信息。
  - 阈值单位写 GB 或 G 均可，按 1024 进制换算。可以带小数，换算成字节后向下取整。其他写法见下方「阈值写法」。
  - 阈值建议不低于「峰值日请求数 × 200 字节 × 7」，即留出一周峰值写入量的处理时间。
  - 出现 WARN 后，请扩容日志卷或转移旧归档，不要删除不满 180 天的文件。磁盘写满后日志将无法写入，服务也会出错。
  - 需要更强保证时，把访问日志同时采集到外部日志系统（stdout 或 syslog 转发），并做异地留存。
- **个人信息与权限**：IP 地址和用户 ID 属于个人信息。日志目录必须挂持久卷（容器重建不丢），属主设为后端用户（uid 10001），目录权限 0750、文件 0640，只给运维和合规人员读取权限；到期（超过留存期）按策略删除，不要另外复制到无人管理的位置。日志里路径的 `;jsessionid=` 等参数会去掉，看起来像令牌或签名的路径段会记成 `:redacted`。

::: details 阈值写法（`MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE`）
- 单位不区分大小写，按 1024 进制换算。无单位或 `B` 表示字节，其余单位为 `K`/`KB`/`KiB`、`M`/`MB`/`MiB`、`G`/`GB`/`GiB`、`T`/`TB`/`TiB`。
- 只去掉首尾空白；数字和单位之间可以有空格（`10 GB` 有效），数字内部不能有空格（`1 0GB` 无效）。
- 可带小数，换算成字节后向下取整。例如 `1.5G` 为 1610612736 字节，`0.5G` 为 512MiB；不足 1 字节（如 `0.5B`）时结果为 0。
- 结果为 0 或负数（含 `-0.5G`）会关闭告警，并在启动时记录一条 WARN。
- 无法解析（格式不对、指数写法如 `1e3G`、超出 long 范围）不影响启动，回落到 10GB 并记录一条 WARN。
:::
