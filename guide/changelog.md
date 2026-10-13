# 更新日志

各仓根目录维护中文 `CHANGELOG.md`（Keep a Changelog 格式），正式版本以 GitHub Releases 为准。本页摘要对使用者有影响的变更。

## 2026-10-13 · 第一批安全与质量修复

### mugsun-boot

- **依赖安全**：`tika-core` 升级至 3.2.2，修复 CVE-2025-66516（XXE）。（[#5](https://github.com/mugsun/mugsun-boot/pull/5)）
- **用户管理事务**：用户新增 / 修改 / 删除下沉到 Service 并加事务，删除用户同时清理用户-角色关联。（[#7](https://github.com/mugsun/mugsun-boot/pull/7)）
- **头像**：新增 `POST /auth/avatar/upload`，上传即设为本人头像；`/auth/update-avatar` 只接受本人上传、本租户的附件，拒绝外链；写库带 schema（信创 / 独立 schema 部署）。（[#8](https://github.com/mugsun/mugsun-boot/pull/8)、[#11](https://github.com/mugsun/mugsun-boot/pull/11)）
- **附件权限**：修复附件下载 / 删除的越权访问（IDOR）。新增权限码 `sys:file:manage`（管理全部附件）、`sys:file:public`（上传公开附件）、`sys:file:remove`（删除附件）；普通用户上传强制为私有。（[#11](https://github.com/mugsun/mugsun-boot/pull/11)）
- **AI 出站 SSRF 校验**：知识库抓取、渠道 Webhook、MCP 远程调用统一经过 URL 安全校验，默认拒绝内网 / 回环 / 元数据地址；放行内网服务用 `mugsun.ai.outbound.allow-hosts`。（[#9](https://github.com/mugsun/mugsun-boot/pull/9)）
- **开放接口 IP 白名单**：改为真正的 CIDR 匹配（IPv4 / IPv6）；默认不信任 `X-Forwarded-For`，仅当请求来自 `MUGSUN_OPENAPI_TRUSTED_PROXIES` 列出的代理时才解析。接口调用记录同样不再信任伪造的 XFF。（[#10](https://github.com/mugsun/mugsun-boot/pull/10)、[#12](https://github.com/mugsun/mugsun-boot/pull/12)）

### mugsun-pc

- **登录态存储**：`accessToken` / `refreshToken` / `isLogin` 改存 `sessionStorage`，锁屏密码不再持久化；`localStorage` 只保留语言、用户信息与搜索历史。（[#4](https://github.com/mugsun/mugsun-pc/pull/4)）
- **错误提示**：优先展示后端返回的业务消息，而不是通用 HTTP 状态文案。（[#5](https://github.com/mugsun/mugsun-pc/pull/5)）
- **Element Plus 按需加载**：移除全量 CSS 与 `app.use(ElementPlus)`，组件与样式按需引入。（[#6](https://github.com/mugsun/mugsun-pc/pull/6)）
- **个人中心头像**：改为调用 `/auth/avatar/upload`。（[#8](https://github.com/mugsun/mugsun-pc/pull/8)）

### mugsun-track

- **URL 敏感参数剥离**：接口监控上报的 URL 中，`token`、`access_token` 等敏感 query 值替换为 `***`，业务参数保留。（[#2](https://github.com/mugsun/mugsun-track/pull/2)）

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
