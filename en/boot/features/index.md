# Features

The backend ships with the features below, one page each. Open the one you need to see how to enable and use it.

## Processes and forms

<div class="ms-cards">

- [Workflow](./workflow) Multi-level approvals such as leave and expenses, with an optional AI pre-check node.
- [Forms](./form) Design forms by drag and drop, or run CRUD on a business table online.
- [Rule chains](./rule) Chain several steps together with LiteFlow.

</div>

## Tasks and data

<div class="ms-cards">

- [Scheduled tasks](./job) Maintain PowerJob tasks in the admin console, run them and read their run history.
- [Reports](./report) Build charts from built-in datasets.
- [Object storage](./storage) Local disk, MinIO or Aliyun OSS, switched in the admin console.
- [Serial numbers](./serial-number) Generate dated business numbers from rules.

</div>

## Messages and search

<div class="ms-cards">

- [SMS and mail](./notify) SMS providers, mail templates, and one call that sends to several channels.
- [Messages and announcements](./message) In-app messages and announcements, pushed over WebSocket.
- [Global search](./search) The top bar search suggests users, departments, roles and announcements.

</div>

## Features documented in other chapters

| Feature | What it does | Docs |
| --- | --- | --- |
| Multi-tenancy | Isolate many tenants in one database and limit features with plans | [Multi-tenancy](/en/boot/tenant/) |
| Data permissions | Filter rows by department or owner | [Data permissions](/en/boot/datascope/) |
| Code generation | Generate backend and frontend code from a table | [Code generation](/en/boot/codegen/) |
| Open platform | Signatures, rate limits and IP allowlists for external APIs | [Open API](/en/boot/open-api) |
| Behavioral captcha | Five captcha types, including slider, rotate and click | [Behavioral captcha](/en/pc/captcha) |
| GIS and maps | Basemap settings, map workspace and spatial analysis | [GIS & maps](/en/pc/gis) |
| Analytics | Collect page views, events and errors and analyze them on dashboards | [Analytics overview](/en/track/) |
| AI | Models, chat, knowledge bases and app orchestration | [AI center](/en/pc/ai-center), [Designers](/en/pc/designer) |

GIS, analytics and AI are optional modules and can be left out at build time. See the [Backend overview](/en/boot/).

## Who can see these menus

Most System Settings menus mentioned in this chapter are open only to the platform super admin. The reason is given under "Platform endpoints" in [Tenants and plans](/en/boot/tenant/manage).

Sign in to the admin console as the platform super admin and expand System Settings. You will see menu items such as Serial Numbers, Notify Templates and My Messages.
