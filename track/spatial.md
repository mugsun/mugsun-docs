# 空间行为

「空间行为」把带坐标的事件画到地图上。可以看哪些地方事件多，也可以点开单个事件，跳到当时的会话回放。

页面在「埋点分析 → 空间行为」。它用的是 SDK 上报的精确坐标，和数据概览里按 IP 判断的地域分布不是一回事，区别见 [GIS 与地图](/pc/gis#track)。

## 先让事件带上坐标

精确坐标默认不采集，没有坐标的事件不会出现在这一页。

<div class="ms-steps">

### 打开应用的开关

在「埋点分析 → 接入管理」里编辑应用，打开「精确位置」。开关不会立刻生效：SDK 启动时取到新配置，下一次启动才用上。

### 注册定位插件

定位插件不在默认插件里，要自己加：

```ts
import { createTracker, defaultPlugins, geoPlugin } from '@mugsun/track-web'

const tracker = createTracker({
  endpoint: 'https://api.example.com',
  appKey: 'your-app-key',
  plugins: [...defaultPlugins(), geoPlugin()],
})
```

### 用户同意定位

浏览器会弹出定位授权，每次会话最多问一次。用户同意后，之后的事件都带上坐标。拒绝或定位失败时不带，也不报错。

</div>

::: warning 位置是敏感个人信息
采集精确位置之前，要在隐私政策里说明用途，并取得用户的单独同意，见[隐私与合规](/track/privacy)。
:::

### 自己带坐标

不用插件也可以。事件属性里有下面任意一组键，后端都认：

| 经度 | 纬度 |
| --- | --- |
| `geo_lon` | `geo_lat` |
| `$geo_lon` | `$geo_lat` |
| `longitude` | `latitude` |
| `lon` | `lat` |
| `geo.lon` 或 `geo.lng` | `geo.lat` |

```ts
tracker.track('store_checkin', { geo_lon: 116.3975, geo_lat: 39.9087 })
```

坐标按 WGS84 算。后端把经纬度四舍五入到 4 位小数再存，大约 11 米。

超出范围或者不是数字的坐标会被丢掉，事件本身照常入库。

## 在后台查看

<div class="ms-steps">

### 选应用、时间和模式

选应用和时间范围，再选「聚合热力」或「事件点」，点「查询」。只想看某些事件时，在事件名框里选，或者直接输入。

### 看热力

「聚合热力」把坐标相近的事件合成一格，每一格的热度按里面的事件数算。地图标题旁边显示符合条件的事件总数。

### 看单个事件

切到「事件点」，点地图上的一个点，右边的「选中点」显示事件名、坐标、页面和时间。

「查看回放」跳到这次会话的回放，「用户画像」跳到用户细查。

### 放大看细节

查询过一次以后，拖动或缩放地图会按当前视野自动重新查询。放大以后格子变小，能看到更细的分布。

</div>

| 界面上的提示 | 含义 |
| --- | --- |
| 结果已截断，请放大地图或收窄筛选后再查 | 格子超过 5000 个，或者点超过 2000 个，只显示了一部分 |
| 暂无空间数据 | 这个范围和时间里没有带坐标的事件 |
| 没有会话回放权限，无法跳转回放 | 缺 `sys:track-replay:view` |

工具栏上的「漏斗 ID」「漏斗步骤号」和「仅转化」是预留的，目前不起筛选作用。勾上「仅转化」会得到空结果。

## 格子有多大

聚合时按经纬度的小数位数分格，位数越多格子越小。页面按地图的缩放级别自动选：

| 精度 | 缩放级别 | 一格大约多大 |
| --- | --- | --- |
| 1 | 5 及以下 | 11 公里 |
| 2 | 6 到 8 | 1.1 公里 |
| 3 | 9 到 11 | 110 米 |
| 4 | 12 及以上 | 11 米 |

调接口时可以用 `gridPrecision` 直接指定精度，它比 `zoom` 优先。两个都不传时按精度 2。

## 权限

| 权限 | 能做什么 |
| --- | --- |
| `sys:track-spatial:list` | 打开页面和查询 |
| `sys:track-replay:view` | 从选中的点跳到会话回放 |

升级时，已经有数据概览权限的角色会自动拿到 `sys:track-spatial:list`。

## 接口

`GET /system/track/spatial`，要登录，要有 `sys:track-spatial:list`。每个用户每分钟最多请求 60 次。

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `appKey` | 是 | 应用的 AppKey |
| `days` | 否 | 1 到 30，默认 7 |
| `mode` | 否 | `agg` 是热力格，`points` 是事件点。默认 `agg` |
| `bbox` | 否 | 查询范围，写成 `minLon,minLat,maxLon,maxLat`，不能跨 180° 经线 |
| `zoom` | 否 | 1 到 20，用来决定精度 |
| `gridPrecision` | 否 | 1 到 4，比 `zoom` 优先 |
| `eventNames` | 否 | 事件名，多个用逗号隔开 |

热力格模式下，响应的 `data` 是这样：

```json
{
  "mode": "agg",
  "cells": [
    { "lon": 116.4, "lat": 39.91, "count": 128, "weight": 128 }
  ],
  "geoCount": 342,
  "truncated": false
}
```

| 字段 | 说明 |
| --- | --- |
| `cells` | 热力格，按 `count` 从大到小，最多 5000 个 |
| `points` | 事件点，从新到旧，最多 2000 个。只在 `points` 模式下有 |
| `geoCount` | 符合条件的事件总数，是截断之前的数 |
| `truncated` | 结果有没有被截断 |

每个点带下面这些字段。接口不返回 IP，也不返回定位精度 `geo_acc`。

| 字段 | 说明 |
| --- | --- |
| `lon` `lat` | 经纬度 |
| `eventName` `eventId` `ts` | 事件名、事件 ID 和时间 |
| `urlPath` | 事件发生的页面 |
| `sessionId` `distinctId` | 会话和访客 |
| `userId` | 登录用户。是字符串，前端不要转成数字，转了会丢精度 |

时间范围按租户的看板时区算，看的是事件到达后端的时间。

`funnelId` `funnelSteps` `windowHours` 是预留参数，只校验格式。`convertedOnly=true` 直接返回空结果。

## 演示数据

后端启动时带上 `mugsun.lab.seed-fronttest=true`，会建一个演示应用，并写入一批带坐标的事件。

演示应用的 AppKey 是 `ak_lab_spatial_demo`。应用已经存在时不会重复写入。

开发管理后台时，把环境变量 `VITE_TRACK_SPATIAL_MOCK` 设成 `true`，页面会改用本地的假数据。它只在开发模式下有效。

## 下一步

<div class="ms-cards">

- [插件](/track/plugins#精确位置) 定位插件什么时候请求授权，带上哪些属性。
- [GIS 与地图](/pc/gis#track) 埋点里三处地图各自用什么数据。
- [隐私与合规](/track/privacy) 采集之前要告知用户并取得同意。

</div>
