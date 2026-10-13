# Introduction

mugsun is an admin platform for small and mid-sized teams that you can **deploy entirely on your own infrastructure**. It puts three things that are usually assembled separately into one codebase and one database:

1. **A business backend**: users, roles, menus, departments, data permissions, multi-tenancy, workflow, files and an open platform.
2. **An admin console**: permissions come from the backend; system management pages work out of the box, with optional GIS, analytics and AI pages.
3. **Product analytics**: browser SDK → backend ingestion → dashboards in the console, with no dependency on a hosted analytics service.

## What's in the box

| Repository | Role | Stack | License |
| --- | --- | --- | --- |
| [mugsun-boot](https://github.com/mugsun/mugsun-boot) | Modular monolith backend | JDK 21 · Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · JetCache · Warm-Flow · Flyway · Spring AI 1.1.2 | Apache-2.0 |
| [mugsun-core](https://github.com/mugsun/mugsun-core) | BOM and starters | MyBatis-Flex 1.11.8 · Sa-Token 1.44.0 · BouncyCastle | Apache-2.0 |
| [mugsun-pc](https://github.com/mugsun/mugsun-pc) | Admin console | Vue 3.5 · Vite 7 · Element Plus 2.11 · Pinia · Vue Router | MIT |
| [mugsun-track](https://github.com/mugsun/mugsun-track) | Browser analytics SDK `@mugsun/track-web` | TypeScript · plugin-based core | MIT |
| ms-ui (`mugsun-uniappx-ui`) | Component library for uni-app x | uvue · uts | Commercial edition (source not public); docs and demo are |

## Design choices

- **Monolith first, modules on demand.** One JAR plus PostgreSQL and Redis is enough to run. GIS, analytics and AI are Maven modules: profiles decide whether they are packaged, environment variables decide whether they are enabled. A microservices edition (cloud) is planned.
- **One source of truth for permissions.** The console has no permission model of its own; menus, button permission codes and user info all come from boot (`/auth/info` and related endpoints).
- **Secure defaults live in code, not in an appendix.** A missing initial password stops startup; attachments are scoped to their uploader and tenant; AI outbound requests pass an SSRF check; the SDK honors Do Not Track, never records input values, and redacts sensitive URL parameters before sending.
- **Your data stays with you.** Events, replays and configuration are stored in your database. The SDK's `appKey` only identifies an app; it is not a credential.

## What it isn't

- Not a drag-and-drop low-code platform, and it doesn't compete on the length of its feature list.
- Not a hosted analytics SaaS; there are no hosted accounts.
- There is no public demo of the console and analytics yet. ms-ui has a [live H5 demo](/en/demo).

## Next

[Getting started](/en/guide/getting-started) · [Architecture](/en/guide/architecture) · [FAQ](/en/guide/faq)
