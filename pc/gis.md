# GIS 与地图

`VITE_ENABLE_GIS` 开启时，管理台注册「地理信息」菜单（前端 `modules/gis`，后端 `mugsun-boot-gis`）。以下截图均来自本地实跑的 mugsun-boot + mugsun-pc（1440×900）。

::: info 底图来源与版权
截图中的底图为**天地图**（国家地理信息公共服务平台）影像 + 注记瓦片，经 boot 同源代理加载，版权归天地图所有。当前管理台地图未显示版权/审图号控件，正式对外使用时请按天地图服务条款在页面标注来源与审图号。底图密钥需自行在天地图控制台申请。
:::

::: tip 关于演示数据
「埋点热力」「地域分布」使用写入本地开发库的演示事件（约 150 条带坐标事件，分布于北京、上海、广州等城市），仅用于展示效果。
:::

## 底图配置 `/gis/provider`

密钥只保存在服务端（SM4 加密），瓦片经登录态接口同源拉取；已配置的密钥不会回显，输入框只提示「留空则不修改」。

![底图配置（天地图已配置）](/screenshots/gis/gis-provider.png)

## 地图工作台 `/gis/workspace`

绘制点线面、地名 / POI 检索、二三维切换、底图与样式切换（矢量 / 影像 / 注记）。可通过参数 `gis.module.enabled` 隐藏整个模块。

![地图工作台](/screenshots/gis/gis-workspace.png)

工作台「更多 → 埋点热力」可把埋点精确坐标叠加为热力图层，在「图层」面板调整透明度、定位或移除。

![工作台叠加埋点热力](/screenshots/gis/gis-workspace-track-heat.png)

## 示例 `/gis/lab`

按场景分组的可运行示例：标注与覆盖、轨迹与围栏、查询与量算、三维切片、数据接入，每个示例可「接入」到工作台。

![示例：兴趣点](/screenshots/gis/gis-lab.png)

![示例：热力图](/screenshots/gis/gis-lab-heatmap.png)

## 空间分析 `/gis/analyze`

运算走服务端 JTS：输入先规范化成 WGS84 GeoJSON，在 Web Mercator 上按米计算，结果可存为图层或叠加。下图为对天安门附近一点做 500 米缓冲。

![空间分析：缓冲](/screenshots/gis/gis-analyze.png)

## 埋点地理

埋点「数据概览」`/track/overview` 提供地域分布（基于 IP 属地）与访问热力（基于精确坐标）。两者数据来源不同，不要混为一谈。

![地域分布与访问热力](/screenshots/gis/track-geo-region.png)

精确坐标默认关闭，需在「接入管理」`/track/app` 的应用里打开「精确位置」开关，SDK 征求定位授权后随会话上报。

![接入管理：精确位置开关](/screenshots/gis/track-app-precise-geo.png)
