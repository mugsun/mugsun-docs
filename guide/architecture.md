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
| [core](/core/) | BOM、Web/MyBatis 等 starter；构建 boot 前须本地 install |
| [boot](/boot/) | 业务与可选能力模块；compose 起库，Maven 起应用 |
| [pc](/pc/) | 管理端 UI；开发代理到 boot；OpenAPI `gen:api` |
| [track](/track/) | 浏览器埋点 SDK；npm `@mugsun/track-web` |

运行时可用环境变量关闭可选能力（JAR 仍可能包含对应类路径）：

- `MUGSUN_GIS_ENABLED=false`
- `MUGSUN_TRACK_ENABLED=false`
- `MUGSUN_AI_ENABLED=false`

cloud（微服务）与 uniappx-ui（移动组件）**规划中**，不在当前免费交付边界内。

下一步：[快速开始](/guide/getting-started) · [Boot 配置](/boot/configuration) · [第一个事件](/track/first-event)
