# Changelog

Each repository keeps a `CHANGELOG.md` in Keep a Changelog format, and GitHub Releases are the source of truth for versions. This page summarizes the changes that affect users.

## 2026-10-13 · First batch of security and quality fixes

### mugsun-boot

- **Dependency security**: `tika-core` upgraded to 3.2.2 to fix CVE-2025-66516 (XXE). ([#5](https://github.com/mugsun/mugsun-boot/pull/5))
- **User management transactions**: creating, updating and deleting users now happens in a transactional service; deleting a user also removes its role links. ([#7](https://github.com/mugsun/mugsun-boot/pull/7))
- **Avatars**: new `POST /auth/avatar/upload` uploads a file and sets it as your avatar in one call. `/auth/update-avatar` only accepts attachments you uploaded in your own tenant and rejects external URLs; writes are schema-qualified for domestic databases and dedicated schemas. ([#8](https://github.com/mugsun/mugsun-boot/pull/8), [#11](https://github.com/mugsun/mugsun-boot/pull/11))
- **Attachment permissions**: fixed an IDOR on attachment download and delete. New permission codes `sys:file:manage` (manage all attachments), `sys:file:public` (upload public attachments) and `sys:file:remove` (delete attachments); uploads by regular users are always private. ([#11](https://github.com/mugsun/mugsun-boot/pull/11))
- **SSRF checks for AI outbound calls**: knowledge-base fetches, channel webhooks and remote MCP calls go through a URL safety check that blocks private, loopback and metadata addresses by default. Allow internal hosts with `mugsun.ai.outbound.allow-hosts`. ([#9](https://github.com/mugsun/mugsun-boot/pull/9))
- **Open API IP allowlist**: real CIDR matching for IPv4 and IPv6. `X-Forwarded-For` is ignored unless the request comes from a proxy listed in `MUGSUN_OPENAPI_TRUSTED_PROXIES`; API call logs follow the same rule. ([#10](https://github.com/mugsun/mugsun-boot/pull/10), [#12](https://github.com/mugsun/mugsun-boot/pull/12))

### mugsun-pc

- **Session storage**: `accessToken`, `refreshToken` and `isLogin` moved to `sessionStorage`; the lock-screen password is no longer persisted. `localStorage` keeps only language, user info and search history. ([#4](https://github.com/mugsun/mugsun-pc/pull/4))
- **Error messages**: the backend's business message is shown instead of a generic HTTP status text. ([#5](https://github.com/mugsun/mugsun-pc/pull/5))
- **Element Plus on demand**: no more full CSS import or `app.use(ElementPlus)`; components and styles load on demand. ([#6](https://github.com/mugsun/mugsun-pc/pull/6))
- **Profile avatar**: now uses `/auth/avatar/upload`. ([#8](https://github.com/mugsun/mugsun-pc/pull/8))

### mugsun-track

- **URL redaction**: in API monitoring events, values of sensitive query parameters such as `token` and `access_token` become `***`; other parameters are kept. ([#2](https://github.com/mugsun/mugsun-track/pull/2))
- **0.2.0 privacy defaults (breaking)**: replays mask page text by default, and `apiBodyMaskEnabled` now defaults to `true`. See [Plugins](/en/track/plugins#api-monitoring) for migration. 0.2.0 is not on npm yet. ([#3](https://github.com/mugsun/mugsun-track/pull/3))

### All repositories

- Copyright holder unified as 北京定旭晨信息科技工作室 (mugsun).

## 0.1.0

First public release: boot, core (Maven Central), pc, track (npm `@mugsun/track-web`) and this documentation site.

## Releases by repository

| Repository | Links |
| --- | --- |
| mugsun-boot | [Releases](https://github.com/mugsun/mugsun-boot/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-boot/blob/main/CHANGELOG.md) |
| mugsun-core | [Releases](https://github.com/mugsun/mugsun-core/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-core/blob/main/CHANGELOG.md) |
| mugsun-pc | [Releases](https://github.com/mugsun/mugsun-pc/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-pc/blob/main/CHANGELOG.md) |
| mugsun-track | [Releases](https://github.com/mugsun/mugsun-track/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md) |
| mugsun-docs | [CHANGELOG](https://github.com/mugsun/mugsun-docs/blob/main/CHANGELOG.md) |
