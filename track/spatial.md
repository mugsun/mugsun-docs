# 空间行为

管理台「埋点分析 → 空间行为」按精确坐标看热力格或明细点。

路径：`/track/spatial`（菜单「空间行为」，图标 `ri:map-2-line`）。

读权限：`sys:track-spatial:list`（主库迁移 **V20**；已有概览读权的角色会补授）。

与数据概览里的 `/system/track/geo`（IP 属地 + 概览热力）分开。

本页只读服务端落库的 `geo_lon` / `geo_lat` 列，不回 IP、不回 `geo_acc`。旧 `/geo` 接口不动。

## 怎么带上坐标

1. 在「接入管理」`/track/app` 打开该应用的「精确位置」。
2. SDK 注册 `geoPlugin()`，并保证 `geoEnabled` 为 `true`（本地或 `/track/config` 远端下发，下次启动生效）。
3. 浏览器定位授权通过后，插件把坐标写入事件超属性；也可自行在 `props` 里带：

| 键 | 说明 |
| --- | --- |
| `geo_lon` / `$geo_lon` | 经度（WGS84） |
| `geo_lat` / `$geo_lat` | 纬度（WGS84） |
| `geo_acc` | 精度（米，仅 props，不提升为列） |

亦接受 `longitude`/`latitude`、`lon`/`lat`，或嵌套 `geo.{lon,lng,lat}`。

服务端圆整到 **4 位小数**（约 11 m）后写入列；非法或越界坐标丢列，不拒整条事件。无坐标的事件不会出现在本页。

详见 [安装与初始化](/track/install)（`geoEnabled`）、[插件](/track/plugins)（`geoPlugin`）。

演示种子应用（`mugsun.lab.seed-fronttest=true` 时写入）：`appKey` = `ak_lab_spatial_demo`。

## 管理台怎么用

1. 选应用（`appKey` 必填）与天数（今日 / 近 7 天 / 近 30 天；`days` 1–30，默认 7）。
2. 选模式：`agg` 热力格（默认）或 `points` 明细点。
3. 可选：按事件名筛选（逗号分隔）、视口 `bbox` / `zoom`（地图拖动会带上）。
4. 点选明细点：优先跳会话回放（须 `sys:track-replay:view`）；否则跳用户细查。
5. `userId` 按原字符串传递，勿转成 number（雪花会丢精度）。
6. 无读权时页顶提示，不发请求。

默认真接口 `GET /api/system/track/spatial`。

仅同时满足 `import.meta.env.DEV` 与 `VITE_TRACK_SPATIAL_MOCK=true` 时走本地同形 mock。

生产构建不含 mock 分支。

漏斗相关入参（`funnelId` / `funnelSteps` / `windowHours` / `convertedOnly`）本刀保留契约形态。

但**无漏斗定义表**：`converted` 恒为 `false`；`convertedOnly=true` 直接空态。

转化筛选请用 `eventNames`。

## API

| 项 | 说明 |
| --- | --- |
| 方法 / 路径 | `GET /system/track/spatial` |
| 网关常见前缀 | `/api/system/track/spatial` |
| 权限 | `sys:track-spatial:list`（须登录） |
| 限流 | 60 次/分/用户（Redis 滑窗，键前缀 `mugsun:track:rls:`） |

### 查询参数

| 参数 | 说明 |
| --- | --- |
| `appKey` | 必填 |
| `days` | 可选 1–30，默认 7 |
| `mode` | `agg`（默认）或 `points` |
| `bbox` | 可选 `minLon,minLat,maxLon,maxLat`（WGS84；不支持跨 180°） |
| `zoom` | 可选 1–20；映射网格精度见下表 |
| `gridPrecision` | 可选 1–4；若传则优先于 `zoom` |
| `eventNames` | 可选，逗号分隔事件名（须字符串，勿传数组） |

### zoom → 网格精度 `p`

| zoom | `p` |
| --- | --- |
| ≤5 | 1 |
| 6–8 | 2 |
| 9–11 | 3 |
| ≥12 | 4 |

皆缺省时 `p = 2`。聚合为 `round(geo_lon/geo_lat, p) GROUP BY`，**不依赖** track 侧 PostGIS。

### 响应要点

| 字段 | 说明 |
| --- | --- |
| `mode` | `agg` / `points` |
| `cells` | agg：`[{lon, lat, count}]`，按 count 降序 |
| `points` | points：含 `lon`/`lat`/`eventName`/`ts`/`sessionId`/`distinctId`/`userId` 等；`converted` 本刀恒 `false` |
| `geoCount` | 窗口内带坐标事件总数（截断前） |
| `truncated` | 是否触达硬顶后截断 |

### 硬顶与边界

| 项 | 值 |
| --- | --- |
| 聚合格 | ≤ **5000**（超出按 count 截断，`truncated=true`） |
| 明细点 | ≤ **2000**（按 `received_at` 新→旧截断） |
| 天数 | ≤ **30**（与漏斗对齐） |
| 隐私 | 不回 IP / `geo_acc` / Web 墨卡托坐标 |

跨租户或无权应用与分析同口径，提示应用不可见。

## 相关页面

- [埋点概述](/track/)
- [问数据](/track/ask)（意图里的 `geo` 仍走概览属地，不是本页）
- [GIS · 埋点地理](/pc/gis#埋点地理)
- [安装与初始化](/track/install)
