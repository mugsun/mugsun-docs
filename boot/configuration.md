# 配置参考

boot 采用 Spring Boot 标准配置：`application.yml` 给默认值，`application-prod.yml` 覆盖生产，本地覆盖写在 `config/application-local.yml`（已 gitignore，工作目录须为仓库根目录）。下表列出最常用的环境变量，完整键名以 `mugsun-boot-core/src/main/resources/application*.yml` 为准。

## 本地开发

```bash
cp config/application-local.yml.example config/application-local.yml
```

`config/application-local.yml` 最后加载，能覆盖 `application.yml` 和各模块自带配置（`mugsun-module-track.yml` 等）里的任意键，例如埋点库地址 `mybatis-flex.datasource.track.url`。[mugsun-boot #29](https://github.com/mugsun/mugsun-boot/pull/29) 之前它排在模块配置前面，模块键写在这里不生效，只能用环境变量（如 `TRACK_JDBC_URL`）覆盖；升级后原先被忽略的这些键会开始生效，请检查文件里是否留有旧值。

示例文件已带本地密钥占位（`sm4-key`、`api-key`）与 mock 社交登录。SM2 密钥对留空时每次启动临时生成，登录可能因密钥变化失败，建议填入固定的本地密钥对。

## 数据源与缓存（prod）

| 变量 | 说明 |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | 主库连接 |
| `REDIS_HOST` / `REDIS_PORT`（默认 6379）/ `REDIS_PASSWORD` / `REDIS_DB`（prod 默认 0） | Redis |
| `FILE_STORAGE_PATH`（默认 `/var/lib/mugsun/files/`）/ `FILE_DOMAIN` | 本地文件存储与访问域名 |
| `MUGSUN_FRONT_URL` | 管理台 origin，用于 OAuth 回跳等；开发默认 `http://localhost:3006`，prod 必填 |

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
| `MUGSUN_FILE_SIGN_SECRET` | 空 | 本地文件下载链接的签名密钥（至少 32 个字符），见下方「本地文件访问」 |

## 审计日志

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| `mugsun.audit.anonymous-max-pending`（环境变量 `MUGSUN_AUDIT_ANONYMOUS_MAX_PENDING`） | `64` | 未登录请求的操作日志最多同时排队多少条。超出的直接丢弃，并在日志里告警累计条数（第 1 条和每 100 条记一次）。已登录请求的审计不受限，不会丢 |

操作日志按哈希链落库。多实例部署时，各实例会在事务里锁住同一行链头再写入，并由唯一索引兜底，所以链不会分叉，不需要额外配置。

## 本地文件访问

开发环境（默认配置）下，本地存储的文件由应用在 `/file/**` 下直接提供。为避免私有附件被人拿着地址匿名下载：

- `mugsun/public/` 下的公开文件（如头像）仍可匿名访问。
- 其余文件必须带短时签名才能下载。登录后调用 `GET /system/file/download/{id}` 会返回一个带 `e`（过期时间）和 `s`（签名）参数的地址，默认 300 秒内有效；没有签名、签名不对或过期的请求一律返回 404。

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # 匿名可访问的路径前缀
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

`sign-secret` 留空时每次启动随机生成，只适合单实例；多实例部署必须给所有实例配置同一个值，否则一个实例签发的地址在另一个实例上会 404。`prod` profile 默认关闭 `/file/**` 直出，私有附件走授权下载接口，不受此项影响；如果在 `prod` 下手动开启直出，必须配置至少 32 个字符的 `sign-secret`，留空或过短都会拒绝启动。

直出的文件都带 `X-Content-Type-Options: nosniff`。HTML、SVG 等浏览器可能执行的类型以及 PDF 一律作为附件下载，不在浏览器里直接打开；HTML、SVG 等还会附加 `Content-Security-Policy: sandbox`。

## 操作日志排除

所有 Controller 的写接口（POST/PUT/DELETE/PATCH）会自动记一条操作日志（标题「自动留痕」）。浏览器高频调用、不属于管理操作的接口可以排除，不再写日志，也不参与操作日志的哈希链。默认排除埋点 SDK 的上报接口：

```yaml
mugsun:
  oper-log:
    exclude-paths:          # Ant 风格，按去掉 context-path 后的路径匹配
      - /track/collect
      - /track/replay
      - /track/api-body
```

配置这个列表会整体替换默认值，要保留这三项请一并写上；写成 `exclude-paths: []` 则全部留痕。排除只影响自动留痕，显式标了 `@OperationLog` 的接口照常记录，管理端的 `/system/track/**` 也不受影响。

## 可选模块

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS 模块 |
| `MUGSUN_TRACK_ENABLED` | `true` | 埋点模块 |
| `MUGSUN_AI_ENABLED` | `true` | AI 模块 |
| `POWERJOB_ENABLED` | `false` | PowerJob Worker；启用须独立部署 Server 并设置 `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / 空 | IP 归属地解析 |

三个模块开关不设置时开启；设置后只接受 `true` 或 `false`（不区分大小写，前后不能有空格），空值、`1`、`0` 等其它值会导致启动失败。完整规则见 [架构全景 · 模块装配](/guide/architecture#模块装配-两层开关)。

## AI 出站白名单

模型调用（对话、流式对话、向量）、知识库抓取、渠道 Webhook、MCP 远程调用和工作流 HTTP 节点在发起请求前统一做 SSRF 校验，默认拒绝内网、回环与云元数据地址。需要访问内网服务（如本地模型服务、内网 MCP）时显式放行：

```yaml
mugsun:
  ai:
    outbound:
      # 精确主机或 *.example.com 通配；命中即允许解析到内网地址
      allow-hosts: [localhost, ollama.internal]
      # 非白名单主机允许的端口；默认只放 80/443，[] 表示不限
      allowed-ports: [80, 443]
```

示例：本地 Ollama 默认监听 `http://localhost:11434`，把 `localhost` 加入 `allow-hosts` 后，模型管理、知识库、渠道中填写该地址才能保存和调用。`allow-hosts` 只能在平台配置文件里设置，租户无法自行放行内网地址；升级前已保存为内网地址的模型，在加入白名单之前调用会失败。

- 校验在保存配置（包括模型的接口地址）时和每个请求发出前各做一次，IP 直接写在地址里的也会被拦；只允许 `http` / `https`。
- 非白名单主机默认只能访问 80 和 443 端口，其它端口用 `allowed-ports` 放开；白名单主机不限端口。
- 建立连接时会再解析一次域名并逐个检查地址，然后直接连接检查过的那个地址。域名在检查之后才改指向内网（DNS rebinding）也连不上；只要解析结果里有一个地址落在禁止网段，整个请求就会被拒绝。
- 禁止网段包括私网、回环、链路本地、CGNAT（含云厂商元数据地址）、组播、保留与文档示例地址，IPv6 同样适用（含 `2001:db8::/32` 和 Teredo `2001::/32`），也包括内嵌这些 IPv4 地址的 IPv4-mapped、NAT64、6to4 地址。工作流 HTTP 节点不读 `allow-hosts`，一律禁止内网。
- 不会自动跟随重定向：对方返回 3xx 时请求就此结束，不会再去请求 `Location` 指向的地址。Webhook、MCP 或模型地址如果会跳转，请直接填写跳转后的最终地址。
- 默认 `allow-hosts: []`，即不放行任何内网地址；未命中白名单的公网主机不受影响。
- 云元数据地址始终拒绝，即使所在主机在 `allow-hosts` 中也不放行：整个链路本地段 `169.254.0.0/16`（含 `169.254.169.254`、AWS ECS 任务凭证 `169.254.170.2`、腾讯云 `169.254.0.23` 等），以及 `100.100.100.200` 和 `fd00:ec2::254`。IPv6 中内嵌 IPv4 的写法（`::ffff:` 映射、`::a.b.c.d` 兼容、NAT64 `64:ff9b::/96`、6to4 `2002::/16`）会先解出内嵌的 IPv4 再判断。
- `*.example.com` 匹配其任意子域名，不含 `example.com` 本身；`.local`、`.internal` 结尾的主机默认拒绝，需显式列出。只列确需访问的主机。

## 安全验证（行为验证码）

登录、注册、忘记密码发码和发送短信验证码默认需要先完成一道行为验证码。默认五种题型全部启用，每次随机出其中一种。验证码为 boot 自带实现，不依赖第三方服务。

```yaml
mugsun:
  captcha:
    enabled: true          # 全局开关
    store: redis           # redis | memory；memory 仅单机开发，prod 下启动失败
    slider:
      tolerance-px: 6      # 落点容差（底图原始像素，底图 320×180）
      expire-seconds: 120  # 挑战有效期
      token-expire-seconds: 120
      decoy-count: 2       # 假缺口数（与真缺口同轮廓）0–3
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
      sms-phone-per-minute: 5      # 发送短信短窗口：单手机号每分钟（仅令牌核销成功后计数，自动恢复）
      sms-ip-per-minute: 30        # 发送短信短窗口：单 IP 每分钟（所有请求计数，含没带令牌的）
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

题型共五种，服务端从该租户启用的题型里随机出一种：

- 滑块（`SLIDER`）。
- 旋转（`ROTATE`）。
- 文字点选（`WORD_CLICK`）：按字序依次点一个 3–4 字的常用词语或成语。
- 图标点选（`ICON_CLICK`）：依次点 3 个图标。
- 拼图还原（`JIGSAW`）：2×2。

取题和校验的规则如下：

- 前端按响应里的 `type` 渲染题目，请求里传 `type` 无效。
- `config` 返回的 `type` 在启用两种及以上题型时为 `RANDOM`，否则为具体题型名。
- 键盘模式（`inputMode: keyboard`）只从该租户已启用的滑块和旋转里选题。
- 两者都没启用时，键盘取题返回 `40015`（未启用无障碍验证方式），不会改出其他题型。
- 键盘取题先计单 IP 限流（`rate-limit.keyboard-challenge-per-minute`），再判断是否返回 `40015`。
- 被 `40015` 拒绝的请求也计入这个限流。
- 按租户的键盘取题数只在 Redis 里计数，不写审计。
- 只有 `40015` 会写审计日志，同一租户、同一 IP 10 分钟内只记一条。
- 全部在服务端校验，答案只存在题目记录里，校验一次即作废。
- 错误码、失败次数和锁定规则对所有题型相同。

```yaml
mugsun:
  captcha:
    default-types: [SLIDER, WORD_CLICK, ROTATE, ICON_CLICK, JIGSAW]   # 租户没单独设置时启用的题型（默认五种全开），每次随机出一种
    slider: { expire-seconds: 120, decoy-count: 2 }   # 题目有效期（秒）；滑块假缺口数（与真缺口同轮廓，0–3）
    rotate: { dir: classpath:captcha/rotate/, piece-size: 160, tolerance-deg: 10, keyboard-step: 5, track-replay-window-seconds: 600 }  # 同一条拖动轨迹在窗口内只能用一次，≤0 关闭
    click:  { count: 3, decoys: 2, min-radius-px: 22, min-duration-ms: 400, max-duration-ms: 30000, words-file: "" }  # count/decoys 只用于图标点选；words-file 为私有词库，空则用内置词库
    jigsaw: { rows: 2, cols: 2 }
    icon-dir: classpath:captcha/icons/   # 图标目录，须含 manifest.json 与 <slug>.png
    render-max-concurrent: 16           # 本节点同时出图上限，超限返回 40012；≤0 不限
    render-acquire-timeout-ms: 200      # 等待出图许可的最长毫秒数，超时返回 40012
    rate-limit:
      keyboard-challenge-per-minute: 10 # 键盘模式单 IP 每分钟取题上限
```

容差按“普通人 1–2 秒能过”设定：旋转 ±10°（服务端施加的角度是 `keyboard-step` 的整数倍，且在 30°–330° 之间），点选命中半径为字号或图标边长的 0.75 倍（至少 22 像素），点选元素两两之间的距离不小于两个命中半径之和再加 6 像素。旋转以提交的角度判对错；拖动轨迹除了判断是否为人在操作，首末位移换算出的角度 a_t（位移 ÷ 显示宽度 × 360°）还须满足 0.5 × 提交角度 − 10° ≤ a_t ≤ 提交角度 + 10°。前端可以做低速精调（低速时位移按 0.5 倍累加），轨迹的 x 须记这个累加后的逻辑位置，而不是指针原始坐标。同一条轨迹 10 分钟内只能用一次，重放会校验失败。旋转容差没有收到更窄：触屏松手通常会偏 3–8 像素，而连续失败会锁定，收紧容易误锁；也不按 `pointerType` 区分容差，因为它由客户端自报。盲猜的风险由失败锁定、限流和每题底图随机化兜底。点选和拼图的操作时长 0.4–30 秒从第一次操作算起；打开题目到第一次操作之间不计时，只受题目有效期 `slider.expire-seconds`（默认 120 秒）约束，过期校验返回 `40010`。

文字点选的词库和图标点选的规则如下：

- 词默认来自内置词库：自行整理的 477 条常用词语和成语，只用《通用规范汉字表》一级字。
- 内置词库随仓库公开，攻击者识别文字后可以用词典纠错。
- 生产建议用 `click.words-file` 换成私有词库，每行一个 3–4 字的词，`#` 开头为注释。
- 词里的字必须在内置字体子集里，否则该词会被忽略，并在启动日志里警告。
- 私有词库读不到或没有可用词时，回落内置词库。
- 画面里另有 1–2 个干扰字，优先取形近字或同音字。
- 点到干扰字或顺序不对即不通过。
- 文字用内置的思源黑体子集（SIL OFL 1.1）在服务端渲染并加干扰。
- 外形容易混淆的图标不会出现在同一题里。
- 图标清单缺失或损坏时，启动日志会给出警告，图标点选自动停用，不影响其他题型。
- 某租户只启用了图标点选时，取题返回 `40016`（验证方式暂不可用），不会改出滑块。
- 这种情况会写一条审计日志，同一租户、同一 IP 10 分钟内只记一条。

每道题都会做随机化处理：

- 底图和旋转图随机缩放、裁切、镜像和调色。
- 拼图块另加噪声和轻微色偏（每块 ±4），开局至少 3 块不在原位。
- 滑块的假缺口与真缺口轮廓相同，默认 2 个。
- 图标点选的图标不垫白色圆盘，改为贴合轮廓的投影和细描边，干扰线画在图标下面。
- 文字点选里笔画少于 3 的字（如“一”“十”“人”）只旋转 ±15°。

请求头 `Accept-Language` 只决定提示语言，英文时图标点选的提示名用英文，不影响出哪种题型。

点选题按出题时的底图尺寸判定，题目有效期内改尺寸配置不影响已出的题。

**素材来源与许可：**

- 来源：背景图和旋转图是本项目自有素材，由 Grok Bot 内置生图功能生成，经体验设计官缩放和裁切，无第三方素材。
- 图标、词库和干扰字映射由本项目自行整理。
- 确认：用户已于 2026-10-14 07:21 确认随仓库公开发布。
- 许可：与仓库代码一致（MIT）；字体子集为 SIL OFL 1.1。
- 详见 boot 仓库 `captcha/SOURCES.md`。

**旋转题是辅助题型：** 旋转题在平台默认的随机集里，但只能部分抵御自动求解。

- 圆孔用不透明纯色填充，圆图另做调色、模糊、噪点和边缘羽化。按孔内像素比对的求解器已经失效。
- 按圆图边缘与孔外图案的连续性求角，仍有约一半的题能落在 ±10° 内。
- 不能把旋转题当作唯一防线：要配合失败锁定和限流，并同时启用其他题型。
- 租户只启用 `ROTATE` 时仍会保存，但响应 `data.warning` 会给出提示。

**图标点选也是辅助题型：** 图标点选在平台默认的随机集里，只能部分抵御自动求解。

- 图标库（含 `manifest.json`）随仓库公开，攻击者可以直接拿图标做模板匹配。
- 回归测试用模板匹配求解器，每次 200 题。三个图标全部点对的比例当前约 2%，超过 20% 时 CI 失败。这只说明能挡住这一类求解器。
- 不能把图标点选当作唯一防线：要配合失败锁定和限流，并同时启用滑块或其他题型。
- 生产环境请换成私有图标库。
- 租户只启用 `ICON_CLICK` 时仍会保存，但响应 `data.warning` 会给出提示。

**随机多题型的取舍：** 五种题型随机出题时，攻击者可以反复刷新，等到最弱的题型再解，整体强度接近最弱的那一种。后续计划：

- 同一会话或 IP 在一段时间内固定题型
- 取了题没答或过期，也算一次失败
- 拼图改成 3×3，并加接缝扰动

**生产环境必须换私有图库：** 默认的底图（12 张）、旋转图（16 张）和图标（44 个）随开源仓库公开，攻击者可以拿公开原图和题图做差定位缺口，或预先做旋转、图标的答案表。生产部署请把 `background.dir`、`rotate.dir`、`icon-dir` 都换成自己的目录（`file:` 或 `classpath:`），并定期更换；图标目录须带 `manifest.json`（`slug`、`name_zh`、`name_en`、`confusable`；缺 `name_en` 时英文界面退回中文名）。`prod` 环境下仍在使用仓库自带素材时（按目录或文件哈希判断），启动日志会给出警告；没有配置 `click.words-file` 时同样计为使用自带素材。

错误码通过 HTTP 200 + `R.code` 返回：

| code | 含义 |
| --- | --- |
| `40010` | 题目已过期，重新取题 |
| `40011` | 未通过，重新取题（不提示具体原因） |
| `40012` | 尝试过多，`data.retryAfter` 秒后再试。触发锁定的那次失败（如鼠标第 5 次、键盘第 3 次）本身就返回 `40012`；只要校验失败时该 IP 已被锁定（包括并发请求或另一种输入方式刚锁上），也返回 `40012`。锁定期内取题和校验都返回 `40012` |
| `40013` | 需要验证码，但请求没带 `captchaToken`，或令牌已用过、已过期、不属于这个场景或租户。HTTP 状态码是 200，前端按 `code` 重新弹出验证码 |
| `40014` | 当前无需验证 |
| `40015` | 键盘模式取题，但该租户没有启用滑块或旋转（未启用无障碍验证方式） |
| `40016` | 该租户启用的题型此刻都不可用（例如只启用了图标点选而图标清单缺失），请联系管理员，不要自动重试 |

校验接口请求体上限 32KB（含分块传输），超限同样返回 HTTP 200 + `40011`。

**忘记密码：** `/auth/forget-code` 的邮件改为异步发送，响应时间不随账号是否存在而变化；对账号不存在、未绑定邮箱、邮件通道未配置或下发失败一律返回同一成功提示「如账号存在，验证码已发送至绑定邮箱」，具体原因只写服务端日志，避免借此判断账号是否存在或通道状态。部署后请检查邮件通道，否则用户收不到验证码却看到“已发送”。

**发送短信：** `/auth/sms-code` 依次执行：① 单 IP 短窗口（每分钟 30 次，所有请求都计数，包括没带令牌的，60 秒后自动恢复）；② 只读检查日配额（单手机号每天、单 IP 每小时），已超额时不消耗令牌；③ 核销 `captchaToken`；④ 单手机号短窗口（每分钟 5 次，只在令牌核销成功后计数）；⑤ 原子地「未超上限才计数」日配额；⑥ 发送。没带令牌或令牌无效的请求只计入 IP 短窗口，既不计入手机号短窗口也不占日配额，所以别人无法替你把某个号码锁住或把当天的配额刷光。发送失败不退还配额，并写入审计日志。超限一律返回 `40012` + `retryAfter`。手机号先去空格和 `-`、去 `+86`/`0086`/`86` 前缀，频控、发码与短信登录用同一号码。

**Redis 键：** 验证码状态都在前缀 `mugsun:captcha:v2:` 下（`store: memory` 时同名键在进程内）：

| 键 | 用途 | 过期 |
| --- | --- | --- |
| `challenge:<captchaId>` | 题目（答案与绑定信息），校验时取出即删 | `expire-seconds` |
| `token:<captchaToken>` | 一次性令牌，业务接口取出即删 | `token-expire-seconds` |
| `rl:challenge:<ip>` | 单 IP 每分钟取题计数 | 60 秒 |
| `rl:keyboard:<ip>` | 单 IP 每分钟键盘校验计数 | 60 秒 |
| `rl:global:<秒>` | 全局每秒取题计数 | 2 秒 |
| `rl:sms-phone:<号码哈希>` / `rl:sms-ip:<ip>` | 发送短信日配额（核销成功后才计） | 1 天 / 1 小时 |
| `rl:sms-burst-phone:<号码哈希>` / `rl:sms-burst-ip:<ip>` | 发送短信短窗口频率限制 | 60 秒 |
| `fail:<pointer\|keyboard>:<ip>` | 失败计数 | `fail-window-seconds` |
| `lock:<ip>` | IP 锁定，剩余 TTL 即 `retryAfter` | `lock-seconds` |

IPv6 地址中的 `:` 写成 `_`。手动解锁某 IP：`DEL mugsun:captcha:v2:lock:<ip>`。

::: warning 关闭验证码会去掉防爆破保护
`mugsun.captcha.enabled=false` 或关闭某个租户后，该租户的登录、注册和忘记密码发码不再要求人机验证，只剩登录失败锁定和频控。只在排查问题或前端尚未升级时临时关闭。
:::

**租户开关：** 每个租户默认开启。平台超管可调用 `POST /system/tenant/captcha`（`{"id": 租户主键, "enabled": false}`）关闭某个租户，操作会写入审计日志；其他租户不受影响。多节点部署时其他节点最多 60 秒后生效。发送短信验证码与租户无关，只看全局开关，并且有单手机号每天、单 IP 每小时的频控。客户端开关（`sys_client.captcha_enabled`）不参与判定，因为 clientId 由调用方填写。新建的租户一律开启。 平台超管还可以在同一接口里传 `types`（如 `{"id": 1, "enabled": true, "types": ["SLIDER", "ROTATE"]}`）设置该租户启用的题型，至少一种，取值只能是上面五种；不传 `types` 则不改；传 `null` 或 `[]` 清回平台默认（`default-types`）。设置里不含 `SLIDER` 和 `ROTATE` 时仍会保存，但响应 `data.warning` 会提示键盘用户将收到 `40015`。没设置过的租户使用 `default-types`。该设置保存在 `sys_tenant.captcha_types`（迁移 `V10__tenant_captcha_types.sql`）。

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
