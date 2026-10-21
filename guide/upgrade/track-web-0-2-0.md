# 埋点 SDK 0.1.0 → 0.2.0

`@mugsun/track-web` 0.1.0 于 2026-08-19 发布到 npm，0.2.0 于 2026-10-13 发布。

两个版本都没有 git tag，本篇对照 npm 上两个版本的包内容和 CHANGELOG。

CHANGELOG 里的 0.1.1 没有发布，可以直接从 0.1.0 升到 0.2.0。

## 破坏性变更

### 回放默认遮罩页面文本

0.2.0 的回放插件默认传入 `maskTextSelector: '*'`，回放里所有页面文本都显示为 `*`。0.1.0 只遮罩输入框的值。

需要看清文本时，注册回放插件时传 `maskTextSelector: false`，或者传一个更窄的选择器。

### 响应体默认脱敏

`apiBodyMaskEnabled` 的默认值从 `false` 改为 `true`。开启响应体采集后，JSON 响应体按内置敏感键清单脱敏再上传。

依赖响应体原文的接入，需要显式设置 `apiBodyMaskEnabled: false`。

本地没有设置这个选项时，SDK 会使用 `/track/config` 下发的远端值，下次启动生效。

boot 的 `track_app.api_body_mask_enabled` 默认是 0，远端会下发 false。

所以要确保脱敏，请在本地显式设置 `apiBodyMaskEnabled: true`，或者在管理后台打开「响应体脱敏」。

### 接口地址里的敏感参数

接口监控上报的 URL 会去掉敏感参数的值。

敏感参数包括 `token`、`access_token`、`authorization`、`id_token`、`refresh_token` 等。

匹配不区分大小写，值替换为 `***`，其他业务参数保留。

0.1.0 上报完整的查询串。

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
4. 检查有没有地方依赖上报 URL 里的 `token` 等参数值，这些值升级后会变成 `***`。

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

打开开启回放的页面，录一段会话，在管理台「会话回放」里播放，页面文字都显示为 `*`。

请求一个带 `?token=abc` 的接口，在浏览器开发者工具里看上报请求，`url` 里的参数值是 `***`。

## 下一个版本

埋点 SDK 计划中的 0.3.0 会把遮罩和响应体脱敏的默认值改回关闭，详见 [会话回放](/track/plugins) 和 [隐私与合规](/track/privacy)。0.3.0 发布后再补本系列的下一篇。
