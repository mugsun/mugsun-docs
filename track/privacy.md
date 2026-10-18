# 隐私与合规

本页列出 SDK `@mugsun/track-web` 的实际行为。若文档与实现不一致，请在 [mugsun-track](https://github.com/mugsun/mugsun-track/issues) 提 issue。

::: warning 0.3.0 起默认显示原文、全部上报
从 0.3.0（计划版本，见仓库 CHANGELOG「Unreleased」）起，SDK **默认不遮罩、不过滤**：回放显示页面原文，响应体原文上传，已处理的错误和 `HttpError` 也照常上报。需要遮罩或过滤的，由接入方自己打开，见下方 [开启遮罩与过滤](#开启遮罩与过滤)。0.2.0 默认遮罩回放文本和响应体敏感字段。
:::

## 默认行为

| 项 | 行为 |
| --- | --- |
| Do Not Track | 默认尊重（`respectDnt: true`），开启 DNT 的浏览器不采集 |
| 用户拒绝 | `optOut()` 后停止采集与回放，`optIn()` 恢复 |
| 输入内容 | 不采集 `input` / `textarea` 的 `value` |
| 密码与敏感区域 | `input[type="password"]`、`maskSelectors` 命中区域与 `data-track-mask` 元素整块屏蔽 |
| 会话回放 | 默认关闭。开启后**页面文本默认显示原文**（`maskTextSelector` 默认不设置）；输入框的值仍替换为 `***` |
| 响应体 | 默认不采集。开启采集后**默认原文上传**（`apiBodyMaskEnabled` 默认 `false`）；凭证端点永不采集 |
| 错误 | **默认全部上报**，包括 `HttpError` 和标记 `handled` / `expected` 的错误（`skipHandledErrors` 默认 `false`） |
| 普通事件 | 默认原样上报；`beforeSend` 默认不设置 |

## URL 敏感参数

接口监控上报的 URL 保留查询串，但以下键（**小写归一后精确匹配**）的值替换为 `***`，业务参数保留：

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
```

非法 URL 原样返回；相对 URL 保持相对形态。

## 开启遮罩与过滤

默认什么都不遮、不过滤。需要时按下面的方式逐项打开：

```ts
import { createTracker, defaultPlugins, apiMonitorPlugin } from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // 响应体：按内置敏感键清单（password、token、phone、email 等）把值替换为 ***
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
    // 回放：'*' 遮住全部页面文本，也可以传更窄的选择器，如 '.user-info, .order-detail'
    replayPlugin({ maskTextSelector: '*' }),
    apiMonitorPlugin()
  ]
})
```

- `maskTextSelector`：回放里命中选择器的元素，文本替换为 `*`。不传（默认）时显示原文。
- `maskEnabled` 是 api-body 上传器内部的开关，由 `apiBodyMaskEnabled` 传入，接入方配 `apiBodyMaskEnabled` 即可；远端配置下发 `apiBodyMaskEnabled: 1` 也能打开（本地未设置时，下次启动生效）。
- `skipHandledErrors: true` 之后，被跳过的接口错误如果还想统计，在拦截器里调 `trackApiError`，见 [错误过滤与接口失败](/track/install#错误过滤与接口失败)。
- `beforeSend` 不经过回放块和响应体上传，这两类数据只能用 `maskTextSelector` / `maskSelectors` / `data-track-mask` 和 `apiBodyMaskEnabled` 处理。
- 整块不想录的区域（含个人信息的卡片、表格等），加 `data-track-mask` 属性或写进 `maskSelectors`，回放里直接不录这块。

## 合规建议

- 在隐私政策中说明采集范围，并为用户提供拒绝入口（调用 `optOut()`）。
- 包含个人信息的区域加 `data-track-mask` 或写入 `maskSelectors`。
- 开启响应体采集前评估必要性；响应体可能含个人信息时设 `apiBodyMaskEnabled: true`。
- 页面上展示个人信息时，回放用 `maskTextSelector` 遮住对应区域。
- 数据存储在你自己的 PostgreSQL 中，保留周期与访问权限按企业制度配置。

相关：[插件](/track/plugins) · [安全清单](/boot/security-checklist)
