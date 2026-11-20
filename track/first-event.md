# 第一个事件

这一页从创建应用开始，一直做到在管理后台里看到自己发出的第一条事件。没看到的话，后半页讲怎么查。

## 开始之前

- 后端已经启动，埋点模块是开着的。它默认就开着，除非设了 `MUGSUN_TRACK_ENABLED=false`。
- 能登录管理后台，见[快速开始](/guide/getting-started)。

## 四步看到事件

<div class="ms-steps">

### 创建应用

打开「埋点分析 → 接入管理」，点「新增应用」。保存后弹出「应用创建成功」，把里面的 AppKey 复制下来。

### 初始化 SDK

```ts
import { createTracker } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'http://localhost:8080',
  appKey: '<你的 AppKey>',
  debug: true, // 在控制台输出 SDK 日志，排查完关掉
})
```

`endpoint` 填浏览器能访问到的后端地址。后端挂在 `/api` 这类前缀下时，把前缀也带上。

### 发一条事件

刷新页面会自动产生一条 `$pageview`。也可以手动发一条：

```ts
tracker.track('first_event', { source: 'docs' })
await tracker.flush() // 不等攒够一批，立刻发送
```

### 到后台核对

浏览器的网络面板里，`POST /track/collect` 返回 200。

打开「埋点分析 → 事件分析」选中这个应用，列表和下方的「实时事件流」里出现新事件。

</div>

![事件分析页，列表下方是实时事件流](/screenshots/track-event.png)

## 没看到事件

