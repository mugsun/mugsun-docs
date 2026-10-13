# Development

## Prerequisites

- Node.js ≥ 20.19 and pnpm ≥ 8.8
- [mugsun-boot](/en/boot/) running on `:8080`
- With the analytics module on (the default), [mugsun-track](https://github.com/mugsun/mugsun-track) cloned **next to** this repository: the SDK is referenced as `file:../mugsun-track`, and the SDK repository doesn't commit `dist/`

## Start

```bash
pnpm setup:sdk
pnpm install
pnpm dev
```

`pnpm setup:sdk` runs install and build in `../mugsun-track`; skip it with `VITE_ENABLE_TRACK=false`. The dev server runs at `http://localhost:3006` (`VITE_PORT`), and `/api/**` is proxied to `VITE_API_PROXY_URL` in `.env.development` (default `http://localhost:8080`). Sign in with your boot account.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Type-check with `vue-tsc --noEmit`, then `vite build` |
| `pnpm serve` | Preview the production build |
| `pnpm test` | Unit tests (vitest) |
| `pnpm test:e2e` | End-to-end tests (Playwright; the e2e dev port is `3007`, so set `MUGSUN_FRONT_URL` on boot) |
| `pnpm lint` / `pnpm fix` | ESLint check / auto-fix |
| `pnpm gen:api` | Generate `src/types/api/openapi.d.ts` from `http://localhost:8080/v3/api-docs` (boot must be running) |

## Adding a page

1. Implement the endpoint in boot and declare its permission code (`@SaCheckPermission`).
2. Run `pnpm gen:api` to refresh the types.
3. Register the menu and button codes under menu management; routes follow the menus delivered by the backend.
4. Put modular features in `modules/<name>` behind a `VITE_ENABLE_<NAME>` flag.

## Sign-in state

`accessToken`, `refreshToken` and `isLogin` are stored in `sessionStorage` (key `sys-v{version}-user-session`) and disappear when the tab closes. Language, user info and search history stay in `localStorage`. The lock-screen password isn't persisted, so the locked state doesn't survive a reload.

## Next

[Console overview](/en/pc/) · [Add analytics](/en/track/install)
