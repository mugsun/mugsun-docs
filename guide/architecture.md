# 架构

mugsun 的后端有单体版和微服务版，本页讲单体版。管理后台、埋点 SDK 和第三方系统都通过 HTTP 访问它。

<ArchDiagram />

## 各仓库负责什么

| 仓库 | 负责什么 | 对外提供 |
| --- | --- | --- |
| [boot](/boot/) | 业务功能和三个可选模块，表结构由 Flyway 管理 | HTTP 接口，默认端口 `8080` |
| [cloud](/cloud/) | 后端的微服务版，业务代码和 boot 相同，拆成一个网关和四个服务 | HTTP 接口，网关默认端口 `8080` |
| [pc](/pc/) | 管理后台的界面，菜单和按钮权限由 boot 返回 | 浏览器页面，开发时端口 `3006` |
| [track](/track/) | 浏览器埋点 SDK | npm 包 `@mugsun/track-web` |
| [core](/core/) | 后端的公共依赖，包括统一响应体、全局异常处理和接口加解密 | Maven 坐标 |
| [ms-ui](/uniappx/) | uni-app x 组件库，不依赖后端和管理后台 | `uni_modules` 目录 |

boot 和 cloud 依赖 core，管理后台不直接依赖 core。

## 后端的模块

boot 的源码分成五个 Maven 模块，打包后合成一个 JAR。

| 模块 | 内容 |
| --- | --- |
| `mugsun-boot-core` | 账号权限、租户和工作流等核心功能 |
| `mugsun-boot-track` | 可选。埋点数据的接收、聚合和回放 |
| `mugsun-boot-gis` | 可选。图层、空间查询和矢量瓦片 |
| `mugsun-boot-ai` | 可选。模型、对话和知识库 |
| `mugsun-boot-server` | 只负责打包，把上面的模块合成一个可执行 JAR |

数据访问用 MyBatis-Flex，鉴权用 Sa-Token，缓存用 JetCache。

## 选择要用的模块 {#模块装配-两层开关}

三个可选模块有两层开关。打包时决定哪些模块进 JAR，启动时还可以把已经打进去的模块关掉。

### 打包时选择

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests -Pbasic,'!full'
```

| Profile | 打进 JAR 的模块 |
| --- | --- |
| `full`（默认） | core、gis、track 和 ai |
| `basic` | 只有 core |
| `gis-only` `track-only` `ai-only` | core 加一个可选模块 |
| `kingbase` `dameng` | 追加人大金仓或达梦的 JDBC 驱动 |

`basic` 和三个 `*-only` 都要同时写上 `'!full'`。

### 启动时关闭

不重新打包也可以关掉模块。启动时把对应的环境变量设为 `false`：

```bash
MUGSUN_GIS_ENABLED=false
MUGSUN_TRACK_ENABLED=false
MUGSUN_AI_ENABLED=false
```

关闭后，这个模块的接口不再注册，访问返回 404。当前用户的菜单、菜单管理和角色授权树里也不再显示它的菜单。

角色已有的授权会保留，模块重新开启后恢复生效。模块关闭期间，授权树里看不到这些授权，要撤销得先把模块重新开启。

### 在系统参数里关闭

GIS 和 AI 还可以在管理后台的系统参数里关闭，参数名是 `gis.module.enabled` 和 `ai.module.enabled`。

用系统参数关闭后，接口同样返回 404。管理后台按 `/auth/info` 返回的 `gisEnabled` 和 `aiEnabled` 决定是否显示入口。

埋点模块没有系统参数开关，只能用 `MUGSUN_TRACK_ENABLED` 关闭。

::: details 开关取值的完整规则

| 取值 | 环境变量和 yml | 系统参数 |
| --- | --- | --- |
| 不设置 | 开启 | 开启 |
| 设置了但为空 | 启动失败 | 开启 |
| `true` / `false`（不区分大小写） | 开启 / 关闭 | 开启 / 关闭 |
| 带首尾空格，如 `" true"` | 启动失败 | 去掉空格后判断 |
| `1` / `0` | 启动失败 | 开启 / 关闭，提示已弃用 |
| 其他值，如 `yes`、`on` | 启动失败 | 保存时被拒绝，旧值按关闭处理 |

- yml 里对应的是 `mugsun.gis.enabled`、`mugsun.track.enabled` 和 `mugsun.ai.enabled`。
- 启动失败时，报错会写出配置项、环境变量名和原值，并说明改法。要紧急关停模块，请明确写 `false`。
- 模块没有打进包时，不会读取它的环境变量和 yml 开关，写了非法值也不会启动失败。
- 系统参数里的 `1` 和 `0` 已弃用，保存时和运行时的日志都会提示。升级前留下的其他旧值会在日志里警告。
- 删掉系统参数后按默认开启，前提是环境变量和 yml 没有关闭这个模块。
- `/system/gis/status` 不受开关拦截。GIS 只用参数关闭时它仍然返回 `{enabled:false}`，未登录返回 401。
- 修改或删除系统参数会通过 Redis 广播，清掉每台机器的本地缓存，多台机器立即一致。
- 广播依赖 `jetcache.remote.default.broadcastChannel`，默认值是 `mugsun`。
- 覆盖 JetCache 配置时，要在同级保留 `type: redis.lettuce` 和 `broadcastChannel`。
- 内置的 MCP Server 暂时下线，加上鉴权后恢复。下线期间 `MUGSUN_AI_MCP_SERVER` 不起作用。

:::

### 管理后台的开关

管理后台有对应的构建变量 `VITE_ENABLE_GIS`、`VITE_ENABLE_TRACK` 和 `VITE_ENABLE_AI`。

设为 `false` 后重新构建，对应模块的路由和插件就不再注册。

## 埋点数据怎么流动

<div class="ms-flow">

1. SDK 把事件写进浏览器的 IndexedDB 队列，按条数或时间成批发送。
2. 后端的 `/track/collect` 校验 `appKey` 并限流，按 `event_id` 去重后入库。
3. 数据保存在 `mugsun_track` 库里，由后端做聚合。
4. 管理后台的「埋点分析」读取聚合结果，展示看板和回放。

</div>

平时用 `fetch` 发送，网络失败时改用 XHR。页面隐藏或关闭时，优先用 `sendBeacon`。

SDK 启动时会拉取 `/track/config`。采样率和回放开关这类远端配置，在下次启动时生效。

## 下一步

<div class="ms-cards">

- [快速开始](/guide/getting-started) 用 Docker 在本机启动整套系统。
- [配置参考](/boot/configuration) 后端的环境变量和配置项。
- [埋点概述](/track/) SDK 的接入方式和分析页面。
- [后端概述](/boot/) 后端自带的功能和本地开发的方法。

</div>
