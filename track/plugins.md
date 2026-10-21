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
| 错误 | `errorPlugin()` | JS 错误、资源加载错误与未处理的 Promise 拒绝；堆栈 `stack` 最多保留 4096 字符，其它字符串属性 1024；堆栈里脚本地址的 `?` / `#` 之后部分（常带 token、签名）会去掉，只留 `:行:列`；单个事件的属性合计超过 16KB 时先缩短堆栈 |

错误指纹按 message 和堆栈首帧的脚本地址（不含行列号）计算。计算前会先去掉这个地址的 query 和 hash，同一错误不会再因 token、签名不同分成多组。

::: warning 升级后错误分组会断开一次
首帧脚本地址带 `?` 或 `#` 的错误（例如带版本号、token、签名的 CDN 地址），升级后生成新的指纹，归入新的错误分组，已有分组不会与新分组合并。首帧地址不带 query 的错误，指纹不变。
:::

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
- 离开页面：页面转到后台时（切标签、锁屏、移动端切应用），剩余缓冲先压缩，再用 `sendBeacon` / `fetch keepalive` 发出；如果压缩还没完成页面就关闭了，这部分改为不压缩直接发出，不会重复上传。页面关闭（`pagehide`）时剩下的尾巴按每块 32KB 以内的明文发出，所有收尾块合计不超过 **44KB**，放不下的较晚事件会丢弃。（mugsun-track [#14](https://github.com/mugsun/mugsun-track/pull/14)、[#15](https://github.com/mugsun/mugsun-track/pull/15) 之前，收尾时整个缓冲合成一块发送，超过 64KB 就会整块丢失）
- 为什么是 44KB：`sendBeacon` 和 `fetch keepalive` 共用每个页面约 64KB 的在途额度，页面关闭时普通事件队列的收尾发送（同样走 beacon）和仍在途的回放块也占这份额度，回放收尾只取其中 44KB，给普通事件留出余量。
- 回放块序号允许有空洞（上面丢弃的块不会上传）。管理台播放器按时间排序后从第一个全量快照开始播放；开头的块缺失、没有全量快照时，显示「回放缺少首屏快照」，不会白屏。（mugsun-pc [#45](https://github.com/mugsun/mugsun-pc/pull/45)）
- 定时全量快照：默认每 3 分钟做一次全量快照（rrweb 内置的 `checkoutEveryNms`），可用 `replayPlugin({ checkoutEveryNms: 60000 })` 调整，传 `false` 关闭。中间某块缺失时，播放器丢掉缺块之后的增量，从下一个全量快照接着播，丢一块最多跳过约 3 分钟。代价是每 3 分钟多上传一份页面快照（gzip 后通常几十 KB）。（mugsun-track [#18](https://github.com/mugsun/mugsun-track/pull/18)、mugsun-pc [#45](https://github.com/mugsun/mugsun-pc/pull/45)）
- 缺块提示：播放器顶部提示缺了几个块，包括拉取失败的块和服务端清单里没有的序号。缺块之后再没有全量快照时，显示「后续录制不完整」，不会悄悄提前结束。（mugsun-pc [#53](https://github.com/mugsun/mugsun-pc/pull/53)）
- 默认**页面文本和输入框的值显示原文**（0.3.0 起不再默认传 `maskTextSelector: '*'`，`maskAllInputs` 默认 `false`）。
- 始终整块不录：`input[type="password"]`、带 `data-track-mask` 属性的元素、银行卡字段（`autocomplete` 以 `cc-` 开头）、一次性验证码字段（`autocomplete="one-time-code"`）。
- 需要遮罩时：`replayPlugin({ maskTextSelector: '*', maskAllInputs: true })` 遮全部文本和输入值，文本也可以传更窄的选择器，如 `'.user-info'`。见 [隐私与合规](/track/privacy#开启遮罩与过滤)。
- 按《个人信息保护法》，处理敏感个人信息须取得单独同意，这由接入方（个人信息处理者）负责，SDK 默认采集不等于用户已同意。取得同意前，可先调用 `optOut()` 或推迟 `createTracker()`，同意后再 `optIn()`；也可以设 `maskAllInputs: true`，页面文本另用 `maskTextSelector`。具体以法务意见为准。见 [隐私与合规](/track/privacy)。

```html
<!-- 整块不录 -->
<div data-track-mask>身份证号：…</div>
```

管理台「会话回放」播放器里的效果如下：开启文本遮罩（`maskTextSelector: '*'`）录制的演示会话，导航、标题、正文和按钮文字都显示为 `*`，只保留页面结构与交互轨迹，下方打点条标出点击、页面切换和错误的位置。

![会话回放开启文本遮罩（maskTextSelector: '*'，演示数据）](/screenshots/track/track-replay-masked.png)

## 接口监控

`apiMonitorPlugin()` 记录请求的方法、URL、状态码与耗时，事件名为 `api_request`。

| 开关 | 默认 | 说明 |
| --- | --- | --- |
| `apiMonitorEnabled` | 关 | 总开关 |
| `apiBodyEnabled` | 关 | 采集响应体，经独立通道 `/track/api-body` 上传，不进事件队列 |
| `apiBodyMaskEnabled` | 关（0.3.0 起） | 设 `true` 时，响应体中的个人信息字段值替换为 `***`；凭证类键不论开关始终替换，见 [隐私与合规](/track/privacy#响应体中的凭证字段) |
| `apiBodyMaxBytes` | 1MB | 超限不采集并标记 `body_skipped=size` |

内置保护（不可关闭）：

- SDK 自身端点（`/track/collect`、`/track/config`、`/track/replay`、`/track/api-body` 等）不采集，防止循环。
- 凭证端点**永不采集响应体**，事件标记 `body_skipped: 'credential'`。路径（小写后）含以下片段即算：登录与令牌 `/auth/login`、`/auth/refresh`、`/oauth/token`、`/auth/social`；注册 `/register`、`/signup`、`/sign-up`；密码 `/password`、`/forgot`、`/reset-password`、`/change-password`；验证码与多因素 `/otp`、`/sms`、`/captcha`、`/mfa`、`/2fa`、`/totp`、`/verify-code`、`/verification-code`；通用登录与单点登录 `/login`、`/signin`、`/sign-in`、`/logout`、`/token`、`/sso`、`/cas`。另外路径里只要出现 `sms`、`captcha`、`otp`、`verifycode`、`verificationcode` 子串也算，不要求 `/` 前缀，`/sendSms`、`/getCaptcha`、`/verifyCode` 都会命中。
- 上报的 URL 剥离敏感 query，见 [隐私与合规](/track/privacy#url-敏感参数)。

::: warning 0.3.0 行为变更
从 0.3.0（计划版本）起，回放默认显示页面文本和输入值，`apiBodyMaskEnabled` 默认关闭（0.2.0 默认遮罩）。需要遮罩请显式传 `replayPlugin({ maskTextSelector: '*', maskAllInputs: true })`、设置 `apiBodyMaskEnabled: true`。
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
