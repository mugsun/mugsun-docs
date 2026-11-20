# 只读演示模式

只读演示模式用来把一套 mugsun 公开给访客看。访客能登录，能打开每个页面，但改不了数据。

它有两层限制：后端只放行查询和少数几个必须的写请求，连接数据库的账号也换成低权限账号。

::: warning 目前只支持 PostgreSQL
达梦、人大金仓、openGauss 和 MySQL 下暂时不能开启。
:::

目前没有官方的公网演示站，这一页讲的是怎样自己部署一个。只想在本机试用，见[在线演示](/demo)。

## 先准备账号和数据 {#prepare}

开启以后不能再建账号、改口令或写入数据，这些事要先在普通模式下做完。

1. 按[快速开始](/guide/getting-started)启动，用 `admin` 登录并改掉初始口令。
2. 建一个给访客用的账号，只给它查看类的权限。
3. 用访客账号登录一次，把口令改成准备公开的那个。
4. 写入想展示的数据。

新账号第一次登录必须改口令，而演示模式会拒绝改口令的请求。漏掉第 3 步，访客登录后打不开任何页面。

口令有效期保持关闭，也就是系统参数 `security.password.expire-days` 用默认的 0。

设了有效期，到期后页面会要求访客改口令，而访客改不了。

## 用 Docker 部署 {#docker}

后端仓库里的 `docker-compose.demo.yml` 要叠在 `docker-compose.full.yml` 上使用。

两个文件共用数据卷，上一节准备的账号和数据都会保留。

<div class="ms-steps">

### 生成三个数据库口令

演示模式用三个低权限的数据库账号，口令由你生成并保管。口令只能有字母和数字，至少 16 位。

```bash
umask 077
for name in RO LOG TRACK; do
  echo "MUGSUN_DEMO_${name}_DB_PASSWORD=$(openssl rand -hex 16)"
done > ~/mugsun-demo.env
```

文件放在仓库目录以外，免得被提交进去。

### 填写对外地址

```bash
echo "MUGSUN_DEMO_FRONT_URL=https://demo.example.com" >> ~/mugsun-demo.env
```

这个地址用来生成文件链接，WebSocket 握手也只接受来自它的请求。不填时是 `http://localhost:8088`。

### 启动

```bash
docker compose --env-file ~/mugsun-demo.env \
  -f docker-compose.full.yml -f docker-compose.demo.yml up -d --build
```

缺少任何一个口令，命令会直接报错退出。以后对这两个文件执行 `docker compose` 命令，都要带上同一个 `--env-file`。

</div>

启动时按下面的顺序做四件事：

| 顺序 | 服务 | 做什么 |
| --- | --- | --- |
| 1 | `boot-migrate` | 用属主账号执行数据库迁移和初始化，做完就退出 |
| 2 | `demo-accounts` | 用超级用户建三个低权限账号并授权，可以重复执行 |
| 3 | `boot` | 后端用低权限账号，以 `prod,demo` 启动 |
| 4 | `pc` | 管理后台的内容安全策略改成拦截，违规报告发到 `/api/csp-report` |

