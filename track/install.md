# 安装与初始化

## 安装

::: code-group

```bash [pnpm]
pnpm add @mugsun/track-web@^0.2.0
```

```bash [npm]
npm install @mugsun/track-web@^0.2.0
```

```bash [yarn]
yarn add @mugsun/track-web@^0.2.0
```

:::

当前 npm 最新版本为 `0.2.0`。从 0.1.x 升级时注意隐私默认值变更，见 [更新日志](/guide/changelog) 与 [插件](/track/plugins#接口监控)。

## 原生 / 任意框架

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://your-host',
  appKey: 'your-app-key',
  release: '1.4.2',
})

track.track('button_click', { name: 'buy' })
```

- `endpoint` 只填服务根地址，SDK 实际上报 `{endpoint}/track/collect`，不要自己再拼路径。
- `appKey` 在管理台「埋点分析 → 接入管理」创建。
- `release` 可选，错误事件会携带该版本号。

## Vue 3

```ts
import { createApp } from 'vue'
import MugsunTrack from '@mugsun/track-web/vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(MugsunTrack, { endpoint, appKey, router })
```

传入 `router` 后，页面事件会按路由模板（如 `/order/:id`）聚合。

安装后可通过 `inject(TRACK_INJECT_KEY)` 或模板中的 `$track` 拿到实例，并使用指令：

```vue
<button v-track:click="'buy_click'">购买</button>
<div v-track:exposure="{ event: 'banner_view', props: { id: 3 } }">Banner</div>
```

## 识别用户

```ts
// 登录后：把匿名访客与业务用户关联
track.identify(user.id)

// 公共属性：之后每条事件都会携带
track.registerSuperProperties({ plan: 'pro' })

