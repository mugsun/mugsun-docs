# Introduction

mugsun is a self-hosted business system with a backend, an admin console and product analytics.

They are separate repositories, all deployed on your own servers, with no dependency on public cloud services.

## Modules

| <span style="white-space:nowrap">Module</span> | Description | Stack | License | <span style="white-space:nowrap">Version</span> |
| --- | --- | --- | --- | --- |
| <span style="white-space:nowrap">[boot](/en/boot/)</span> | Backend, a single runnable JAR | JDK 21, Spring Boot 3, MyBatis-Flex, Sa-Token | Apache-2.0 | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[core](/en/core/)</span> | BOM and starters, published on Maven Central | MyBatis-Flex, Sa-Token | Apache-2.0 | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[pc](/en/pc/)</span> | Admin console | Vue 3, Vite 7, Element Plus, Pinia | MIT | <span style="white-space:nowrap">0.1.0</span> |
| <span style="white-space:nowrap">[track](/en/track/)</span> | Browser analytics SDK, published on npm | TypeScript, replay based on rrweb | MIT | <span style="white-space:nowrap">0.2.0</span> |
| <span style="white-space:nowrap">[ms-ui](/en/uniappx/)</span> | uni-app x cross-platform components | uvue, uts | Commercial edition | <span style="white-space:nowrap">—</span> |

The ms-ui source is not public. Its docs and H5 demo are open to everyone.

## Architecture

The backend is one JAR and needs PostgreSQL and Redis at runtime:

```text
browser ──> pc console ──/api──> boot ──> PostgreSQL + Redis
web pages ──@mugsun/track-web──> boot /track/*
```

GIS, analytics and AI are optional Maven modules. A build profile decides whether each one is included.

The console's menus and button permissions come from the backend `/auth/info` endpoint. The frontend keeps no separate permission data.

Analytics data is kept in a separate PostgreSQL database, `mugsun_track`, apart from the business database.

## Is it a good fit?

| Good fit | Not a good fit |
| --- | --- |
| Business systems that must be delivered on-premises with data kept inside the network | Drag-and-drop, no-code platforms |
| Projects that need an admin console and analytics without another cloud analytics service | Frontend-only templates with no backend |
| Projects that require Kingbase, Dameng or Chinese national cryptography (SM2/SM3/SM4) | Projects that need microservices today |

## Online demo

You can preview ms-ui components in the phone frame on the right of each component page, or from the bottom bar on narrow screens. The [full H5 demo](/demo) is also available.

There is no public demo of the console and analytics yet. Follow [Getting started](/en/guide/getting-started) to run the full stack locally.

## Next steps

- [Getting started](/en/guide/getting-started)
- [Architecture](/en/guide/architecture)
- [FAQ](/en/guide/faq)
