# 插件

SDK 内核只负责队列、会话、身份与传输，采集能力全部由插件提供。不传 `plugins` 时使用默认插件集；传入则**完全替换**，因此追加插件时请展开 `defaultPlugins()`。

## 默认插件

| 插件 | 工厂函数 | 采集内容 |
| --- | --- | --- |
| 页面浏览 | `pageviewPlugin()` | 首次加载与 SPA 路由切换 |
| 页面停留 | `pageleavePlugin()` | 离开页面时的停留时长 |
| 全埋点 | `autocapturePlugin()` | 点击等交互；跳过 `maskSelectors` 与密码框 |
| 曝光 | `exposurePlugin()` | 元素有效曝光（配合 `v-track:exposure`） |
| Web Vitals | `webVitalsPlugin()` | 核心性能指标 |
| 错误 | `errorPlugin()` | JS 错误、资源加载错误与未处理的 Promise 拒绝 |

## 追加可选插件

```ts
import {
  createTracker,
  defaultPlugins,
  apiMonitorPlugin,
  visualTrack,
  geoPlugin,
} from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const track = createTracker({
  endpoint,
  appKey,
  plugins: [...defaultPlugins(), apiMonitorPlugin(), visualTrack(), replayPlugin()],
  apiMonitorEnabled: true,
  replayEnabled: true,
  replaySampleRate: 10,
})
```

## 会话回放

- 独立入口 `@mugsun/track-web/replay`，基于 rrweb，在插件启用时才懒加载，不进入默认首包。
- 同时满足三点才录制：注册了 `replayPlugin()`、`replayEnabled` 为 `true`（本地或远端下发）、主采样命中且用户未 `optOut`。
- `replaySampleRate` 只决定**是否上传**本会话的回放，录制使用环形缓冲（默认 5 分钟 / 10MB 上限）。
- 离开页面：页面转到后台时（切标签、锁屏、移动端切应用），剩余缓冲先压缩，再用 `sendBeacon` / `fetch keepalive` 发出；页面关闭（`pagehide`）时只剩少量尾巴，按每块 44KB 以内的明文发出。浏览器在卸载期只允许约 64KB 的请求在途，所以收尾总量约 88KB 封顶，超出的最晚事件会丢弃。（mugsun-track [#14](https://github.com/mugsun/mugsun-track/pull/14) 之前，收尾时整个缓冲合成一块发送，超过 64KB 就会整块丢失）
- 默认遮罩：所有输入值、**页面文本**（rrweb `maskTextSelector: '*'`）；`input[type="password"]` 与带 `data-track-mask` 属性的元素整块不录。
- 仅调试时可放开文本遮罩：`replayPlugin({ maskTextSelector: false })`，或传入更窄的选择器。

```html
<!-- 整块不录 -->
<div data-track-mask>身份证号：…</div>
```

管理台「会话回放」播放器里的效果如下：0.2.0 默认配置录制的演示会话，导航、标题、正文和按钮文字都显示为 `*`，只保留页面结构与交互轨迹，下方打点条标出点击、页面切换和错误的位置。

![会话回放默认文本遮罩（演示数据）](/screenshots/track/track-replay-masked.png)

## 接口监控

`apiMonitorPlugin()` 记录请求的方法、URL、状态码与耗时，事件名为 `api_request`。

| 开关 | 默认 | 说明 |
| --- | --- | --- |
| `apiMonitorEnabled` | 关 | 总开关 |
| `apiBodyEnabled` | 关 | 采集响应体，经独立通道 `/track/api-body` 上传，不进事件队列 |
| `apiBodyMaskEnabled` | **开**（0.2.0 起） | 响应体中敏感字段值替换为 `***` |
| `apiBodyMaxBytes` | 1MB | 超限不采集并标记 `body_skipped=size` |

内置保护（不可关闭）：

- SDK 自身端点（`/track/collect`、`/track/config`、`/track/replay`、`/track/api-body` 等）不采集，防止循环。
- 凭证端点（路径含 `/auth/login`、`/auth/refresh`、`/oauth/token`、`/auth/social`）**永不采集响应体**。
- 上报的 URL 剥离敏感 query，见 [隐私与合规](/track/privacy#url-敏感参数)。

::: warning 0.2.0 行为变更
自 0.2.0 起回放默认遮罩页面文本、`apiBodyMaskEnabled` 默认开启。依赖响应体原文的接入须显式设置 `apiBodyMaskEnabled: false`；需要可读文本回放（仅调试）时传 `maskTextSelector: false`。0.2.0 已发布到 npm。
:::

## 圈选与地理位置

- `visualTrack()`：按管理台下发的 `visualRules` 匹配元素并上报；无规则时不安装监听。
- `geoPlugin()`：`geoEnabled` 为 `true` 时采集精确位置，会触发浏览器定位授权。

圈选流程：在「接入管理 → 圈选规则」选中应用后点「进入圈选」，填写要圈选的页面地址，平台会签发 30 分钟令牌并在新窗口打开该页面。页面进入圈选模式，点选元素、填写事件名后提交草稿：

![页面内圈选元素（演示页面）](/screenshots/track/track-visual-inspect.png)

草稿回到管理台的草稿条，确认后生成圈选规则并随 `/track/config` 下发，丢弃则不生效。下方表格是已确认的规则：

![圈选草稿与规则（演示数据）](/screenshots/track/track-visual-drafts.png)

## 下一步

[配置项](/track/install#配置项) · [隐私与合规](/track/privacy)
