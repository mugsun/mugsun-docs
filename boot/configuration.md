# 配置参考

这一页按主题列出 boot 常用的配置项和环境变量。boot 用 Spring Boot 的标准配置方式，配置来自三个文件：

| 文件 | 作用 |
| --- | --- |
| `application.yml` | 默认值，本地开发直接可用 |
| `application-prod.yml` | 激活 `prod` 后生效的生产默认值 |
| `config/application-local.yml` | 本机的覆盖配置，不进 git，最后加载 |

表里没列的键，以 `mugsun-boot-core/src/main/resources/application*.yml` 为准。

## 按场景找配置

| 要做的事 | 看这一节 |
| --- | --- |
| 在本机跑起来 | [本地开发](#本地开发) |
| 连数据库、Redis 和文件存储 | [数据源与缓存](#数据源与缓存) |
| 配初始口令和密钥 | [安全与密钥](#安全与密钥) |
| 关掉不用的模块 | [可选模块](#可选模块) |
| 让 AI 访问内网的模型服务 | [AI 出站白名单](#ai-出站白名单) |
| 开放用户注册 | [自助注册](#自助注册) |
| 调整登录时的人机验证 | [安全验证](#安全验证-行为验证码) |
| 接第三方账号登录 | [社交登录](#社交登录) |
| 弄清为什么拒绝启动 | [启动守卫与豁免开关](#启动守卫与豁免开关) |
| 准备上线 | [生产环境](#生产环境) |

## 本地开发

复制一份本机配置，按需修改：

```bash
cp config/application-local.yml.example config/application-local.yml
```

- 这个文件不进 git。启动时的工作目录要是仓库根目录，否则读不到它。
- 它最后加载，能覆盖 `application.yml` 和各模块自带配置里的任意键。
  - 模块自带配置指 `mugsun-module-track.yml` 这类文件。
  - 例如埋点库地址 `mybatis-flex.datasource.track.url` 可以直接写在这里。
- 示例文件不带任何密钥值，另外带了 mock 社交登录的配置。
- 默认连本机的 PostgreSQL 和 Redis，可以用环境变量改：
  - 数据库地址：`MUGSUN_DB_HOST`、`MUGSUN_DB_PORT`、`MUGSUN_DB_NAME`；
  - 数据库账号：`MUGSUN_DB_USERNAME`、`MUGSUN_DB_PASSWORD`；
  - Redis：`MUGSUN_REDIS_HOST`、`MUGSUN_REDIS_PORT`。
- `mvn spring-boot:run` 默认激活 `dev`。
  - 用 `java -jar` 启动时，自己加 `--spring.profiles.active=dev`。
- `dev` 下接口传输密钥和字段加密密钥可以留空，见[密钥与加密](/boot/crypto-keys#本地开发)。
- SM2 密钥对留空时每次启动临时生成。登录可能因为密钥变了而失败，建议填一对固定的本地密钥。

早期版本里，模块自带配置的键写在这个文件里不生效，只能用环境变量覆盖。更新后这些键会开始生效，文件里留有旧值的话先检查一遍。

## 数据源与缓存

下表是 `prod` 下读取的环境变量。

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `JDBC_URL` | — | 主库的 JDBC 地址 |
| `JDBC_USERNAME` / `JDBC_PASSWORD` | — | 主库账号 |
| `REDIS_HOST` | — | Redis 地址 |
| `REDIS_PORT` | `6379` | Redis 端口 |
| `REDIS_PASSWORD` | 空 | Redis 口令，留空表示没有口令 |
| `REDIS_DB` | `0` | Redis 库号 |
| `FILE_STORAGE_PATH` | `/var/lib/mugsun/files/` | 本地文件的存储目录 |
| `FILE_DOMAIN` | — | 文件的访问域名 |
| `MUGSUN_FRONT_URL` | — | 管理后台的地址，用于 OAuth 回跳等。生产必填，开发默认 `http://localhost:3006` |

缓存（JetCache）用的 Redis 地址由上面几个 `REDIS_*` 变量自动合成：

- 口令里的特殊字符会做百分号编码，不要自己在 yml 里把口令拼进地址。
- 显式配了 `jetcache.remote.default.uri` 时不会被覆盖，但启动时仍会解析核对。
- 覆盖 `jetcache.remote.default` 时，要在同一级保留 `type`。

## 安全与密钥

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | 内置 admin 账号的初始口令。生产没配会拒绝启动 |
| `MUGSUN_GM_ENABLED` | `true` | 国密总开关：传输用 SM2，摘要用 SM3 |
| `MUGSUN_SM4_KEY` | 空 | 字段加密密钥。`dev` 以外必填 |
| `MUGSUN_API_KEY` | 空 | 接口传输密钥，可选。没配时自动生成到 `~/.mugsun/api-transport.key` |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | 空 | SM2 传输密钥对（hex）。留空时启动临时生成并告警 |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 空 | 审计签名密钥对，可选。没配时自动生成到 `~/.mugsun/audit-sign-sm2.key` |
| `MUGSUN_HOME` | `~/.mugsun` | 自动生成的密钥文件所在目录，配置项 `mugsun.home` |
| `MUGSUN_STRICT_KEYS` | `false`，`prod` 为 `true` | 为 `true` 时，缺字段加密密钥或 SM2 传输密钥就拒绝启动。接口传输密钥和审计签名密钥照常自动生成 |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | 空 | 可信反向代理的网段，见[开放平台](/boot/open-api#客户端-ip-与可信代理) |
| `MUGSUN_FILE_SIGN_SECRET` | 空 | 本地文件下载链接的签名密钥，至少 32 个字符，见[本地文件访问](#本地文件访问) |

密钥的格式、自动生成的规则和旧数据的迁移，单独写在[密钥与加密](/boot/crypto-keys)。

关于初始口令：

- 重置密码、新建租户管理员、导入用户时，系统各自生成随机的一次性口令。
- 一次性口令在响应的 `initialPassword` 里返回一次，拿到它的账号首次登录必须改密。

### 关闭国密后的行为

`MUGSUN_GM_ENABLED` 对应配置项 `mugsun.crypto.gm-enabled`。关闭后：

- 登录、改密和注册时，密码不再用 SM2 加密，以明文提交，只靠 HTTPS 保护。
- 管理后台在运行时读取这个开关，自动停止加密，不需要重新构建。
- 通用摘要从 SM3 改为 SHA-256，目前只有加解密演示接口使用。
- 审计签名使用独立的 SM2 密钥，不受影响。
- 密码存储不受影响：服务端始终用加盐的慢哈希 BCrypt 存密码。

生产环境关闭国密会拒绝启动，除非同时设置豁免开关，见[启动守卫与豁免开关](#启动守卫与豁免开关)。等保或密评场景请保持开启。

## 审计日志

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `mugsun.audit.anonymous-max-pending` | `64` | 未登录请求的操作日志最多同时排队多少条 |

- 超出上限的日志直接丢弃，并告警累计条数：第 1 条记一次，之后每 100 条记一次。
- 已登录请求的审计不受这个上限约束，不会丢。

操作日志按哈希链落库。多实例部署时不需要额外配置：

- 各实例在事务里锁住同一行链头再写入；
- 另有唯一索引兜底，所以链不会分叉。

## 本地文件访问

开发环境下，本地存储的文件由应用在 `/file/**` 下直接提供。为了不让私有附件被人拿着地址匿名下载：

- `mugsun/public/` 下的公开文件（如头像）仍可匿名访问。
- 其余文件必须带短时签名才能下载。
  - 登录后调用 `GET /system/file/download/{id}`，会返回一个带签名的地址。
  - 地址里的 `e` 是过期时间，`s` 是签名，默认 300 秒内有效。
  - 没有签名、签名不对或过期的请求一律返回 404。

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # 匿名可访问的路径前缀
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

`sign-secret` 的规则：

- 留空时每次启动随机生成，只适合单实例。
- 多实例部署要给所有实例配同一个值，否则一个实例签发的地址在另一个实例上会 404。
- `prod` 默认关闭 `/file/**` 直出，私有附件走授权下载接口，不受这一项影响。
- 在 `prod` 下手动开启直出时，必须配至少 32 个字符的 `sign-secret`，留空或过短都会拒绝启动。

直出的文件都带 `X-Content-Type-Options: nosniff`：

- HTML、SVG 等浏览器可能执行的类型和 PDF，一律作为附件下载，不在浏览器里直接打开。
- HTML、SVG 等还会附加 `Content-Security-Policy: sandbox`。

## 操作日志排除

所有 Controller 的写接口（POST、PUT、DELETE、PATCH）会自动记一条操作日志，标题是「自动留痕」。

浏览器高频调用、不属于管理操作的接口可以排除。排除后不再写日志，也不参与操作日志的哈希链。

默认排除埋点 SDK 的上报接口：

```yaml
mugsun:
  oper-log:
    exclude-paths:          # Ant 风格，按去掉 context-path 后的路径匹配
      - /track/collect
      - /track/replay
      - /track/api-body
```

- 配置这个列表会整体替换默认值，要保留这三项就一并写上。
- 写成 `exclude-paths: []` 则全部留痕。
- 排除只影响自动留痕。显式标了 `@OperationLog` 的接口照常记录。
- 管理端的 `/system/track/**` 不受影响。

## 可选模块

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS 模块 |
| `MUGSUN_TRACK_ENABLED` | `true` | 埋点模块 |
| `MUGSUN_AI_ENABLED` | `true` | AI 模块 |
| `POWERJOB_ENABLED` | `false` | PowerJob Worker。启用时要独立部署 Server，并设置 `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` | `false` | IP 归属地解析，见 [IP 归属地](#ip-归属地) |

三个模块开关不设置时是开启的。设置后只接受 `true` 或 `false`：

- 不区分大小写，前后不能有空格。
- 空值、`1`、`0` 等其他值会导致启动失败。

完整规则见架构页的[两层开关](/guide/architecture#模块装配-两层开关)。

## 知识库资料上传上限

知识库上传的文件和远程 `fileUrl` 抓取的文件，单个默认不超过 20MB。可以在平台配置里调整：

```yaml
mugsun:
  ai:
    kb:
      max-upload-bytes: 20971520   # ≤0 时回落 20MB
```

- 只接受 `pdf`、`docx`、`pptx` 三种扩展名，另外校验 MIME 和文件头。
- 解析用 Apache Tika，不做 OCR。

详见 [AI 中心](/pc/ai-center)。

## AI 出站白名单

下面这些请求在发出前统一做 SSRF 校验，默认拒绝内网、回环和云元数据地址：

- 模型调用：对话、流式对话、向量
- 知识库抓取
- 渠道 Webhook
- MCP 远程调用
- 工作流的 HTTP 节点

要访问内网服务（如本地模型服务、内网 MCP）时，显式放行：

```yaml
mugsun:
  ai:
    outbound:
      # 精确主机或 *.example.com 通配；命中即允许解析到内网地址
      allow-hosts: [localhost, ollama.internal]
      # 非白名单主机允许的端口；默认只放 80/443，[] 表示不限
      allowed-ports: [80, 443]
```

例如本地 Ollama 默认监听 `http://localhost:11434`。

把 `localhost` 加入 `allow-hosts` 之后，模型管理、知识库、渠道里填这个地址才能保存和调用。

### 白名单怎么写

- 默认 `allow-hosts: []`，不放行任何内网地址。没命中白名单的公网主机不受影响。
- `allow-hosts` 只能在平台配置文件里设置，租户不能自己放行内网地址。
- `*.example.com` 匹配它的任意子域名，不含 `example.com` 本身。
- `.local`、`.internal` 结尾的主机默认拒绝，要显式列出。
- 非白名单主机默认只能访问 80 和 443 端口，其他端口用 `allowed-ports` 放开。
- 白名单主机不限端口。
- 升级前已经保存为内网地址的模型，加入白名单之前调用会失败。
- 只列确实要访问的主机。

### 校验怎么做

- 只允许 `http` 和 `https`。
- 保存配置（包括模型的接口地址）时校验一次，每个请求发出前再校验一次。
- 地址里直接写 IP 也会被拦。
- 建立连接时会再解析一次域名，逐个检查地址，然后直接连检查过的那个地址。
  - 域名在检查之后才改指向内网（DNS rebinding）也连不上。
  - 解析结果里只要有一个地址落在禁止网段，整个请求就被拒绝。
- 不自动跟随重定向。对方返回 3xx 时请求就此结束，不会去请求 `Location` 指向的地址。
  - Webhook、MCP 或模型地址如果会跳转，请直接填跳转后的最终地址。
- 工作流的 HTTP 节点不读 `allow-hosts`，一律禁止内网。

### 禁止的网段

- 私网、回环、链路本地、CGNAT、组播、保留地址和文档示例地址。
- IPv6 同样适用，包括 `2001:db8::/32` 和 Teredo `2001::/32`。
- 内嵌 IPv4 的 IPv6 写法，会先解出内嵌的 IPv4 再判断：
  - `::ffff:` 映射、`::a.b.c.d` 兼容；
  - NAT64 `64:ff9b::/96`、6to4 `2002::/16`。

云元数据地址始终拒绝，即使所在主机在 `allow-hosts` 里也不放行：

- 整个链路本地段 `169.254.0.0/16`，含 `169.254.169.254`；
- AWS ECS 任务凭证 `169.254.170.2`、腾讯云 `169.254.0.23`；
- `100.100.100.200` 和 `fd00:ec2::254`。

## 自助注册

| 配置项 | 取值 | 默认 | 说明 |
| --- | --- | --- | --- |
| `mugsun.auth.register.mode` | `OFF` / `OPEN` / `APPROVAL` | 生产 `OFF`；dev、test、local `OPEN` | 主配置。`APPROVAL`（注册后审核）尚未实现，设成它应用拒绝启动 |
| `mugsun.auth.register.enabled` | `true` / `false` | 不设 | 简写：`true` 等于 `OPEN`，`false` 等于 `OFF`。与 `mode` 同时设且含义冲突时拒绝启动 |
| `mugsun.auth.register.rate-limit.per-ip` | 整数 | `10` | 同一 IP 每个窗口内最多注册请求数 |
| `mugsun.auth.register.rate-limit.per-account` | 整数 | `5` | 同一账号、同一手机号每个窗口内最多注册请求数 |
| `mugsun.auth.register.rate-limit.window-seconds` | 秒 | `3600` | 限流窗口 |

- 「是不是生产」只看显式的 `spring.profiles.active`。
  - 非空、含 `dev`、`test` 或 `local`、且不含 `prod`，才算非生产。
  - 只配 `spring.profiles.default=dev`，或没有 active profile，都按生产处理。
- 关闭时 `POST /auth/register` 返回 404；超过限流返回 HTTP 429。
- **部署在反向代理后面，必须设 `MUGSUN_OPENAPI_TRUSTED_PROXIES`**。
  - 值是代理的 IP 或网段，逗号分隔。
  - 不设时整站请求都算一个 IP，每小时总共只能注册 10 次。
- 公开配置 `GET /auth/captcha/config` 返回 `data.registerMode`。
  - 取值 `OFF` / `OPEN` / `APPROVAL`，登录页据此隐藏注册入口。
- 注册成功后的角色由系统参数 `security.register.register-role-code` 决定。
  - V14 播种为 `user`；置空则不挂角色。
  - `security.register.default-role-code` 留给其他默认归属场景。
- 演示站（`prod,demo`）不开放注册，不要设置上面的开关。

## 安全验证（行为验证码）

登录、注册、忘记密码发码和发送短信验证码，默认都要先通过一道行为验证码。验证码是 boot 自带的实现，不依赖第三方服务。

最常用的三项配置：

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `mugsun.captcha.enabled` | `true` | 全局开关 |
| `mugsun.captcha.store` | `redis` | 题目和令牌存在哪里。`memory` 只用于单机开发，`prod` 下启动失败 |
| `mugsun.captcha.default-types` | 五种全开 | 租户没单独设置时启用的题型，每次随机出一种 |

题型、接口、限流、错误码和上线前要换的素材，单独写在[行为验证码](/boot/captcha)。

## 社交登录

社交登录基于 JustAuth，支持四个来源，来源名不区分大小写：

- `github`
- `gitee`
- `qq`
- `wechat_open`：微信开放平台扫码

```yaml
mugsun:
  social:
    enabled: true            # 总开关，为 false 时所有来源都拒绝
    type:
      github:
        client-id: <应用 ID>
        client-secret: <应用密钥>
        redirect-uri: <在第三方平台登记的回调地址>
        scopes: []
```

- 同时填了 `client-id` 和 `client-secret` 的来源才会出现在 `GET /auth/social/sources` 里。
- 登录页按这个接口的结果显示社交登录按钮。
- 没有配置任何来源时，登录页隐藏社交登录区域，不影响启动。
- `redirect-uri` 由部署方按来源配置，后端不拼接。管理后台的回调页是 `/auth/social-callback`。
- 管理后台使用 hash 路由，回调地址里会带 `#`。各平台是否接受这种地址请先在对应平台实测。
- 登录流程：`GET /auth/social/render/{source}` 取授权地址，回调页再调 `POST /auth/social/login`。
- 已登录用户用 `POST /auth/social/bind` 绑定，用 `DELETE /auth/social/unbind/{source}` 解绑。
- 第三方账号未绑定时，管理端不会自动注册，会提示先登录再绑定。
- 只有 `clientType=app` 的移动端请求会自动建号并绑定，账号归入默认租户。
- 同一个第三方账号已绑定其他用户时，再绑定会报错。账号停用或租户失效时拒绝登录。
- 社交登录会写入登录日志，类型为 `social`。

`mock` 来源只用于本地联调：需要 `mock-enabled: true` 并配置 `type.mock`，示例文件里已经带好。`prod` 下强制关闭。

## IP 归属地

登录日志的 IP 归属地默认关闭。未开启时，登录日志列表的归属地显示为 `-`。

| 配置项 | 环境变量 | 默认 | 说明 |
| --- | --- | --- | --- |
| `mugsun.ip2region.enabled` | `MUGSUN_IP2REGION_ENABLED` | `false` | 是否解析 IP 归属地 |
| `mugsun.ip2region.xdb-path` | `MUGSUN_IP2REGION_XDB_PATH` | 空 | xdb 数据文件在服务器上的绝对路径 |

开启步骤：

1. 从 GitHub 上 lionsoul2014/ip2region 仓库的 `data` 目录下载 `ip2region_v4.xdb`，仓库里不带这个文件。
2. 把文件放到服务器本地目录，用 `xdb-path` 指向它，再设 `enabled=true`。

补充说明：

- 使用前请查看上游仓库的许可证。
- 只支持 IPv4。开启后显示为「国家 省份 城市」，不显示运营商。
- 开启了但没配路径，或文件加载失败时，后端只记错误日志并停用解析，不会阻止启动。

## 单号生成

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `mugsun.serial-number.provider` | `redis` | 单号生成方式，可选 `redis` 或 `db` |

- `redis`：用 Redis 原子自增，启动时按数据库里的最后一个值预热，避免号码倒退。
- `db`：在事务内用行锁生成，不依赖 Redis，吞吐量较低，适合没有 Redis 或要求强一致的场景。
- 配成其他值时启动不报错，但生成单号会失败。一次最多生成 1000 个单号。
- 多节点部署时，所有节点必须使用同一种方式。
- `redis` 方式要求所有节点连接同一个 Redis，建议开启持久化。

单号规则怎么定义，见[单号规则](/boot/features/serial-number)。

## 数据库 schema

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `mugsun.db.default-schema` | 空 | 业务表所在的 schema |

这个配置项用于人大金仓等 PG 协议数据库：把业务表放在独立的 schema 里，避免和系统目录冲突。

- 设置后，业务表（`track_*` 除外）和手写 SQL 的表名都会加上这个 schema 前缀。
- Flyway 也会使用这个 schema，并自动创建它。
- 留空时不做任何处理，使用数据库连接默认的 schema，PostgreSQL 下通常是 `public`。
- openGauss 未经测试。

## 启动守卫与豁免开关

下面几项在生产环境配错时，后端拒绝启动。

### 怎么判定是不是生产

只看显式激活的 profile，也就是 `spring.profiles.active`。

profile 名先去掉首尾空白，再转成小写比较，所以 `DEV` 与 `dev` 等价。

- active 非空、含 `dev`、`test`、`local` 之一，并且不含生产名，才算开发环境。
- 生产名是 `prod`、`production`、`prd`、`staging`。
  - active 里只要有其中一个就按生产处理，即使同时带 `dev`。
- 没配任何 profile 也按生产处理。
  - 本地自测请显式加 `--spring.profiles.active=dev`。
  - `mvn spring-boot:run` 已默认激活 `dev`。
- 其他名字（如 `demo`、`qa`）单独出现时也按生产处理。
- 不看 `spring.profiles.default`：只配了 `default=dev`、没有 active，也按生产处理。

### 会拒绝启动的配置

| 配置 | 生产中的危险值 | 豁免开关 |
| --- | --- | --- |
| `mugsun.security.init-password` | 未注入 | 无 |
| `mugsun.lab.seed-fronttest` | `true`，会创建弱口令的联调账号 | 无 |
| `mugsun.open-api.sign-required` | `false` | `mugsun.open-api.i-understand-unsigned-requests-are-insecure=true` |
| `mugsun.crypto.gm-enabled` | `false` | `mugsun.crypto.i-understand-plaintext-passwords-rely-on-tls=true` |

豁免开关只用于确实无法满足要求的场景。开启后每次启动都会打 WARN 日志。

### 关闭国密后的 HTTPS 要求

关闭国密后，密码完全靠 TLS 保护。即使开了豁免，生产环境下这些请求也必须是 HTTPS，否则直接拒绝：登录、注册、改密、重置密码。

- 服务端按 `request.isSecure()` 判定是不是 HTTPS。
- 部署在反向代理后面时，代理要传 `X-Forwarded-Proto`。
- 后端同时要配置 `server.forward-headers-strategy=native`。
- 单独伪造这个请求头不会被采信。

## 生产环境

激活 `prod` 会做三件事：

- 关闭接口文档（springdoc 和 swagger-ui）；
- 把 `strict-keys` 设为 `true`；
- 关闭 mock 社交登录。

最小启动示例，`******` 和 `...` 换成你自己的值：

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
# 容器不挂卷或多实例部署时，下面两类也要配
export MUGSUN_API_KEY=******
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

密钥可以用 boot 仓库的 `scripts/gen-keys.sh` 一次生成，见[生成密钥](/boot/crypto-keys#生成密钥)。

上线前逐项过一遍[安全清单](/boot/security-checklist)。

## 下一步

<div class="ms-cards">

- [密钥与加密](/boot/crypto-keys) 四类密钥怎么配，旧数据怎么迁移。
- [行为验证码](/boot/captcha) 题型、接口、限流和上线前要换的素材。
- [安全清单](/boot/security-checklist) 上线前逐项核对，每项都有自检方法。

</div>
