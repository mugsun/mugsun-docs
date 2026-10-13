# 配置参考

boot 采用 Spring Boot 标准配置：`application.yml` 给默认值，`application-prod.yml` 覆盖生产，本地覆盖写在 `config/application-local.yml`（已 gitignore，工作目录须为仓库根目录）。下表列出最常用的环境变量，完整键名以 `mugsun-boot-core/src/main/resources/application*.yml` 为准。

## 本地开发

```bash
cp config/application-local.yml.example config/application-local.yml
```

示例文件已带本地密钥占位（`sm4-key`、`api-key`）与 mock 社交登录。SM2 密钥对留空时每次启动临时生成，登录可能因密钥变化失败，建议填入固定的本地密钥对。

## 数据源与缓存（prod）

| 变量 | 说明 |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | 主库连接 |
| `REDIS_HOST` / `REDIS_PORT`（默认 6379）/ `REDIS_PASSWORD` / `REDIS_DB`（prod 默认 0） | Redis |
| `FILE_STORAGE_PATH`（默认 `/var/lib/mugsun/files/`）/ `FILE_DOMAIN` | 本地文件存储与访问域名 |
| `MUGSUN_FRONT_URL` | 管理端 origin，用于 OAuth 回跳等；开发默认 `http://localhost:3006`，prod 必填 |

