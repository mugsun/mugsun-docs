---
layout: home
hero:
  name: mugsun
  text: Self-hosted admin stack
  tagline: Multi-tenant & SM crypto, plus an embedded analytics path (SDK → API → dashboard). GIS and AI are optional modules—not a kitchen-sink low-code suite.
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: Get started
      link: /en/guide/getting-started
    - theme: alt
      text: Install Track
      link: /en/track/install
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: Run it
    details: Install core as a sibling, compose for the DB, Maven for boot; optionally open the pc console.
    link: /en/guide/getting-started
    linkText: Getting started
  - title: Wire analytics
    details: Install @mugsun/track-web, point the collect endpoint, confirm the first event on the dashboard.
    link: /en/track/first-event
    linkText: First event
  - title: Extend it
    details: Learn how boot / pc / track / core split, and flip GIS / Track / AI as needed.
    link: /en/guide/architecture
    linkText: Architecture
---

## Modules

| Module | Role | Status |
| --- | --- | --- |
| [boot](/en/boot/) | Modular Spring Boot 3.5 backend | Open source |
| [pc](/en/pc/) | Vue3 + Element Plus admin | Open source |
| [track](/en/track/) | Lightweight web SDK + ingest + dashboards | Open source |
| [core](/en/core/) | BOM & starters | Open source |
| cloud | Microservices edition | <span class="soon">Planned</span> |
| [ms-ui](/en/uniappx/) | uni-app x UI kit (not PC admin) | Docs live |

## Demo

- **Admin / analytics**: no public clickable demo yet—follow [Getting started](/en/guide/getting-started). Credentials follow the boot README—**change the password on first login**.
- **ms-ui components**: phone-frame H5 preview on component pages; see [Demo notes](/en/demo).
