# 安装与初始化

`@mugsun/track-web` 是浏览器端的埋点 SDK。装好后填两个参数，页面访问、点击、性能指标和前端错误就开始上报。

## 安装

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web
```

```bash [npm]
npm install @mugsun/track-web
```

```bash [yarn]
yarn add @mugsun/track-web
```

:::

当前版本是 0.3.0。包里有四个入口，用到哪个引哪个：

| 入口 | 内容 | gzip 后 |
| --- | --- | --- |
| `@mugsun/track-web` | `createTracker`、回放以外的全部插件、接入自检 | 约 20 KB |
| `@mugsun/track-web/vue` | Vue 3 插件和 `v-track` 指令 | 约 15 KB |
| `@mugsun/track-web/replay` | 会话回放插件，rrweb 在回放启用后才加载 | 约 6 KB |
| `@mugsun/track-web/core` | 只有核心逻辑，插件和自检自己挑 | 约 7 KB |

## 初始化

先在管理后台「埋点分析 → 接入管理」新增一个应用，拿到 AppKey。创建成功的弹窗里有一段可以直接复制的接入代码。

### 任意框架

```ts
import { createTracker } from '@mugsun/track-web'

export const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  release: import.meta.env.VITE_APP_VERSION,
})

tracker.track('order_submit', { amount: 199, channel: 'web' })
```

| 参数 | 说明 |
| --- | --- |
| `endpoint` | 后端服务的根地址。SDK 自己拼上 `/track/collect`，不要把路径写进来。后端挂在 `/api` 这类前缀下时带上前缀 |
| `appKey` | 应用标识。它会出现在浏览器里，不算机密 |
| `release` | 应用版本号，可以不填。填了以后每条事件都带上，错误问题单按它区分版本 |

`endpoint` 和 `appKey` 缺一个，`createTracker` 就会抛错。

自定义事件名以字母开头，只能用字母、数字和下划线，最长 64 个字符。`$` 开头的名字留给 SDK 自己的事件。

### Vue 3

```ts
import { createApp } from 'vue'
import MugsunTrack from '@mugsun/track-web/vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(MugsunTrack, {
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  router,
  release: import.meta.env.VITE_APP_VERSION,
})
app.mount('#app')
```

传了 `router` 以后，页面访问跟着路由切换上报。`route_path` 记的是路由模板（如 `/order/:id`），同一类页面合并成一行。

组件里用 `inject(TRACK_INJECT_KEY)` 或 `this.$track` 拿到实例。模板里可以直接用指令埋点：

```vue
<template>
  <button v-track:click="'buy_click'">购买</button>
  <div v-track:exposure="{ event: 'banner_view', props: { id: 3 } }">
    活动横幅
  </div>
</template>
```

Vue 插件还会包一层 `app.config.errorHandler`，把组件里的错误报成 `$error`。原来设置的处理函数照常执行。

## 识别用户

SDK 给每个浏览器生成一个匿名 ID，没登录时的行为记在它名下。登录后调用 `identify`，把匿名访客和业务用户关联起来。

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  // 和业务接口带一样的登录令牌，后端按它认定用户
  headers: () => {
    const token = getAccessToken()
    return token ? { Authorization: token } : {}
  },
})

// 登录成功后
tracker.identify(user.id)

// 退出登录时
tracker.reset()
```

事件属于哪个用户，由后端按 mugsun-boot 的登录令牌认定，客户端自己报的用户 ID 不算数。

没带令牌，或者令牌里的用户和 `identify` 报的不一致，这次关联会被拒绝，事件按匿名访客统计。

页面关闭时用 `sendBeacon` 发出的那一批带不了请求头，也按匿名记，仍然归在同一个匿名 ID 下。

`reset()` 清掉用户、换一个新的匿名 ID，并结束当前会话。多人共用一台电脑时，退出登录一定要调用它。

## 常用方法

