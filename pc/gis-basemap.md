# 底图配置与瓦片白名单

管理台地图的底图瓦片一律由 mugsun-boot **同源代理**：浏览器只请求 `/api/system/gis/tile/...`，密钥保存在服务端（SM4 加密），页面上不回显。

## 支持的底图

| 服务商 | code | 是否需要密钥 | 坐标处理 |
| --- | --- | --- | --- |
| 天地图 | `tianditu` | 需要（tk） | WGS84 |
| 高德 | `amap` | 需要（Web 服务 Key） | 显示时转换为 GCJ-02 |
| 百度 | `baidu` | 需要（ak） | 显示时转换为 BD-09 |
| Google | `google` | 需要（Map Tiles API Key） | WGS84 |
| 自定义瓦片 | `xyz` | 可选 | WGS84，不做纠偏 |

厂商底图的取图方式（以 boot 代码为准）：

| 服务商 | 瓦片地址 | 密钥参数 | 上游坐标系 | 允许的瓦片域名 |
| --- | --- | --- | --- | --- |
| 天地图 | `https://t0`～`t7.tianditu.gov.cn/DataServer?T=…` | `tk` | WGS84（CGCS2000） | `*.tianditu.gov.cn` |
| 高德 | `https://webrd0{1-4}.is.autonavi.com/appmaptile?…`（影像和注记走 `webst0{1-4}`） | `key` | GCJ-02 | `*.autonavi.com`、`*.amap.com` |
| 百度 | `https://maponline{0-3}.bdimg.com/tile/?qt=vtile…`（影像走 `/starpic/`） | `ak` | BD-09 | `*.bdimg.com`、`*.baidu.com` |
| Google | `https://tile.googleapis.com/v1/2dtiles/{z}/{x}/{y}?session=…`（先创建 session） | `key` | WGS84 | `*.googleapis.com` |

接口对外一律使用 WGS84，高德和百度在服务端与 GCJ-02、BD-09 之间转换。四家厂商取瓦片时都不跟随重定向，单张上限 2 MB，只放行 png、jpeg、webp、gif（类型须与文件头一致），其他内容一律返回空白瓦片。详见 [底图瓦片代理安全](./gis-tile-security)。

在「地理信息 → 底图」里配置。工作台、地图选点、埋点热力、三维视图共用同一套底图。

## 未配置底图时

如果没有任何底图处于「已配置且启用」状态，地图、示例、图层、场景、空间分析等页面都会在地图区域显示统一的提示，不会再出现一整块空白：

- 说明需要先配置底图：使用天地图要先申请 Key（tk）；不想申请 Key，可以改用免密钥的自定义 XYZ 瓦片（例如内置的 OpenStreetMap 预设，域名须在部署白名单内）。
- 「去配置底图」按钮跳转到「地理信息 → 底图」，只对拥有 `gis:provider:list` 权限的用户显示；没有权限的用户会看到「请联系管理员配置」。
- 「查看配置文档」链接到本页。

是否「未配置」以后端 `/system/gis/status` 的返回为准。如果这个接口请求失败（断网或服务端出错），页面显示的是「底图状态加载失败」和重试按钮，不会误报成未配置。

![未配置底图时的提示](/screenshots/gis/gis-basemap-empty.png)

::: tip 默认 OSM 预设
部署白名单默认放行 `tile.openstreetmap.org`。租户未保存过配置时使用 OSM 预设，不显示上述提示。瓦片仍为空白时，请检查网络，例如 fake-ip 代理将域名解析为 `198.18.x.x` 后被拦截，见 [底图瓦片代理安全](./gis-tile-security)。
:::

## 自定义 XYZ 瓦片

- 地址模板必须使用 `https`，并包含 `{z}`、`{x}`、`{y}`。可以用 `{s}` 轮换子域（子域用逗号分隔，最多 8 个）。需要密钥时，在地址里用 `{key}` 引用，密钥只在服务端拼接。
- 需要填写**版权归属**，地图右下角会以纯文本显示（二维和三维都显示）。
- 内置预设：OpenStreetMap 标准（`https://tile.openstreetmap.org/{z}/{x}/{y}.png`，归属为 `© OpenStreetMap contributors`）。租户还没保存过配置时，默认使用这个预设。
- 「测试」按钮会通过服务端试取一张瓦片，走的是和正式取图完全相同的受限链路。
- 选中自定义瓦片时，地名检索不可用，请切换到厂商底图后再搜索。

## 域名白名单（运维配置）

为防止 SSRF，自定义瓦片只能访问部署配置中明确放行的域名。租户管理员只能在白名单范围内填写地址，无法修改白名单本身。

```yaml
mugsun:
  gis:
    xyz:
      # 完全匹配或匹配其子域；置空即禁用自定义瓦片
      allowed-hosts: ${MUGSUN_GIS_XYZ_ALLOWED_HOSTS:tile.openstreetmap.org}
      default-preset: ${MUGSUN_GIS_XYZ_DEFAULT_PRESET:osm}
      # OSM 要求可识别的 User-Agent，生产环境请改成自己的应用名和联系方式
      user-agent: ${MUGSUN_GIS_XYZ_USER_AGENT:mugsun-boot-gis/0.1 (+https://github.com/mugsun/mugsun-boot)}
      max-tile-bytes: 2097152       # 单张瓦片上限
      cache-max-bytes: 67108864     # 进程内瓦片缓存上限，0 表示关闭
      cache-ttl-seconds: 86400
      allow-benchmark-net: ${MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET:false}  # 198.18.0.0/15
      allow-nat64: ${MUGSUN_GIS_XYZ_ALLOW_NAT64:false}                  # 64:ff9b::/96
      allow-6to4: ${MUGSUN_GIS_XYZ_ALLOW_6TO4:false}                    # 2002::/16
```

