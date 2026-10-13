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

以下截图来自本地实跑的 boot + pc，数据由演示商城页面经 `@mugsun/track-web` 0.2.0 真实上报（约 110 个访客，同一天内）。

**数据概览**：浏览量、访客、会话、事件数与平均会话时长、跳出率，下方是 Top 页面和来源、设备、浏览器分布。会话在静默 30 分钟后结算，时长与跳出率只统计已结算会话。概览接口的 `cards.settledSessionCount` 是统计区间内已结算的会话数；它为 0 时时长与跳出率还没定稿，看板显示「—」而不是 0。

![数据概览（演示数据）](/screenshots/track/track-overview.png)

**事件分析**：按事件名汇总次数、会话数与 UV，`$` 开头为内置事件，其余为业务自定义事件或圈选规则产生的事件。

![事件分析（演示数据）](/screenshots/track/track-event.png)

**漏斗分析**：选 2–5 个有序步骤和转化窗口，查看每步人数、相对上一步与总转化率。

![漏斗分析（演示数据）](/screenshots/track/track-funnel.png)

**性能分析**：Web Vitals 各指标的 P75 与分位明细，按阈值标记良好/待改进/差。

**错误监控**：JS 错误按指纹聚合，显示次数、影响会话与首末次时间，可下钻到明细和关联回放。

![错误监控（演示数据）](/screenshots/track/track-error.png)

**留存分析**：新客留存网格。访客首次活跃那天（UTC 日切）进入当天的新客组，表格行是新客日期和人数，列 D+0、D+1……是之后第 N 天又活跃的人数占比，颜色越深留存越高。可选近 7/14/30 天；最多回看 30 天，更早已活跃的人不会被误算成新客。按服务端接收时间分天，客户端时间不参与，所以要有连续多天的真实上报才有 D+1 及以后的数据。这里不放截图：演示数据只有一天，网格里只有 D+0。

会话回放与圈选的截图见 [插件 · 会话回放](/track/plugins#会话回放) 和 [插件 · 圈选与地理位置](/track/plugins#圈选与地理位置)。

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

## 下一步

[安装与初始化](/track/install) → [第一个事件](/track/first-event) → [插件](/track/plugins) → [隐私与合规](/track/privacy)