## 安全与密钥

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | 初始管理员口令。prod 未注入或仍为内置默认口令时拒绝启动 |
| `MUGSUN_GM_ENABLED` | `true` | 国密总开关（传输 SM2 / 摘要 SM3） |
| `MUGSUN_SM4_KEY` | 空 | SM4 字段加密密钥 |
| `MUGSUN_API_KEY` | 空 | 接口加解密 SM4 密钥 |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | 空 | SM2 传输密钥对（hex）；留空启动时生成并告警 |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 空 | 审计签名密钥对，与传输密钥分离 |
| `MUGSUN_STRICT_KEYS` | `false`（prod 为 `true`） | 为 `true` 时任一密钥缺失即拒绝启动 |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | 空 | 可信反向代理 CIDR 列表，见 [开放平台](/boot/open-api#客户端-ip-与可信代理) |

## 可选模块

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS 模块 |
| `MUGSUN_TRACK_ENABLED` | `true` | 埋点模块 |
| `MUGSUN_AI_ENABLED` | `true` | AI 模块 |
| `POWERJOB_ENABLED` | `false` | PowerJob Worker；启用须独立部署 Server 并设置 `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / 空 | IP 归属地解析 |

## AI 出站白名单

知识库抓取、渠道 Webhook 与 MCP 远程调用在发起请求前统一做 SSRF 校验，默认拒绝内网、回环与云元数据地址。需要访问内网服务（如本地模型服务、内网 MCP）时显式放行：

```yaml
mugsun:
  ai:
    outbound:
      # 精确主机或 *.example.com 通配；命中即允许解析到内网地址
      allow-hosts: [localhost, ollama.internal]
```

示例：本地 Ollama 默认监听 `http://localhost:11434`，把 `localhost` 加入 `allow-hosts` 后，知识库 / 渠道中填写该地址才能保存和调用。

- 校验在保存配置时和实际发请求前各做一次；只允许 `http` / `https`。
- 默认 `allow-hosts: []`，即不放行任何内网地址；未命中白名单的公网主机不受影响。
- `*.example.com` 匹配其任意子域名，不含 `example.com` 本身；`.local`、`.internal` 结尾的主机默认拒绝，需显式列出。只列确需访问的主机。

## 安全验证（滑块验证码）

登录、注册、忘记密码发码和发送短信验证码默认需要先完成滑块拼图。验证码为 boot 自带实现，不依赖第三方服务。

```yaml
mugsun:
  captcha:
    enabled: true          # 全局开关
    type: SLIDER           # SLIDER（默认）| IMAGE（旧数字码，保留一个版本）
    store: redis           # redis | memory；memory 仅单机开发，prod 下启动失败
    slider:
      tolerance-px: 6      # 落点容差（底图原始像素，底图 320×180）
      expire-seconds: 120  # 挑战有效期
      token-expire-seconds: 120
      decoy-count: 1       # 假缺口 0–2
      keyboard-step-px: 4  # 键盘模式每次按键移动的原始像素
      bind-ip: false       # 令牌强制绑定 IP / UA（关闭时只记录）
      bind-ua: false       # prod 默认 true
    background:
      dir: classpath:captcha/bg/   # 也可 file:/opt/mugsun/captcha-bg/
      rotate: random               # random | round-robin
      reload-seconds: 600          # 目录重扫间隔，0 = 只在启动时加载
    rate-limit:
      challenge-per-minute: 30     # 单 IP 每分钟取题
      verify-fail-max: 5           # 10 分钟内失败次数，超过锁定 10 分钟（键盘模式 3 次）
      global-challenge-per-second: 200   # 全局每秒取题上限（Redis 存储时跨节点共享）
      sms-phone-per-day: 10        # 发送短信：单手机号每天
      sms-ip-per-hour: 20          # 发送短信：单 IP 每小时
```

完整键名与默认值见 `application.yml` 的 `mugsun.captcha`。

**背景图：** 放 jpg 或 png，推荐 640×360（16:9），单张不超过 200KB，至少 20 张，避免大面积纯色。目录为空时使用纯色占位。只用自有或允许商用的图片，并在目录里用 `SOURCES.md` 记下来源。

**接口：**

| 接口 | 说明 |
| --- | --- |
| `GET /auth/captcha/config?scene=&clientId=&tenantId=` | 是否需要验证，仅供前端提示 |
| `POST /auth/captcha/challenge` | 取底图与拼图块，有效期 `expireSeconds` |
| `POST /auth/captcha/verify` | 提交落点与轨迹（或键盘模式的按键次数），换取一次性 `captchaToken` |

`scene` 取 `login`、`register`、`sms`（发送短信验证码）、`forget`。取题时用 `inputMode` 声明鼠标/触屏（`pointer`）还是键盘（`keyboard`），校验时必须一致；键盘题会返回 `keyboardStep`，按键次数要与落点对得上。拿到的 `captchaToken` 放进 `/auth/login`、`/auth/register`、`/auth/sms-code`、`/auth/forget-code` 的请求体，只能用一次，且必须与取题时的场景、客户端、租户一致。服务端会自行判断是否需要验证，不以 `config` 的结果为准。

错误码通过 HTTP 200 + `R.code` 返回：

| code | 含义 |
| --- | --- |
| `40010` | 题目已过期，重新取题 |
| `40011` | 未通过，重新取题（不提示具体原因） |
| `40012` | 尝试过多，`data.retryAfter` 秒后再试。触发锁定的那次失败（如鼠标第 5 次、键盘第 3 次）本身就返回 `40012`，锁定期内取题和校验也都返回 `40012` |
| `40013` | 缺少有效的 `captchaToken` |
| `40014` | 当前无需验证 |

校验接口请求体上限 32KB（含分块传输），超限同样返回 HTTP 200 + `40011`。

**忘记密码：** `/auth/forget-code` 对账号不存在、未绑定邮箱、邮件通道未配置或下发失败一律返回同一成功提示，具体原因只写服务端日志，避免借此判断账号是否存在或通道状态。部署后请检查邮件通道，否则用户收不到验证码却看到“已发送”。

**发送短信：** `/auth/sms-code` 先检查手机号与 IP 频控，再核销 `captchaToken`，超额时不消耗令牌。手机号先去空格和 `-`、去 `+86`/`0086`/`86` 前缀，频控、发码与短信登录用同一号码。

**Redis 键：** 验证码状态都在前缀 `mugsun:captcha:v2:` 下（`store: memory` 时同名键在进程内）：

| 键 | 用途 | 过期 |
| --- | --- | --- |
| `challenge:<captchaId>` | 题目（答案与绑定信息），校验时取出即删 | `expire-seconds` |
| `token:<captchaToken>` | 一次性令牌，业务接口取出即删 | `token-expire-seconds` |
| `rl:challenge:<ip>` | 单 IP 每分钟取题计数 | 60 秒 |
| `rl:keyboard:<ip>` | 单 IP 每分钟键盘校验计数 | 60 秒 |
| `rl:global:<秒>` | 全局每秒取题计数 | 2 秒 |
| `rl:sms-phone:<号码哈希>` / `rl:sms-ip:<ip>` | 发送短信频控 | 1 天 / 1 小时 |
| `fail:<pointer\|keyboard>:<ip>` | 失败计数 | `fail-window-seconds` |
| `lock:<ip>` | IP 锁定，剩余 TTL 即 `retryAfter` | `lock-seconds` |

IPv6 地址中的 `:` 写成 `_`。手动解锁某 IP：`DEL mugsun:captcha:v2:lock:<ip>`。

**租户开关：** 每个租户默认开启。平台超管可调用 `POST /system/tenant/captcha`（`{"id": 租户主键, "enabled": false}`）关闭某个租户，操作会写入审计日志；其他租户不受影响。多节点部署时其他节点最多 60 秒后生效。发送短信验证码与租户无关，只看全局开关，并且有单手机号每天、单 IP 每小时的频控。滑块模式下客户端开关（`sys_client.captcha_enabled`）不能关闭验证码，因为 clientId 由调用方填写；它只在旧数字码模式下对登录生效。新建的租户一律开启。

## 生产环境

`prod` profile 会关闭 OpenAPI 文档（springdoc / swagger-ui）、强制 `strict-keys: true`、关闭 mock 社交登录。最小启动示例：

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=****** MUGSUN_API_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

上线前逐项过一遍 [安全清单](/boot/security-checklist)。
