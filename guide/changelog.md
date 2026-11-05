# 更新日志

各仓根目录维护中文 `CHANGELOG.md`（Keep a Changelog 格式），正式版本以 GitHub Releases 为准。本页摘要对使用者有影响的变更。

## 2026-11-05 · 零配置文档收口

### mugsun-docs

- [快速开始](/guide/getting-started) 对齐 boot/pc README。
- Docker 试用写明 GHCR `postgis-pgvector:16-3.4`，不必本机构建。
- 管理台只需 clone pc → `pnpm install && pnpm dev`。
- 默认 npm `@mugsun/track-web@0.3.0`；源码联调为可选 `pnpm link`。
- FAQ 去掉强制 `setup:sdk`；Apple Silicon 对齐 GHCR。

## 2026-11-05 · 知识库文档解析

### mugsun-boot / mugsun-pc / mugsun-docs

- 知识库资料支持 PDF / DOCX / PPTX：Tika 抽文进既有分段。
- multipart：`POST /system/ai/knowledge/asset/upload-file`。
- JSON `upload` 仍在；`fileUrl` 下载后走 Tika。
- 白名单：扩展名 + MIME + 魔数；默认 20MB。
- 配置键：`mugsun.ai.kb.max-upload-bytes`。
- 失败保留 `failed` + `failReason`，不写假分段。
- 成功进既有分段与 RRF 检索。
- 排除 OCR；x-file-storage MIME 与 parsers SPI 隔离。
- 详见 [AI 中心 · 知识库资料解析](/pc/ai-center)。

## 2026-11-05 · 问数据

### mugsun-boot / mugsun-pc / mugsun-docs

- 管理台「问数据」：自然语言只读查自家埋点。
- `POST /system/track/ask`；入口权 `sys:track-ask:list`（V19）。
- 意图二次校验既有 track 读权；unsupported 仍 200。
- 数字只走 TrackAnalysis / Funnel / Retention；不做 NL2SQL。
- LLM 只抽意图，失败降级规则，不编造数；回放 ≤5 带 appKey。
- 管理台默认真接口；仅 DEV 且 `VITE_TRACK_ASK_MOCK=true` 才 mock。
- `resultType`：`metrics` / `series` / `table` / `raw` / `unsupported`。
- 回放跳 `/track/replay?sessionId&appKey`。详见 [问数据](/track/ask)。

## 2026-11-05 · 错误问题单

### mugsun-boot / mugsun-pc / mugsun-docs

- 管理台「错误问题单」：列表 / 详情 / 指派 / 解决 / 重开。
- 状态 `OPEN` / `ASSIGNED` / `RESOLVED`。
- 筛 release 时带 `releaseFlag`（`NEW` / `REGRESSED` / `ONGOING`）。
- API `/system/track/error-issues`；读 list、写 edit；详情与写须带 `appKey`。
- 与 release 关联；详情可跳回放与用户细查。无工作流自动建单。
- 详见 [错误问题单](/track/error-issues)。

## 2026-11-05 · track `release` 构建注入

### mugsun-track / mugsun-docs

- [安装与初始化](/track/install) 补充 `release`：可用 Vite `import.meta.env.VITE_APP_VERSION` / CI 注入。
- 变量须应用自行注入构建；未配置不上报，配置后错误事件携带。

## 2026-11-04 · ICON_CLICK seed-warp

### mugsun-boot / mugsun-docs