| 方法 | 作用 |
| --- | --- |
| `track(event, props?)` | 上报一条自定义事件，返回 `event_id`。没有上报时返回 `null` |
| `identify(userId)` / `reset()` | 关联用户 / 清除用户并更换匿名 ID |
| `registerSuperProperties(props)` | 设置公共属性，之后每条事件都带上 |
| `unregisterSuperProperty(key)` | 去掉一个公共属性 |
| `timeEvent(name)` / `cancelTimeEvent(name)` | 开始计时，下一条同名事件自动带上 `duration_ms` / 取消计时 |
| `trackExposure(el, { event, props })` | 元素露出一半并停留 1 秒后，上报一次曝光 |
| `trackApiError(payload)` | 手动上报一次接口失败，见[错误过滤与接口失败](#错误过滤与接口失败) |
| `flush()` | 立刻发送队列里的事件，返回的 Promise 表示是否发送成功 |
| `optOut()` / `optIn()` / `isOptedOut()` | 用户拒绝采集 / 重新同意 / 查询当前状态 |
| `getDistinctId()` / `getUserId()` / `getSessionId()` | 读取匿名 ID、用户 ID 和会话 ID |
| `selfCheck()` | 检查接入是否正常，见[接入自检](/track/first-event#接入自检) |
| `destroy()` | 停止采集并卸载插件 |

## 配置项

只有 `endpoint` 和 `appKey` 必填，其余都有默认值。

### 基本

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `endpoint` | 必填 | 后端服务的根地址 |
| `appKey` | 必填 | 应用标识 |
| `release` | 无 | 应用版本号，每条事件都带上 |
| `plugins` | 默认插件 | 传了就整个替换默认插件，见[插件](/track/plugins) |
| `headers` | 无 | 附加的请求头，可以是对象，也可以是返回对象的函数 |
| `enabled` | `true` | 设为 `false` 时整个 SDK 不工作 |
| `debug` | `false` | 在控制台输出 SDK 的日志 |

### 发送与队列

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `batchSize` | `10` | 攒够多少条就发送 |
| `flushInterval` | `5000` | 定时发送的间隔，单位毫秒 |
| `maxBatchSize` | `100` | 一次请求最多带多少条 |
| `queueCapacity` | `500` | 本地队列的上限，满了丢最早的 |
| `queueMaxAge` | 24 小时 | 队列里的事件超过这个时间就丢弃，单位毫秒 |
| `retryBaseDelay` | `1000` | 发送失败后第一次重试前等多久，单位毫秒 |
| `retryMaxDelay` | `30000` | 重试等待的上限。每失败一次等待时间翻倍 |
| `sessionTimeout` | 30 分钟 | 多久没有活动算会话结束，单位毫秒 |
| `storagePrefix` | `'mst'` | 本地存储的键名前缀 |
| `fetchRemoteConfig` | `true` | 启动时是否拉取后台的应用配置 |

### 采样与隐私

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `sampleRate` | `100` | 采样率，0 到 100。按访客采样，同一个访客要么全采，要么不采 |
| `respectDnt` | `true` | 浏览器开了 Do Not Track 就不采集 |
| `respectGpc` | `false` | 设为 `true` 后，浏览器开了 Global Privacy Control 就不采集 |
| `maskSelectors` | `[]` | 这些选择器命中的区域不自动采集，也不录进回放 |
| `beforeSend` | 无 | 事件入队前改写属性或丢弃 |
| `beforeSendOnError` | `'drop'` | `beforeSend` 抛错时丢弃事件。设为 `'keep'` 则发送原事件 |
| `ignoreErrors` | 无 | 不上报的错误，可以是字符串、正则或判断函数 |
| `skipHandledErrors` | `false` | 设为 `true` 时跳过已经处理过的错误 |

### 功能开关

| 选项 | 默认值 | 说明 |
| --- | --- | --- |
| `replayEnabled` | `false` | 会话回放，还要注册回放插件 |
| `replaySampleRate` | `10` | 回放的会话采样率，0 到 100 |
| `apiMonitorEnabled` | `false` | 接口监控，还要注册 `apiMonitorPlugin` |
| `apiBodyEnabled` | `false` | 采集 JSON 响应体 |
| `apiBodyMaskEnabled` | `false` | 把响应体里的个人信息字段也遮掉 |
| `apiBodyMaxBytes` | 1 MB | 超过这个大小的响应体不采集 |
| `visualRules` | 无 | 圈选规则，一般由后台下发 |
| `geoEnabled` | `false` | 精确位置，还要注册 `geoPlugin` |

### 和后台配置的关系

启动时 SDK 请求一次 `GET {endpoint}/track/config`，取回「接入管理」里这个应用的开关并存在本地。

这次取回的配置下次启动才生效。同一个选项后台和代码里都设了值时，按下表处理：

| 选项 | 结果 |
| --- | --- |
| `sampleRate` | 用后台的 |
| `replayEnabled` | 用后台的 |
| `replaySampleRate` | 用后台的 |
| `enabled` | 任何一边关了就是关 |
| `maskSelectors` | 两边合并 |
| 接口监控的四个选项 | 用代码里的 |
| `visualRules` | 用代码里的 |
| `geoEnabled` | 用代码里的 |

`fetchRemoteConfig: false` 只是不再去取，之前存在本地的配置照样生效。

## 错误过滤与接口失败

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  beforeSend: (e) => (e.event === 'debug_only' ? null : e),
  ignoreErrors: ['ResizeObserver loop', /^AbortError/],
  skipHandledErrors: true,
})
```

| 选项 | 行为 |
| --- | --- |
| `beforeSend(event)` | 每条事件入队前调用。返回 `null` 或 `false` 丢弃；返回对象时只采用其中的 `props` |
| `beforeSendOnError` | 钩子抛错时默认丢弃事件，免得没处理完的数据发出去。设为 `'keep'` 则发送原事件 |
| `ignoreErrors` | 字符串按错误信息的子串匹配，正则按错误信息测试，函数返回 `true` 表示忽略 |
| `skipHandledErrors` | 默认所有错误都上报。设为 `true` 后跳过 `HttpError` 和带 `handled`、`expected` 标记的错误 |

`beforeSend` 管不到三类数据：会话开始和结束事件、回放数据、接口响应体。后两类有自己的遮罩选项，见[隐私与合规](/track/privacy#开启遮罩与过滤)。

这些过滤对 `error` 插件和 Vue 的 `errorHandler` 都生效。错误被过滤掉以后，原来的 `errorHandler` 仍然会执行。

跳过的接口错误如果还想统计，在请求拦截器里手动报一次：

```ts
tracker.trackApiError({
  url: '/api/order',
  method: 'POST',
  status: 200,
  bizCode: 40001,
  message: '库存不足',
  durationMs: 132,
})
```

这条 `api_request` 事件带 `success: false` 和 `source: 'manual'`，和[接口监控](/track/plugins#接口监控)的数据一起统计。

地址里的敏感参数照样会被遮掉，规则见[隐私与合规](/track/privacy#url-敏感参数)。

## 下一步

<div class="ms-cards">

- [第一个事件](/track/first-event) 从创建应用开始，直到在看板里看到第一条事件。
- [插件](/track/plugins) 每个插件采集什么，回放和接口监控怎么打开。
- [隐私与合规](/track/privacy) 默认不采集什么，哪些内容会被遮掉。

</div>
