# 更新日志

各仓根目录维护中文 `CHANGELOG.md`（Keep a Changelog 格式），正式版本以 GitHub Releases 为准。本页摘要对使用者有影响的变更。

## 2026-10-14 · 埋点看板按当地时区切日

### mugsun-boot

- **按租户时区切日**：趋势图、错误列表、概览卡片、页面、性能、漏斗、留存的「今天」都从当地 0 点开始，默认 `Asia/Shanghai`，可用 `mugsun.track.timezone` 按租户调整。之前按 UTC 切日，UTC+8 下要到早上 8 点才算新的一天。（[#31](https://github.com/mugsun/mugsun-boot/pull/31)、[#36](https://github.com/mugsun/mugsun-boot/pull/36)）
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