端口默认只绑定在 `127.0.0.1:8088`。要对外提供访问，在前面放一层 HTTPS 网关，见[真实 IP 和反向代理](#real-ip)。

## 手工部署 {#manual}

不用 Docker 时，按同样的顺序做三步。

<div class="ms-steps">

### 用属主账号迁移

用数据库的属主账号启动一次，不带 `demo`，只做迁移：

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod --mugsun.demo.migrate-only=true
```

迁移和启动时的初始化做完以后，进程自己退出，退出码是 0。

### 建三个低权限账号

脚本是后端仓库的 `docs/demo/sql/demo-accounts.sql`。先把里面的占位符换成实际的值，再用超级用户执行。

| 占位符 | 换成 |
| --- | --- |
| `{{RO_PASSWORD}}` `{{LOG_PASSWORD}}` `{{TRACK_PASSWORD}}` | 三个账号的口令 |
| `{{BIZ_DB}}` `{{TRACK_DB}}` | 业务库和埋点库的库名 |
| `{{OWNER}}` | 数据库的属主账号 |

### 用低权限账号启动

把三个账号通过环境变量交给后端，再带上 `demo` 启动：

| 环境变量 | 填什么 |
| --- | --- |
| `JDBC_USERNAME` `JDBC_PASSWORD` | 业务库的只读账号 `mugsun_demo_ro` 和它的口令 |
| `TRACK_JDBC_USERNAME` `TRACK_JDBC_PASSWORD` | 埋点库的账号 `mugsun_demo_track` 和它的口令 |
| `MUGSUN_DEMO_LOG_DB_PASSWORD` | 日志账号 `mugsun_demo_log` 的口令 |

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod,demo
```

</div>

演示模式自己不执行数据库迁移。启动时后端会核对两个库的迁移版本，和程序带的不一致就拒绝启动。

## 哪些请求会放行 {#requests}

演示模式默认拒绝写请求，只放行下表里的几类。

| 请求 | 结果 |
| --- | --- |
| `GET` `HEAD` `OPTIONS` | 放行 |
| 登录、退出和验证码校验 | 放行。登录按 IP 限流 |
| 问数据的查询 `POST /system/track/ask` | 放行，它只读数据 |
| 内容安全策略的违规报告 `POST /csp-report` | 放行，不用登录，按 IP 限流。内容清洗后只写进单独的日志文件 |
| 埋点上报 `/track/collect` `/track/replay` `/track/api-body` | 默认拒绝，见[埋点采集](#track-collect) |
| 其他 `POST` `PUT` `DELETE` `PATCH` | 拒绝 |
| `/open/**` `/oauth2/**` `/v1/**` `/system/crypto/**` `/auth/social/**` `/system/ai/**` | 任何方法都拒绝，只有 `GET /auth/social/sources` 例外 |
| 带 `X-HTTP-Method-Override` 一类请求头或 `_method` 参数的请求 | 拒绝 |
| 导出、下载和 SSE | 放行，但限制同时进行的个数 |
| WebSocket | 只用来接收服务端推送。除了心跳，客户端发来的消息都丢弃 |

新增的写接口默认就是拒绝的，不需要另外登记。完整的放行名单在后端仓库的 `docs/demo/readonly-endpoints.md`，由测试生成。

漏过这一层的写入，会在数据库那一层因为权限不足而失败，返回的内容和被拒绝时一样。

### 被拒绝时返回什么 {#responses}

| 状态码 | `errorCode` | 什么时候出现 |
| --- | --- | --- |
| 403 | `DEMO_READONLY` | 写请求被拒绝，`msg` 是「演示环境只读」 |
| 429 | `DEMO_RATE_LIMITED` | 登录、埋点上报或违规报告超过了每个 IP 的频率 |
| 429 | `DEMO_BUSY` | 导出类请求同时进行的个数到了上限 |
| 503 | `DEMO_CAPACITY` | 埋点库超过了大小上限，暂停采集 |

### 可以调整的上限 {#request-limits}

| 环境变量 | 默认值 | 作用 |
| --- | --- | --- |
| `MUGSUN_DEMO_LOGIN_PER_IP_PER_MINUTE` | `20` | 每个 IP 每分钟的登录次数 |
| `MUGSUN_DEMO_CSP_PER_IP_PER_MINUTE` | `30` | 每个 IP 每分钟的违规报告数 |
| `MUGSUN_DEMO_TRACK_PER_IP_PER_MINUTE` | `120` | 每个 IP 每分钟的埋点上报数 |
| `MUGSUN_DEMO_HEAVY_CONCURRENCY` | `2` | 每个实例同时进行的导出、下载和 SSE 请求数 |
| `MUGSUN_DEMO_WS_ALLOWED_ORIGINS` | 管理后台的地址 | 允许发起 WebSocket 握手的来源 |

## 数据库账号 {#accounts}

| 账号 | 权限 | 用途 |
| --- | --- | --- |
| `mugsun_demo_ro` | 业务库所有表的 `SELECT` | 所有业务查询 |
| `mugsun_demo_log` | `sys_login_log` `sys_api_log` `sys_error_log` `sys_oper_log` `sys_usual_log` 五张表的 `INSERT`，操作日志和链头表的 `SELECT`，链头表 `update_time` 列的 `UPDATE` | 写日志 |
| `mugsun_demo_track` | 埋点库所有表的 `SELECT` 和 `INSERT` | 埋点的查询和采集 |

日志账号必须连主库。`MUGSUN_DEMO_LOG_DB_URL` 不设时就是业务库的地址，设成别的库，后端拒绝启动。

操作日志由日志账号在自己的事务里写，记下的是「有人尝试过这次操作」，和业务有没有成功无关。

## 仍然会写入的数据 {#writes}

| 数据 | 写到哪里 | 说明 |
| --- | --- | --- |
| 登录、接口、错误和操作日志 | 业务库，用日志账号 | 写失败只打一条 WARN，不影响请求 |
| 登录锁定计数、会话令牌和验证码 | Redis | 演示模式单独用一个库 |
| 按 IP 限流的计数 | Redis | 和上一行是同一个库 |
| 埋点事件 | 埋点库，用埋点账号 | 开启采集后才有，只插入不更新 |

Redis 的地址用 `REDIS_HOST`、`REDIS_PORT` 和 `REDIS_PASSWORD` 设置。后端没有 Redis 启动不了。

演示模式默认用 4 号库，和普通模式默认的 3 号库分开，可以用 `MUGSUN_DEMO_REDIS_DB` 修改。

### 被关掉的功能 {#disabled}

- 会写库的启动任务和定时任务，包括日志清理和通知重试，以及埋点的汇总、分区和清理。
- 二次验证。公开账号的手机和邮箱不应该在每次登录时都收到验证码。
- 短信、邮件和站内通知的发送。
- 第三方登录。
- AI 模型通道，`/system/ai/**` 下的接口都不可用。

### 已知限制 {#limits}

- 埋点的会话统计只算第一批上报的数据，因为埋点账号没有 `UPDATE` 权限。
- 匿名上报的埋点内容会显示在看板里。输出转义和敏感词过滤做好之前，有存储型 XSS 的风险。
- 验证码仍然会写 Redis。
- 限流依赖 Redis。Redis 出故障时不再限流，登录也会失败。

## 真实 IP 和反向代理 {#real-ip}

登录锁定和限流都按来源 IP 计算。公开账号的口令被输错多次，只锁住输错的那个 IP，其他访客不受影响。

所以后端拿到的必须是访客的真实 IP。演示模式默认只信任本机回环地址传来的 `X-Forwarded-For`。

| 部署方式 | 要做的事 |
| --- | --- |
| 用上面的 Compose 文件 | 已经设好，后端只信任管理后台容器的地址 `172.30.88.10` |
| 自己搭反向代理 | 把 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 设成代理的地址或网段 |
| 管理后台前面还有 HTTPS 网关 | 再把网关的地址写进 `MUGSUN_GATEWAY_CIDRS`，见[前面还有一层网关](/pc/deploy-docker#gateway) |

不要把整个内网网段都设成可信的。

没有设置可信代理时，后端启动会打一条 WARN。这时所有访客共用代理的 IP，一个人输错口令会锁住所有人。

## 埋点采集 {#track-collect}

演示站默认不接收埋点上报，看板里只有事先写入的数据。

要让访客的操作也进看板，设置 `MUGSUN_DEMO_TRACK_COLLECT=true`。开启后三个上报接口放行，并按 IP 限流。

::: warning 上报接口不用登录
开启以后，任何人都能往看板里写内容。输出转义和敏感词过滤还没有做，建议先不要开启。
:::

后端每 5 分钟查一次埋点库的大小：

| 环境变量 | 默认值 | 超过以后 |
| --- | --- | --- |
| `MUGSUN_DEMO_TRACK_WARN_MB` | `2048` | 打一条 WARN |
| `MUGSUN_DEMO_TRACK_MAX_MB` | `4096` | 上报接口返回 503，库变小以后自动恢复 |

这里只算数据库的大小，回放文件占的磁盘不算在内。

## 连接数 {#connections}

三个连接池的上限都可以用环境变量调整：

| 连接池 | 环境变量 | 默认上限 |
| --- | --- | --- |
| 业务库只读 | `MUGSUN_DEMO_DB_POOL_MAX` | 5 |
| 日志 | `MUGSUN_DEMO_LOG_POOL_MAX` | 4 |
| 埋点库 | `MUGSUN_DEMO_TRACK_POOL_MAX` | 4 |

下面按 PostgreSQL 的 `max_connections=30` 来算。超级用户保留 3 个连接，普通账号能用 27 个。

演示模式最多占 13 个，剩下 14 个留给迁移、备份和运维。一次 `psql` 或 `pg_dump` 占 1 个。

普通账号连不上时，超级用户还能用保留的 3 个连接。

调大连接池之前，先确认三个池加上迁移要用的连接不超过 27 个。超过了就要调高 `max_connections`，并重启 PostgreSQL。

## 升级 {#upgrade}

升级版本时，先用属主账号迁移一次，命令和[手工部署](#manual)的第一步相同。用 Compose 部署的，重新执行启动命令就会先做迁移。

迁移用的是普通模式的连接池，业务库和埋点库各 10 个，最多占 20 个连接，超过了上面剩下的 14 个。有两种办法：

- 先停掉演示站，再执行迁移。
- 迁移时把连接池调小，命令见下。

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar \
  --spring.profiles.active=prod --mugsun.demo.migrate-only=true \
  --mybatis-flex.datasource.primary.maximum-pool-size=4 \
  --mybatis-flex.datasource.track.maximum-pool-size=3
```

业务库和埋点库的迁移里都有不在事务里执行的语句，Flyway 用的是会话级的锁。

所以迁移时要直连 PostgreSQL，或者用 PgBouncer 的 session 模式，不能用 transaction 模式。

## 访问日志 {#access-log}

演示模式下，后端给每个请求记一行访问日志，文件是日志目录下的 `mugsun-boot-access.log`。

《网络安全法》第二十一条要求网络日志至少留存六个月，所以这份日志只按天数删除，不按大小删除。

| 项目 | 内容 |
| --- | --- |
| 记录的字段 | 来源 IP、请求方法和路径，状态码和耗时，用户 ID 和 traceId |
| 不记录的内容 | 查询串和请求体 |
| 路径的写法 | 记路由模板，比如 `/share/{token}`，不记原始地址。没有匹配的路由时记 `(unmatched)` |
| 滚动方式 | 每天一个文件，用 gzip 压缩 |
| 保留时间 | 默认 200 天，最少 180 天，没有总大小的上限 |

| 环境变量 | 默认值 | 作用 |
| --- | --- | --- |
| `MUGSUN_DEMO_ACCESS_LOG_PATH` | 日志目录 | 访问日志所在的目录 |
| `MUGSUN_DEMO_ACCESS_LOG_MAX_HISTORY` | `200` | 保留的天数 |
| `MUGSUN_DEMO_ACCESS_LOG_MIN_FREE_SPACE` | `10GB` | 磁盘可用空间低于这个值时告警 |

保留天数小于 180 或者写错时，后端按 180 天处理，并在启动时打一条 WARN。

到达后端之前就失败的请求不在这份日志里，比如被 Nginx 拒绝或超时的请求。它们记在 Nginx 的访问日志里，同样要保留六个月以上。

数据库里的接口日志和登录日志，演示模式下至少保留 180 天。

### 放在哪里，谁能看 {#access-log-storage}

- 日志目录要挂到持久卷上，容器重建后日志才不会丢。Compose 文件已经挂了 `boot-logs` 卷。
- 目录的属主是后端进程的用户，uid 是 10001。目录权限 0750，文件权限 0640。
- IP 和用户 ID 属于个人信息，只让运维和合规人员读取。
- 至少每周备份一份到别的机器。过了保留期就删除，不要另外复制到没人管的地方。

### 要多少磁盘 {#access-log-disk}

一行约 200 字节，压缩后约 20 字节。

| 每天的请求数 | 每天新增 | 200 天合计 | 当天未压缩的文件 |
| --- | --- | --- | --- |
| 100 万 | 约 20MB | 约 4GB | 约 200MB |
| 500 万 | 约 100MB | 约 20GB | 约 1GB |

按峰值流量估算，再留一倍余量。峰值每天 500 万次请求时，按 40GB 准备。

后端每小时检查一次日志所在磁盘的可用空间。低于阈值时打一条 WARN，恢复后打一条 INFO，中间不重复。

读不到磁盘空间时也只打一条 WARN。阈值建议不低于「峰值每天的请求数 × 200 字节 × 7」，也就是一周的写入量。

收到告警后扩容日志卷，或者把旧的归档转移走，不要删除不满 180 天的文件。磁盘写满以后，服务也会出错。

要求更高时，把访问日志同时采集到外部的日志系统，并在异地留存。

::: details 阈值和保留天数的写法
- 阈值的单位不区分大小写，按 1024 换算。可以写 `K` `KB` `KiB` 到 `T` `TB` `TiB`，不写单位或写 `B` 是字节。
- 数字和单位之间可以有空格，比如 `10 GB`。数字中间不能有空格。
- 阈值可以带小数，换算成字节后向下取整。`1.5G` 是 1610612736 字节。
- 阈值换算后是 0 或负数时，告警关闭，启动时打一条 WARN。
- 阈值无法解析时按 10GB 处理，并打一条 WARN。指数写法（如 `1e3G`）和超出范围的数都算无法解析。
- 保留天数带小数时向下取整，`200.5` 按 200 天。超过 2147483647 的按 2147483647 处理。
:::

### 写入方式 {#access-log-async}

访问日志先进队列，再由后台线程写盘，不拖慢请求。

队列满时，写入最多等 50 毫秒，等不到就丢掉这一行并计数。流量极大时可能丢少量访问日志。

| 配置项 | 默认值 | 作用 |
| --- | --- | --- |
| `mugsun.demo.access-log.offer-timeout-ms` | `50` | 队列满时最多等多少毫秒 |
| `mugsun.demo.access-log.drop-warn-interval-ms` | `60000` | 两次丢弃告警之间最少隔多少毫秒 |

丢弃的行数记在指标 `mugsun.demo.access_log.dropped` 里，日志里同时有一条限频的 WARN。

## 还没有的功能 {#todo}

下面几项还没有做，部署对外的演示站之前要自己补上：

- 每天定时重置示例数据。
- 敏感词过滤。
- 输出转义。
- 管理后台里的只读提示。现在写请求被拒绝时，页面上只有接口返回的那句「演示环境只读」。

## 下一步

<div class="ms-cards">

- [在线演示](/demo) 在本机试用，以及移动端组件的在线演示。
- [安全清单](/boot/security-checklist) 上线前逐项核对的安全设置。
- [Docker 部署](/pc/deploy-docker) 管理后台镜像的环境变量，以及前面还有网关时怎么设置。
- [内容安全策略（CSP）](/pc/csp) 演示站用的是拦截模式，这一页讲策略的内容。

</div>