服务端对每次取瓦片做以下检查：
- 只允许 https 和默认端口，拒绝 userinfo；
- 拒绝直接写 IP（包括十进制、十六进制等写法）；
- 解析 DNS 后，若任一地址落在回环、内网、链路本地（含云元数据 169.254.169.254）、CGNAT、组播或保留段，就拒绝；
- `198.18.0.0/15`（基准测试网段，fake-ip 代理也用它）、`64:ff9b::/96`（NAT64）、`2002::/16`（6to4）三段**默认拦截**，可分别用 `allow-benchmark-net`、`allow-nat64`、`allow-6to4` 放开（默认都是 false）。NAT64 和 6to4 放开后，内嵌的 IPv4 仍按 IPv4 规则检查；
- 不跟随重定向，限制大小（`max-tile-bytes`）和超时，只放行 png、jpeg、webp、gif（类型须与文件头一致，svg 一律拒绝），响应带 `X-Content-Type-Options: nosniff`。

开关、限流和 fake-ip 代理环境的处理见 [底图瓦片代理安全](./gis-tile-security)。

## 排障 {#troubleshooting}

### 地图整块灰，顶部提示「底图没有加载出来」

连续多张瓦片加载失败（默认连续 8 张，或首屏一张都没成功）时，地图上方会出现提示，并给出后端返回的原因代码。点「重试」会重新请求瓦片；有底图配置权限的用户还可以点「切换底图」，没有权限的用户会提示联系管理员。只要有一张瓦片加载成功，提示就会自动消失。三维视图同样会提示。

![瓦片加载失败提示](/screenshots/gis/gis-tile-error.png)

![三维视图中的瓦片加载失败提示](/screenshots/gis/gis-tile-error-3d.png)

后端瓦片代理在失败时返回错误码和 `X-Mugsun-Tile-Error` 原因头，常见原因：

| 原因代码 | 状态码 | 含义 |
| --- | --- | --- |
| `blocked-address` | 403 | 瓦片域名解析到内网、保留地址或默认拦截的地址段 |
| `host-not-allowed` | 403 | 域名不在白名单 |
| `timeout` | 504 | 上游超时 |
| `upstream-status` / `upstream-unreachable` | 502 | 上游报错或连不上 |
| `bad-content-type` | 502 | 上游返回的不是 png、jpeg、webp、gif |

后端会按「域名 + 原因」限频打 WARN 日志（每分钟最多一条，日志里没有 URL 和密钥），可以按 `GIS tile proxy failed` 搜索。完整列表见 [底图瓦片代理安全](./gis-tile-security#failure-responses)。

### 原因是 `blocked-address`：fake-ip 代理把瓦片域名解析到了 198.18.x.x

Surge、Clash 等代理的 fake-ip 模式会把公网域名（例如 `tile.openstreetmap.org`）解析成 `198.18.0.0/15` 段的假地址。这一段默认被拦截，所以每张瓦片都会失败。任选一种办法处理：

1. **关闭 fake-ip**：在运行 mugsun-boot 的机器上把代理切到 redir-host 或普通模式，或者让 boot 进程不走代理。
2. **给瓦片域名配置直连**：在代理规则里把瓦片域名（例如 `tile.openstreetmap.org`、`*.tianditu.gov.cn`）设为 DIRECT，并加入 fake-ip 排除列表，让它解析到真实地址。
3. **显式开启 `allow-benchmark-net`**：

   ```yaml
   mugsun:
     gis:
       xyz:
         allow-benchmark-net: true   # 或环境变量 MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET=true
   ```

   ::: danger 风险
   开启后，凡是解析到 `198.18.0.0/15` 的瓦片域名都会放行。这一段属于基准测试保留地址，在部分网络里可能是内部服务，开启会削弱 SSRF 防护。只建议在开发机上使用，生产环境请用前两种办法。这个开关只影响自定义 XYZ 底图。
   :::

## 瓦片使用条款注意事项

::: warning OpenStreetMap
`tile.openstreetmap.org` 是 OSMF 用捐赠运营的公共服务，适用 [OSM 瓦片使用政策](https://operations.osmfoundation.org/policies/tiles/)：必须显示 `© OpenStreetMap contributors`、使用可识别的 User-Agent、遵守缓存要求、不得批量预下载。**它不适合大流量的生产环境**。正式上线请自建瓦片服务，或选用商业瓦片服务。
:::

::: warning CARTO
CARTO basemaps（`basemaps.cartocdn.com`）受 [CARTO 条款](https://carto.com/legal) 约束，需显示 `© OpenStreetMap contributors © CARTO`。实测目前对无密钥请求返回「API KEY REQUIRED」水印瓦片，因此没有内置。需要的部署可以把 `basemaps.cartocdn.com` 加入白名单，在底图配置里填写地址和密钥，并自行确认授权范围。
:::

::: tip 天地图等厂商底图
厂商底图同样需要按各自条款标注来源。在中国境内公开展示地图时，还需遵守审图号等相关规定。
:::