- ICON_CLICK 渲染默认每题 seed-warp 网格形变，抗公开库模板匹配（[mugsun-boot#77](https://github.com/mugsun/mugsun-boot/issues/77)）。
- `mugsun.captcha.click.seed-warp-strength` 默认 0.14；`0`=关；有效钳位约 `[0, 0.35]`。
- 仍为辅助题型，勿单独作为唯一防线（沿用 #35）。
- 模板匹配全解约 0–1/200；详见 [配置说明 · 安全验证](/boot/configuration#安全验证-行为验证码)。

## 2026-11-04 · GIS wraps_antimeridian 与部分 GiST

### mugsun-boot / mugsun-docs

- `gis_feature.wraps_antimeridian` 生成列 + 部分 GiST（[mugsun-boot#76](https://github.com/mugsun/mugsun-boot/issues/76)）。
- 判定同 #73；跨 180° 查询走 `ST_ShiftLongitude`；无 PostGIS / 无表跳过。
- V16 加列、V17 `CREATE INDEX CONCURRENTLY`；主库 Flyway 须直连 PG 或 PgBouncer session。
- 详见 [GIS 已知限制](/pc/gis#metric-limits)。

## 2026-11-04 · GIS 包极点面 area/buffer/距离

### mugsun-boot / mugsun-docs

- 包极点面不再误拒或静默丢极冠（[mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63)）。
- 沿环累计经度 ≈ ±360° 判包极点；面积直接 `PolygonArea`。
- 缓冲/距离用极点原点 AEQD，按 RFC 7946 极地切口写出。
- 绕极环入库改写为 ±180 接极点；PostGIS 极冠缓冲回落 Java，不再 skip。
- 不规则包极面缓冲为等纬 RFC 极冠近似。详见 [GIS 已知限制](/pc/gis#metric-limits)。

## 2026-11-04 · 演示访问日志 AsyncAppender 丢弃

### mugsun-boot / mugsun-docs

- 队列满时 offer 约 50ms 后丢弃并计数+限频 WARN；指标 `mugsun.demo.access_log.dropped`。详见[只读演示](/demo#访问日志留存)。

## 2026-11-03 · JetCache Redis URI 与 FAQ（#70 / #103）

### mugsun-boot / mugsun-docs

- Redis 口令特殊字符问题已修：EPP 合成 JetCache uri 并百分号编码。
- 常见问题改为「已修」，并说明显式 uri 旁路与 `remote.default` 须保留 `type`。
- Docker 部署页补充 EPP / 空白口令 / port·db 可选说明。

## 2026-11-03 · 演示访问日志路径模板

### mugsun-boot / mugsun-docs

- 访问日志改记路由模板（如 `/share/{token}`），无匹配记 `(unmatched)`。详见[只读演示](/demo#访问日志留存)。

## 2026-11-03 · 零配置快速开始

### mugsun-boot / mugsun-docs

- [快速开始](/guide/getting-started) 首推 `docker-compose.full.yml` 一条命令。
- 不再要求复制 `application-local.yml`；口令用 `init show` 查看，不写进文档明文。

## 2026-10-21 · 常见问题与报错速查

### mugsun-docs

- 新增[报错速查](/guide/errors)，每条写明报错原文、原因和处理办法。
- [常见问题](/guide/faq)新增「部署与运行」一节，按现象、原因、解决来写。

## 2026-10-21 · 升级指南

### mugsun-docs

- 新增[升级指南](/guide/upgrade/)章，列出各仓的 tag 和已发布版本。
- 新增 core 0.1.0 → 0.2.0 和埋点 SDK 0.1.0 → 0.2.0 两篇。
- 定时任务页的验证 SQL 已对照 PowerJob 5.1.2 核实。

## 2026-10-21 · 功能特性索引

### mugsun-docs

- 新增[功能特性](/boot/features/)索引，列出主干上已有的功能。
- 新增十页功能说明，每页按能干什么、怎么开、怎么用、注意点组织。
- 已有专章的功能在索引里直接链接，结尾有「看效果」。

## 2026-10-21 · 多租户与数据权限

### mugsun-docs

- 新增[多租户](/boot/tenant/)三节：概述、租户与套餐、在代码里切换租户。
- 新增[数据权限](/boot/datascope/)三节：概述、在接口上启用、数据权限规则。
- 每节结尾有「看效果」，附可复制的验证 SQL。

## 2026-10-21 · 代码生成专章

### mugsun-docs

- 新增[代码生成](/boot/codegen/)四节：概述、AI 辅助建模、导入已有表、预览和下载产物。
- 每节结尾有「看效果」，给出操作步骤和结果截图。

## 2026-10-21 · 后端开发入门

### mugsun-docs

- 新增[开发入门](/boot/tutorial/first-api)四节：第一个接口、CRUD、缓存和定时任务。
- 每节结尾有「看效果」，给出验证用的命令和预期结果。

## 2026-10-21 · 移除旧的数字图形验证码

### mugsun-boot

- **破坏性变更：旧的数字图形验证码已移除**。`GET /auth/captcha` 不再存在，登录、注册、忘记密码和短信接口不再读 `captchaUuid`、`captchaCode`，请改用行为验证码并在请求体里带 `captchaToken`。
- **配置**：`mugsun.captcha.type` 写 `IMAGE` 或其它非 `SLIDER` 的值时启动失败；`mugsun.captcha.default-types` 只接受五种题型名，其它值同样启动失败。`mugsun.captcha.expire-seconds` 已无作用，请删掉。
- **默认多题型随机**：平台默认五种题型全部启用（`SLIDER`、`WORD_CLICK`、`ROTATE`、`ICON_CLICK`、`JIGSAW`），每次取题随机出一种，`GET /auth/captcha/config` 返回 `type: RANDOM`。键盘模式只出滑块或旋转。
- **关闭验证码**：仍用 `mugsun.captcha.enabled=false`。升级步骤见 [升级指南](/boot/upgrade#移除旧的数字图形验证码)。

## 2026-10-21 · e2e 改为关闭验证码

### mugsun-pc

- 数字验证码已移除，e2e 不再从 Redis 读图形码。
- 主套 `pnpm test:e2e` 要求后端关闭验证码。
- 新增 `pnpm test:e2e:captcha-on`，对开着验证码的后端运行：
  - 不带 `captchaToken` 的登录、注册、忘记密码发码都须返回 `code` `40013`。
  - 用独立配置，不需要 PowerJob。
- config 异常时两套都直接报错，不会静默跳过。
- 主套默认不再自动 `docker start` PowerJob；要自动启动，设 `E2E_START_POWERJOB=1`。
- 详见 [开发 · e2e 与验证码](/pc/development#e2e-与验证码)。

## 2026-10-21 · ms-badge 圆点优先

### mugsun-uniappx-ui

- ms-badge：dot 优先于 count（不再出空气泡）。优先级为 label > dot > count。（[197dc26](https://github.com/mugsun/mugsun-uniappx-ui/commit/197dc26)）

## 2026-10-19 · GIS 图层缓冲跳过极冠（已被 #63 取代）

### mugsun-boot

- 当时：PostGIS 对走向不明的极冠改为 skip + `skipped`，避免静默丢极冠。
- 2026-11-04 起由 [mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63) 改为极冠回落 Java，不再 skip。
- 口径见同日「GIS 包极点面」摘要与 [GIS 已知限制](/pc/gis#metric-limits)。

## 2026-10-18 · track 0.3.0：默认不遮罩、不过滤

### mugsun-track

2026-10-22 已发布至 npm：`@mugsun/track-web@0.3.0`。（[#19](https://github.com/mugsun/mugsun-track/pull/19)）

- **默认不遮罩、不过滤（行为变更）**：回放默认显示页面文本和输入值原文（`maskTextSelector` 不再默认 `'*'`，新增 `maskAllInputs` 默认 `false`）；`apiBodyMaskEnabled` 默认 `false`，响应体里的个人信息字段原文上传；`skipHandledErrors` 默认 `false`，错误全部上报。密码框、`data-track-mask`、银行卡和一次性验证码字段始终不录。
- **凭证类键始终脱敏**：响应体里的 `token`、`access_token`、`refresh_token`、`password`、`secret`、`cookie`、`session`、`session_id` 等键不论开关都替换为 `***`，匹配时忽略大小写与 `_`、`-`；声明为 JSON 但解析失败的响应体不上传。
- **凭证类加固**（[#20](https://github.com/mugsun/mugsun-track/pull/20)）：
  - 新增 `respectGpc` 选项，默认 `false`；设 `true` 后尊重浏览器 Global Privacy Control。
  - URL 敏感参数新增 `code`、`sign`、`signature`、`ticket`、`session`、`otp`，忽略大小写与 `_`、`-`，hash 参数也处理；`referrer`、链接 `href`、资源错误地址、回放页面地址也脱敏。
  - 注册、找回 / 修改密码、短信 / 验证码 / MFA 接口不采集响应体。
  - 两份清单：凭证键（含 `session`）URL 和响应体共用；`code`、`sign`、`signature`、`ticket`、`otp` 只在 URL 里替换，响应体里保留原值（如 `{"code":0}`）。
- **凭证类加固（续）**：
  - 通用登录、令牌、单点登录接口按整段匹配（`/login`、`/token`、`/sso`、`/cas` 等），`/loginLog`、`/tokens`、`/case` 这类普通接口不受影响；路径含 `captcha`、`verifycode`，或含 `sms`、`otp`、`sendcode`、`getcode`、`checkcode` 这些词，以及 `/sendSms`、`/getSmsCode` 这类动词组合的接口，也不采集响应体。
  - JS 错误的 `filename`，以及回放 DOM 里的 `href`、`src`、`srcset` 等地址属性脱敏。CSS `url()`、`data-*` 属性、`iframe` 的 `srcdoc`、`meta` 的 `content` 和页面文本里的 URL 不处理，见 [隐私与合规](/track/privacy#url-敏感参数)。
  - 云存储签名参数 `X-Amz-Signature`、`X-Amz-Security-Token`、`X-Goog-Signature` 加入凭证键；Azure `sig`、腾讯云 COS `q-signature`、阿里云 OSS `x-oss-signature` / `x-oss-security-token`、腾讯云 COS `x-cos-security-token` 只在 URL 里替换。
  - 响应体里像令牌的 `code`、`ticket` 替换为 `***`；`E1001`、`INVALID_PARAMETER_VALUE` 这类业务码保留。
  - 令牌接口不采集响应体。路径先按驼峰拆词，`-`、`_` 当作词间隔。
  - 凭证端点判定前先 URL 解码路径；缩写边界也拆词，`/APIGetToken` 命中。
  - 查询键开头多余的 `?` 解码前后都去掉；缺 `//` 的 `mailto:u:p@h` 等不遮。
  - 动词 `get`、`refresh`、`renew`、`issue`、`exchange` 须在词首，可接 `access`、`auth`、`id`、`session`、`csrf`、`user`，再接 `token`。
  - `token` 在词首、后接 `exchange` 或 `refresh` 也算，如 `/tokenExchange`、`/token-refresh`。
  - URL 脱敏只改 userinfo、敏感路径参数（如 `;jsessionid=`）、查询串和 hash，其他参数逐字保留。
  - 匹配前先删掉 TAB、换行和回车；相对 URL 与 `//` 开头的 URL 保持原样。
  - 像令牌判定的字符集加入 `%`。
- **升级**：靠 0.2.0 默认遮罩满足合规的接入，需显式配置 `replayPlugin({ maskTextSelector: '*', maskAllInputs: true })` 和 `apiBodyMaskEnabled: true`，见 [隐私与合规](/track/privacy#从-0-2-0-升级、保留原来的遮罩)。开启回放或响应体采集前，须告知用户，涉及敏感个人信息时须取得单独同意。

## 2026-10-18 · 重复提交返回 400

### mugsun-core

- **重复提交从 500 改为 400**：遇到唯一约束冲突时返回 HTTP 400，`code` 为 400，提示「数据已存在，请勿重复提交」，不带 SQL、约束名和字段值。这类错误不回调 `ErrorLogListener`（boot 的 `sys_error_log` 因此不再记录），服务端只记一条 WARN。其它数据库异常仍是 500。需要引入 `mugsun-starter-mybatis`，且是 Servlet Web 应用。（[#6](https://github.com/mugsun/mugsun-core/pull/6)）
- **达梦唯一约束冲突同样返回 400**：`mugsun-starter-mybatis` 在 classpath 根目录带了一份 `sql-error-codes.xml`，补上达梦错误码 -6602、-6612、-6625。应用自己在 classpath 根目录也放了 `sql-error-codes.xml` 时会遮住这份，需要把达梦条目抄过去。

## 2026-10-18 · 模块开关取值收紧

### mugsun-boot

- **环境变量写错会启动失败（破坏性变更）**：`MUGSUN_GIS_ENABLED`、`MUGSUN_TRACK_ENABLED`、`MUGSUN_AI_ENABLED`（以及 yml 里的 `mugsun.<模块>.enabled`）只接受 `true` 或 `false`（不区分大小写，前后不能有空格），不设置按开启，其它值见 [取值表](/guide/architecture#模块装配-两层开关)。这些值以前都按关闭处理，现在启动失败，报错里会写出变量名和原值。（[#96](https://github.com/mugsun/mugsun-boot/pull/96)）
- **系统参数保存时校验**：`gis.module.enabled`、`ai.module.enabled` 的判定规则不变。写错的值保存时被拒绝，`1`、`0` 已弃用，保存时和运行时日志都会提示。升级前留下的错误值按关闭处理，日志里会出现警告。

升级步骤：

1. 在 compose 文件、`.env`、systemd 或 K8s 配置和 yml 里找出上面三个变量（以及 `mugsun.<模块>.enabled`）。
2. 值为空、`1`、`0`、带首尾空格，或是 `yes`、`on`、`no`、`off` 的，改成 `true` 或 `false`。这些值以前都按关闭处理，想保持原状就写 `false`。
3. 也可以删掉这个变量，按默认开启。

## 2026-10-18 · 内置 MCP Server（暂时下线，破坏性变更）

### mugsun-boot

- **内置 MCP Server 暂时下线，正在加鉴权后恢复**：原因是 `/sse`、`/mcp`、`/mcp/message` 不经过本项目鉴权。下线期间这三个端点在任何配置下都返回 404，`MUGSUN_AI_MCP_SERVER` 不起作用。恢复后的开关和凭据配置，以届时的更新日志为准。（[#89](https://github.com/mugsun/mugsun-boot/pull/89)）
- **调用外部 MCP 工具不受影响**：「MCP 工具箱」和工作流的 MCP 节点照常可用。
- **依赖检查**：下线期间，根 POM 的 maven-enforcer 规则拦下 Spring AI 与 MCP SDK，包括传递依赖；pom 里不允许写 `enforcer.skip`。（[#91](https://github.com/mugsun/mugsun-boot/pull/91)）

## 2026-10-14 · 错误堆栈去掉脚本地址 query

### mugsun-track

- **堆栈里的脚本地址去掉 query 和 hash**：`?`、`#` 之后的部分（常带 token、签名）会去掉，保留 `:行:列`。单个事件的属性合计超过 16KB 时，先缩短堆栈。（[#16](https://github.com/mugsun/mugsun-track/pull/16)）
- **错误分组会断开一次**：错误指纹按 message 和堆栈首帧的脚本地址计算，现在按去掉 query 后的地址计算。首帧脚本地址带 `?` 或 `#` 的错误，升级后归入新的错误分组，已有分组不会与新分组合并；首帧地址不带 query 的错误不受影响。

详见 [埋点 · 插件](/track/plugins)。

## 2026-10-14 · 埋点看板按当地时区切日

### mugsun-boot

- **按租户时区切日**：趋势图、错误列表、概览卡片、页面、性能、漏斗、留存、事件分析的事件列表、地理分布的「今天」都从当地 0 点开始，默认 `Asia/Shanghai`，可用 `mugsun.track.timezone` 按租户调整。之前按 UTC 切日，UTC+8 下要到早上 8 点才算新的一天。（[#31](https://github.com/mugsun/mugsun-boot/pull/31)、[#36](https://github.com/mugsun/mugsun-boot/pull/36)、[#46](https://github.com/mugsun/mugsun-boot/pull/46)）
- **趋势补 0**：按天的趋势图横轴固定为所选的每一天，没数据的日子画 0。（[#28](https://github.com/mugsun/mugsun-boot/pull/28)）
- **UV 口径变化**：日趋势每天的 UV 是当地日内去重设备数；维度趋势不指定维度值时不再把各维度值的 UV 相加。
- **漏斗窗口变化**：从「最近 N×24 小时」改为从第一天当地 0 点算起。
- **留存接口**：返回 `zone`、`today`；`days` 超过 30 按 30 查并返回 `clamped: true`。（[#36](https://github.com/mugsun/mugsun-boot/pull/36)）

详见 [埋点 · 看板趋势](/track/#看板趋势)。

## 2026-10-13 · 第一批安全与质量修复

### mugsun-boot

- **依赖安全**：`tika-core` 升级至 3.2.2，修复 CVE-2025-66516（XXE）。（[#5](https://github.com/mugsun/mugsun-boot/pull/5)）
- **用户管理事务**：用户新增 / 修改 / 删除下沉到 Service 并加事务，删除用户同时清理用户-角色关联。（[#7](https://github.com/mugsun/mugsun-boot/pull/7)）
- **头像**：新增 `POST /auth/avatar/upload`，上传即设为本人头像；`/auth/update-avatar` 只接受本人上传、本租户的附件，拒绝外链；写库带 schema（信创 / 独立 schema 部署）。（[#8](https://github.com/mugsun/mugsun-boot/pull/8)、[#11](https://github.com/mugsun/mugsun-boot/pull/11)）
- **附件权限**：修复附件下载 / 删除的越权访问（IDOR）。新增权限码 `sys:file:manage`（管理全部附件）、`sys:file:public`（上传公开附件）、`sys:file:remove`（删除附件）；普通用户上传强制为私有。（[#11](https://github.com/mugsun/mugsun-boot/pull/11)）
- **AI 出站 SSRF 校验**：知识库抓取、渠道 Webhook、MCP 远程调用统一经过 URL 安全校验，默认拒绝内网 / 回环 / 元数据地址；放行内网服务用 `mugsun.ai.outbound.allow-hosts`。（[#9](https://github.com/mugsun/mugsun-boot/pull/9)）
- **开放接口 IP 白名单**：改为真正的 CIDR 匹配（IPv4 / IPv6）；默认不信任 `X-Forwarded-For`，仅当请求来自 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 列出的代理时才解析。接口调用记录同样不再信任伪造的 XFF。（[#10](https://github.com/mugsun/mugsun-boot/pull/10)、[#12](https://github.com/mugsun/mugsun-boot/pull/12)）

### mugsun-pc

- **登录态存储**：`accessToken` / `refreshToken` / `isLogin` 改存 `sessionStorage`，锁屏密码不再持久化；`localStorage` 只保留语言、用户信息与搜索历史。新开标签页或重开浏览器需重新登录，锁屏状态刷新后不保留；**升级后所有人需重新登录一次**。（[#4](https://github.com/mugsun/mugsun-pc/pull/4)）
- **错误提示**：优先展示后端返回的业务消息，而不是通用 HTTP 状态文案。（[#5](https://github.com/mugsun/mugsun-pc/pull/5)）
- **Element Plus 按需加载**：移除全量 CSS 与 `app.use(ElementPlus)`，组件与样式按需引入。（[#6](https://github.com/mugsun/mugsun-pc/pull/6)）
- **个人中心头像**：改为调用 `/auth/avatar/upload`，只接受 png / jpg / jpeg / gif / webp 且不超过 2MB，上传成功后头像立即更新；头像地址为 `/auth/avatar/raw/{id}`，无需登录即可访问。详见 [本地开发 · 个人中心头像](/pc/development#个人中心头像)。（[#8](https://github.com/mugsun/mugsun-pc/pull/8)）

### mugsun-track

- **URL 敏感参数剥离**：接口监控上报的 URL 中，`token`、`access_token` 等敏感 query 值替换为 `***`，业务参数保留。（[#2](https://github.com/mugsun/mugsun-track/pull/2)）
- **0.2.0 隐私默认值（Breaking）**：回放默认遮罩页面文本；`apiBodyMaskEnabled` 默认改为 `true`。迁移：需要可读文本回放（仅调试）时传 `replayPlugin({ maskTextSelector: false })`；依赖响应体原文时显式设置 `apiBodyMaskEnabled: false`（或远端下发 `0`）。详见 [插件](/track/plugins#接口监控)。已发布至 npm：`@mugsun/track-web@0.2.0`。（[#3](https://github.com/mugsun/mugsun-track/pull/3)）

### 全部仓库

- 版权署名统一为「北京定旭晨信息科技工作室 (mugsun)」。

## 0.1.0

首个公开版本：boot、core（Maven Central）、pc、track（npm `@mugsun/track-web`）与本文档站。

## 各仓 Releases

| 仓库 | 链接 |
| --- | --- |
| mugsun-boot | [Releases](https://github.com/mugsun/mugsun-boot/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-boot/blob/main/CHANGELOG.md) |
| mugsun-core | [Releases](https://github.com/mugsun/mugsun-core/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-core/blob/main/CHANGELOG.md) |
| mugsun-pc | [Releases](https://github.com/mugsun/mugsun-pc/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-pc/blob/main/CHANGELOG.md) |
| mugsun-track | [Releases](https://github.com/mugsun/mugsun-track/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md) |
| mugsun-docs | [CHANGELOG](https://github.com/mugsun/mugsun-docs/blob/main/CHANGELOG.md) |
