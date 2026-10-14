# Console overview

[mugsun-pc](https://github.com/mugsun/mugsun-pc) is the mugsun admin console. It ships with system management pages, and the GIS, analytics dashboard and AI management pages can be turned on as needed.

## Run locally

You need Node.js 22.13+ and pnpm 11.11+, with the [boot](/en/boot/) backend running on port 8080:

```bash
pnpm setup:sdk   # build the sibling mugsun-track repo
pnpm install
pnpm dev         # open http://localhost:3006
```

During development, `/api` requests are proxied to `http://localhost:8080`.

To change the address, edit `VITE_API_PROXY_URL` in `.env.development`.

![User management (demo data)](/screenshots/pc-system-users.png)

## Layout

```text
mugsun-pc/
  src/             # routing, sign-in, system pages, API wrappers
  modules/
    gis/           # optional: layers, scenes, spatial analysis
    track/         # optional: analytics apps and dashboards
    ai/            # optional: models, chat, knowledge base, MCP
```

## Turn off optional modules

Set the variable to `false` in `.env`, and the build skips that module's routes:

```ini
VITE_ENABLE_GIS = true
VITE_ENABLE_TRACK = true
VITE_ENABLE_AI = true
```

After turning one off you can delete its `modules/` folder. With analytics off you don't need `pnpm setup:sdk`.

## Permissions and API types

Menus, button permission codes and user info all come from the backend `/api/auth/info` endpoint. The frontend keeps no separate permission data.

API types are generated from the backend's OpenAPI document:

```bash
pnpm gen:api   # reads http://localhost:8080/v3/api-docs
```

## License

MIT. Parts of the UI derive from [art-design-pro](https://github.com/Daymychen/art-design-pro) (MIT). Keep the `NOTICE` file when you redistribute.

## Next steps

- [Local development](/en/pc/development)
- [GIS and maps](/en/pc/gis)
- [Docker deployment](/en/pc/deploy-docker)
