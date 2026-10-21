# Features

The table lists the features mugsun already has, one page each. Features that already have their own documentation link to that page.

| Feature | What it does | Docs |
| --- | --- | --- |
| Workflow | Design approval flows; start, handle, return and transfer tasks | [Workflow](./workflow) |
| Forms | Design forms by drag and drop, or run CRUD on a business table online | [Forms](./form) |
| Rule chains | Chain several steps together with LiteFlow | [Rule chains](./rule) |
| Scheduled tasks | Maintain PowerJob tasks in the console, run them and read their logs | [Scheduled tasks](./job) |
| Reports | Build charts from built-in datasets | [Reports](./report) |
| Object storage | Local disk, MinIO or Aliyun OSS, switchable at runtime | [Object storage](./storage) |
| SMS and mail | SMS providers, mail templates and unified notification templates | [SMS and mail](./notify) |
| Messages and announcements | In-app messages and announcements, pushed over WebSocket | [Messages and announcements](./message) |
| Serial numbers | Generate dated business numbers from rules | [Serial numbers](./serial-number) |
| Global search | The top bar search suggests users, departments, roles and announcements | [Global search](./search) |
| Behavior captcha | Five captcha types, including slider, rotate and click | [Behavior captcha](/en/pc/captcha) |
| GIS and maps | Basemap settings, map workspace and spatial analysis | [GIS and maps](/en/pc/gis) |
| Tracking | Collect page views, events and errors and analyze them on dashboards | [Tracking](/en/track/) |
| AI | Models, chat, knowledge bases and app orchestration | [AI center](/en/pc/ai-center), [Designers](/en/pc/designer) |
| Multi-tenancy | Many tenants in one database, with plans | [Multi-tenancy](/en/boot/tenant/) |
| Data permissions | Filter rows by department or owner | [Data permissions](/en/boot/datascope/) |
| Code generation | Generate backend and frontend code from a table | [Code generation](/en/boot/codegen/) |
| Open platform | Signatures, rate limits and IP allowlists for external APIs | [Open platform](/en/boot/open-api) |

GIS, tracking and AI are optional modules and can be left out at build time. See the [backend overview](/en/boot/).

Most System Settings menus mentioned in this chapter are open only to the platform super admin. The reason is given under "Platform endpoints" in [Tenants and plans](/en/boot/tenant/manage).

## See it work

Sign in to the console as the platform super admin and expand System Settings. You will see the menu items mentioned in this chapter, such as Serial Numbers, Notify Templates and My Messages.

Next: [Workflow](./workflow)
