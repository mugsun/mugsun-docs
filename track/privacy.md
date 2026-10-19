# 隐私与合规

本页列出 SDK `@mugsun/track-web` 的实际行为。若文档与实现不一致，请在 [mugsun-track](https://github.com/mugsun/mugsun-track/issues) 提 issue。

::: warning 0.3.0 起默认显示原文、全部上报
0.3.0（计划）起，回放默认录页面文本和输入框原值，响应体个人信息原文上传，错误全部上报，详见 [默认行为](#默认行为)。
:::

::: danger 告知与单独同意（《个人信息保护法》）
开启回放或响应体采集前，接入方须在隐私政策中**告知用户**采集的内容、目的和保留期限；涉及敏感个人信息（身份证号、银行卡号、行踪、健康等）时须取得用户的**单独同意**。
:::

同意前先调用 `tracker.optOut()`（状态持久化到本地存储），或延后 `createTracker()`、不注册 `replayPlugin()`、不开 `apiBodyEnabled`；用户同意后调用 `tracker.optIn()`。SDK 创建后默认就会采集，`optIn()` 只是撤销之前的 `optOut()`。

回放和响应体数据的访问权限与保留周期也要相应收紧。

## 默认行为

| 项 | 行为 |
| --- | --- |
| Do Not Track | 默认尊重（`respectDnt: true`），开启 DNT 的浏览器不采集 |
| 用户拒绝 | `optOut()` 后停止采集与回放，`optIn()` 恢复 |
| 输入内容（自动采集） | 点击等自动采集事件不带 `input` / `textarea` 的 `value`；回放见下一行 |
| 始终不录 | `input[type="password"]`、`maskSelectors` 命中区域、`data-track-mask` 元素、银行卡字段（`autocomplete` 以 `cc-` 开头）、一次性验证码字段（`autocomplete="one-time-code"`）在回放里整块不录；canvas 不录 |
| 会话回放 | 默认关闭。开启后**页面文本和输入框的值默认显示原文**（`maskTextSelector` 默认不设置，`maskAllInputs` 默认 `false`） |
| 响应体 | 默认不采集。开启采集后个人信息**默认原文上传**（`apiBodyMaskEnabled` 默认 `false`）；凭证类键（`token`、`refresh_token`、`password`、`cookie` 等）始终替换为 `***`；凭证端点永不采集 |
| 错误 | **默认全部上报**，包括 `HttpError` 和标记 `handled` / `expected` 的错误（`skipHandledErrors` 默认 `false`） |
| 普通事件 | 默认原样上报；`beforeSend` 默认不设置 |

## URL 敏感参数

接口监控上报的 URL 保留查询串，但以下键的值替换为 `***`（匹配时忽略大小写与 `_`、`-`，`accessToken`、`Refresh-Token` 也算；归一后精确匹配，`tokenCount`、`sessionTimeout` 不算），业务参数保留：

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
```

非法 URL 原样返回；相对 URL 保持相对形态。

## 响应体中的凭证字段

响应体 JSON 里下面这些键的值**始终**替换为 `***`，不受 `apiBodyMaskEnabled` 控制。清单在 [URL 敏感参数](#url-敏感参数) 的基础上另加 `x-api-key`、`client_secret`、`private_key`、`passwd`、`pwd`、`cookie`、`set-cookie`、`session`、`session_id`、`jsessionid`，匹配时忽略大小写与 `_`、`-`，所以 `accessToken`、`Access-Token`、`sessionId` 都能识别：

```text
token  access_token  refresh_token  id_token  authorization
api_key  apikey  x-api-key  auth  secret  client_secret  private_key
password  passwd  pwd  cookie  set-cookie  session  session_id  jsessionid
```

- **层级**：对象和数组逐层检查，最多 8 层；更深的子树整体替换为 `***`，不会原样上传。
- **非 JSON**：只采集 content-type 为 JSON 的响应体，其他类型（HTML、文本、二进制、SSE）一律不采集。
- **声明为 JSON 但解析失败**：不上传响应体，`api_request` 事件标记 `body_skipped: 'unparsable'`。

`apiBodyMaskEnabled` 只控制个人信息类键（`phone`、`mobile`、`email`、`idcard`、`bankcard`），默认原文上传。

键名不在清单里的令牌（例如 `jwt`、`sessionKey`）不会被识别。需要时用 `apiBodyEnabled: false` 关掉响应体采集。

## 开启遮罩与过滤

默认什么都不遮、不过滤。需要时按下面的方式逐项打开：

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // 响应体：个人信息键（phone、email、idcard 等）也替换为 ***（凭证类键不设也会替换）
  apiBodyMaskEnabled: true,
  // 错误：跳过 HttpError 和标记 handled / expected 的错误
  skipHandledErrors: true,
  // 普通事件：入队前改写或丢弃 props
  beforeSend: (e) => {
    if (e.props?.phone) e.props.phone = '***'
    return e
  },
  replayEnabled: true,
  apiMonitorEnabled: true,
  apiBodyEnabled: true,
  plugins: [
    ...defaultPlugins(),
    // 回放：'*' 遮住全部页面文本，也可以传更窄的选择器，如 '.user-info, .order-detail'；
    // maskAllInputs 把所有输入框的值录成 ***
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true }),
    apiMonitorPlugin()
  ]
})
```

- `maskTextSelector`：回放里命中选择器的元素，文本替换为 `*`。不传（默认）时显示原文。
- `maskAllInputs`：设 `true` 时回放里所有输入框的值录成 `***`。默认 `false`，录原值；密码框不论如何都不录。
- `maskEnabled` 是 api-body 上传器内部的开关，由 `apiBodyMaskEnabled` 传入，接入方配 `apiBodyMaskEnabled` 即可；远端配置下发 `apiBodyMaskEnabled: 1` 也能打开（本地未设置时，下次启动生效）。
- `skipHandledErrors: true` 之后，被跳过的接口错误如果还想统计，在拦截器里调 `trackApiError`，见 [错误过滤与接口失败](/track/install#错误过滤与接口失败)。
- `beforeSend` 不经过回放块和响应体上传，这两类数据只能用 `maskTextSelector` / `maskSelectors` / `data-track-mask` 和 `apiBodyMaskEnabled` 处理。
- 整块不想录的区域（含个人信息的卡片、表格等），加 `data-track-mask` 属性或写进 `maskSelectors`，回放里直接不录这块。

## 从 0.2.0 升级、保留原来的遮罩

0.2.0 默认遮住回放里的全部页面文本和输入值，并对响应体里的敏感键脱敏。0.2.0 没有 `skipHandledErrors`，错误本来就全部上报，所以不用设。升级后想保持 0.2.0 的行为，加下面的配置：

```ts
import { createTracker } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  apiBodyMaskEnabled: true, // 0.2.0 的默认值：手机号、邮箱、身份证号等也替换为 ***
  plugins: [
    // ...你原来的插件
    // 0.2.0 的默认值：遮住全部页面文本和所有输入值
    replayPlugin({ maskTextSelector: '*', maskAllInputs: true })
  ]
})
```

远端配置也要看：mugsun-boot 的「响应体脱敏」默认关，`/track/config` 下发 `apiBodyMaskEnabled: false`。本地没设置时，SDK 下次启动就用这个远端值。

要确保脱敏，就在本地显式设 `apiBodyMaskEnabled: true`（本地优先），或在管理后台打开「响应体脱敏」。

0.3.0 计划里曾把 `skipHandledErrors` 默认设为 `true`，但没有发布过。想跳过 `HttpError` 和已处理的错误时，再加 `skipHandledErrors: true`。

## 合规建议

- 在隐私政策中说明采集范围，并为用户提供拒绝入口（调用 `optOut()`）。
- 包含个人信息的区域加 `data-track-mask` 或写入 `maskSelectors`。
- 开启响应体采集前评估必要性；响应体可能含个人信息时设 `apiBodyMaskEnabled: true`。
- 页面上展示个人信息时，回放用 `maskTextSelector` 遮住对应区域；表单含个人信息时设 `maskAllInputs: true`。
- 错误默认全部上报，`$error` 的 message 可能带手机号、订单号或后端异常文本，需要时用 `beforeSend` 改写。
- 数据存储在你自己的 PostgreSQL 中，保留周期与访问权限按企业制度配置。

相关：[插件](/track/plugins) · [安全清单](/boot/security-checklist)