| 现象 | 原因和处理 |
| --- | --- |
| 网络面板里没有 `/track/collect` 请求 | 浏览器开了 Do Not Track，或者代码里设了 `enabled: false`、调用过 `optOut()`。采样率低于 100 时也可能没抽中 |
| 请求地址是 `…/track/collect/track/collect` | `endpoint` 多写了路径，只填到服务的根地址为止 |
| 请求没有状态码，控制台报网络或跨域错误 | 地址不通。后端本身允许任意来源跨域，重点查前面的 Nginx 或网关有没有转发 `/track/` |
| 请求返回 400 | AppKey 不存在，或者应用被停用了。到「接入管理」核对 |
| 请求返回 429 | 同一个 IP 上报太频繁。检查是不是在循环或渲染函数里调用了 `track` |
| 请求返回 200，看板还是空的 | 看板选的应用或时间范围不对；也可能事件被后端丢弃了，到[接入健康](#接入健康)看原因 |

## 接入自检

不确定问题出在哪里时，让 SDK 自己查一遍。在浏览器控制台里运行：

```ts
const report = await tracker.selfCheck()
console.table(report.items)
```

报告里的 `items` 每项带 `status`、`message` 和 `fix`，最外层的 `status` 取最差的一项。

| 检查项 | 检查什么 |
| --- | --- |
| `config.endpoint` | 地址是否合法，有没有多写 `/track` 路径，HTTPS 页面有没有往 HTTP 地址上报 |
| `config.appKey` | AppKey 的格式 |
| `config.conflict` | 互相矛盾的配置，比如开了接口监控却没注册 `apiMonitorPlugin` |
| `config.enabled` | 总开关被关掉时给出提示 |
| `ping` | 真的请求一次 `/track/config`，分辨网络不通、应用不存在和应用被停用 |
| `sampling` | 采样率，以及当前访客有没有被抽中 |
| `consent` | Do Not Track、Global Privacy Control 和 `optOut()` 的状态 |
| `privacy` | 开了响应体采集却没开脱敏，或者关掉了 `respectDnt` |
| `queue` | 本地队列的积压，超过容量的 80% 给出警告 |
| `replay` | 开了回放却没注册回放插件，或者没配任何文字遮罩 |
| `filters` | 当前配了哪些过滤钩子 |

自检不发送用户数据，也不往事件队列里写东西。只用 `@mugsun/track-web/core` 入口时，要自己把 `runSelfCheck` 注入进去。

## 接入健康

自检看的是浏览器这一侧。后端收没收到、为什么拒绝，要到「接入管理」的「接入健康」页签里看。

| 列 | 含义 |
| --- | --- |
| 最近收到事件 | 最后一次收到事件的时间。超过 24 小时没收到会标黄，从没收到过显示「从未收到」 |
| 7 天失败 / 7 天告警 | 最近 7 天被拒绝的次数，按级别分开统计 |
| 拒绝原因 | 每个原因码今天和 7 天的次数、最近一次的时间和信息，以及修复建议 |

下面是全部原因码。页面上每一条都带着修复建议。

| 原因码 | 级别 | 含义 |
| --- | --- | --- |
| `APP_DISABLED` | 失败 | 应用的采集开关关了，后端拒收全部上报 |
| `BAD_PAYLOAD` | 失败 | 请求体是空的，不是 JSON 对象，或者压缩内容损坏 |
| `PAYLOAD_TOO_LARGE` | 失败 | 一次上报的请求体超过上限，返回 413 |
| `SCHEMA_ERROR` | 失败 | 事件缺少必填字段、字段超长，或者事件列表格式不对 |
| `BAD_EVENT_NAME` | 失败 | 事件名不合规则，或者自己用了 `$` 前缀 |
| `TS_ABSURD` | 失败 | 事件时间早于 2020 年，或者比服务器时间晚 7 天以上 |
| `RATE_LIMITED` | 失败 | 同一个 IP 对这个应用的上报超过每分钟上限，返回 429 |
| `EVENT_DISABLED` | 告警 | 事件在「事件定义」里被停用，后端直接丢弃 |
| `CLOCK_SKEWED` | 告警 | 客户端时间和服务器差了 24 小时以上。事件收下，发生时间改成接收时间 |
| `BATCH_TRUNCATED` | 告警 | 一次上报的条数超过上限，多出的被截掉 |
| `QUEUE_FULL` | 告警 | 后端的写入队列满了，部分事件被丢弃 |
| `IDENTIFY_REJECTED` | 告警 | `identify` 没带登录令牌，或者令牌里的用户和传入的不一致 |
| `TENANT_MISMATCH` | 告警 | 登录令牌的租户和应用的租户不一致，事件归到令牌的租户 |
| `REPLAY_DISABLED` | 告警 | SDK 在上传回放，应用却没有打开会话回放 |
| `REPLAY_TOO_LARGE` | 告警 | 回放块或整个会话的回放超过体积上限，后面的内容不再接收 |
| `API_BODY_DISABLED` | 告警 | SDK 在上传响应体，应用却没有打开响应体采集 |
| `API_BODY_TOO_LARGE` | 告警 | 响应体超过采集上限 |
| `STORAGE_FULL` | 告警 | 当天的存储额度用完，或者存储盘剩余空间低于下限，回放和响应体被拒收 |
| `SERVER_BUSY` | 告警 | 后端暂时繁忙，返回 503。SDK 会自动重试 |

::: warning 拒绝次数可能被别人刷高
AppKey 在浏览器里是公开的，任何人都能用它发一个坏请求，让拒绝次数上涨。

这只会造成误报，读不到数据，也不影响已经入库的事件。拿不准时以 SDK 的 `selfCheck()` 为准。
:::

页签背后是两个接口，都需要 `sys:track-app:list` 权限，只能看到本租户的应用：

| 接口 | 返回 |
| --- | --- |
| `GET /system/track/app/health/summary` | 每个应用一行，有最近收到事件的时间、7 天的失败和告警次数、次数最多的三个原因码 |
| `GET /system/track/app/health?appKey=` | 一个应用的明细，多出 `reasons` 列表，每项带说明和修复建议 |

拒绝次数记在 Redis 里，按 UTC 日期分天统计，保留 8 天。随便填的 AppKey 不会留下记录，只记已经存在的应用。

## 下一步

<div class="ms-cards">

- [插件](/track/plugins) 每个插件采集什么，回放和接口监控怎么打开。
- [隐私与合规](/track/privacy) 默认不采集什么，哪些内容会被遮掉。
- [错误问题单](/track/error-issues) 把前端错误按指纹归并，指派给人处理。

</div>
