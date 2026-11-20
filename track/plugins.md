# 插件

SDK 的核心只管队列、会话、身份和发送，采集都交给插件。六个默认插件装上就用，另外四个按需注册。

## 一览

| 插件 | 默认注册 | 事件 | 采集什么 |
| --- | --- | --- | --- |
| `pageviewPlugin()` | 是 | `$pageview` | 首次打开和每次路由切换 |
| `pageleavePlugin()` | 是 | `$pageleave` | 离开页面时的停留时长 |
| `autocapturePlugin()` | 是 | `$click` `form_submit` | 点击和表单提交，不采集输入的内容 |
| `exposurePlugin()` | 是 | `$exposure` | 元素露出一半并停留 1 秒 |
| `webVitalsPlugin()` | 是 | `$web_vitals` | 五项核心性能指标 |
| `errorPlugin()` | 是 | `$error` | 脚本错误、资源加载失败和未处理的 Promise 拒绝 |
| `apiMonitorPlugin()` | 否 | `api_request` | 每个接口请求的状态码和耗时 |
| `replayPlugin()` | 否 | 回放数据 | 页面的变化过程，在管理后台里回放 |
| `visualTrack()` | 否 | 规则里定的事件名 | 在管理后台圈选出来的元素被点击 |
| `geoPlugin()` | 否 | 不单独发事件 | 精确位置，附在之后的每条事件上 |

## 注册插件

`plugins` 传了就整个替换默认的那一组。要在默认插件之外再加，先展开 `defaultPlugins()`：

```ts
import {
  createTracker,
  defaultPlugins,
  apiMonitorPlugin,
  visualTrack,
  geoPlugin,
} from '@mugsun/track-web'
import { replayPlugin } from '@mugsun/track-web/replay'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  plugins: [
    ...defaultPlugins(),
    apiMonitorPlugin(),
    visualTrack(),
    geoPlugin(),
    replayPlugin(),
  ],
})
```

注册只是把插件装上。回放、接口监控和精确位置还各有一个开关，在「接入管理」的应用表单里。开关没开，插件什么都不做。

Vue 里传了 `router` 又自己列插件时，页面访问要写成 `pageviewPlugin({ manual: true })`，由路由驱动。

## 默认插件

### 页面访问和停留

第一次打开页面发一条 `$pageview`。之后每次换页，先给上一页补一条 `$pageleave`，再发新页面的 `$pageview`。

路径或 hash 变了才算换页，只改查询参数不算。切到后台或关闭页面时也发 `$pageleave`，`duration_ms` 只算页面可见的时间。

### 点击和表单

点击链接、按钮和带 `data-track-click` 的元素发 `$click`，提交表单发 `form_submit`。

| 事件 | 属性 | 说明 |
| --- | --- | --- |
| `$click` | `tag` `element_id` `element_class` `element_text` `href` | 文字最多取 64 个字符，链接里的敏感参数会被遮掉 |
| `form_submit` | `form_id` `form_name` `form_action` `form_method` | 提交地址只记路径 |

输入框和文本域里的内容从不采集。密码框、带 `data-track-mask` 的元素和 `maskSelectors` 命中的区域，连点击都不记。

### 曝光

元素有一半以上进入视口并停留满 1 秒，算一次有效曝光。同一个元素在一次会话里只报一次，列表来回滚动不会重复计数。

Vue 里用 `v-track:exposure` 指令，其他情况调用 `trackExposure()`。不指定事件名时用 `$exposure`。

### 性能指标

页面第一次切到后台或关闭时，把采到的指标发出去。每项指标一条 `$web_vitals`，属性是 `metric` 和 `value`。

| `metric` | 指标 |
| --- | --- |
| `lcp` | 最大内容绘制 |
| `inp` | 交互到下一次绘制，用耗时最长的一次交互近似 |
| `cls` | 累计布局偏移 |
| `fcp` | 首次内容绘制 |
| `ttfb` | 首字节时间 |

长任务的次数和总时长附在第一条上，属性名是 `longtask_count` 和 `longtask_total_ms`。

### 错误

每条 `$error` 都带 `error_type`，说明错误从哪里来：

| `error_type` | 来源 |
| --- | --- |
| `js` | 没有被捕获的脚本错误 |
| `resource` | 图片、脚本、样式等资源加载失败 |
| `promise` | 没有处理的 Promise 拒绝 |
| `vue` | Vue 组件里的错误，由 Vue 插件上报 |

堆栈最多保留 4096 个字符。堆栈里脚本地址的查询参数和 hash 会去掉，因为那里常常带着令牌或签名。

错误指纹 `error_fingerprint` 由错误信息和堆栈第一帧的脚本地址算出，不含行列号。[错误问题单](/track/error-issues)按它归并。

