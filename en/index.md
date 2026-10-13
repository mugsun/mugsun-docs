---
layout: home
title: A self-hosted admin platform
hero:
  name: mugsun
  text: A self-hosted admin platform
  tagline: Backend, admin console and analytics SDK that ship together. Multi-tenancy, SM-series cryptography and audit logging are on by default; GIS and AI are opt-in modules.
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: Get started
      link: /en/guide/getting-started
    - theme: alt
      text: Architecture
      link: /en/guide/architecture
    - theme: alt
      text: Live component demo
      link: /en/demo
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: Modular monolith
    details: JDK 21 and Spring Boot 3.5.13. The core, gis, track and ai modules are assembled with Maven profiles and can each be switched off at runtime.
    link: /en/boot/
    linkText: Boot overview
  - title: Secure defaults
    details: Tenant isolation, Sa-Token permission codes, SM2/SM4 request encryption, login and operation audit. In prod, a missing initial password stops startup.
    link: /en/boot/security-checklist
    linkText: Pre-launch checklist
  - title: Analytics you host
    details: "@mugsun/track-web SDK → /track/collect ingestion → dashboards in the admin console. Your events stay in your own database."
    link: /en/track/
    linkText: Track overview
  - title: Permission-driven console
    details: Vue 3.5, Vite 7 and Element Plus 2.11, loaded on demand. Menus and button permissions come from the backend; optional modules are build-time flags.
    link: /en/pc/
    linkText: Admin overview
  - title: On Maven Central
    details: mugsun-core 0.1.0 ships a BOM plus Web and MyBatis starters. Add the coordinates to your own project; no local install required.
    link: /en/core/
    linkText: Core overview
  - title: ms-ui for uni-app x
    details: 119 ms- prefixed components. Every page embeds a live H5 preview, and the examples are generated from the demo sources.
    link: /en/uniappx/
    linkText: Browse components
---

<div class="home-body">

## From clone to a running backend

You need JDK 21, Maven 3.9+ and Docker. `docker compose` only starts PostgreSQL and Redis; the application itself runs as a JAR.

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

Then open `http://localhost:8080/ping`. The full walkthrough, including the console and your first analytics event, is in [Getting started](/en/guide/getting-started).

## Add analytics to a web page

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://your-host',   // events go to {endpoint}/track/collect
  appKey: 'your-app-key',          // created under Integrations in the console
})

track.track('button_click', { name: 'buy' })
```

The default plugins cover page views, time on page, autocapture, impressions, Web Vitals and errors. Session replay, API monitoring, visual tagging and geolocation are opt-in. See [Install & setup](/en/track/install).

## Screenshots

<div class="shot-grid">
  <figure><img src="/screenshots/pc-workbench.png" alt="Admin workbench"><figcaption>Console · Workbench</figcaption></figure>
  <figure><img src="/screenshots/track-overview.png" alt="Analytics overview"><figcaption>Analytics · Overview</figcaption></figure>
  <figure><img src="/screenshots/track-event.png" alt="Event analysis"><figcaption>Analytics · Events and live stream</figcaption></figure>
  <figure><img src="/screenshots/pc-login.png" alt="Sign-in page"><figcaption>Sign-in · captcha and social login</figcaption></figure>
</div>

Captured from a local boot + pc stack with demo data. The console UI is in Chinese.

## Modules

| Module | Stack | License | Status |
| --- | --- | --- | --- |
| [boot](/en/boot/) backend | JDK 21 · Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · Flyway | Apache-2.0 | 0.1.0, open source |
| [core](/en/core/) shared kernel | BOM · Web / MyBatis starters | Apache-2.0 | 0.1.0 · Maven Central |
| [pc](/en/pc/) admin console | Vue 3.5 · Vite 7 · Element Plus 2.11 · Pinia | MIT | 0.1.0, open source |
| [track](/en/track/) analytics SDK | TypeScript · plugin core · rrweb replay (separate entry) | MIT | 0.2.0 (npm: 0.1.0) |
| [ms-ui](/en/uniappx/) cross-platform UI | uni-app x (uvue / uts) | — | Docs and H5 demo available |
| cloud (microservices) | — | — | <span class="soon">Planned</span> |

## Is it a good fit?

| A good fit | Not a good fit |
| --- | --- |
| Admin systems that must be deployed on-premises with data kept in-house | You want a drag-and-drop, no-code builder |
| You need both back-office features and product analytics, without another SaaS | You only need a front-end template with no backend |
| Domestic databases (Kingbase / Dameng profiles) or SM-series transport encryption | You need microservices today (cloud is still planned) |

## Demos and resources

- **ms-ui components**: on desktop, the phone frame on each component page runs the H5 build; on mobile, use the bottom bar. You can also [open the full H5 demo](/demo/index.html).
- **Console and analytics**: there is no public demo environment yet. You can run the full stack locally by following [Getting started](/en/guide/getting-started).
- [Changelog](/en/guide/changelog) · [FAQ](/en/guide/faq) · [Contributing](https://github.com/mugsun/.github)

</div>
