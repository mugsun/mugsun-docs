---
layout: home
title: An admin platform you run on your own servers
hero:
  name: mugsun
  text: An admin platform on your own servers
  tagline: A Spring Boot backend, a Vue 3 admin console and a browser analytics SDK. All data stays in your database.
  image:
    src: /brand/svg/mugsun-icon-dark.svg
    alt: mugsun
  actions:
    - theme: brand
      text: Get started
      link: /en/guide/getting-started
    - theme: alt
      text: Introduction
      link: /en/guide/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/mugsun
features:
  - title: Admin built in
    details: Users, roles, menus, tenants and approval flows, with permissions from the backend.
    link: /en/pc/
    linkText: Admin console
  - title: Analytics included
    details: Add one SDK and get page views, funnels, retention and session replay.
    link: /en/track/
    linkText: Analytics
  - title: Optional modules
    details: GIS, analytics and AI are separate modules you can leave out.
    link: /en/boot/
    linkText: Backend
  - title: Cross-platform components
    details: uni-app x component docs with a live H5 demo for each component.
    link: /en/uniappx/
    linkText: Components
---

## Try it with Docker

You only need Docker. The database, Redis, backend and admin console all run in containers.

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose -f docker-compose.full.yml up -d --build
```

Open <http://localhost:8088> and sign in. To find the admin password or set up local development, see [Getting started](/en/guide/getting-started).
