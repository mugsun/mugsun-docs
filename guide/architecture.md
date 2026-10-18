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
 │ mugsun-boot-ai     模型 · 对话 · 知识库 · 调用外部 MCP（可选）   │
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

只用系统参数 `gis.module.enabled` 或 `ai.module.enabled` 关闭时，接口同样返回 404。管理台按 `/auth/info` 返回的 `gisEnabled`、`aiEnabled` 决定是否显示入口。

`/system/gis/status` 是例外：它不受开关拦截，GIS 只用参数关闭时仍返回 `{enabled:false}`。它仍然需要登录，未登录返回 401。

角色已有的该模块授权会保留。模块关闭期间，管理员在角色授权树里看不到这些授权，也无法撤销。要撤销，须先把模块重新开启。重新开启后，授权恢复生效。

另外几点：

- 系统参数 `gis.module.enabled`、`ai.module.enabled` 留空、为 `true`（不区分大小写）或 `1` 时开启，首尾空格忽略。`1`、`0` 已弃用，保存时和运行时日志都会提示。其它值保存时被拒绝；升级前留下的旧值按关闭处理，并在日志里警告。
- 环境变量 `MUGSUN_GIS_ENABLED`、`MUGSUN_TRACK_ENABLED`、`MUGSUN_AI_ENABLED` 与 yml 里的 `mugsun.gis.enabled`、`mugsun.track.enabled`、`mugsun.ai.enabled` 规则相同。不设置时开启；设置后只接受 `true` 或 `false`（不区分大小写，前后不能有空格）。
- 其它值都会启动失败，完整取值见下表。报错会写出配置项、环境变量名和原值，并说明改法。紧急关停请显式写 `false`。

| 取值 | 环境变量 / yml | 系统参数 |
| --- | --- | --- |
| 不设置 | 开启 | 开启 |
| 设置了但为空 | 启动失败 | 开启 |
| `true` / `false`（不区分大小写） | 开启 / 关闭 | 开启 / 关闭 |
| 带首尾空格，如 `" true"` | 启动失败 | 去掉空格后判断 |
| `1` / `0` | 启动失败 | 开启 / 关闭，提示已弃用 |
| 其它值，如 `yes`、`on` | 启动失败 | 保存时被拒绝；旧值按关闭处理 |

- 模块没有打进包时（例如用 `-Pbasic,'!full'` 打包），不会读取它的环境变量和 yml 开关，写了非法值也不会启动失败。系统参数保存时照常校验。
- 删掉系统参数 `gis.module.enabled` 或 `ai.module.enabled` 后，按默认开启。前提是环境变量或 yml 没有关闭这个模块。
- 多台服务器部署时，系统参数在每台服务器本地缓存最长 1 小时。修改或删除参数后，其他服务器要等缓存过期才会生效。
- 内置 MCP Server 已移除，与它相关的变量（如 `MUGSUN_AI_MCP_SERVER`）不再有任何作用。
- 埋点模块没有系统参数开关，只能用 `MUGSUN_TRACK_ENABLED` 关闭。

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
