# UI self-check

The admin console ships a Playwright self-check that needs no backend. It is a required check in CI (check name `UI self-check`). If you change forms, dialogs or anything mounted as its own app, run it locally first.

## What it checks

| Test | What it does |
| --- | --- |
| `e2e-ui/form-layout.spec.ts` | Finds every page from the router, opens each page's Add and Edit dialogs and every page-level form with required fields, then clicks save with the form empty. Every red validation message must be fully visible: it can't overlap any other field in the same form (in multi-column layouts, fields to the right, below and diagonally below are all compared), can't be clipped by an ancestor's `overflow`, and must sit fully inside the viewport. Form labels must not overflow either. |
| `e2e-ui/standalone-apps.spec.ts` | Scans the source for every app mounted with its own `createApp` (for example the AI assistant drawer), opens each one once, and fails on any console error or pageerror. |
| `e2e-ui/ai-drawer-focus.spec.ts` | Opens the AI assistant drawer and checks that focus lands in the input. Tab moves to the model picker, and the focused element has a 2px `:focus-visible` outline. Esc closes the drawer and focus returns to the AI button. |

All three run in four combinations: Chinese / English × light / dark. All API calls are mocked in the browser, so no backend or database is needed.

## Run it locally

```bash
pnpm install
pnpm exec playwright install chromium   # first run only
pnpm test:ui-check
```

- It starts a Vite dev server on port `3092` and stops it afterwards. If the port is taken, use `UI_CHECK_PORT=3093 pnpm test:ui-check`.
- One combination only: `pnpm test:ui-check --project en-dark` (`zh-light`, `en-light`, `zh-dark`, `en-dark`).
- One test only: `pnpm test:ui-check standalone-apps`.
- Some routes only: `UI_CHECK_ONLY='^/gis' pnpm test:ui-check form-layout`. The value is a regex matched against route paths; when it's set, the dialog and message floors aren't checked.
- On Linux, install CJK fonts first, or Chinese labels measure wrong and get reported as overflowing: `sudo apt-get install -y fonts-noto-cjk` (CI already does this). macOS doesn't need it.

On failure the terminal lists each problem, for example:

```text
✗ /ai/model 新增弹窗 · 「Please enter Model name」：与下一个表单项重叠 6px
```

Screenshots and JSON results go to `e2e-ui-report/` (git-ignored). In CI the same folder is uploaded as the `ui-check-report` artifact when the job fails.

## Limitations

- It only checks a 1440px-wide viewport.
- It doesn't cover the 390px narrow screen yet; that's left for a later PR. Until then, check narrow screens by hand using the PR template checklist.
- Gaps count as failures: a button that can't be clicked, a dialog that still hasn't opened after two clicks, a page that won't load, a route component that fails to load during warm-up, or dialog / validation-message counts below the floor all fail the check.

## Floors

- `BASELINE` in `e2e-ui/form-layout.spec.ts` records the current baseline: 78 dialogs and 140 validation messages per combination, the same in Chinese and English.
- The floor is the baseline minus 2 (currently 76 and 138), to absorb occasional jitter.
- If you remove or add dialogs or required fields, update `BASELINE` in the same PR.
- The terminal and the `summary` attachment list every dialog that was opened (`◻ 弹窗 /gis/layer 新增「Add layer」`). If the counts don't match, compare the Chinese and English lists to find the missing one.

## Add buttons that aren't dialogs

Buttons that read like "Add" but don't open a dialog are exempted in `NOT_DIALOG` in `e2e-ui/support/session.ts`. An exemption matches the route exactly and the button text by regex. The regex must cover both the Chinese and English text, and must give a reason. The current 4:

| Route | Button | Reason |
| --- | --- | --- |
| `/ai/assistant` | 新对话 / 新建对话 / New chat | Starts a new conversation, not a dialog |
| `/system/message-send` | 添加变量 / Add Variable | Adds a variable row to the form |
| `/track/funnel` | 添加步骤 / Add step | Adds a step to the funnel |
| `/system/gen-modeling` | 手工新建 / New model | Opens a blank modeling canvas in the page |

The other way round, if a button that opens a dialog doesn't start with 新增 / 添加 / 新建 / 创建 in Chinese, add it to `ADD_RE`. For example, `/gis/layer`'s 「入库图层」 (Add layer).

## Adding a standalone app

The self-check finds standalone apps by `createApp(` and locates the mount node from `el.id = '...'` in the same file, then clicks the first visible button inside it. Follow that pattern for new standalone apps, or the test reports that it can't find the mount node.

::: tip
A standalone app doesn't inherit the main app's plugins. If it uses `$t` / `useI18n`, call `.use(i18n)` on it yourself, or opening it fails with `Need to install with app.use function`. That is exactly what this smoke test catches.
:::
