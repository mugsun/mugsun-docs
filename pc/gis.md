# GIS 与地图

`VITE_ENABLE_GIS` 开启时，管理台注册「地理信息」菜单（前端 `modules/gis`，后端 `mugsun-boot-gis`）。以下截图均来自本地实跑的 mugsun-boot + mugsun-pc（1440×900），**未配置任何底图密钥**，因此地图区域只显示灰色画布与矢量要素；配置天地图 / 高德 / 百度 / Google 任一家密钥后即可叠加底图瓦片。

::: tip 关于演示数据
「埋点地理」两张图使用写入本地开发库的演示事件（约 150 条，分布于北京、上海、广州等城市），仅用于展示效果。
:::

## 底图配置 `/gis/provider`

密钥只保存在服务端，瓦片经登录态接口同源拉取，页面不回显密钥。

![底图配置](/screenshots/gis/gis-provider.png)

## 地图工作台 `/gis/workspace`

工作台默认可用；尚无可用底图时给出空状态与「去配置底图」入口。可通过参数 `gis.module.enabled` 隐藏整个模块。

![地图工作台（未配置底图）](/screenshots/gis/gis-workspace.png)

## 示例 `/gis/lab`

按场景分组的可运行示例：标注与覆盖、轨迹与围栏、查询与量算、三维切片、数据接入，每个示例可「接入」到工作台。

![示例：兴趣点](/screenshots/gis/gis-lab.png)

![示例：热力图](/screenshots/gis/gis-lab-heatmap.png)

## 图层 `/gis/layer`

入库图层后可在地图上预览，叠加到工作台后可调透明度、保存进场景。

![图层](/screenshots/gis/gis-layer.png)

## 场景 `/gis/scene`

在工作台标完后保存为场景，点场景预览、打开继续编辑。

![场景](/screenshots/gis/gis-scene.png)

## 空间分析 `/gis/analyze`

运算走服务端 JTS：输入先规范化成 WGS84 GeoJSON，在 Web Mercator 上按米计算（缓冲等），结果可存为图层或叠加。

![空间分析](/screenshots/gis/gis-analyze.png)

## 埋点地理

埋点「数据概览」`/track/overview` 提供地域分布（基于 IP 属地）与访问热力（基于精确坐标）。

![地域分布与访问热力](/screenshots/gis/track-geo-region.png)

精确坐标默认关闭，需在「接入管理」`/track/app` 的应用里打开「精确位置」开关，SDK 征求定位授权后随会话上报。

![接入管理：精确位置开关](/screenshots/gis/track-app-precise-geo.png)
