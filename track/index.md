# 埋点概述

浏览器 SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) 采集事件，boot 的 track 模块接收并存储，管理后台的「埋点分析」页面展示结果。

采集、存储和分析都在你自己的部署里完成。

## 接入

```bash
pnpm add @mugsun/track-web
```

```ts
import { createTracker } from '@mugsun/track-web'

const track = createTracker({
  endpoint: 'https://example.com', // 上报到 {endpoint}/track/collect
  appKey: 'your-app-key',          // 在「埋点分析 → 接入管理」创建
})

track.track('button_click', { name: 'buy' })
```

完整步骤见 [安装与初始化](/track/install)。

## 采集内容

默认插件采集页面浏览、页面停留、全埋点点击、曝光、Web Vitals 和 JS 错误。

会话回放、接口监控、圈选埋点、地理位置需要手动注册插件，见 [插件](/track/plugins)。

## 看板

「埋点分析」包含数据概览、事件分析、性能分析、错误监控、会话回放、用户细查、漏斗分析和留存分析。

![数据概览（演示数据）](/screenshots/track/track-overview.png)

## 可靠性

- 事件队列写入 IndexedDB，断网或刷新后重新发送。
- 平时用 `fetch` 发送，网络失败时改用 `XHR`；页面隐藏或关闭时优先用 `sendBeacon`。
- 每条事件带 `event_id`。服务端先在 Redis 里按 `event_id` 去重，数据库再按 `(event_id, received_at)` 唯一约束去重。

## 服务端接口

| 接口 | 用途 |
| --- | --- |
| <span style="white-space:nowrap">`POST /track/collect`</span> | 批量接收事件 |
| <span style="white-space:nowrap">`GET /track/config`</span> | 下发 SDK 远端配置 |
| <span style="white-space:nowrap">`POST /track/replay`</span> | 接收回放数据 |
| <span style="white-space:nowrap">`POST /track/api-body`</span> | 接收接口响应体 |
| <span style="white-space:nowrap">`POST /track/visual/draft`</span> | 保存圈选草稿 |

`/track/*` 不需要登录。`appKey` 在浏览器里可见，只用来标识应用，不能当密钥使用。

## 下一步

- [安装与初始化](/track/install)
- [第一个事件](/track/first-event)
- [插件](/track/plugins)
- [隐私与合规](/track/privacy)
