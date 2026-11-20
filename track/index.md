# 埋点概述

浏览器 SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) 采集事件，上报到你自己部署的后端，在管理后台的「埋点分析」里查看结果。

采集、存储和分析都在你自己的服务器上完成。下图是管理后台里的会话回放。

![管理后台里的会话回放页](/readme/track-replay.png)

## 从哪里开始

<div class="ms-cards">

- [安装与初始化](/track/install) 安装 SDK，查看全部方法和配置项。
- [第一个事件](/track/first-event) 从接入开始，直到在看板里看到第一条事件。
- [插件](/track/plugins) 默认采集哪些数据，怎样注册回放和接口监控。
- [隐私与合规](/track/privacy) SDK 的默认行为，以及接入前要确认的事项。

</div>

## 接入

```bash
pnpm add @mugsun/track-web
```

```ts
import { createTracker } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'https://your-host', // 后端的地址，不用加路径
  appKey: 'your-app-key',        // 在「埋点分析 → 接入管理」里创建
})

tracker.track('button_click', { name: 'buy' })
```

创建之后，页面浏览、点击和错误会自动采集。`tracker.track()` 用来上报自己定义的事件。

## 数据怎么流动

<div class="ms-flow ms-flow--3">

1. SDK 在浏览器里采集事件，先写入 IndexedDB，再成批发送。
2. 后端的 `/track/collect` 接收事件，去重后写入 `mugsun_track` 库。
3. 管理后台的「埋点分析」查询后端，展示看板和回放。

</div>

埋点数据单独存在 `mugsun_track` 库里，和业务库分开。

## 采集哪些数据

| 插件 | 默认 | 采集内容 |
| --- | --- | --- |
| `pageviewPlugin` | 开 | 首次加载和路由切换 |
| `pageleavePlugin` | 开 | 页面停留时长 |
| `autocapturePlugin` | 开 | 点击等交互 |
| `exposurePlugin` | 开 | 元素曝光 |
| `webVitalsPlugin` | 开 | 性能指标 Web Vitals |
| `errorPlugin` | 开 | JS 错误、资源加载错误和未处理的 Promise 拒绝 |
| `apiMonitorPlugin` | 关 | 请求的方法、地址、状态码和耗时 |
| `replayPlugin` | 关 | 会话回放，基于 rrweb |
| `visualTrack` | 关 | 圈选埋点，按管理后台下发的规则匹配元素 |
| `geoPlugin` | 关 | 精确位置，会触发浏览器的定位授权 |

默认关闭的插件要自己注册，写法见[插件](/track/plugins)。

采样率可以在管理后台的接入管理里修改。SDK 启动时会拉取这些配置，前端不用重新发版。

## 在管理后台里查看

「埋点分析」菜单下有这些页面：

| 用途 | 页面 |
| --- | --- |
| 看流量 | 数据概览、事件分析 |
| 看转化 | 漏斗分析、留存分析 |
| 查性能和错误 | 性能分析、错误监控和[错误问题单](/track/error-issues) |
| 还原用户的操作 | 会话回放、用户细查 |
| 用自然语言提问 | [问数据](/track/ask) |
| 按位置查看 | [空间行为](/track/spatial) |

下图是性能分析页。

![性能分析页](/readme/track-perf.png)

## 看板怎么统计 {#看板趋势}

- 每一天从当地时区的 0 点开始，默认时区是 `Asia/Shanghai`，用 `MUGSUN_TRACK_TIMEZONE` 修改。
- 按天的趋势图会画出所选范围内的每一天，没有数据的日子显示 0。
- 每天的 UV 是当天去重后的设备数。
- 「来源」是来源页面的主机名。直接访问和站内跳转不算来源。

时区也可以按租户单独设置，配置项是 `mugsun.track.timezone.tenants`。

## 断网和关闭页面时

- 事件先写入 IndexedDB，断网或刷新后会重新发送。
- 平时用 `fetch` 发送，网络失败时改用 XHR。页面隐藏或关闭时，优先用 `sendBeacon`。
- 每条事件带 `event_id`，服务端按它去重，重发不会产生重复数据。

## 服务端接口

| 接口 | 用途 |
| --- | --- |
| <span style="white-space:nowrap">`POST /track/collect`</span> | 批量接收事件 |
| <span style="white-space:nowrap">`GET /track/config`</span> | 下发 SDK 的远端配置 |
| <span style="white-space:nowrap">`POST /track/replay`</span> | 接收回放数据 |
| <span style="white-space:nowrap">`POST /track/api-body`</span> | 接收接口响应体 |
| <span style="white-space:nowrap">`POST /track/visual/draft`</span> | 保存圈选草稿 |

`/track/*` 不需要登录。`appKey` 在浏览器里可见，只用来标识应用，不能当密钥使用。

::: details 管理后台自己的埋点
管理后台自己也接入了这个 SDK，所以数据概览里有它自己的访问数据。

它默认会上报已经提示过用户的请求错误，比如业务校验失败和网络失败。主动取消的请求不上报。

构建时设置 `VITE_TRACK_SKIP_HANDLED_ERRORS=true`，就不再上报这类错误。
:::

## 目前的限制

- 只支持浏览器。
- 只能上报到 mugsun-boot，没有托管的云服务。
- 回放不录 canvas。

## 下一步

<div class="ms-cards">

- [错误问题单](/track/error-issues) 按指纹聚合错误，可以指派、解决和重开。
- [问数据](/track/ask) 用自然语言查询自己的埋点数据，只读。
- [空间行为](/track/spatial) 按精确坐标查看热力格或明细点。
- [升级指南](/track/upgrade) 升级后端的埋点模块以后，可能要动手的三件事。

</div>
