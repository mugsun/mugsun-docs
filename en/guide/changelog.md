---
pageClass: ms-first-col-nowrap
---

# Changelog

This page lists the changes that affect users by date, newest first. For released versions, the GitHub Releases of each repository are authoritative.

The `CHANGELOG.md` at the root of each repository has more detail. The links are under [Full records by repository](#repos).

## Changes that need action when you upgrade {#breaking}

The changes below affect existing deployments or integrations. Check them one by one before you upgrade.

| Date | Change | What to do |
| --- | --- | --- |
| 2026-11-22 | The backend moved to Spring Boot 4 | Projects built on it have to change artifacts and imports. See [Upgrading to Spring Boot 4](/en/guide/upgrade/spring-boot-4) |
| 2026-11-21 | The backend merged its database migrations into one baseline per database | Rebuild databases created by an earlier main. See [Backend upgrade guide](/en/boot/upgrade#baseline) |
| 2026-10-21 | The backend removed the legacy digit captcha | Switch the frontend to the behavioral captcha. See [Backend upgrade guide](/en/boot/upgrade#legacy-digit-captcha-removed) |
| 2026-10-18 | Analytics SDK 0.3.0 no longer masks or filters by default | Integrations that relied on default masking for compliance must turn it on explicitly. See [Privacy](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking) |
| 2026-10-18 | Duplicate submissions return HTTP 400 instead of 500 | Check for 400 in the frontend. See [core 0.1.0 → 0.2.0](/en/guide/upgrade/core-0-2-0#duplicate-key) |
| 2026-10-18 | Module switches accept only `true` and `false` | Replace any other value in variables such as `MUGSUN_GIS_ENABLED`. See [Choose the modules you need](/en/guide/architecture#two-layers-of-module-switches) |
| 2026-10-18 | The built-in MCP Server is temporarily offline | `/sse`, `/mcp` and `/mcp/message` return 404. Calling external MCP tools is not affected |
| 2026-10-14 | Tracking dashboards cut days in the tenant's time zone | Numbers for the same day differ from before. Adjust the time zone with `mugsun.track.timezone` |
| 2026-10-14 | Error grouping uses the script URL without its query string | Errors whose first frame has a query string move into new groups, and old groups are not merged into them |
| 2026-10-13 | The admin console keeps the session in `sessionStorage` | Everyone has to sign in again once after the upgrade |
| 2026-10-13 | Open APIs no longer trust `X-Forwarded-For` by default | Behind a reverse proxy, list the proxy addresses in `MUGSUN_OPENAPI_TRUSTED_PROXIES` |
| 2026-10-13 | Analytics SDK 0.2.0 changed two privacy defaults | See [Analytics SDK 0.1.0 → 0.2.0](/en/guide/upgrade/track-web-0-2-0) |

## 2026-11-22

| Area | Change |
| --- | --- |
| Backend | The main branches of core, the monolith and the microservice edition moved to Spring Boot 4.1. See [Upgrading to Spring Boot 4](/en/guide/upgrade/spring-boot-4) |
| Backend | JSON still uses Jackson 2, so API responses keep their format; no setting was renamed either |
| core | The main branch version is now `0.3.0-SNAPSHOT`; 0.2 still runs on Spring Boot 3.5, on the `release/0.2.0` branch |

## 2026-11-21

| Area | Change |
| --- | --- |
| Backend | New microservice edition, mugsun-cloud, which runs the same business code as mugsun-boot. See [Microservice edition overview](/en/cloud/) |
| Backend | Database migrations are merged into one baseline per database, and databases created by an earlier main have to be rebuilt. See [Backend upgrade guide](/en/boot/upgrade#baseline) |

## 2026-11-05

| Area | Change |
| --- | --- |
| Workflow | AiFlow adds a loop node, `foreach`, and a parallel node, `parallel`. See [Workflow](/en/boot/features/workflow#ai-flow-control) |
| Workflow | Approval flows can include an AI pre-check node, where an AI flow reviews the request first. See [Workflow](/en/boot/features/workflow#ai-approval) |
| Tracking | New [Spatial behavior](/en/track/spatial) page, which draws events with precise coordinates as heat cells and points |
| Tracking | New [Ask analytics](/en/track/ask) page, which answers plain-language questions about your own app's analytics data, read-only |
| Tracking | New [Error issues](/en/track/error-issues) page, where issues can be assigned, resolved and reopened |
| AI center | Knowledge base assets support PDF, DOCX and PPTX, up to 20MB per file by default. See [AI center](/en/pc/ai-center) |
| Analytics SDK | [Install & setup](/en/track/install) now explains how to inject `release`. Once it is set, error events carry the version |
| Docs | [Getting started](/en/guide/getting-started) now matches the backend and admin console READMEs. The database image is pulled, not built locally |

## 2026-11-04

| Area | Change |
| --- | --- |
| Captcha | Icon-click challenges get a random grid warp by default, which makes template matching harder. See [Configuration](/en/boot/configuration#human-verification-behavioral-captcha) |
| GIS | Polygons that enclose a pole are no longer rejected, and area, buffer and distance all work. See [GIS & maps](/en/pc/gis#metric-limits) |
| GIS | Queries across the 180° meridian get a dedicated index. The V17 migration needs Flyway to connect to PostgreSQL directly, or PgBouncer in session mode |
| Demo mode | When the access log queue is full, new entries are dropped and counted. See [Read-only demo mode](/en/boot/demo-mode#access-log) |

## 2026-11-03

| Area | Change |
| --- | --- |
| Backend | Special characters in the Redis password no longer need manual encoding. See [FAQ](/en/guide/faq#do-i-have-to-encode-special-characters-in-the-redis-password) |
| Demo mode | Access logs record route templates only, never the raw URL. See [Read-only demo mode](/en/boot/demo-mode#access-log) |
| Docs | [Getting started](/en/guide/getting-started) starts everything with one command and no longer asks you to copy a configuration file |

## 2026-10-21

| Area | Change |
| --- | --- |
| Backend | The legacy digit captcha is removed, and `GET /auth/captcha` no longer exists. See [Backend upgrade guide](/en/boot/upgrade#legacy-digit-captcha-removed) |
| Backend | The behavioral captcha enables five challenge types by default and picks one at random each time. Keyboard mode offers only the slider or rotate |
| Admin console | End-to-end tests now run against a backend with the captcha off, and a separate suite covers a backend with the captcha on. See [Development](/en/pc/development#e2e) |
| ms-ui | `ms-badge` shows the dot when both a dot and a count are set |
| Docs | New tutorials: [Your first API](/en/boot/tutorial/first-api) and [Code generation](/en/boot/codegen/) |
| Docs | New chapters: [Multi-tenancy](/en/boot/tenant/) and [Data permissions](/en/boot/datascope/) |
| Docs | New [Features](/en/boot/features/) index, [Upgrade guide](/en/guide/upgrade/) and [Error reference](/en/guide/errors) |

## 2026-10-19

| Area | Change |
| --- | --- |
| GIS | Layer buffering skips polar caps of unknown orientation and says so in the result. Since 2026-11-04 they are computed normally and no longer skipped |

## 2026-10-18

| Area | Change |
| --- | --- |
| Analytics SDK | In 0.3.0, replay shows the original page text and input values by default, response bodies are not masked by default, and all errors are reported. Published to npm on 2026-10-22 |
| Analytics SDK | Credential keys in response bodies are always replaced with `***`, and sign-in, token and verification-code APIs have no response body captured. See [Plugins](/en/track/plugins#api-monitoring) |
| Analytics SDK | URL redaction adds six parameters, `code` `sign` `signature` `ticket` `session` `otp`, and also handles parameters in the hash. See [Privacy](/en/track/privacy#url-redaction) |
| Analytics SDK | New `respectGpc` option. Set it to `true` to honor the browser's Global Privacy Control |
| core | Unique constraint violations return HTTP 400 with a message saying the data already exists, on Dameng too. See [core 0.1.0 → 0.2.0](/en/guide/upgrade/core-0-2-0#duplicate-key) |
| Backend | `MUGSUN_GIS_ENABLED`, `MUGSUN_TRACK_ENABLED` and `MUGSUN_AI_ENABLED` accept only `true` or `false`, and a wrong value stops startup |
| Backend | The system parameters `gis.module.enabled` and `ai.module.enabled` are validated when saved, and `1` and `0` are deprecated |
| Backend | The built-in MCP Server is temporarily offline and returns once it has authentication. The MCP toolbox and the MCP node in workflows keep working |

## 2026-10-14

| Area | Change |
| --- | --- |
| Analytics SDK | Script URLs in error stacks lose their query string and hash and keep the line and column numbers. See [Plugins](/en/track/plugins) |
| Tracking | Dashboards cut days in the tenant's time zone, `Asia/Shanghai` by default and adjustable per tenant. See [Analytics overview](/en/track/#dashboard-trend) |
| Tracking | Daily trend charts always show every selected day and draw 0 for days without data |
| Tracking | UV in the daily trend is deduplicated within the local day. The funnel window starts at local midnight of the first day |
| Tracking | The retention API returns `zone` and `today`. When `days` is over 30 it queries 30 and returns `clamped: true` |

## 2026-10-13

| Area | Change |
| --- | --- |
| Backend | `tika-core` is upgraded to 3.2.2, which fixes CVE-2025-66516 |
| Backend | Fixed unauthorized access when downloading and deleting attachments. New permission codes `sys:file:manage` `sys:file:public` `sys:file:remove`, and uploads by ordinary users are always private |
| Backend | New `POST /auth/avatar/upload`. An avatar must be an attachment the user uploaded in the same tenant, and external links are rejected |
| Backend | Knowledge base fetching, channel webhooks and remote MCP calls reject internal addresses by default. Allow hosts with `mugsun.ai.outbound.allow-hosts` |
| Backend | The IP allowlist of open APIs uses CIDR matching and no longer trusts `X-Forwarded-For` by default |
| Backend | Creating, updating and deleting users run in transactions, and deleting a user also removes its role links |
| Admin console | The session is kept in `sessionStorage`, so a new tab or a restarted browser needs a new sign-in. See [Development](/en/pc/development#where-the-session-is-stored) |
| Admin console | Error messages show the backend's message first, and Element Plus is loaded on demand |
| Admin console | The profile avatar is uploaded directly, limited to common image formats and 2MB. See [Development](/en/pc/development#profile-avatar) |
| Analytics SDK | In 0.2.0, replay masks page text by default, response bodies are masked by default, and sensitive parameters in API URLs become `***`. See [Analytics SDK 0.1.0 → 0.2.0](/en/guide/upgrade/track-web-0-2-0) |
| All repositories | The copyright notice names the same holder, mugsun, in every repository |

## 0.1.0

The first public release. The backend, the admin console and the docs site became public in this version, core was published to Maven Central, and the analytics SDK was published to npm.

## Full records by repository {#repos}

| Repository | Links |
| --- | --- |
| mugsun-boot | [Releases](https://github.com/mugsun/mugsun-boot/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-boot/blob/main/CHANGELOG.md) |
| mugsun-cloud | [Releases](https://github.com/mugsun/mugsun-cloud/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-cloud/blob/main/CHANGELOG.md) |
| mugsun-core | [Releases](https://github.com/mugsun/mugsun-core/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-core/blob/main/CHANGELOG.md) |
| mugsun-pc | [Releases](https://github.com/mugsun/mugsun-pc/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-pc/blob/main/CHANGELOG.md) |
| mugsun-track | [Releases](https://github.com/mugsun/mugsun-track/releases) · [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md) |
| mugsun-docs | [CHANGELOG](https://github.com/mugsun/mugsun-docs/blob/main/CHANGELOG.md) |
