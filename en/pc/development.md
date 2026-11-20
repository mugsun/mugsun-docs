# Local development

Run the admin console on your machine against a local backend. The later sections cover common commands, tests, and a few things to know while developing.

## Prerequisites

| You need | Notes |
| --- | --- |
| Node.js | 22.13 or later |
| pnpm | 11.11 or later; `package.json` pins `pnpm@11.28.2` |
| Backend | [mugsun-boot](/en/boot/) running on port `8080`, see [Getting started](/en/guide/getting-started) |

The analytics SDK `@mugsun/track-web` is installed from npm. You do not need to clone another repository.

## Start it

<div class="ms-steps">

### Install dependencies

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
```

### Start the dev server

```bash
pnpm dev
```

Your browser opens <http://localhost:3006>.

### Sign in

The account is `admin`. The password is the one you set with `MUGSUN_INIT_PASSWORD` when you started the backend.

</div>

During development, requests that start with `/api` are forwarded to the backend with the `/api` prefix removed.

| To change | Edit |
| --- | --- |
| Backend address | `VITE_API_PROXY_URL` in `.env.development`, default `http://localhost:8080` |
| Frontend port | `VITE_PORT` in `.env`, default `3006` |

If you change the frontend port, change `MUGSUN_FRONT_URL` on the backend too. CORS and the OAuth redirect both use it.

## Common commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Type-check, then bundle into `dist/` |
| `pnpm serve` | Preview the bundle |
| `pnpm test` | Unit tests with Vitest |
| `pnpm test:ui-check` | [UI self-check](/en/pc/ui-check), no backend needed |
| `pnpm test:e2e` | End-to-end tests with Playwright, see [below](#e2e) |
| `pnpm lint` / `pnpm fix` | ESLint check / auto-fix |
| `pnpm gen:api` | Generate API types from the backend's OpenAPI document; the backend must be running |

`pnpm gen:api` reads `http://localhost:8080/v3/api-docs` and writes `src/types/api/openapi.d.ts`.

## Add a page

<div class="ms-steps">

### Write the endpoint

Implement the endpoint on the backend and declare its permission code with `@SaCheckPermission`.

### Update the API types

```bash
pnpm gen:api
```

### Register the menu

Add the menu and the button permission codes under Menu management. Frontend routes are delivered with the menu.

### Write the page

Pages live under `src/views/`. Put a self-contained optional feature in `modules/<name>/` and add a `VITE_ENABLE_<NAME>` switch for it.

</div>

To turn off one of the three existing optional modules, see [Turn off optional modules](/en/pc/#turn-off-optional-modules).

## Access mode and CORS

These two variables go in `.env` and take effect at build time.

| Variable | Default | Notes |
| --- | --- | --- |
| `VITE_ACCESS_MODE` | `backend` | Where menus and permissions come from; only `backend` or `frontend` |
| `VITE_WITH_CREDENTIALS` | `false` | When `true`, requests carry cookies |

- `backend`: menus and permissions come from the backend API. Use this for real projects.
- `frontend`: menus and permissions are written in the frontend route config. Good for small projects and demos.

Set `VITE_WITH_CREDENTIALS` to `true` only when the admin console and the backend are on different origins and you need cookies.

The backend must then allow credentials across origins as well.

## End-to-end tests {#e2e}

The end-to-end tests talk to a real backend and do not solve captchas, so they come in two suites, one per backend setup.

| Suite | Command | Backend requirement |
| --- | --- | --- |
| Main suite | `pnpm test:e2e` | Captcha off, PowerJob Server reachable on port `7700` |
| Captcha-on suite | `pnpm test:e2e:captcha-on` | Captcha left on (the default) |

For both suites, start the frontend on port `3007` first with `pnpm dev:e2e`.

`MUGSUN_FRONT_URL` on the backend must point to that port too.

### Main suite

- There are two ways to turn the captcha off: set `mugsun.captcha.enabled=false`, or turn off the captcha switch of the platform tenant.
- Before running, the suite requests `/auth/captcha/config`. It fails right away if the captcha is still on or the endpoint returns something unexpected.
- The scheduled-job cases need PowerJob, and the backend must be started with `--powerjob.worker.enabled=true`.
- If port `7700` is unreachable the suite fails right away. It does not start any container.

To let the tests start the PowerJob containers for you, set `E2E_START_POWERJOB=1`:

```bash
E2E_START_POWERJOB=1 E2E_POWERJOB_CONTAINERS=my-pj-db,my-pj pnpm test:e2e
```

Container names are comma-separated. The default is `powerjob-mysql,powerjob-server`.

### Captcha-on suite

- The cases live in `e2e/captcha-on/` and do not need PowerJob.
- They check that sign-in, sign-up and the forgot-password code request are all rejected without a `captchaToken`.
- A rejection is HTTP 200 with `code` set to `40013`.
- When the backend explicitly returns `enabled=false`, these cases are skipped with the reason stated.

## Where the session is stored

| What | Where | When it is lost |
| --- | --- | --- |
| Access token, refresh token, signed-in flag | `sessionStorage`, key `sys-v{version}-user-session` | The tab is closed |
| Language, user info, search history | `localStorage` | Cleared by hand |
| Lock-screen password | In memory only, as a salted SHA-256 hash | The page is reloaded |

So reloading within the same tab keeps you signed in, while a new tab or a restarted browser asks you to sign in again.

::: warning The lock screen is not a security boundary
The lock screen only covers the interface. Unlocking is checked in the frontend, not by the backend, and reloading the page unlocks it.
:::

## Profile avatar

The user center can upload an avatar through `POST /auth/avatar/upload`.

- Only png, jpg, jpeg, gif and webp are accepted, up to 2 MB.
- A successful upload becomes your avatar at once; the page and the top bar update together.
- The avatar address looks like `/auth/avatar/raw/{id}`. It needs no sign-in, so you can put it straight into `<img src>`.

For the endpoint details, see [Permissions: avatars](/en/boot/permissions#avatars).

## Next steps

<div class="ms-cards">

- [Admin console overview](/en/pc/) Which pages it has and how the code is laid out.
- [UI self-check](/en/pc/ui-check) The interface checks to pass before you commit.
- [Docker deployment](/en/pc/deploy-docker) Build an image and serve it with Nginx.
- [Install the analytics SDK](/en/track/install) Add tracking to your own pages.

</div>
