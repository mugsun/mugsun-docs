# Development

## Prerequisites

- Node.js ≥ 22.13 and pnpm ≥ 11.11 (`packageManager` pins `pnpm@11.28.2`)
- [mugsun-boot](/en/boot/) running on `:8080`
- Whether or not the analytics module is on, [mugsun-track](https://github.com/mugsun/mugsun-track) must be cloned next to this repository: the SDK is referenced as `file:../mugsun-track`, and the SDK repository doesn't commit `dist/`

## Start

```bash
pnpm setup:sdk
pnpm install
pnpm dev
```

`pnpm setup:sdk` runs install and build in `../mugsun-track`; you can skip it with `VITE_ENABLE_TRACK=false`, but the sibling directory must still exist because `pnpm install` resolves it. The dev server runs at `http://localhost:3006` (`VITE_PORT`), and `/api/**` is proxied to `VITE_API_PROXY_URL` in `.env.development` (default `http://localhost:8080`). Sign in with your boot account.

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

What this means for users ([pc#4](https://github.com/mugsun/mugsun-pc/pull/4)):

- Reloading in the same tab keeps you signed in; **opening a new tab or reopening the browser requires signing in again**.
- The lock screen doesn't survive a reload.
- After upgrading, tokens saved in `localStorage` by older versions are no longer read, so **everyone has to sign in once more**.

## Profile avatar

Uploading an avatar on the profile page ([pc#8](https://github.com/mugsun/mugsun-pc/pull/8)):

- Only png / jpg / jpeg / gif / webp are accepted (both MIME type and extension are checked), up to 2MB; anything else is rejected with a message and not uploaded.
- It calls `POST /auth/avatar/upload`; the backend sets the upload as your avatar, and the page and header avatar update immediately.
- The avatar URL looks like `/auth/avatar/raw/{id}`; the console prefixes it the same way as API calls (e.g. `/api/auth/avatar/raw/{id}`). **The URL can be fetched without signing in**, so it works directly as an `<img src>`. Older `http(s)://` avatars are shown as-is; an empty avatar falls back to the default image.

See [Permissions · Avatars](/en/boot/permissions#avatars) for endpoint details.

## Next

[Console overview](/en/pc/) · [Add analytics](/en/track/install)
