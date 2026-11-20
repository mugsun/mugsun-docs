# 埋点 SDK 0.1.0 → 0.2.0

`@mugsun/track-web` 0.1.0 于 2026-08-19 发布到 npm，0.2.0 于 2026-10-13 发布。

两个版本的 tag 是 `v0.1.0` 和 `v0.2.0`。CHANGELOG 里的 0.1.1 没有发布，可以直接升到 0.2.0。

::: tip 最新版本是 0.3.0
0.3.0 把本篇里的两个默认值又改回了关闭。打算直接升到 0.3.0 时，请先看[下一个版本](#next)。
:::

## 先看哪些变更影响你

| 变更 | 谁受影响 | 要做什么 |
| --- | --- | --- |
| [回放默认遮罩页面文本](#replay-mask) | 开了会话回放的应用 | 要看原文就关掉遮罩 |
| [响应体默认脱敏](#body-mask) | 开了响应体采集的应用 | 在代码里写明要不要脱敏 |
| [接口地址去掉敏感参数](#url-params) | 分析时用到地址参数值的团队 | 检查是否还依赖这些值 |

## 回放默认遮罩页面文本 {#replay-mask}

0.2.0 的回放插件默认传入 `maskTextSelector: '*'`，回放里所有页面文本都显示为 `*`。0.1.0 只遮罩输入框的值。

需要看清文本时，注册回放插件时传 `maskTextSelector: false`，或者传一个更窄的选择器：

```ts
import { replayPlugin } from '@mugsun/track-web/replay'

replayPlugin({ maskTextSelector: false })
```

## 响应体默认脱敏 {#body-mask}

`apiBodyMaskEnabled` 的默认值从 `false` 改为 `true`。开启响应体采集后，JSON 响应体按内置敏感键清单脱敏再上传。

依赖响应体原文的接入，需要显式设置 `apiBodyMaskEnabled: false`。

::: warning 接 boot 时这个默认值不一定生效
本地没有设置这个选项时，SDK 使用 `/track/config` 下发的值，下次启动生效。boot 里这个开关默认关闭，下发的是 false。

要确保脱敏，请在代码里写 `apiBodyMaskEnabled: true`，或者在「接入管理」的应用表单里打开「响应体脱敏」。
:::

## 接口地址去掉敏感参数 {#url-params}

接口监控上报的地址会把敏感参数的值替换为 `***`，其他参数保留。0.1.0 上报完整的查询串。

0.2.0 处理下面十个参数，匹配时不区分大小写：

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

## 新增

- 新增可选的定位插件 `geoPlugin`，每个会话最多采集一次位置。它不在默认插件里，要显式加入 `plugins`。
- 新增选项 `geoEnabled`，默认关闭。本地设置优先，没有设置时使用远端下发的值。

## 配置项的变化

| 选项 | 0.1.0 | 0.2.0 |
| --- | --- | --- |
| `apiBodyMaskEnabled` | 默认 `false` | 默认 `true` |
| `replayPlugin({ maskTextSelector })` | 不存在 | 默认 `'*'`，传 `false` 关闭 |
| `geoEnabled` | 不存在 | 默认关闭 |

## 其他变化

- 包里的仓库地址从 `curdx/mugsun-track` 改为 `mugsun/mugsun-track`。
- 许可证仍是 MIT，版权方改为北京定旭晨信息科技工作室（mugsun）。

## 升级步骤

1. 升级依赖：

   ```bash
   pnpm add @mugsun/track-web@0.2.0
   ```

2. 需要回放显示原文时，在注册回放插件时传 `maskTextSelector: false`。
3. 依赖响应体原文时，显式设置 `apiBodyMaskEnabled: false`。需要脱敏时，显式设置 `apiBodyMaskEnabled: true`。
4. 检查有没有地方依赖上报地址里 `token` 这类参数的值，这些值升级后会变成 `***`。

## 看效果

确认装上的版本：

```bash
npm ls @mugsun/track-web
```

在代码里也可以读出版本号：

```ts
import { SDK_VERSION } from '@mugsun/track-web'
console.log(SDK_VERSION) // 0.2.0
```

打开开启回放的页面，录一段会话，在管理后台「会话回放」里播放，页面文字都显示为 `*`。

请求一个地址里带 `token` 参数的接口，再看 SDK 发出的上报请求，这个参数的值是 `***`。

## 下一个版本 {#next}

埋点 SDK `0.3.0` 于 2026-10-22 发布到 npm，回放遮罩和响应体脱敏的默认值都改回了关闭。

0.1.0 会遮输入框的值，0.3.0 的回放默认不遮。页面上有个人信息时，升级前先把遮罩打开。

打开的写法见[隐私与合规](/track/privacy#从-0-2-0-升级、保留原来的遮罩)，回放的选项见[插件](/track/plugins#会话回放)。