从 0.2.x 升级后，第一帧地址带查询参数的错误会算出新指纹，归到新的分组，和旧分组不合并。

## 会话回放

回放基于 rrweb，把页面的变化录下来，在「埋点分析 → 会话回放」里播放。rrweb 在回放启用后才加载，不进首屏的包。

三个条件都满足才会录：

- 注册了 `replayPlugin()`。
- 应用在「接入管理」里打开了「会话回放」。
- 这个访客被采样抽中，并且没有调用过 `optOut()`。

::: warning 默认不遮文字
从 0.3.0 起，回放默认原样显示页面文字和输入框里的值。页面上有个人信息时，先按[隐私与合规](/track/privacy#开启遮罩与过滤)打开遮罩。
:::

### 录了不一定上传

录制一直写在内存里的环形缓冲区，默认留最近 5 分钟、最多 10 MB。要不要上传，看应用的「回放采样率」：

| 情况 | 结果 |
| --- | --- |
| 会话被回放采样率抽中 | 每 5 秒或每攒够 50 个录制事件上传一块 |
| 没抽中，但会话里出了错误 | 从出错那一刻开始上传，缓冲区里出错前的那段也一起传 |
| 没抽中，也没出错 | 不上传，缓冲区随会话结束丢弃 |

回放采样率设成 0，就只上传出过错的会话。

### 页面关闭时

页面切到后台时，缓冲区里剩下的内容压缩后用 `sendBeacon` 或 `fetch keepalive` 发出。切标签页、锁屏和手机上切应用都算。

页面真正关闭时来不及压缩。剩下的尾巴按每块不超过 32 KB 的明文发出，合计不超过 44 KB，放不下的部分丢弃。

浏览器给页面关闭时的请求一共只留约 64 KB 的额度，普通事件的收尾也要用，所以回放只占其中 44 KB。

丢了块也能播。录制默认每 3 分钟做一次全量快照，播放器遇到缺块就跳到下一个快照接着播，最多跳过约 3 分钟。

播放器顶部会提示缺了几块。开头的块缺失时提示「回放缺少首屏快照」，缺块之后再没有快照时提示「后续录制不完整」。

### 选项和遮罩

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `maskTextSelector` | 无 | 命中的元素文字显示成 `*`。传 `'*'` 遮掉全部文字 |
| `maskAllInputs` | `false` | 设为 `true` 时输入框的值全部遮掉 |
| `checkoutEveryNms` | `180000` | 多久做一次全量快照，单位毫秒。传 `false` 关闭 |
| `chunkIntervalMs` | `5000` | 多久上传一块，单位毫秒 |
| `eventsPerChunk` | `50` | 攒够多少个录制事件就上传一块 |
| `bufferMaxAge` | 5 分钟 | 缓冲区保留多久，单位毫秒 |
| `bufferMaxBytes` | 10 MB | 缓冲区最大多大，单位字节 |
| `maxRetries` | `3` | 一块上传失败后重试几次 |

下面这些内容始终不录，没有开关可以改：

- 密码框。
- 带 `data-track-mask` 属性的元素，以及 `maskSelectors` 命中的区域。
- 银行卡字段，也就是 `autocomplete` 以 `cc-` 开头的输入框。
- 一次性验证码字段，也就是 `autocomplete="one-time-code"` 的输入框。
- canvas 里的画面。

下图是打开文字遮罩后录的一段会话。元素里的文字都显示成星号，页面结构和操作轨迹都还在。

![打开文字遮罩后的会话回放，文字是星号，搜索框里的占位提示还是原文](/screenshots/track/track-replay-masked.png)

文字遮罩只作用于元素里的文字。`placeholder`、`title` 这类属性里的文字照常录下，图里搜索框的占位提示就是原文。

属性里有不该录的内容时，给元素加 `data-track-mask`，这个元素整块不录。

## 接口监控

`apiMonitorPlugin()` 包住 `fetch` 和 XHR，每个请求发一条 `api_request`，SDK 自己的接口除外。

| 属性 | 含义 |
| --- | --- |
| `url` | 完整地址。敏感参数的值换成 `***`，规则见[隐私与合规](/track/privacy#url-敏感参数) |
| `method` | 请求方法 |
| `status` | 状态码。网络失败时是 0，原因写在 `error_message` |
| `duration_ms` | 耗时，单位毫秒 |
| `success` | 状态码在 200 到 399 之间是 `true` |
| `response_size` | 响应体的大小 |
| `body_ref` | 采集到的响应体的编号 |
| `body_skipped` | 没有采集响应体的原因 |

### 开关

| 开关 | 默认 | 作用 |
| --- | --- | --- |
| `apiMonitorEnabled` | 关 | 总开关。没开时插件不包 `fetch` 和 XHR |
| `apiBodyEnabled` | 关 | 采集 JSON 响应体，走单独的 `/track/api-body` 上传，不进事件队列 |
| `apiBodyMaskEnabled` | 关 | 把响应体里个人信息字段的值换成 `***`。凭证字段不管开没开都会换 |
| `apiBodyMaxBytes` | 1 MB | 响应体超过这个大小就不采集 |

前三个开关就是应用表单里的「接口监控」「响应体采集」和「响应体脱敏」。代码里写了，就以代码为准。

### 哪些响应体不采集

打开响应体采集后，下面几种响应体仍然不采集。事件照常发出，原因写在 `body_skipped` 里：

| `body_skipped` | 情况 |
| --- | --- |
| `size` | 响应体超过 `apiBodyMaxBytes` |
| `credential` | 这是一个凭证接口，比如登录、取令牌或发验证码 |
| `unparsable` | 响应体解析不出 JSON，没法做脱敏 |

响应的类型不是 JSON 时也不采集。

### 凭证接口怎么判定

路径先做 URL 解码再转成小写，命中下面任意一条就算凭证接口。这些规则写在 SDK 里，关不掉。

| 规则 | 关键词 | 命中的例子 |
| --- | --- | --- |
| 路径里含有这些片段 | `/auth/login` `/auth/refresh` `/oauth/token` `/auth/social` `/register` `/signup` `/sign-up` `/password` `/forgot` `/reset-password` `/change-password` `/captcha` `/mfa` `/2fa` `/totp` `/verify-code` `/verification-code` | `/api/auth/login` |
| 路径的某一段正好是这些词 | `login` `signin` `sign-in` `logout` `token` `sso` `cas` | `/api/login` `/login.do` |
| 路径里含有这些字符串 | `captcha` `verifycode` `verificationcode` | `/getCaptcha` `/user/verifyCode` |
| 按非字母字符切开后有这些词 | `sms` `otp` `sendcode` `getcode` `checkcode` | `/api/sms/send` `/user/getCode` |
| 动词后面紧跟验证码类的词 | 动词 `send` `get` `resend` `check` `verify` `validate`，后接 `sms` `otp` `smscode` `mobilecode` `phonecode` `emailcode` `msgcode` | `/sendSms` `/getSmsCode` |
| 取令牌或刷新令牌 | `get` `refresh` `renew` `issue` `exchange` 加 `token`，中间可以夹 `access` `auth` `id` `session` `csrf` `user`；`token` 后接 `exchange` 或 `refresh` 也算 | `/getToken` `/refresh-token` `/tokenExchange` |

`/monitor/loginLog/list`、`/tokens/stats` 和 `/smsTemplate/list` 这样的路径不会命中。

规则宁可多拦。`/getTokenList`、`/passwordPolicy/list` 这类普通接口也会被算进去，代价只是少采一个响应体。

反过来，某个接口会返回令牌或验证码、名字却没被认出来时，只能把 `apiBodyEnabled` 关掉。

## 圈选

圈选用来不改代码加埋点。在页面上点中一个元素、起个事件名，之后这个元素被点击就会上报。页面要先注册 `visualTrack()`。

<div class="ms-steps">

### 进入圈选

在「接入管理 → 圈选规则」选中应用，点「进入圈选」，填上要圈选的页面地址。

后台签发一个 30 分钟有效的令牌，并在新窗口打开这个页面。刷新页面后令牌失效，要重新进入。

### 点选元素

页面进入圈选模式，鼠标移到哪里，哪里就高亮。点中元素，填事件名，提交成草稿。按 Esc 退出。

### 确认规则

草稿回到后台的草稿栏。确认后变成圈选规则，随 `/track/config` 下发；丢弃的草稿不生效。

</div>

![在页面里圈选元素，选中的按钮被高亮](/screenshots/track/track-visual-inspect.png)

规则生效后，命中的点击按规则里的事件名上报，带 `vs_selector` 和 `element_text` 两个属性。

没有规则时插件不装任何监听。被遮罩的区域里的点击不会触发规则。

## 精确位置

应用打开「精确位置」后，`geoPlugin()` 每次会话最多向浏览器请求一次定位，浏览器会弹出授权提示。

用户同意后，之后的事件都带上 `geo_lon`、`geo_lat` 和 `geo_acc`。经纬度保留 4 位小数，大约 11 米。

用户拒绝或定位失败时什么都不发生，这次会话里也不再问。[空间行为](/track/spatial)页用的就是这些坐标。

## 下一步

<div class="ms-cards">

- [隐私与合规](/track/privacy) 哪些内容会被遮掉，怎样打开更严的遮罩。
- [配置项](/track/install#配置项) 全部选项和默认值。
- [错误问题单](/track/error-issues) 按指纹归并错误，指派给人处理。

</div>
