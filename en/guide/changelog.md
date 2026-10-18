# Changelog

Each repository keeps a `CHANGELOG.md` in Keep a Changelog format, and GitHub Releases are the source of truth for versions. This page summarizes the changes that affect users.

## 2026-10-18 · track 0.3.0 (planned): no masking or filtering by default

### mugsun-track

Not released yet; see "Unreleased" in the repo CHANGELOG. ([#19](https://github.com/mugsun/mugsun-track/pull/19))

- **No masking or filtering by default (behavior change)**: replays show page text and input values as-is (`maskTextSelector` no longer defaults to `'*'`, and the new `maskAllInputs` defaults to `false`); `apiBodyMaskEnabled` defaults to `false`, so personal-data fields in response bodies are uploaded as-is; `skipHandledErrors` defaults to `false`, so every error is reported. Password fields, `data-track-mask` areas, card fields and one-time-code fields are never recorded.
- **Credential keys are always masked**: `token`, `access_token`, `refresh_token`, `password`, `secret`, `cookie`, `session` and similar keys in response bodies are replaced with `***` regardless of the switch, ignoring case, `_` and `-`; bodies declared as JSON that fail to parse are not uploaded.
- **Credential hardening** ([#20](https://github.com/mugsun/mugsun-track/pull/20)):
  - Global Privacy Control is honored by default (`respectGpc: true`), like DNT.
  - URL redaction adds `code`, `sign`, `signature`, `ticket`, `session` and `otp`, ignores case, `_` and `-`, and covers hash parameters; `referrer`, link `href`s, resource error URLs and replay page addresses are redacted too.
  - Sign-up, password reset / change, SMS / captcha / MFA endpoints never have their response bodies captured.
  - Response body credential keys add `jwt`, `otp`, `access_key` and `secret_key`.
- **Upgrading**: if you relied on 0.2.0's default masking for compliance, set `replayPlugin({ maskTextSelector: '*', maskAllInputs: true })` and `apiBodyMaskEnabled: true` explicitly; see [Privacy](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking). Before turning on replay or response body capture, tell users, and get separate consent for sensitive personal information.

## 2026-10-18 · Duplicate submissions return 400

### mugsun-core

- **Duplicate submissions return 400 instead of 500**: when a unique constraint conflict occurs, the app returns HTTP 400 with `code` 400 and the message 「数据已存在，请勿重复提交」, with no SQL, constraint name or field values. These errors do not call `ErrorLogListener` (so boot's `sys_error_log` no longer records them); the server logs one WARN line instead. Other database errors still return 500. This applies to Servlet web apps that use `mugsun-starter-mybatis`. ([#6](https://github.com/mugsun/mugsun-core/pull/6))
- **Dameng unique-constraint conflicts also return 400**: `mugsun-starter-mybatis` ships a `sql-error-codes.xml` at the classpath root that adds Dameng error codes -6602, -6612 and -6625. If your app also puts a `sql-error-codes.xml` at the classpath root, it shadows this one, so copy the Dameng entry into yours.

## 2026-10-18 · Stricter module switch values

### mugsun-boot

- **A bad environment variable stops startup (breaking)**: `MUGSUN_GIS_ENABLED`, `MUGSUN_TRACK_ENABLED` and `MUGSUN_AI_ENABLED` (and `mugsun.<module>.enabled` in yml) accept only `true` or `false` (case-insensitive, no surrounding spaces), and unset means on; see the [value table](/en/guide/architecture#two-layers-of-module-switches) for other values. These values used to count as off; now startup fails, and the error names the variable and its value. ([#96](https://github.com/mugsun/mugsun-boot/pull/96))
- **System parameters are checked on save**: `gis.module.enabled` and `ai.module.enabled` are read the same way as before. A bad value is rejected on save, and `1` and `0` are deprecated; they trigger a notice on save and a warning in the runtime log. A bad value left from before the upgrade counts as off and logs a warning.

To upgrade:

1. Find the three variables above (and `mugsun.<module>.enabled`) in your compose files, `.env`, systemd or K8s configuration and yml.
2. Change any value that is empty, `1`, `0`, padded with spaces, or `yes`, `on`, `no` or `off` to `true` or `false`. These values used to mean off, so write `false` to keep the old behavior.
3. Or remove the variable to keep the default (on).

## 2026-10-18 · Built-in MCP Server temporarily offline (breaking change)

### mugsun-boot

- **The built-in MCP Server is temporarily offline and will return with authentication**: `/sse`, `/mcp` and `/mcp/message` bypassed the project's authentication. While it is offline, these endpoints return 404 under any configuration and `MUGSUN_AI_MCP_SERVER` has no effect. The changelog entry for its return will describe the switch and credential setup. ([#89](https://github.com/mugsun/mugsun-boot/pull/89))
- **Calling external MCP tools still works**: the MCP toolbox and the workflow MCP node are unchanged.
- **Dependency check**: while it is offline, a maven-enforcer rule in the root POM blocks Spring AI and the MCP SDK, including transitive dependencies, and poms may not set `enforcer.skip`. ([#91](https://github.com/mugsun/mugsun-boot/pull/91))

## 2026-10-14 · Tracking dashboards cut days in local time

### mugsun-boot

- **Days cut in the tenant timezone**: the trend chart, error list, overview cards, pages, performance, funnels, retention, the event-analysis event list and the geo map all start "today" at local midnight. The default is `Asia/Shanghai`; change it per tenant with `mugsun.track.timezone`. Days used to be cut in UTC, so at UTC+8 a new day only began at 8 a.m. ([#31](https://github.com/mugsun/mugsun-boot/pull/31), [#36](https://github.com/mugsun/mugsun-boot/pull/36), [#46](https://github.com/mugsun/mugsun-boot/pull/46))
- **Zero-filled trend**: the daily trend's x-axis always shows every day in the range, with 0 for days without data. ([#28](https://github.com/mugsun/mugsun-boot/pull/28))
- **UV definition change**: each day's UV in the daily trend is distinct devices in that local day; a dimension trend without a specific value no longer adds up the UV of each value.
- **Funnel window change**: from a rolling last N×24 hours to starting at local midnight of the first day.
- **Retention API**: returns `zone` and `today`; `days` above 30 is clamped to 30 with `clamped: true`. ([#36](https://github.com/mugsun/mugsun-boot/pull/36))

See [Tracking · Dashboard trend](/en/track/#dashboard-trend).

## 2026-10-13 · First batch of security and quality fixes

### mugsun-boot

- **Dependency security**: `tika-core` upgraded to 3.2.2 to fix CVE-2025-66516 (XXE). ([#5](https://github.com/mugsun/mugsun-boot/pull/5))
- **User management transactions**: creating, updating and deleting users now happens in a transactional service; deleting a user also removes its role links. ([#7](https://github.com/mugsun/mugsun-boot/pull/7))
- **Avatars**: new `POST /auth/avatar/upload` uploads a file and sets it as your avatar in one call. `/auth/update-avatar` only accepts attachments you uploaded in your own tenant and rejects external URLs; writes are schema-qualified for domestic databases and dedicated schemas. ([#8](https://github.com/mugsun/mugsun-boot/pull/8), [#11](https://github.com/mugsun/mugsun-boot/pull/11))
- **Attachment permissions**: fixed an IDOR on attachment download and delete. New permission codes `sys:file:manage` (manage all attachments), `sys:file:public` (upload public attachments) and `sys:file:remove` (delete attachments); uploads by regular users are always private. ([#11](https://github.com/mugsun/mugsun-boot/pull/11))
- **SSRF checks for AI outbound calls**: knowledge-base fetches, channel webhooks and remote MCP calls go through a URL safety check that blocks private, loopback and metadata addresses by default. Allow internal hosts with `mugsun.ai.outbound.allow-hosts`. ([#9](https://github.com/mugsun/mugsun-boot/pull/9))
- **Open API IP allowlist**: real CIDR matching for IPv4 and IPv6. `X-Forwarded-For` is ignored unless the request comes from a proxy listed in `MUGSUN_OPENAPI_TRUSTED_PROXIES`; API call logs follow the same rule. ([#10](https://github.com/mugsun/mugsun-boot/pull/10), [#12](https://github.com/mugsun/mugsun-boot/pull/12))

### mugsun-pc

- **Session storage**: `accessToken`, `refreshToken` and `isLogin` moved to `sessionStorage`; the lock-screen password is no longer persisted. `localStorage` keeps only language, user info and search history. New tabs or a reopened browser require signing in again, and the lock screen doesn't survive a reload; **everyone has to sign in once after upgrading**. ([#4](https://github.com/mugsun/mugsun-pc/pull/4))
- **Error messages**: the backend's business message is shown instead of a generic HTTP status text. ([#5](https://github.com/mugsun/mugsun-pc/pull/5))
- **Element Plus on demand**: no more full CSS import or `app.use(ElementPlus)`; components and styles load on demand. ([#6](https://github.com/mugsun/mugsun-pc/pull/6))
- **Profile avatar**: now uses `/auth/avatar/upload`; only png / jpg / jpeg / gif / webp up to 2MB are accepted and the avatar updates right after upload. Avatar URLs are `/auth/avatar/raw/{id}` and can be fetched without signing in. See [Development · Profile avatar](/en/pc/development#profile-avatar). ([#8](https://github.com/mugsun/mugsun-pc/pull/8))

### mugsun-track

- **URL redaction**: in API monitoring events, values of sensitive query parameters such as `token` and `access_token` become `***`; other parameters are kept. ([#2](https://github.com/mugsun/mugsun-track/pull/2))
- **0.2.0 privacy defaults (breaking)**: replays mask page text by default, and `apiBodyMaskEnabled` now defaults to `true`. Migration: for readable replays (debugging only) pass `replayPlugin({ maskTextSelector: false })`; if you rely on raw response bodies set `apiBodyMaskEnabled: false` (or `0` from remote config). See [Plugins](/en/track/plugins#api-monitoring). Published to npm as `@mugsun/track-web@0.2.0`. ([#3](https://github.com/mugsun/mugsun-track/pull/3))

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
