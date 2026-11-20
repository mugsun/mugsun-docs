# 底图配置与白名单

地图的底图在「地理信息 → 底图」里配置。这一页讲支持哪些底图、怎么配，以及地图不显示时怎么查。

浏览器只向后端请求瓦片，由后端去服务商那里取。密钥加密后存在服务端，页面上不显示。

## 支持的底图

| 底图 | 代号 | 要不要密钥 | 坐标 |
| --- | --- | --- | --- |
| 天地图 | `tianditu` | 要，填 tk | WGS84 |
| 高德 | `amap` | 要，填 Web 服务的 Key | 显示时换算成 GCJ-02 |
| 百度 | `baidu` | 要，填 ak | 显示时换算成 BD-09 |
| Google | `google` | 要，填 Map Tiles API 的 Key | WGS84 |
| 自定义瓦片 | `xyz` | 可选 | WGS84，不换算偏移 |

- 新部署默认用「自定义瓦片」里的 OpenStreetMap 预设，不用配置就有地图。
- 每个租户各自配置。地图、示例、图层这些页面，还有埋点里的地图，共用同一套底图。
- 接口和存储都用 WGS84。用高德或百度时，显示和搜索地名都会自动换算偏移。
- 密钥用 SM4 加密后保存。

## 配一家厂商底图

<div class="ms-steps">

### 申请密钥

到服务商的开放平台申请密钥。各家要的密钥类型见上表。

### 填进「底图」页

打开「地理信息 → 底图」，点服务商的名字，在「访问密钥」里填上密钥，点「保存」。

### 看预览

右边的地图会换成这家的底图。右上角可以选「矢量」或「影像」这几种样式。

</div>

- 保存后，名字右边的标签从「未配置」变成「已配置密钥」。
- 密钥保存后不再显示。输入框留空表示不修改。
- 关掉「启用」再保存，这家底图停用，密钥还留着。
- 点「清除配置」删掉这家的配置。
- 保存要有 `gis:provider:save` 权限，清除要有 `gis:provider:remove` 权限。
- 地图页面会记住上次用的底图。没有记录时，用列表里第一个可用的。

## 自定义瓦片 {#xyz}

在「底图」页点「自定义瓦片」，可以接入任何 XYZ 瓦片服务。

| 表单项 | 怎么填 |
| --- | --- |
| 「预设」 | 选「OpenStreetMap 标准」，下面几项会自动填好 |
| 「瓦片地址」 | 以 `https://` 开头，包含 `{z}`、`{x}` 和 `{y}`，最长 512 个字符 |
| 「子域」 | 地址里有 `{s}` 时必填。用逗号分隔，最多 8 个 |
| 「版权归属」 | 显示在地图右下角，最长 200 个字 |
| 「访问密钥」 | 可选。后端把它填到地址里写 `{key}` 的位置 |

- 域名必须在部署的白名单里。表单下面的「允许的域名」列出了白名单。
- 点「测试」，后端按正式取图的方式试取一张瓦片，并显示耗时。
- 租户没保存过配置时，用内置的 OpenStreetMap 预设。
- 自定义瓦片最大到 19 级缩放，坐标按 WGS84 处理，不换算偏移。
- 选了自定义瓦片时不能搜索地名。要搜索，先换成厂商底图。

::: warning OpenStreetMap 的公共瓦片
`tile.openstreetmap.org` 是靠捐赠运营的公共服务，不适合大流量的生产环境。正式上线请自建瓦片服务，或者购买商业服务。

