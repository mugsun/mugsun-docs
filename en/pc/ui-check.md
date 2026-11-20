# UI self-check

The admin console ships with a Playwright self-check that runs without a backend. It is a required check in CI, named `UI self-check`.

Run it locally after you change a form, a dialog or a separately mounted component.

## What it checks

| Test file | What it checks |
| --- | --- |
| `form-layout.spec.ts` | Opens the add and edit dialogs on every page, saves them empty, and checks that the red validation messages and the form labels are fully visible |
| `standalone-apps.spec.ts` | Opens every app mounted on its own with `createApp` once; the console must stay free of errors |
| `ai-drawer-focus.spec.ts` | Where keyboard focus goes when the AI assistant drawer opens, switches and closes |
| `feedback-attachment.spec.ts` | The attachment column on the feedback management page, and opening an image attachment |
| `flow-user-select.spec.ts` | The user pickers in Todo Workbench and Approval Center |

- All test files live in the `e2e-ui/` directory.
- Each test runs in four combinations: Chinese and English, each in light and dark mode.
- Every API call is mocked in the browser, so no backend or database is needed.
- The viewport is fixed at 1440×900.
- The two `*-review-shots.spec.ts` files in the same directory produce screenshots and run along with the rest.

### Details of the form layout check {#form-layout}

- Pages are discovered from the routes, so there is no list to maintain.
- Form pages with required fields are checked too. Search bars without required fields are not.
- A validation message must not overlap any other form item in the same form. In multi-column layouts, the items to the right and below are compared as well.
- A message must not be clipped by an ancestor's `overflow`, and it must be fully inside the viewport.
- The text of a form label must not overflow.

### Details of the AI drawer focus check {#ai-drawer}

- After the drawer opens, focus is in the input box.
- When Tab reaches the model selector, the focused element shows a 2px `:focus-visible` outline.
- After Esc closes the drawer, focus returns to the AI button.
- The drawer can be closed while its code is still loading or has failed to load. The 48px header is still there and its close button works.

## Run it locally

```bash
pnpm install
pnpm exec playwright install chromium
pnpm test:ui-check
```

- The second command is only needed before the first run.
- The tests start a dev server on port `3092` and stop it when they finish.

| What you want | Command |
| --- | --- |
| Use another port | `UI_CHECK_PORT=3093 pnpm test:ui-check` |
| Run one combination | `pnpm test:ui-check --project en-dark` |
| Run one test file | `pnpm test:ui-check standalone-apps` |
| Check some routes only | `UI_CHECK_ONLY='^/gis' pnpm test:ui-check form-layout` |

- The combinations are `zh-light`, `en-light`, `zh-dark` and `en-dark`.
- `UI_CHECK_ONLY` is a regular expression matched against the route path. When it is set, the minimum dialog and message counts are not enforced.
- On Linux, install a CJK font first. Without one, Chinese labels get the wrong width and are reported as overflowing.
- The command is `sudo apt-get install -y fonts-noto-cjk`. CI already installs it, and macOS does not need it.

## Read the results

The terminal lists every problem and every dialog that was opened, for example:

```text
✗ /ai/model 新增弹窗 · 「Please enter Model name」：与表单项「Remark」重叠 6px
◻ 弹窗 /gis/layer 新增「入库图层」
```

- Lines starting with `✗` are problems, and lines starting with `◻` are dialogs that were opened.
- Screenshots and the JSON results are in the `e2e-ui-report/` directory, which is not tracked by Git.
- When CI fails, the same content is uploaded as the `ui-check-report` artifact and kept for 7 days.

## A missed check is a failure {#coverage}

Each of the cases below fails the check, so that a dialog that never opened cannot pass.

| Case | Description |
| --- | --- |
| Button cannot be clicked | The add or edit button was found, but the click was blocked |
| Dialog did not appear | After two clicks the dialog still has not appeared |
| Page did not open | The page for the route did not load |
| Warm-up failed | Every route component is loaded once before the tests start, and one of them failed to load |
| Too few dialogs or messages | The count is below the minimum described below |

- `BASELINE` in `form-layout.spec.ts` records the current baseline. Each combination opens 78 dialogs and shows 140 validation messages.
- The minimum is the baseline minus 2, which is 76 and 138 today. The margin of 2 allows for occasional fluctuation.
- When you remove or add dialogs or required fields, update `BASELINE` in the same PR.
- When the counts do not match, compare the Chinese and English dialog lists to find the missing one.

## Conventions for new pages {#conventions}

### Add buttons that do not open a dialog

A button whose label looks like an add button but does not open a dialog must be registered in `NOT_DIALOG` in `e2e-ui/support/session.ts`. There are 4 entries today.

| Route | Button | Reason |
| --- | --- | --- |
| `/ai/assistant` | New chat | Starts a new conversation |
| `/system/message-send` | Add Variable | Adds a variable row to the form |
| `/track/funnel` | Add step | Adds a step to the funnel |
| `/system/gen-modeling` | New model | Opens a blank modeling canvas in the page |

- Each entry needs the route, a regular expression for the button label and the reason. The route must match exactly.
- The regular expression must cover both the Chinese and the English label.

### Buttons whose label does not start with an add verb

- The self-check finds add buttons by their label. In Chinese it accepts labels that start with one of the four add verbs listed in `ADD_RE`.
- In English it accepts labels that start with Add, New or Create.
- When a button that opens a dialog starts with something else, add its label to `ADD_RE`. One example is the Add layer button on `/gis/layer`, whose Chinese label starts with a different verb.

### Separately mounted apps

- The self-check scans `src/` and `modules/` for files that call `createApp(` to find the separately mounted apps.
- It finds the mount node from an assignment such as `el.id = '...'` in the same file, and then clicks the first visible button inside that node.
- Write new standalone apps the same way. Otherwise the test reports that it cannot find the mount node.

::: tip Standalone apps install their own plugins
A standalone app does not inherit the plugins installed on the main app. If it uses `$t` or `useI18n`, call `.use(i18n)` on it yourself.

Otherwise opening it fails with `Need to install with app.use function`. This test exists to catch that kind of problem.
:::

## What it does not cover {#limits}

- The check only runs at a viewport width of 1440px.
- The 390px narrow screen is not covered. Check it by hand with the checklist in the PR template.

## Next steps

<div class="ms-cards">

- [Form validation](/en/pc/form-validation) How to write required and format messages.
- [Empty states](/en/pc/empty-state) What a page shows when there is no data.
- [Local development](/en/pc/development) How to start and build the admin console.

</div>
