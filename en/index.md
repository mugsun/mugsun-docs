---
layout: home
markdownStyles: false
title: An open-source admin platform with analytics, GIS and AI
description: mugsun is an open-source admin platform. The backend and the admin console ship together, and product analytics, GIS and AI come as three optional modules.
landing:
  copyLabel: Copy commands
  hero:
    badge:
      text: MIT licensed, source on GitHub
      link: https://github.com/mugsun
    title:
      - Open-source admin platform
      - with analytics, GIS and AI
    lead: The backend and the admin console ship together, with multi-tenancy, workflows and code generation already built. Product analytics, GIS and AI are three optional modules, and you can leave out the ones you don't need.
    actions:
      - text: Get started
        link: /en/guide/getting-started
        theme: brand
      - text: What's included
        link: /en/guide/introduction
        theme: alt
    note: All you need to try it is Docker. Three commands open the admin console on your machine.
  facts:
    - value: 1 JAR
      label: The backend builds into one executable JAR. At runtime it needs only PostgreSQL and Redis.
    - value: 3 modules
      label: GIS, analytics and AI are optional. Leave out the ones you don't need.
    - value: 119 components
      label: ms-ui, a uni-app x component library for apps, mini programs and H5.
    - value: MIT
      label: The source of the backend, admin console and analytics SDK is on GitHub.
  showcase:
    title: See what it looks like
    lead: Real screenshots from a local run with demo data. A few of them show the Chinese UI.
    more: Read the docs
    items:
      - title: Overview
        text: Traffic trends, sources, devices and top pages on one page.
        src: /readme/track-overview-en.png
        alt: The analytics overview page
        label: Analytics / Overview
        link: /en/track/
      - title: Map workspace
        text: Draw points, lines and polygons, save them as a scene, and overlay layers for spatial analysis.
        src: /screenshots/gis/gis-workspace.png
        alt: The GIS map workspace
        label: GIS / Map
        link: /en/pc/gis
      - title: AI app orchestration
        text: Connect models and knowledge bases into an AI app on a canvas.
        src: /screenshots/pc/ai-app-orchestration.png
        alt: The app orchestration canvas with node properties on the right
        label: AI Center / App orchestration
        link: /en/pc/designer#ai-app-orchestration
      - title: Session replay
        text: Watch what a user did, session by session. Password fields are never recorded.
        src: /readme/track-replay-en.png
        alt: The session replay player
        label: Analytics / Session replay
        link: /en/track/plugins
      - title: Menus and permissions
        text: Menus and button permissions are maintained here. The frontend renders what the backend returns.
        src: /readme/system-menu.png
        alt: The menu management page under System
        label: System / Menus
        link: /en/boot/permissions
      - title: Code generation
        text: Preview every file before you generate, then download.
        src: /screenshots/codegen/gen-preview.png
        alt: The code generation preview dialog
        label: System / Code generation
        link: /en/boot/codegen/
      - title: Mobile components
        text: The ms-ui component demo. You can try it right on the docs pages.
        src: /readme/uniappx-demo.png
        alt: The ms-ui component demo
        label: ms-ui demo
        link: /en/uniappx/
        fit: contain
  paths:
    eyebrow: Docs
    title: Start from what you want to do
    lead: You don't have to read everything. Pick a track and read its three pages in order.
    items:
      - icon: compass
        title: New to mugsun
        text: See what's included, then run it on your machine.
        links:
          - text: Introduction
            link: /en/guide/introduction
          - text: Getting started
            link: /en/guide/getting-started
          - text: Architecture
            link: /en/guide/architecture
      - icon: server
        title: Build backend APIs
        text: From one endpoint to a full set of CRUD endpoints.
        links:
          - text: Your first API
            link: /en/boot/tutorial/first-api
          - text: Your first CRUD
            link: /en/boot/tutorial/first-crud
          - text: Code generation
            link: /en/boot/codegen/
      - icon: layout
        title: Build admin console pages
        text: Start the frontend, then write pages and forms the standard way.
        links:
          - text: Development
            link: /en/pc/development
          - text: UI self-check
            link: /en/pc/ui-check
          - text: Form validation
            link: /en/pc/form-validation
      - icon: activity
        title: Add analytics to your product
        text: Install the SDK and send your first event.
        links:
          - text: Install & setup
            link: /en/track/install
          - text: Your first event
            link: /en/track/first-event
          - text: Privacy
            link: /en/track/privacy
      - icon: deploy
        title: Deploy to a server
        text: The settings to change and the checklist to run before going live.
        links:
          - text: Docker deployment
            link: /en/pc/deploy-docker
          - text: Configuration
            link: /en/boot/configuration
          - text: Security checklist
            link: /en/boot/security-checklist
      - icon: help
        title: Something went wrong
        text: Look up the error message first, then check the FAQ.
        links:
          - text: Error reference
            link: /en/guide/errors
          - text: FAQ
            link: /en/guide/faq
          - text: Upgrade guide
            link: /en/guide/upgrade/
  features:
    eyebrow: Features
    title: The usual admin features, already built
    lead: They all live in one codebase and work as soon as you sign in to the admin console. Each has its own page in the docs.
    items:
      - icon: users
        title: Users and permissions
        text: Users, departments, roles and menus are managed in the console. Button permissions and data scope are enforced by the backend.
        link: /en/boot/permissions
      - icon: tenant
        title: Multi-tenancy
        text: One database and one set of tables serve many tenants. Queries and updates get the current tenant's condition automatically.
        link: /en/boot/tenant/
      - icon: flow
        title: Workflows
        text: Design flows in the browser with conditions, parallel branches and countersigning. An approval step can go to AI for a first review.
        link: /en/boot/features/workflow
      - icon: code
        title: Code generation
        text: Generate backend and frontend code from a table, and preview every file before you generate.
        link: /en/boot/codegen/
      - icon: chart
        title: Product analytics
        text: Add the SDK, then see events, funnels, retention, performance and errors in the admin console, and replay sessions.
        link: /en/track/
      - icon: map
        title: GIS and maps
        text: Layers, basemaps and spatial analysis run on PostGIS. The map workspace switches between 2D and 3D.
        link: /en/pc/gis
      - icon: spark
        title: AI center
        text: Models, chats, knowledge bases and MCP are managed in one place. Knowledge bases accept PDF, Word and PowerPoint files.
        link: /en/pc/ai-center
      - icon: shield
        title: SM crypto and Chinese databases
        text: SM2 encrypts traffic and SM4 encrypts fields. You can switch the database to KingbaseES or Dameng.
        link: /en/boot/configuration
      - icon: plug
        title: Open platform
        text: Open your APIs to other systems with API keys or OAuth2, with request signing, rate limits and IP allow-lists.
        link: /en/boot/open-api
  start:
    eyebrow: Quick start
    title: Three commands to run it locally
    lead: You only need Docker. The database, Redis, the backend and the admin console all start in containers.
    steps:
      - title: Clone and start
        text: The first start builds the images. How long it takes depends on your network.
      - title: Get the admin password
        text: The third command prints the password for admin.
      - title: Sign in
        text: Open http://127.0.0.1:8088 and sign in as admin. You must change the password on first sign-in.
    action:
      text: See the full steps
      link: /en/guide/getting-started
    lines:
      - comment: Clone the backend repository
        cmd: git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
      - comment: Start the database, Redis, the backend and the admin console
        cmd: docker compose -f docker-compose.full.yml up -d --build
      - comment: Print the admin password
        cmd: docker compose -f docker-compose.full.yml run --rm init show
  products:
    eyebrow: Repositories
    title: Use the whole stack, or just one part
    lead: mugsun is made of several independent repositories. Each one has its own section in these docs.
    docs: Read the docs
    items:
      - name: mugsun-boot
        role: Backend
        text: Authentication, system management, tenants and workflows are in this JAR. GIS, analytics and AI are optional modules.
        tags: [JDK 21, Spring Boot 3, MyBatis-Flex, Sa-Token]
        link: /en/boot/
        repo: https://github.com/mugsun/mugsun-boot
      - name: mugsun-pc
        role: Admin console
        text: Ships with pages for system management, workflows, tenants and the open platform. Menus and button permissions come from the backend.
        tags: [Vue 3, Vite 7, Element Plus, Pinia]
        link: /en/pc/
        repo: https://github.com/mugsun/mugsun-pc
      - name: "@mugsun/track-web"
        role: Analytics SDK
        text: Collects page views, clicks, performance and errors in the browser and reports them to the mugsun-boot backend.
        tags: [TypeScript, npm, rrweb]
        link: /en/track/
        repo: https://github.com/mugsun/mugsun-track
      - name: ms-ui
        role: Mobile component library
        text: A component library for uni-app x. Every component page lists props, events and slots, and the ones with a demo can be tried in place.
        tags: [uni-app x, uvue, uts]
        link: /en/uniappx/
        note: Source repository not public yet
      - name: mugsun-core
        role: Shared library
        text: The unified response body, global exception handling, API encryption and entity base classes. The backend depends on it, and you can use it on its own.
        tags: [BOM, Spring Boot Starter]
        link: /en/core/
        repo: https://github.com/mugsun/mugsun-core
      - name: mugsun-start
        role: Project generator
        text: Pick a project type and optional modules, then download the project as a zip. The mugsun templates are not wired in yet.
        tags: [Spring Initializr, In development]
        link: /en/start/
        repo: https://github.com/mugsun/mugsun-start
  cta:
    title: Run it on your machine first
    text: All you need to try it is Docker. When you want to change the code, start the backend and the admin console separately.
    actions:
      - text: Get started
        link: /en/guide/getting-started
        theme: brand
      - text: View on GitHub
        link: https://github.com/mugsun
        theme: alt
---

<HomeLanding />