使用时要遵守 [OSM 瓦片使用政策](https://operations.osmfoundation.org/policies/tiles/)，包括显示 `© OpenStreetMap contributors` 和不批量下载。
:::

## 域名白名单 {#allow-list}

自定义瓦片只能访问部署配置里放行的域名，避免后端被用来访问内网。白名单写在后端的配置文件里，租户管理员改不了。

```yaml
mugsun:
  gis:
    xyz:
      allowed-hosts: ${MUGSUN_GIS_XYZ_ALLOWED_HOSTS:tile.openstreetmap.org}
      default-preset: ${MUGSUN_GIS_XYZ_DEFAULT_PRESET:osm}
      user-agent: ${MUGSUN_GIS_XYZ_USER_AGENT:mugsun-boot-gis/0.1 (+https://github.com/mugsun/mugsun-boot)}
      max-tile-bytes: 2097152
      cache-max-bytes: 67108864
      cache-ttl-seconds: 86400
```

| 配置项 | 说明 |
| --- | --- |
| `allowed-hosts` | 放行的域名，多个用逗号分隔，子域一并放行。留空就停用自定义瓦片 |
| `default-preset` | 租户没保存过配置时用的预设，目前只有 `osm`。留空表示必须先配置 |
| `user-agent` | 取瓦片时带的 User-Agent。生产环境请改成自己的应用名和联系方式 |
| `max-tile-bytes` | 单张瓦片的大小上限，默认 2MB |
| `cache-max-bytes` | 后端内存里瓦片缓存的上限，默认 64MB。填 0 关闭缓存 |
| `cache-ttl-seconds` | 缓存多久，默认一天 |

- 前三项也可以用配置里写的环境变量来设。
- 后端每次取瓦片都重新检查地址。只允许 `https` 和默认端口，不能带用户名，也不能直接写 IP。
- 域名解析出的地址落在内网、回环或云元数据这类地址段时，请求被拒绝。
- 另有三个特殊地址段默认拦截，放行开关见[底图瓦片代理安全](/pc/gis-tile-security#blocked-ranges)。

## 没有可用的底图时 {#empty}

一家「已配置并启用」的底图都没有时，各个地图页面在地图区域显示下面的提示。

![地图区域显示「还没有可用的底图」和两个按钮](/screenshots/gis/gis-basemap-empty.png)

- 默认配置下不会出现这个提示，因为有 OpenStreetMap 预设。
- 「去配置底图」只对有 `gis:provider:list` 权限的人显示。其他人看到的是请联系管理员。
- 「查看配置文档」打开的就是这一页。
- 查询底图状态失败时，显示「底图状态加载失败」和「重试」，不会当成没有配置。

## 排障 {#troubleshooting}

### 地图是灰的，提示「底图没有加载出来」

![地图上方的提示条，带原因代码和「重试」按钮](/screenshots/gis/gis-tile-error.png)

- 连续 8 张瓦片失败，或者第一屏一张都没成功时，出现这个提示。三维视图也一样。
- 点「重试」重新请求瓦片。有底图权限的人还可以点「切换底图」。
- 只要有一张瓦片加载成功，提示就自动消失。
- 提示里的「原因代码」由后端返回，常见的几种如下。

| 原因代码 | 状态码 | 意思 | 怎么办 |
| --- | --- | --- | --- |
| `blocked-address` | 403 | 域名解析到了内网或保留地址，或者解析失败 | 见[下一小节](#fake-ip) |
| `host-not-allowed` | 403 | 域名不在白名单里 | 把域名加进 `allowed-hosts` |
| `timeout` | 504 | 后端 8 秒内没有取到瓦片 | 检查后端到服务商的网络 |
| `upstream-status` | 502 | 服务商返回的状态码不是 200 | 检查密钥、配额和瓦片地址 |
| `upstream-unreachable` | 502 | 后端连不上服务商 | 检查后端的出网和 DNS |
| `bad-content-type` | 502 | 服务商返回的不是图片 | 检查密钥和瓦片地址 |

- 后端同时记一条 WARN 日志，搜 `GIS tile proxy failed` 能找到。同一域名的同一原因每分钟最多一条。
- 全部原因代码见[失败响应](/pc/gis-tile-security#failure-responses)。

### 原因代码是 `blocked-address` {#fake-ip}

Surge、Clash 这类代理的 fake-ip 模式，会把公网域名解析成 `198.18.0.0/15` 里的假地址。

这一段默认被拦截，所以自定义瓦片全部失败。任选下面一种办法处理。

| 办法 | 怎么做 |
| --- | --- |
| 关掉 fake-ip | 在运行后端的机器上，把代理换成 redir-host 模式，或者让后端进程不走代理 |
| 让瓦片域名直连 | 在代理规则里把瓦片域名设成 DIRECT，并加进 fake-ip 的排除列表 |
| 放行这个地址段 | 把 `mugsun.gis.xyz.allow-benchmark-net` 设成 `true`，也可以用环境变量 `MUGSUN_GIS_XYZ_ALLOW_BENCHMARK_NET` |

::: danger 放行地址段的风险
放行以后，解析到 `198.18.0.0/15` 的瓦片域名都能访问。这一段在有些网络里是内部服务，放行会削弱对内网的保护。

只建议在开发机上放行。生产环境请用前两种办法。
:::

- 这个开关只影响自定义瓦片。

## 使用条款 {#terms}

- 厂商底图要按各家的条款标注来源。地图右下角已经显示了署名。
- 在中国境内公开展示地图，还要按规定标注审图号。页面上没有审图号，要自己加。
- CARTO 的底图没有内置，因为不带密钥的请求会得到带水印的瓦片。
- 要用 CARTO，把 `basemaps.cartocdn.com` 加进白名单，再填地址和密钥，并自己确认授权范围。

## 后端要访问的域名 {#upstream-hosts}

后端替浏览器去服务商取瓦片，所以后端的出网要放行下面的域名。

| 服务商 | 瓦片域名 | 密钥参数 | 说明 |
| --- | --- | --- | --- |
| 天地图 | `t0.tianditu.gov.cn` 到 `t7.tianditu.gov.cn` | `tk` | 搜索地名用 `api.tianditu.gov.cn` |
| 高德 | `webrd01.is.autonavi.com` 到 `webrd04`，影像和注记用 `webst01` 到 `webst04` | `key` | 搜索地名用 `restapi.amap.com` |
| 百度 | `maponline0.bdimg.com` 到 `maponline3.bdimg.com` | `ak` | 搜索地名用 `api.map.baidu.com` |
| Google | `tile.googleapis.com` | `key` | 先创建会话再取瓦片。搜索地名用 `maps.googleapis.com` |

- 取瓦片时不跟随重定向，单张最大 2MB，只接受 PNG、JPEG、WebP 和 GIF。
- 其他内容按失败处理，见[底图瓦片代理安全](/pc/gis-tile-security)。

## 下一步

<div class="ms-cards">

- [GIS 与地图](/pc/gis) 地图页面怎么用，按米计算有多准。
- [底图瓦片代理安全](/pc/gis-tile-security) 瓦片转发的限流、地址拦截和失败响应。
- [内容安全策略（CSP）](/pc/csp) 页面允许加载哪些来源的资源。

</div>
