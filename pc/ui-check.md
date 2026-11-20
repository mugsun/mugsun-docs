# UI 自检

管理后台带一套 Playwright 自检，不用启动后端就能跑。它在 CI 里是必过项，检查名是 `UI self-check`。

改了表单、弹窗或者独立挂载的组件后，先在本地跑一遍。

## 检查什么

| 测试文件 | 检查什么 |
| --- | --- |
| `form-layout.spec.ts` | 打开每个页面的新增和编辑弹窗，空着点保存，看红字校验提示和表单标签是否完整可见 |
| `standalone-apps.spec.ts` | 把每个单独用 `createApp` 挂载的应用打开一次，控制台不能有报错 |
| `ai-drawer-focus.spec.ts` | AI 助手抽屉在打开、切换和关闭时，键盘焦点落在哪里 |
| `feedback-attachment.spec.ts` | 反馈管理页的附件列，以及点开图片附件 |
| `flow-user-select.spec.ts` | 待办工作台和审批中心的选人框 |

- 测试文件都在 `e2e-ui/` 目录下。
- 每项都在四种组合下跑，也就是中文和英文各配亮色和暗色。
- 接口全部在浏览器里模拟，不需要后端和数据库。
- 视口固定是 1440×900。
- 目录里另外两个 `*-review-shots.spec.ts` 是出截图用的，也会一起跑。

### 表单布局检查的细则 {#form-layout}

- 页面从路由里自动找出，不用手工登记。
- 带必填项的表单页也检查。没有必填项的查询栏不检查。
- 每条校验提示不能和同一个表单里的其他表单项重叠。多列布局下，右边和下面的项也会比。
- 提示不能被外层的 `overflow` 裁掉，并且要完整地出现在视口里。
- 表单标签的文字不能溢出。

### AI 抽屉焦点检查的细则 {#ai-drawer}

- 打开抽屉后，焦点在输入框里。
- 按 Tab 到模型选择时，焦点元素有 2px 的 `:focus-visible` 描边。
- 按 Esc 关闭后，焦点回到「AI」按钮。
- 抽屉的代码还在加载或者加载失败时，也能关闭。这时 48px 的顶栏还在，关闭按钮能点。

## 本地运行

```bash
pnpm install
pnpm exec playwright install chromium
pnpm test:ui-check
```

- 第二条命令只在第一次运行前需要。
- 测试会在 `3092` 端口启动开发服务器，跑完自动停掉。

| 想做什么 | 命令 |
| --- | --- |
| 换端口 | `UI_CHECK_PORT=3093 pnpm test:ui-check` |
| 只跑一种组合 | `pnpm test:ui-check --project en-dark` |
| 只跑一项 | `pnpm test:ui-check standalone-apps` |
| 只查部分路由 | `UI_CHECK_ONLY='^/gis' pnpm test:ui-check form-layout` |

- 组合有 `zh-light`、`en-light`、`zh-dark` 和 `en-dark` 四种。
- `UI_CHECK_ONLY` 的值是匹配路由路径的正则。设了以后不检查弹窗数和提示数的下限。
- 在 Linux 上要先装中文字体，否则中文标签的宽度不对，会误报溢出。
- 装字体的命令是 `sudo apt-get install -y fonts-noto-cjk`。CI 已经装了，macOS 不用装。

## 看结果

终端会逐条列出问题和打开过的弹窗，例如：

```text
✗ /ai/model 新增弹窗 · 「Please enter Model name」：与表单项「Remark」重叠 6px
◻ 弹窗 /gis/layer 新增「入库图层」
```

- `✗` 开头的是问题，`◻` 开头的是打开过的弹窗。
- 截图和 JSON 结果在 `e2e-ui-report/` 目录，这个目录不进 Git。
- CI 失败时，同样的内容作为 `ui-check-report` 产物上传，保留 7 天。

## 漏检也算失败 {#coverage}

下面的情况都会让检查失败，避免弹窗没被打开却显示通过。

| 情况 | 说明 |
| --- | --- |
| 按钮点不动 | 找到了新增或编辑按钮，但点击被挡住 |
| 弹窗没出来 | 点了两次，弹窗仍然没有出现 |
| 页面打不开 | 路由对应的页面没有加载出来 |
| 预热失败 | 开始前会把所有路由组件加载一遍，有组件加载失败 |
| 弹窗数或提示数太少 | 低于下面说的下限 |

- `form-layout.spec.ts` 里的 `BASELINE` 记着当前的基线。每种组合打开 78 个弹窗，出现 140 条校验提示。
- 下限是基线减 2，现在是 76 和 138。减 2 是给偶尔的波动留余量。
- 删除或新增弹窗和必填项时，要在同一个 PR 里改 `BASELINE`。
- 数目对不上时，把中英文两份弹窗清单比一下，就能找到差的那个。

## 写新页面时要注意 {#conventions}

### 不打开弹窗的「新增」按钮

文字像「新增」但点了不打开弹窗的按钮，要登记到 `e2e-ui/support/session.ts` 的 `NOT_DIALOG` 里。现在有 4 条。

| 路由 | 按钮 | 原因 |
| --- | --- | --- |
| `/ai/assistant` | 「新对话」「新建对话」和 New chat | 新开一个会话 |
| `/system/message-send` | 「添加变量」和 Add Variable | 在表单里加一行变量 |
| `/track/funnel` | 「添加步骤」和 Add step | 在漏斗里加一个步骤 |
| `/system/gen-modeling` | 「手工新建」和 New model | 在页面里打开空白的建模画布 |

- 每条要写路由、按钮文字的正则和原因。路由要完全相同才算。
- 正则里中文和英文的按钮文字都要写。

### 文字不以「新增」开头的按钮

- 自检靠按钮文字找新增按钮，中文认「新增」「添加」「新建」和「创建」开头的文字。
- 英文认 Add、New 和 Create 开头的文字。
- 打开弹窗的按钮不是这样开头时，要把文字补进 `ADD_RE`，例如 `/gis/layer` 的「入库图层」。

### 独立挂载的应用

- 自检扫描 `src/` 和 `modules/` 里调用 `createApp(` 的文件，找出独立挂载的应用。
- 它从同一个文件里形如 `el.id = '...'` 的赋值找到挂载节点，再点节点里第一个可见的按钮。
- 新加独立应用时照这个写法写，否则测试会报找不到挂载节点。

::: tip 独立应用要自己装插件
独立应用不继承主应用装的插件。用到 `$t` 或 `useI18n` 时，要自己 `.use(i18n)`。

否则打开时报 `Need to install with app.use function`。这条测试抓的就是这类问题。
:::

## 没覆盖的地方 {#limits}

- 只在 1440px 宽的视口下检查。
- 390px 的窄屏没有覆盖，要按 PR 模板里的清单手工检查。

## 下一步

<div class="ms-cards">

- [表单校验](/pc/form-validation) 必填和格式提示怎么写。
- [空状态](/pc/empty-state) 没有数据时页面显示什么。
- [本地开发](/pc/development) 怎么启动和构建管理后台。

</div>
