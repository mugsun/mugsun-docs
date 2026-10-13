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
