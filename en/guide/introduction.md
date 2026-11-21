# Introduction

mugsun is an open-source admin platform. The backend and the admin console ship together, and product analytics, GIS and AI come as three optional modules.

Multi-tenancy, workflow and code generation are already built, and you write your own business logic on top.

![The analytics overview page in the admin console](/readme/track-overview-en.png)

## What it is made of

| Part | What it is | Stack |
| --- | --- | --- |
| [mugsun-boot](/en/boot/) | The backend, packaged as one executable JAR | JDK 21, Spring Boot 3, MyBatis-Flex |
| [mugsun-cloud](/en/cloud/) | The microservice edition of the backend, made of one gateway and four services | Spring Cloud Gateway, Nacos |
| [mugsun-pc](/en/pc/) | The admin console. Menus and button permissions come from the backend | Vue 3, Vite 7, Element Plus |
| [@mugsun/track-web](/en/track/) | The browser analytics SDK, published on npm | TypeScript, session replay built on rrweb |
| [ms-ui](/en/uniappx/) | A uni-app x component library with 119 components | uvue, uts |
| [mugsun-core](/en/core/) | Shared backend libraries that you can also use on their own | Spring Boot starters |
| [mugsun-start](/en/start/) | A project generator, still in development | Spring Initializr |

All of them are released under the MIT license. Use the whole set, or only the parts you need.

The ms-ui source repository is not public yet. Its docs and H5 demo are open to everyone. For released versions, see [Versions](/en/guide/upgrade/).

## How it runs

<ArchDiagram />

- The backend is one JAR. At runtime it needs PostgreSQL and Redis. To deploy it as several services, use the [microservice edition](/en/cloud/).
- The admin console is a single-page app that sends every request to the backend. Menus and button permissions come from the backend's `/auth/info` endpoint.
- GIS, analytics and AI are three optional modules. Leave them out at build time, or switch them off with environment variables at startup.
- Analytics data lives in its own `mugsun_track` database, separate from the business database.

For what each repository does and the rules for the module switches, see [Architecture](/en/guide/architecture).

## What is built in

| Feature | Description |
| --- | --- |
| [Accounts and permissions](/en/boot/permissions) | Users, roles and departments. Menu and button permissions are configured in the console, and data permissions limit which rows a role can see |
| [Multi-tenancy](/en/boot/tenant/) | One database and one set of tables serve many tenants. Business tables are isolated by `tenant_id` automatically |
| [Workflow](/en/boot/features/workflow) | Draw processes in the console, with conditions, parallel branches and countersigning |
| [Code generation](/en/boot/codegen/) | Turn a table into backend code, admin console pages and menu SQL |
| [Open API](/en/boot/open-api) | Third-party systems connect with OAuth2 or an API key |
| [Analytics](/en/track/) | Optional. Dashboards, error monitoring and session replay |
| [GIS and maps](/en/pc/gis) | Optional. Layers, scenes and spatial queries |
| [AI center](/en/pc/ai-center) | Optional. Model access, chat and knowledge bases |

For the rest, see the [feature overview](/en/boot/features/).

## When it fits and when it does not

| A good fit | Not a good fit |
| --- | --- |
| Admin systems whose data cannot leave the internal network | Projects that want to drag and drop pages together without writing any code |
| Teams that need both an admin console and behavior analytics, without adding a hosted analytics service | Projects that only need a frontend template and no backend |
| Projects that must run on Kingbase or Dameng databases, or use the SM cryptographic algorithms | Projects that want a hosted analytics service |

## See it in action

You can try the ms-ui components in the [live demo](/en/demo).

The admin console and analytics have no public demo yet. Follow [Getting started](/en/guide/getting-started) to run the whole system on your machine.

## Next steps

<div class="ms-cards">

- [Getting started](/en/guide/getting-started) Run the whole system on your machine with Docker.
- [Architecture](/en/guide/architecture) What each repository does and how to switch the optional modules.
- [Backend overview](/en/boot/) What the backend ships with and how to develop it locally.
- [FAQ](/en/guide/faq) Common questions about startup and deployment.

</div>
