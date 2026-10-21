# 更新日志

各仓根目录维护中文 `CHANGELOG.md`（Keep a Changelog 格式），正式版本以 GitHub Releases 为准。本页摘要对使用者有影响的变更。

## 2026-10-18 · track 0.3.0（计划）：默认不遮罩、不过滤

### mugsun-track

尚未发布，见仓库 CHANGELOG「Unreleased」。（[#19](https://github.com/mugsun/mugsun-track/pull/19)）

- **默认不遮罩、不过滤（行为变更）**：回放默认显示页面文本和输入值原文（`maskTextSelector` 不再默认 `'*'`，新增 `maskAllInputs` 默认 `false`）；`apiBodyMaskEnabled` 默认 `false`，响应体里的个人信息字段原文上传；`skipHandledErrors` 默认 `false`，错误全部上报。密码框、`data-track-mask`、银行卡和一次性验证码字段始终不录。
- **凭证类键始终脱敏**：响应体里的 `token`、`access_token`、`refresh_token`、`password`、`secret`、`cookie`、`session`、`session_id` 等键不论开关都替换为 `***`，匹配时忽略大小写与 `_`、`-`；声明为 JSON 但解析失败的响应体不上传。
- **凭证类加固**（[#20](https://github.com/mugsun/mugsun-track/pull/20)）：
  - 默认尊重 Global Privacy Control（`respectGpc: true`），与 DNT 一致。
  - URL 敏感参数新增 `code`、`sign`、`signature`、`ticket`、`session`、`otp`，忽略大小写与 `_`、`-`，hash 参数也处理；`referrer`、链接 `href`、资源错误地址、回放页面地址也脱敏。
  - 注册、找回 / 修改密码、短信 / 验证码 / MFA 接口不采集响应体。
  - 两份清单：凭证键（含 `session`）URL 和响应体共用；`code`、`sign`、`signature`、`ticket`、`otp` 只在 URL 里替换，响应体里保留原值（如 `{"code":0}`）。
- **凭证类加固（续，待审）**：通用登录、令牌、单点登录接口（`/login`、`/token`、`/sso`、`/cas` 等）和路径含 `sms`、`captcha`、`otp`、`verifycode` 的接口不采集响应体；JS 错误的 `filename` 和回放 DOM 里的 `href`、`src` 等地址脱敏；响应体里像令牌的 `code`、`ticket`（长度 ≥16 或 JWT 形态）替换为 `***`，业务码照常保留。
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
