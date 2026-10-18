# 架构全景

## 数据流

```text
 业务 Web 页面                      管理员浏览器
 @mugsun/track-web                  mugsun-pc（Vue 3 · Element Plus）
      │ POST /track/collect             │ /api/**（开发期 Vite 代理）
      │ POST /track/replay …            │
      ▼                                 ▼
 ┌──────────────────── mugsun-boot（单体 JAR） ────────────────────┐
 │ mugsun-boot-core   认证 · 系统 · 租户 · 流程 · 文件 · 开放平台   │
 │ mugsun-boot-track  采集摄入 · 配置下发 · 聚合 · 回放（可选）     │
 │ mugsun-boot-gis    图层 · 空间查询 · 矢量瓦片（可选）            │
 │ mugsun-boot-ai     模型 · 对话 · 知识库 · MCP（可选）            │
 │ mugsun-boot-server 装配壳（默认 profile = full）                 │
 └───────────────┬──────────────────────────────┬──────────────────┘
                 ▼                              ▼
     PostgreSQL 16（PostGIS + pgvector）      Redis 7（默认库号 3）
```

依赖方向：`mugsun-boot` → `mugsun-core`（Maven Central 坐标 `com.mugsun:mugsun-*:0.1.0`）。管理台不直接依赖 core。

<p align="center">
  <img src="/brand/arch/boot-iso-zh.jpg" alt="mugsun-boot 架构示意" width="100%" />
</p>

## 仓库职责

| 仓库 | 职责 | 对外接口 |
| --- | --- | --- |
| [core](/core/) | BOM、统一响应体 `R`、全局异常、Sa-Token 注解拦截、接口加解密、MyBatis-Flex 实体基类 | Maven 坐标 |
| [boot](/boot/) | 业务域与可选能力模块；Flyway 管理表结构 | HTTP（`:8080`），OpenAPI |
| [pc](/pc/) | 管理台 UI；菜单与按钮权限来自 boot | 浏览器（开发 `:3006`） |
| [track](/track/) | 浏览器埋点 SDK | npm `@mugsun/track-web` |
| [ms-ui](/uniappx/) | uni-app x 跨端组件库（移动端 / 小程序 / H5），与管理台无依赖 | uni_modules |

## 模块装配：两层开关

**构建期：Maven Profile** 决定哪些模块打进 JAR。

| Profile | 装配内容 |
| --- | --- |
| `full`（默认） | core + gis + track + ai |
| `basic` | 仅 core；须同时关闭 full：`-Pbasic,'!full'` |
| `gis-only` / `track-only` / `ai-only` | core + 单一可选模块；须关闭 full |
| `kingbase` / `dameng` | 追加信创数据库驱动 |

**运行期：环境变量** 在不重新打包的情况下关闭能力（类路径仍在）：

```bash
MUGSUN_GIS_ENABLED=false
MUGSUN_TRACK_ENABLED=false
MUGSUN_AI_ENABLED=false
```

关闭后，该模块的接口不再注册（访问返回 404），当前用户菜单、菜单管理和角色授权树也都不再显示它的菜单。

只用系统参数 `gis.module.enabled` 或 `ai.module.enabled` 关闭时，接口仍然注册，访问返回业务错误「模块未启用」，不返回 404。

角色已有的该模块授权会保留。模块关闭期间，管理员在角色授权树里看不到这些授权，也无法撤销；重新开启后授权恢复生效。

管理台对应的是构建期变量 `VITE_ENABLE_GIS` / `VITE_ENABLE_TRACK` / `VITE_ENABLE_AI`，关闭后不注册路由与插件。

## 埋点链路

<p align="center">
  <img src="/brand/arch/track-iso-zh.jpg" alt="埋点数据流示意" width="100%" />
</p>

1. SDK 在浏览器内排队（IndexedDB），按条数或时间批量发送，传输降级 `sendBeacon` → `fetch keepalive` → `XHR`。
2. boot 的 `/track/collect` 校验 `appKey` 存在性、限流与背压，按 `event_id` 幂等入库。
3. SDK 启动时拉取 `/track/config`，采样率、回放开关等远端配置在下次启动生效。
4. 管理台「埋点分析」读取聚合结果，展示看板与回放。

## 下一步

[快速开始](/guide/getting-started) · [Boot 配置](/boot/configuration) · [埋点概述](/track/)
