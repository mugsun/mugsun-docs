# 架构全景

```
mugsun-track (SDK)
      │  /track/collect …
      ▼
mugsun-boot  ──模块──► core | track | gis | ai | server
      │
      ▼
mugsun-pc (管理台：系统 / 埋点看板 / GIS / AI …)
```

| 仓 | 职责 |
| --- | --- |
| core | BOM、Web/MyBatis 等 starter |
| boot | 业务与可选能力模块；compose 一键起 |
| pc | 管理端 UI；OpenAPI `gen:api` |
| track | 浏览器埋点 SDK；npm `@mugsun/track-web` |

cloud（微服务）与 uniappx-ui（移动组件）**规划中**，不在当前免费交付边界内。

::: tip
本文将在下一迭代补全模块开关说明与本地联调步骤。
:::
