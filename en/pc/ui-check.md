# UI self-check

The admin console ships a Playwright self-check that needs no backend. It is a required check in CI (check name `UI self-check`). If you change forms, dialogs or anything mounted as its own app, run it locally first.

## What it checks

| Test | What it does |
| --- | --- |
| `e2e-ui/form-layout.spec.ts` | Finds every page from the router, opens each page's Add and Edit dialogs and every page-level form with required fields, then clicks save with the form empty. Every red validation message must be fully visible: it can't overlap the next field, can't be clipped by an ancestor's `overflow`, and must sit fully inside the viewport. Form labels must not overflow either. |
| `e2e-ui/standalone-apps.spec.ts` | Scans the source for every app mounted with its own `createApp` (for example the AI assistant drawer), opens each one once, and fails on any console error or pageerror. |

Both run in four combinations: Chinese / English × light / dark. All API calls are mocked in the browser, so no backend or database is needed.

## Run it locally

```bash
pnpm install
pnpm exec playwright install chromium   # first run only
pnpm test:ui-check
```

- It starts a Vite dev server on port `3092` and stops it afterwards. If the port is taken, use `UI_CHECK_PORT=3093 pnpm test:ui-check`.
- One combination only: `pnpm test:ui-check --project en-dark` (`zh-light`, `en-light`, `zh-dark`, `en-dark`).
- One test only: `pnpm test:ui-check standalone-apps`.

On failure the terminal lists each problem, for example:

```text
✗ /ai/model 新增弹窗 · 「Please enter Model name」：与下一个表单项重叠 6px
```

Screenshots and JSON results go to `e2e-ui-report/` (git-ignored). In CI the same folder is uploaded as the `ui-check-report` artifact when the job fails.

## Adding a standalone app

The self-check finds standalone apps by `createApp(` and locates the mount node from `el.id = '...'` in the same file, then clicks the first visible button inside it. Follow that pattern for new standalone apps, or the test reports that it can't find the mount node.

::: tip
A standalone app doesn't inherit the main app's plugins. If it uses `$t` / `useI18n`, call `.use(i18n)` on it yourself, or opening it fails with `Need to install with app.use function`. That is exactly what this smoke test catches.
:::
