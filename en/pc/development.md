# Development

Prerequisites: Node.js ≥ 20.19, pnpm ≥ 8.8 (see pc repo pin); [mugsun-boot](https://github.com/mugsun/mugsun-boot) running on `:8080`. When Track is enabled, keep [mugsun-track](https://github.com/mugsun/mugsun-track) as a sibling clone.

1. (If Track is on) run `pnpm setup:sdk` in the pc repo (or build sibling `mugsun-track` per README).
2. `pnpm install`
3. Confirm `.env.development` `VITE_API_PROXY_URL` points at local boot (default `http://localhost:8080`).
4. `pnpm dev` → `http://localhost:3006`
5. Prefer `pnpm gen:api` (or equivalent) over hand-written `any`.

Module flags, build, and lint scripts follow the [mugsun-pc README](https://github.com/mugsun/mugsun-pc/blob/main/README.md) and CI.

Next: [Admin overview](/en/pc/) · [Getting started](/en/guide/getting-started) · [Install Track](/en/track/install)
