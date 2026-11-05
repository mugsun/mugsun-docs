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

运算走服务端 JTS：输入先规范化成 WGS84 GeoJSON，再按地面米计算（见下方「米制精度」），结果可存为图层或叠加。下图为对天安门附近一点做 500 米缓冲。

![空间分析：缓冲](/screenshots/gis/gis-analyze.png)

### 米制精度 {#metric-accuracy}

涉及米的计算都按**地面米**算，但不同功能走的路径不同：

| 功能 | 有 PostGIS 时 | 没有 PostGIS 时（如 MySQL、达梦） |
|---|---|---|
| 图层查询：半径查询、最近邻、缓冲 | 数据库里用 `geography` 计算（WGS84 椭球） | Java 路径 |
| 空间分析 `/gis/analyze`：选了源图层、没有粘贴数据时的「缓冲」和「包含」 | 交给图层查询，同上走数据库 | 交给图层查询的 Java 路径 |
| 空间分析 `/gis/analyze`：其他情况（粘贴数据，或距离、面积、长度、相交、差集等），以及请求带 `engine=java` 时 | Java 路径 | Java 路径 |

图层查询和 `/gis/analyze` 都接受 `engine=java`，强制走 Java 路径（诊断、对比用）。`/gis/analyze` 带 `engine=java` 时不交给图层查询，整份入参在内存里分析。

Java 路径的做法：全部建立在 GeographicLib（Karney 算法，与 PostGIS `geography` 同源）和 JTS 上，两个顶点之间的边都按 WGS84 椭球上的测地线处理，与 PostGIS `geography` 一致。

- **缓冲（一般）**：以要素包络中心做椭球方位等距投影（|纬度| ≥ 88° 时以极点为原点）。
- 在平面上缓冲后投回；投影前、投回后都沿测地线每 1 公里取点加密。
- **缓冲（包极点面）**：外环累计经度 ≈ ±360°，且在高纬或含极点顶点。
- 判定对齐 GeographicLib `PolygonArea` 的经度跨越计数；改用极点原点 AEQD。
- 结果按 RFC 7946 极地切口写出（±180° 接到极点）。
- 不规则包极面收成等纬 RFC 极冠近似（取缓冲后最南/最北纬为极冠边）。
- **距离（一般）**：以查询点为原点投影，求几何最近点，再用 GeographicLib 反算。
- 顶点、边上任意一点都算；点在面内为 0。
- **距离（包极点面）**：极点原点 AEQD；RFC 形内为 0，否则到边界测地距离。
- **面积**：GeographicLib `PolygonArea` 直接在椭球上算（外环减内环）。
- 与 PostGIS `ST_Area(geography)` 一致；包极点面喂原环，不先 unwrap。
- **长度**：逐段测地距离求和。

半径查询和最近邻先按经纬度包络粗筛，米换算成度时留了余量；包络越过 180° 经线时拆成两个框分别筛，对侧的要素不会漏掉。范围查询（bbox）的西经界大于东经界（如 `minLon=170&maxLon=-170`）时按 RFC 7946 §5.2 视为跨 180° 的范围，同样拆成两个框查询；南纬界不小于北纬界仍报错。PostGIS 路径的最近邻先按经纬度平面距离用 GiST 的 KNN（`<->`）取候选（结果数的 10 倍，至少 100、至多 10000 个），再按 `geography` 距离重新排序；结果是近似的：高纬度、要素密集的图层里，平面距离与地面距离排序差别大，真正最近的要素可能不在候选里而被漏掉。

库里已经存成跨 180° 写法的要素（如 `LINESTRING(179.9 0, -179.9 0)`）按跨 180° 理解。

判定：平面包络宽于 180°、负经度加 360（`ST_ShiftLongitude`）后不再宽于 180°。

bbox、相交、包含、半径：0° 附近不误命中，180° 附近（含西>东 bbox）能查到。

PostGIS 路径与 Java 路径口径一致，不改存储（mugsun-boot#64）。