// 退出登录：清除身份，避免下一位用户继承
track.reset()
```

## 常用方法

| 方法 | 说明 |
| --- | --- |
| `track(event, props?)` | 上报自定义事件，返回 `event_id` |
| `identify(userId)` / `reset()` | 关联 / 清除用户身份 |
| `registerSuperProperties(props)` / `unregisterSuperProperty(key)` | 公共属性 |
| `timeEvent(name)` / `cancelTimeEvent(name)` | 计时事件：下次 `track(name)` 时自动带耗时 |
| `flush()` | 立即发送队列 |
| `optOut()` / `optIn()` / `isOptedOut()` | 用户拒绝 / 恢复采集 |
| `getDistinctId()` / `getSessionId()` | 读取匿名 ID 与会话 ID |
| `destroy()` | 卸载 SDK |
| `trackApiError({ url, method, status, bizCode, message, durationMs })` | 手动上报一次接口失败，见 [错误过滤与接口失败](#错误过滤与接口失败) |
| `selfCheck()` | 接入自检，返回结构化报告，见 [第一个事件 · 接入自检](/track/first-event#接入自检) |

## 配置项

| 选项 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `appKey` | `string` | — | **必填**。应用标识（浏览器可见，非机密） |
| `endpoint` | `string` | — | **必填**。服务端地址，上报 `{endpoint}/track/collect` |
| `release` | `string` | — | 应用版本，错误事件携带 |
| `enabled` | `boolean` | `true` | 本地总开关 |
| `sampleRate` | `number` | `100` | 采样率 0–100；远端下发优先（下次启动生效） |
| `batchSize` | `number` | `10` | 达到条数即发送 |
| `flushInterval` | `number` | `5000` | 定时发送间隔（ms） |
| `maxBatchSize` | `number` | `100` | 单次请求最大事件数 |
| `queueCapacity` | `number` | `500` | 队列上限，超出丢弃最旧 |
| `queueMaxAge` | `number` | 24h | 队列事件超龄丢弃（ms） |
| `retryBaseDelay` / `retryMaxDelay` | `number` | `1000` / `30000` | 补发退避基数 / 上限（ms） |
| `respectDnt` | `boolean` | `true` | 尊重浏览器 Do Not Track |
| `maskSelectors` | `string[]` | `[]` | 自动采集屏蔽的选择器（与远端下发合并） |
| `sessionTimeout` | `number` | 30min | 会话滑动过期（ms） |
| `storagePrefix` | `string` | `'mst'` | 本地存储 key 前缀 |
| `fetchRemoteConfig` | `boolean` | `true` | 启动时拉取远端配置 |
| `headers` | `object \| () => object` | — | 额外请求头（如 `Authorization`）；`sendBeacon` 场景无法携带 |
| `plugins` | `TrackPlugin[]` | 默认插件集 | 见 [插件](/track/plugins) |
| `replayEnabled` / `replaySampleRate` | `boolean` / `number` | `false` / `10` | 回放开关与会话采样率 |
| `apiMonitorEnabled` / `apiBodyEnabled` / `apiBodyMaskEnabled` / `apiBodyMaxBytes` | — | 关 / 关 / **开** / 1MB | 接口监控链开关，见 [插件](/track/plugins#接口监控) |
| `visualRules` | `VisualRule[]` | — | 圈选规则 |
| `geoEnabled` | `boolean` | `false` | 精确位置采集 |
| `debug` | `boolean` | `false` | 控制台输出调试日志 |
| `beforeSend` | `(event) => event \| null \| false` | — | 事件入队前改写或丢弃（返回 `null`/`false` 丢弃） |
| `ignoreErrors` | `(string \| RegExp)[] \| (error, message) => boolean` | — | 不上报的错误 |
| `skipHandledErrors` | `boolean` | `true` | 跳过 `HttpError` 与标记 `handled`/`expected` 的错误 |

带「远端下发」说明的选项：本地显式设置优先，未设置时使用 `/track/config` 下发值，**下次启动生效**。

## 错误过滤与接口失败

::: tip 版本
本节与 [接入自检](/track/first-event#接入自检) 需要 `@mugsun/track-web` 0.2.0 之后的版本（见仓库 CHANGELOG「Unreleased」）。
:::

```ts
const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  beforeSend: (e) => (e.event === 'debug_only' ? null : e),
  ignoreErrors: ['ResizeObserver loop', /^AbortError/],
  skipHandledErrors: true // 默认值
})
```

- **`beforeSend(event)`**：每个业务事件（含 `$identify`）入队前调用，可返回改写后的事件；返回 `null` 或 `false` 丢弃。钩子抛错时保留原事件。`$session_start` / `$session_end` 不经过此钩子。
- **`ignoreErrors`**：字符串按错误 message 子串匹配，`RegExp` 按 message 测试；也可传谓词 `(error, message) => boolean`，返回 `true` 表示忽略（谓词抛错按不忽略处理）。
- **`skipHandledErrors`**（默认 `true`）：跳过 `error.name === 'HttpError'` 以及 `error.handled === true` / `error.expected === true` 的错误——通常是请求拦截器已经提示过用户的接口错误。设为 `false` 则全部上报。
- 以上过滤同时作用于 `error` 插件（`window` error、`unhandledrejection`）和 Vue 集成的 `app.config.errorHandler`；被过滤时原有 errorHandler 仍会被调用。

跳过的接口错误如果仍想统计，在拦截器里手动上报：

```ts
tracker.trackApiError({ url: '/api/order', method: 'POST', status: 200, bizCode: 40001, message: '库存不足' })
```

`trackApiError` 发出一条 `api_request` 事件（`success=false`、`source=manual`，带 `biz_code`、截断后的 `error_message`），与 `api-monitor` 插件同一事件名，接口分析可统一聚合。

## 版本与发布

SDK 由 [mugsun-track](https://github.com/mugsun/mugsun-track) 仓库的 GitHub Actions（`.github/workflows/release.yml`）通过 npm Trusted Publishing 自动发布，无需本地 npm token：

1. 在 PR 中修改 `package.json` 的 `version`（同步 `src/version.ts` 的 `SDK_VERSION`），并在 `CHANGELOG.md` 写明变更（行为变更附迁移说明）。
2. PR 合入 `main`。
3. `main` 上 `package.json` 变化触发 release 工作流：若该版本尚未在 npm 上，则执行 `typecheck` / `test` / `build` 后 `npm publish --provenance`；已发布的版本自动跳过。

详见仓库 [CONTRIBUTING.md](https://github.com/mugsun/mugsun-track/blob/main/CONTRIBUTING.md)。

## 下一步

[第一个事件](/track/first-event) · [插件](/track/plugins) · [隐私与合规](/track/privacy)
