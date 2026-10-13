# 埋点概述

mugsun track 是**嵌入式**的产品行为分析能力：浏览器 SDK [`@mugsun/track-web`](https://www.npmjs.com/package/@mugsun/track-web) 采集 → boot 的 track 模块摄入 → 管理台「埋点分析」看板。采集、存储与分析都在你的部署里，不依赖公有云账号。

<p align="center">
  <img src="/brand/arch/track-iso-zh.jpg" alt="埋点数据流示意" width="100%" />
</p>

## 能力

| 类别 | 内容 | 默认 |
| --- | --- | --- |
| 页面 | 页面浏览 `pageview`、停留 `pageleave`；Vue Router 路由模板聚合 | 开启 |
| 交互 | 全埋点 `autocapture`、有效曝光 `exposure`、`v-track` 声明式指令 | 开启 |
| 质量 | Web Vitals、JS 错误（带 `release` 与指纹） | 开启 |
| 会话回放 | 基于 rrweb，独立入口 `@mugsun/track-web/replay`，按会话采样上传 | 需注册插件且 `replayEnabled` |
| 接口监控 | 请求元数据，可选响应体采集与脱敏 | 需注册插件且开关开启 |
| 圈选埋点 | 管理台下发规则，前端命中即上报 | 需注册插件 |
| 地理位置 | 精确定位上报 | 需注册插件且 `geoEnabled` |

## 看板

管理台「埋点分析」包含数据概览、事件分析、性能分析、错误监控、接入管理、会话回放、用户细查、漏斗分析与留存分析。

![数据概览（演示数据）](/screenshots/track-overview.png)

![事件分析与实时事件流（演示数据）](/screenshots/track-event.png)

## 可靠性

- 队列默认写入 IndexedDB，断网或刷新后按指数退避补发；队列容量与超龄均有上限。
- 传输降级：`sendBeacon` → `fetch keepalive` → `XHR`；页面隐藏与 `pagehide` 时自动冲刷。
- 每条事件带稳定 `event_id`，服务端幂等去重。
- 构建门禁：`dist/core.js` gzip 不超过 8 KB。

## 服务端端点

| 端点 | 用途 |
| --- | --- |
| `POST /track/collect` | 批量事件摄入（gzip 或明文 JSON） |
| `GET /track/config` | SDK 远端配置下发 |
| `POST /track/replay` | 回放块摄入 |
| `POST /track/api-body` | 接口响应体摄入（独立通道） |
| `POST /track/visual/draft` | 圈选草稿 |

`/track/*` 为匿名端点。`appKey` 在浏览器可见，不是密钥；服务端通过存在性校验、限流、背压与事件校验防护。

## 升级：历史 UV 回填

看板的 UV（独立访客）按设备 ID（`distinct_id`）去重。从 0.1.0 升级后，今天的数据和以后每天新生成的日统计都用这个口径，但升级前已经算好的历史日子还是旧口径，趋势图上过去几天的 UV 会对不上。需要回填一次：

- **改什么**：只改 `track_stats_day` 里 `uv` 与重算结果不一致的行，其它列不动、不新增行；明细已过保留期（当天没有事件）的日子保留原值。
- **先备份**：每改一行，旧值先写入 `track_stats_day_uv_backup`（新迁移 `T2` 建表），按日志里的 `run_id` 可整批还原。
- **可重复执行**：再跑一次时已经一致的行不会再改。每条 SQL 只处理一个应用的一天，不会长时间锁表；多实例时同一时刻只有一个实例在跑。
- **范围**：默认最近 90 个闭合日（UTC，不含今天），用 `MUGSUN_TRACK_UV_BACKFILL_DAYS` 调整（1–3660）。

执行方式二选一：

1. PowerJob 里新建任务，处理器填 `com.mugsun.boot.track.powerjob.TrackUvBackfillProcessor`，手动运行一次。参数可留空，或写 `{"days": 180}`、`{"days": 30, "appKey": "你的应用"}`。
2. 没有 PowerJob 时，设 `MUGSUN_TRACK_UV_BACKFILL_ON_STARTUP=true` 重启，日志出现 `UV 回填完成：run_id=...` 后改回 `false`。

还原某一批：

```sql
UPDATE track_stats_day d SET uv = b.old_uv, update_time = now()
FROM track_stats_day_uv_backup b
WHERE b.run_id = '日志里的 run_id' AND d.id = b.stats_day_id;
```

## 下一步

[安装与初始化](/track/install) → [第一个事件](/track/first-event) → [插件](/track/plugins) → [隐私与合规](/track/privacy)