自 [mugsun-boot#76](https://github.com/mugsun/mugsun-boot/issues/76) 起，有 PostGIS 时写入生成列 `wraps_antimeridian`。

跨 180° 查询支走 `ST_ShiftLongitude(geom) &&` + wraps；非跨支 `NOT wraps_antimeridian`。

部分 GiST `idx_gis_feature_wrap` 供跨 180° 支走索引；Java 回落不变。

因为边按测地线，高纬、跨很多经度的长边会向极点弯：例如 75°N 上经度 0° 到 170° 的边，中段会弯到 89°N 附近。这类要素的面积、长度和距离与「按经纬度直边」理解的结果差别很大，以 PostGIS `geography` 为准。

Java 路径的精度（缓冲边界上每个顶点到原要素的测地距离与设定米数的相对误差，GeographicLib 真值，点、线、面合并取范围）：

| 位置 | 500 米缓冲 | 20 公里缓冲 | 200 公里缓冲 |
|---|---|---|---|
| 赤道 | 0 ～ +0.03% | −0.03% ～ 0 | −0.03% ～ 0 |
| 北京（39.9°N） | 0 ～ +0.03% | −0.03% ～ 0 | −0.03% ～ 0 |
| 72°N | 0 ～ +0.02% | −0.03% ～ 0 | −0.03% ～ 0 |
| 78°N | 0 ～ +0.02% | −0.03% ～ 0 | −0.03% ～ 0 |
| 86°N | 0 ～ +0.02% | −0.03% ～ 0 | −0.03% ～ 0 |
| 88°S | −0.02% ～ +0.03% | −0.04% ～ 0 | −0.05% ～ 0 |
| 88°–89.6° 的长边线和面 | −0.05% ～ +0.05% | −0.03% ～ 0 | 未测 |

剩余误差主要来自圆弧用折线近似（每 1/4 圆 32 段）。与 PostGIS 路径对照（同一缓冲结果的外环顶点用 `ST_Distance(geography)` 量到原要素）：赤道、北京、72°N 的点线面在 500 米～200 公里内相差 −0.18% ～ +0.002%，88°–89.6° 的线和面在 500 米～5 公里内相差 −0.05% ～ +0.05%。两条路径缓冲结果的面积相差 −0.5% ～ +0.8%，主要来自 PostGIS `ST_Buffer(geography)` 自身的投影近似。面积对照 `ST_Area(geography)`：60°×60°、高纬 170° 宽等多边形相差小于 10⁻¹⁵。

::: warning 旧版本的偏差
此前的版本在 Web Mercator 平面上按米计算，没有做纬度修正：缓冲半径和距离按 cos(纬度) 缩小，面积按 cos²(纬度) 缩小。北京的 500 米缓冲实际只有约 383 米，72°N 只有约 31%。升级后的精度见上表。
:::

#### Java 路径的限制 {#metric-limits}

极区照常计算，不再有纬度限制。

跨 180° 经线按 RFC 7946 §3.1.9 处理：各部件先接成连续经度再算距离、面积、长度。

缓冲结果越过 180° 时在 180° 处切成 MultiPolygon（例如斐济附近的缓冲）。

**包极点面**（沿环累计经度 ≈ ±360°，对齐 GeographicLib `PolygonArea`）可算。

自 [mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63) 起：面积直接 `PolygonArea`。

缓冲 / 距离用极点原点 AEQD，结果按 RFC 7946 极地切口写出。

不规则包极面缓冲为等纬 RFC 极冠近似。

绕极一圈、不含极点顶点的环入库时改写为 ±180° 接极点（带 WARN），不再拒绝。

仍然算不出的只有两类（均指**非包极点**情形）：

- **非包极点要素的缓冲结果包住极点**：缓冲后盖住北极或南极时，无法按普通经纬度面输出。
- 包极点面本身的缓冲走极点 AEQD，不受上一条限制。
- **单个部件经度跨度超过 180° 且不是包极点面**：接成连续经度后仍宽于 180°。
- 或缓冲结果绕地球一周，无法确定走向。

遇到这两类时：

- **分析单个几何**（`/gis/analyze` 入参，含 `engine=java` 从源图层取出的几何）：直接报错。
- 非包极点缓冲包住极点时：缩小缓冲距离，或在极点附近拆分要素。
- 部件宽于 180° 时：请先在 180° 处拆分要素。
- **图层查询**（半径、最近邻、缓冲，以及分析交给图层的缓冲 / 包含）：个别失败不拖垮整次查询。
  - 半径和最近邻：跨 180° 的要素先把负经度加 360，接成连续一段再算。
  - 查询点换到同一经度范围，取离要素较近的表示。
  - 例：`LINESTRING(179.9 0, -179.9 0)` 从 (0, 0) 约 20004 公里。
  - 从 (179.95, 0.1) 约 11.1 公里。
  - 平移后仍宽于 180° 且非包极点的要素跳过；包极点面照常量距。
  - 缓冲：跳过「非包极点却缓冲包住极点」或「部件宽于 180° 且非包极点」。
  - 包极点面（含 RFC 极冠）照常缓冲；仅越过 180° 的缓冲在 180° 切开返回。
  - 响应 `skipped` 为跳过数；WARN 按图层+操作每分钟最多一条。
- **空间分析转交图层查询时**，响应同样带 `skipped`。
- 命中结果里宽于 180° 且非包极点的要素不计入面积/长度汇总。
- 其数量记在 `metrics.metricsSkipped`。
- **查询点**：极区、极点上的查询点都可以查。
- 靠近 180° 也没问题，例如经度 179.9 能查到 -179.9 的要素。
- **空几何**：距离视为无穷远（半径不命中，最近邻排最后），缓冲为空，面积和长度为 0。

::: warning 已知限制
- **包极点面已支持（[mugsun-boot#63](https://github.com/mugsun/mugsun-boot/issues/63)）**。
- RFC 极冠与绕极环判定包极点后，面积、缓冲、距离可算。
- 例：`POLYGON((-180 80, …, 180 80, 180 90, -180 90, -180 80))`。
- 例：`POLYGON((0 80, 90 80, 180 80, -90 80, 0 80))`。
- 绕极环入库改写为 ±180° 接极点。
- PostGIS 图层缓冲对极冠不再 skip。
- `geography` `ST_Buffer` 对极冠仍会丢掉极点一侧。
- 业务路径取原几何，在 JVM 用极点 AEQD 缓冲。
- 只跨 180°、平移后不宽于 180° 的面仍下沉 `ST_Buffer`。
- 不规则包极面缓冲是等纬 RFC 极冠近似，不是原边界精确外扩。
- **边按测地线，与 RFC 7946 的直线边不同**：RFC 7946 把两个顶点之间的边视为经纬度平面上的直线，本系统按椭球测地线计算，所以同一个多边形的面积会有差别，范围越大、越靠近赤道或高纬，差别越大。实测（GeographicLib，经纬直边加密 2 万点对比测地线边）：赤道 1°×1° +0.003%，北纬 30°–40° 的 10°×10° +0.004%，赤道 10°×10° +0.25%，北纬 60°–70° 的 10°×10° −0.37%，中国范围（73°–135°E、18°–54°N）−0.59%，0°–60° 的 60°×60° +2.27%。城市级范围的差别可以忽略。
- **库里存的跨 180° 要素范围查询（[mugsun-boot#73](https://github.com/mugsun/mugsun-boot/pull/73) 已修）**。
- 修复前平面上被当成横跨全球，0°～10° 误命中，180° 附近查不到（[#64](https://github.com/mugsun/mugsun-boot/issues/64)）。
- 修复后两条路径都按跨 180° 理解；判定同 #73（宽于 180° 且 ShiftLongitude 后 ≤180°）。
- 真正向东绕过大半个地球、平移后仍 ≤180° 的宽要素也会被当成跨 180°，按短边理解。
- 与 RFC 7946 一致；需要表达这种宽要素时请拆成多段。
- **`wraps_antimeridian` 生成列与部分 GiST（[mugsun-boot#76](https://github.com/mugsun/mugsun-boot/issues/76)）**。
- 有 PostGIS 时 `gis_feature.wraps_antimeridian` 为 `GENERATED ALWAYS AS STORED` 布尔列。
- 判定同 #73；加列时由库计算存量，应用侧不维护。
- V16 加列；无 PostGIS / 无 `gis_feature` 时整段跳过（达梦、openGauss-lite 同号占位）。
- V17 非事务 Java 迁移：`CREATE INDEX CONCURRENTLY` 建部分 GiST `idx_gis_feature_wrap`。
- 索引表达式为 `ST_ShiftLongitude(geom)`，条件 `wraps_antimeridian AND is_deleted = 0`。
- 跨 180° 查询支走 `ST_ShiftLongitude(geom) &&` + wraps；非跨支 `NOT wraps_antimeridian`。
- 覆盖 bbox / 相交 / 包含 / 半径 / 最近邻；Java 回落仍用 `GisAntimeridian`，不变。
- 主库 Flyway 用会话级锁（`flyway.postgresql.transactional.lock=false`）。
- 约定见 `FlywayPgCompatConfig`，与埋点 T4 同口径。
- 须直连 PostgreSQL，或 PgBouncer **session**；禁止 transaction pooling。
:::

## 控件布局与窄屏 {#layout}

- 示例、图层、场景、空间分析、底图几页的缩放按钮放在左侧面板右边，不会被面板盖住。工作台的缩放仍在左下角。
- 视口宽度不超过 768px 时（如 390 宽的手机）：
  - 图层、场景、空间分析、底图页的底部操作提示变成整行横条，右侧有 × 可以收起。收起只在本次进入页面时有效。
  - 工作台顶部的三组工具条改成整行堆叠：视图与底图、场景与保存、搜索。「二维 / 三维」固定在最左边。底部状态条也变成整行横条，缩放按钮移到右上角。

![带左侧面板的页面：缩放按钮在面板右侧（1440×900）](/screenshots/gis/gis-zoom-beside-panel.png)

<div style="display:flex;gap:16px;flex-wrap:wrap">
<img src="/screenshots/gis/gis-narrow-hint.png" alt="390 宽：图层页底部提示横条" width="300" />
<img src="/screenshots/gis/gis-workspace-narrow.png" alt="390 宽：工作台工具条堆叠" width="300" />
</div>

## 埋点地理

埋点「数据概览」`/track/overview` 提供地域分布（基于 IP 属地）与访问热力（基于精确坐标）。两者数据来源不同，不要混为一谈。

![地域分布与访问热力](/screenshots/gis/track-geo-region.png)

精确坐标默认关闭，需在「接入管理」`/track/app` 的应用里打开「精确位置」开关，SDK 征求定位授权后随会话上报。

独立「空间行为」页 `/track/spatial`（`GET /system/track/spatial`）按精确坐标做热力格 / 明细点。

与概览 `/geo` 分开。详见 [空间行为](/track/spatial)。

![接入管理：精确位置开关](/screenshots/gis/track-app-precise-geo.png)
