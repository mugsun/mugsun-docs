---
layout: home
markdownStyles: false
pageClass: ms-landing
title: An open-source admin platform with analytics, GIS and AI
description: mugsun is an open-source admin platform. The backend and the admin console ship together, and product analytics, GIS and AI come as three optional modules.
landing:
  ui:
    copy: Copy
    copied: Copied
    copyFailed: Not copied
    replay: Replay
    demo: Demo data
    facts: A few numbers
  hero:
    badge:
      text: MIT licensed, source on GitHub
      link: https://github.com/mugsun
    # {track}, {gis} and {ai} are the three words in the title you can click; their text is in words
    title:
      - Open-source
      - admin platform with
      - "{track}, {gis} and {ai}"
    words:
      track: analytics
      gis: GIS
      ai: AI
    lead: The backend and the admin console ship together, with multi-tenancy, workflows and code generation already built. Product analytics, GIS and AI are three optional modules, and you can leave out the ones you don't need.
    actions:
      - text: Get started
        link: /en/guide/getting-started
        theme: brand
      - text: What's included
        link: /en/guide/introduction
        theme: alt
    note: All you need to try it is Docker. Three commands open the admin console on your machine.
    # The globe on the right of the first screen and the panel under it. The numbers come from a local demo environment.
    globe:
      hint: Drag to turn the globe
      tabs: Optional modules
      track:
        tab: Analytics
        kpis:
          - id: pv
            value: "2,123"
            label: Page views
          - id: uv
            value: "660"
            label: Visitors
          - id: ss
            value: "1,178"
            label: Sessions
          - id: ev
            value: "5,753"
            label: Events
        stream: Live events
        hint: Click the globe to send an event
      gis:
        tab: GIS and maps
        layers: Layers
        items:
          - name: Basemap
            note: land and sea
          - name: Graticule
            note: every 15°
          - name: Business layer
            note: your polygon
        draw: Draw
        drawText: Points, lines, polygons
        again: Draw again
        areaLabel: Area
        # {million} is the area in millions of square kilometres, {wan} the same in units of ten thousand
        area: about {million} million km²
        view: View
        viewText: Switches between 2D and 3D
        store: Storage
        storeText: PostGIS · WGS84
        vertex: Vertex {n}
        shape: Polygon · 6 vertices
      ai:
        tab: AI center
        app: AI app · Contract summary
        steps:
          - kind: START
            name: Start
          - kind: Knowledge base
            name: Find clauses
          - kind: LLM
            name: Summarize
          - kind: END
            name: End
        idle: Idle
        running: Running
        step: "Running: {name}"
        done: Done
        ask: Tracking · Ask data
        askHint: Try a question
        askIntro: The model picks the kind of data. The numbers come from the APIs.
        thinking: Working out which kind of data you want…
        # Text in braces is shown in bold
        questions:
          - intent: overview
            q: Last 7 days
            a: Page views {2,123} · visitors {660} · sessions {1,178} · bounce rate {44.3%}
          - intent: online
            q: Online now
            a: "{21} active sessions in the last 5 minutes"
          - intent: pages
            q: Top pages
            a: "{/} 1,178 views · {/item} 678 · {/cart} 251"
  facts:
    - value: 1 JAR
      label: The backend builds into one executable JAR and needs only PostgreSQL and Redis at runtime
    - value: 3 modules
      label: GIS, analytics and AI are packaged on demand, so you can leave out what you don't need
    - value: 119 components
      label: ms-ui, a uni-app x component library for apps, mini programs and H5
    - value: MIT
      unit: licensed
      label: The source of the backend, admin console and analytics SDK is on GitHub
  showcase:
    title: See what it looks like
    lead: Real screenshots from a local run with demo data, a few of them showing the Chinese UI.
    more: Read the docs
    list: Screenshots
    theme:
      label: Theme of the screenshot
      dark: Dark
      light: Light
    items:
      - title: Overview
        text: Traffic trends, traffic sources and top pages on one page.
        src: /readme/track-overview-en.png
        dark: /screenshots/track/track-overview-dark-en.png
        alt: The analytics overview page
        label: Analytics / Overview
        link: /en/track/
      - title: Map workspace
        text: Draw points, lines and polygons, save them as a scene, and overlay layers for spatial analysis.
        src: /screenshots/gis/gis-workspace.png
        dark: /screenshots/gis/gis-workspace-dark.png
        alt: The GIS map workspace
        label: GIS / Map
        link: /en/pc/gis
      - title: AI app orchestration
        text: Connect models and knowledge bases into an AI app on a canvas.
        src: /screenshots/pc/ai-app-orchestration.png
        dark: /screenshots/pc/ai-app-orchestration-dark.png
        alt: The app orchestration canvas with node properties on the right
        label: AI Center / App orchestration
        link: /en/pc/designer#ai-app-orchestration
      - title: Session replay
        text: Replay what a user did session by session, with password fields never recorded.
        src: /readme/track-replay-en.png
        dark: /screenshots/track/track-replay-dark-en.png
        alt: The session replay player
        label: Analytics / Session replay
        link: /en/track/plugins
      - title: Menus and permissions
        text: Menus and button permissions are maintained here, and the frontend renders what the backend returns.
        src: /readme/system-menu.png
        dark: /screenshots/pc/system-menu-dark.png
        alt: The menu management page under System
        label: System / Menus
        link: /en/boot/permissions
      - title: Code generation
        text: Preview every file before you generate, then download.
        src: /screenshots/codegen/gen-preview.png
        dark: /screenshots/codegen/gen-preview-dark.png
        alt: The code generation preview dialog
        label: System / Code generation
        link: /en/boot/codegen/
      - title: Mobile components
        text: The ms-ui component demo, which you can try right on the docs pages.
        src: /readme/uniappx-demo.png
        alt: The ms-ui component demo
        label: ms-ui demo
        link: /en/uniappx/
        fit: contain
  # The switches for the three optional modules. The page builds the command from the switches; only the words are here.
  modules:
    title:
      - Three optional modules.
      - Use only what you need
    lead: You decide at build time which modules go into the JAR, and a module that is in the JAR can still be switched off at startup. Flip the switches and watch the right side change.
    fixed: Always in
    core:
      name: Core
      code: mugsun-boot-core
      text: Accounts, permissions, tenants and workflows
    # short is what the module is called in the comments of the command
    items:
      - key: track
        name: Analytics
        short: analytics
        code: mugsun-boot-track
        text: Receives, aggregates and replays analytics data
      - key: gis
        name: GIS and maps
        short: GIS
        code: mugsun-boot-gis
        text: Layers, spatial queries and vector tiles
      - key: ai
        name: AI center
        short: AI
        code: mugsun-boot-ai
        text: Models, chats and knowledge bases
    jar: The JAR you get
    menu: The admin console menu
    menuHint: A module that is off leaves the menu
    # the names the admin console shows in English
    menuItems:
      - text: Workbench
      - text: Tracking
        mod: track
      - text: GIS
        mod: gis
      - text: System Settings
        current: true
      - text: Open Platform
      - text: AI Center
        mod: ai
    cmd: Build command
    cmdRun: Build command and startup variable
    notes:
      all: core plus the three optional modules
      none: core only
      one: core plus {key}
      two: all three are in the JAR, {key} is off at startup
    comments:
      all: "All three modules: full is the default profile"
      none: Core only
      one: Core plus {name}
      two: For two modules, build the full package
      off: Then switch {name} off at startup
  # Six built-in features. kind picks the small diagram on the card, demo holds the words in it.
  # Analytics, GIS and AI are covered by the first screen and the optional modules, so they are not listed again.
  features:
    title:
      - The usual admin features,
      - already built
    lead: They all live in one codebase and work as soon as you sign in to the admin console. Each has its own page in the docs.
    items:
      - kind: perm
        title: Users and permissions
        text: Users, roles and menus are managed in the console, and the backend enforces button permissions and data scope.
        link: /en/boot/permissions
        demo:
          roles: [Manager, Staff]
          scope: Data scope
          scopes: [Department and sub-departments, Own data only]
      - kind: tenant
        title: Multi-tenancy
        text: One database and one set of tables serve many tenants, and queries and updates get the current tenant's condition automatically.
        link: /en/boot/tenant/
        demo:
          auto: added for you
      - kind: flow
        title: Workflows
        text: Design flows in the browser with conditions, parallel branches and countersigning; an approval step can go to AI for a first review.
        link: /en/boot/features/workflow
        demo:
          nodes: [Start, AI review, if, Approve, End]
          parallel: parallel
      - kind: gen
        title: Code generation
        text: Generate backend and frontend code from a table, and preview every file before you generate.
        link: /en/boot/codegen/
      - kind: gm
        title: SM crypto and Chinese databases
        text: SM2 encrypts traffic and SM4 encrypts fields; the database can be switched to KingbaseES or Dameng.
        link: /en/boot/configuration
        demo:
          rows:
            - algo: SM2
              use: transit
            - algo: SM3
              use: digest
            - algo: SM4
              use: fields
          db: [PostgreSQL, KingbaseES, Dameng]
      - kind: open
        title: Open platform
        text: Open your APIs to other systems with API keys or OAuth2, with request signing, rate limits and IP allow-lists.
        link: /en/boot/open-api
        demo:
          again: Sent again unchanged
          replay: replayed request
  # The tech stack is written only here, in tags
  products:
    title:
      - Use the whole stack,
      - or just one part
    lead: mugsun is made of several independent repositories, and each one has its own section in these docs.
    docs: Read the docs
    items:
      - name: mugsun-boot
        role: Backend
        text: Accounts, permissions, tenants and workflows are in this JAR, with GIS, analytics and AI as optional modules.
        tags: [JDK 21, Spring Boot 4, MyBatis-Flex, Sa-Token]
        link: /en/boot/
        repo: https://github.com/mugsun/mugsun-boot
      - name: mugsun-cloud
        role: Microservice backend
        text: The same business code as mugsun-boot, split into a gateway and several services, with the same API paths.
        tags: [JDK 21, Spring Cloud Gateway, Nacos]
        link: /en/cloud/
        repo: https://github.com/mugsun/mugsun-cloud
      - name: mugsun-pc
        role: Admin console
        text: Ships with pages for system management, workflows and tenant operations, and menus and button permissions come from the backend.
        tags: [Vue 3, Vite 7, Element Plus, Pinia]
        link: /en/pc/
        repo: https://github.com/mugsun/mugsun-pc
      - name: "@mugsun/track-web"
        role: Analytics SDK
        text: Collects page views, clicks and errors in the browser and reports them to the mugsun backend.
        tags: [TypeScript, npm, rrweb]
        link: /en/track/
        repo: https://github.com/mugsun/mugsun-track
      - name: ms-ui
        role: Mobile component library
        text: "A component library for uni-app x: every component page lists props, events and slots, and the ones with a demo can be tried in place."
        tags: [uni-app x, uvue, uts]
        link: /en/uniappx/
        note: Source not public yet
      - name: mugsun-core
        role: Shared library
        text: The unified response body, global exception handling and API encryption, which the backend depends on and you can also use on its own.
        tags: [BOM, Spring Boot Starter]
        link: /en/core/
        repo: https://github.com/mugsun/mugsun-core
      - name: mugsun-start
        role: Project generator
        text: Pick a project type and optional modules to download the project as a zip; the mugsun templates are not wired in yet.
        tags: [Spring Initializr, In development]
        link: /en/start/
        repo: https://github.com/mugsun/mugsun-start
  start:
    title:
      - Three commands
      - to run it locally
    lead: You only need Docker. The database, Redis, the backend and the admin console all start in containers.
    steps:
      - title: Clone and start
        text: The first start builds the images, and how long that takes depends on your network.
      - title: Get the admin password
        text: The third command prints the password for admin.
      - title: Sign in
        text: Open http://127.0.0.1:8088 and sign in as admin. You must change the password on first sign-in.
    action:
      text: See the full steps
      link: /en/guide/getting-started
    # step is the step above that the command belongs to, counting from 0
    lines:
      - comment: Clone the backend repository
        cmd: git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
        step: 0
      - comment: Build the images and start everything
        cmd: docker compose -f docker-compose.full.yml up -d --build
        step: 0
      - comment: Print the admin password
        cmd: docker compose -f docker-compose.full.yml run --rm init show
        step: 1
    open: Open http://127.0.0.1:8088 and sign in as admin
  # Six reading tracks, three pages each, to be read in order
  paths:
    label: Reading tracks
    title:
      - Start from
      - what you want to do
    lead: You don't have to read everything. Pick a track and read its three pages in order.
    items:
      - title: New to mugsun
        text: See what's included, then run it on your machine.
        links:
          - text: Introduction
            link: /en/guide/introduction
          - text: Getting started
            link: /en/guide/getting-started
          - text: Architecture
            link: /en/guide/architecture
      - title: Build backend APIs
        text: From one endpoint to a full set of CRUD endpoints.
        links:
          - text: Your first API
            link: /en/boot/tutorial/first-api
          - text: Your first CRUD
            link: /en/boot/tutorial/first-crud
          - text: Code generation
            link: /en/boot/codegen/
      - title: Build admin console pages
        text: Start the frontend, then write pages and forms the standard way.
        links:
          - text: Development
            link: /en/pc/development
          - text: UI self-check
            link: /en/pc/ui-check
          - text: Form validation
            link: /en/pc/form-validation
      - title: Add analytics to your product
        text: Install the SDK and send your first event.
        links:
          - text: Install & setup
            link: /en/track/install
          - text: Your first event
            link: /en/track/first-event
          - text: Privacy
            link: /en/track/privacy
      - title: Deploy to a server
        text: The settings to change and the checklist to run before going live.
        links:
          - text: Docker deployment
            link: /en/pc/deploy-docker
          - text: Configuration
            link: /en/boot/configuration
          - text: Security checklist
            link: /en/boot/security-checklist
      - title: Something went wrong
        text: Look up the error message first, then check the FAQ.
        links:
          - text: Error reference
            link: /en/guide/errors
          - text: FAQ
            link: /en/guide/faq
          - text: Upgrade guide
            link: /en/guide/upgrade/
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
  footer:
    tagline: An open-source admin platform with analytics, GIS and AI
    columns:
      - title: Repositories
        links:
          - text: mugsun-boot
            note: Backend
            link: /en/boot/
          - text: mugsun-cloud
            note: Microservice backend
            link: /en/cloud/
          - text: mugsun-pc
            note: Admin console
            link: /en/pc/
          - text: "@mugsun/track-web"
            note: Analytics SDK
            link: /en/track/
          - text: ms-ui
            note: Mobile components
            link: /en/uniappx/
          - text: mugsun-core
            note: Shared library
            link: /en/core/
      - title: Docs
        links:
          - text: Introduction
            link: /en/guide/introduction
          - text: Getting started
            link: /en/guide/getting-started
          - text: Architecture
            link: /en/guide/architecture
          - text: FAQ
            link: /en/guide/faq
          - text: Changelog
            link: /en/guide/changelog
      - title: More
        links:
          - text: GitHub
            link: https://github.com/mugsun
          - text: 简体中文
            link: /
---

<HomeLanding />
