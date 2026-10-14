# UI 自检

管理台带一套不依赖后端的 Playwright 自检，在 CI 里是必过项（check 名 `UI self-check`）。改了表单、弹窗或独立挂载的组件后，建议本地先跑一遍。

## 检查什么

| 测试 | 内容 |
| --- | --- |
| `e2e-ui/form-layout.spec.ts` | 从路由自动找出所有页面，打开每个页面的「新增」「编辑」弹窗和带必填项的表单页，空着点保存。断言每条红字校验提示都完整可见：不和同一表单里任意表单项重叠（多列布局下右侧、下方、斜下方的项都会比）、不被外层 `overflow` 裁掉、完整在视口内；表单标签文字也不能溢出。 |
| `e2e-ui/standalone-apps.spec.ts` | 扫描源码里所有单独 `createApp` 挂载的 app（例如 AI 助手抽屉），每个打开一次，控制台不能有 error，也不能有 pageerror。 |
| `e2e-ui/ai-drawer-focus.spec.ts` | 打开 AI 助手抽屉，断言焦点落在输入框；按 Tab 到模型选择，焦点元素上有 2px 的 `:focus-visible` 描边；按 Esc 关闭后，焦点回到「AI」按钮。 |

三项都在中文 / 英文 × 亮色 / 暗色四种组合下跑。接口全部在浏览器里 mock，不需要启动后端和数据库。

## 本地运行

```bash
pnpm install
pnpm exec playwright install chromium   # 首次运行需要
pnpm test:ui-check
```

- 会自动在 `3092` 端口起 Vite dev server，跑完自动停掉。端口被占用时用 `UI_CHECK_PORT=3093 pnpm test:ui-check` 换一个。
- 只跑一种组合：`pnpm test:ui-check --project en-dark`（可选 `zh-light`、`en-light`、`zh-dark`、`en-dark`）。
- 只跑一项：`pnpm test:ui-check standalone-apps`。
- 只查部分路由：`UI_CHECK_ONLY='^/gis' pnpm test:ui-check form-layout`。值是匹配路由路径的正则；设置后不检查弹窗数、提示数下限。
- 在 Linux 本地跑需要先装中文字体，否则中文标签宽度不对、会误报溢出：`sudo apt-get install -y fonts-noto-cjk`（CI 已装）。macOS 不用装。

失败时终端会逐条列出问题，例如：

```text
✗ /ai/model 新增弹窗 · 「Please enter Model name」：与下一个表单项重叠 6px
```

截图和 JSON 结果在 `e2e-ui-report/`（已加入 `.gitignore`）。CI 失败时同样的内容会作为 `ui-check-report` 产物上传。

## 局限

- 只在 1440px 宽的视口下检查。
- 不覆盖 390px 窄屏，留到后续 PR；在那之前，窄屏要按 PR 模板里的清单手动自查。
- 漏检会判失败：按钮点不动、点了两次弹窗还没出来、页面打不开、预热时某个路由组件加载失败，或者弹窗数、校验提示数低于下限，都会让检查失败。

## 下限规则

- `e2e-ui/form-layout.spec.ts` 里的 `BASELINE` 记录当前基线：每种组合打开 78 个弹窗、140 条校验提示，中英文一致。
- 下限是基线减 2（当前 76 和 138），留出偶发抖动的余量。
- 删除或新增弹窗、必填项时，必须在同一个 PR 里改 `BASELINE`。
- 终端和 `summary` 附件会列出每个打开过的弹窗（`◻ 弹窗 /gis/layer 新增「入库图层」`），数目对不上时拿中英文两份清单比一下就能找到差的那个。

## 不是弹窗的「新增」按钮

文字像「新增」但点了不打开弹窗的按钮，要在 `e2e-ui/support/session.ts` 的 `NOT_DIALOG` 里豁免。豁免规则是：路由精确匹配、按钮文字正则匹配，正则里中英文文字都要写，每条必须写明原因。当前 4 条：

| 路由 | 按钮 | 原因 |
| --- | --- | --- |
| `/ai/assistant` | 新对话 / 新建对话 / New chat | 新开一个会话，不是弹窗 |
| `/system/message-send` | 添加变量 / Add Variable | 在表单里加一行变量 |
| `/track/funnel` | 添加步骤 / Add step | 在漏斗里加一个步骤 |
| `/system/gen-modeling` | 手工新建 / New model | 在页内打开空白建模画布 |

反过来，打开弹窗的按钮如果中文不以「新增 / 添加 / 新建 / 创建」开头，要补进 `ADD_RE`，例如 `/gis/layer` 的「入库图层」。

## 新增独立挂载的 app

自检通过 `createApp(` 自动发现独立 app，并从同一个文件里的 `el.id = '...'` 找挂载节点，然后点击节点里第一个可见按钮打开它。新加独立 app 时请沿用这个写法，否则测试会提示找不到挂载节点。

::: tip
独立 app 不会继承主应用装的插件。用到 `$t` / `useI18n` 时要自己 `.use(i18n)`，否则打开时会报 `Need to install with app.use function`，这正是这条冒烟测试要抓的问题。
:::
