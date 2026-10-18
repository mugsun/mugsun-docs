# 底图瓦片代理安全

`/system/gis/tile/**` 是同源瓦片反代：厂商密钥不会进浏览器。代理默认开启以下防护。

## 限流

按登录用户、按客户端 IP 各自计数，窗口为 1 分钟。超过上限返回 `429 Too Many Requests`，并带 `Retry-After`（秒）。

```yaml
mugsun:
  gis:
    tile:
      rate-limit-per-user: ${MUGSUN_GIS_TILE_RATE_PER_USER:1200}  # 0 = 不限
      rate-limit-per-ip: ${MUGSUN_GIS_TILE_RATE_PER_IP:2400}      # 0 = 不限
```

一屏瓦片通常几十张，默认值对正常浏览足够。如果大量用户经同一出口 IP 访问，可以调大 `rate-limit-per-ip`。

## 只放行图片

上游响应只有 png、jpeg、webp、gif 四种会原样返回，而且 `Content-Type` 必须和文件头一致。svg、html 和类型对不上的内容一律返回 `502`（原因 `bad-content-type`）。所有瓦片响应都带 `X-Content-Type-Options: nosniff`。

## 不跟随重定向

天地图、高德、百度、Google 四家厂商接口（瓦片、检索、逆地理，以及 Google 的 session 请求）和自定义 XYZ 底图都**不跟随 3xx 重定向**，重定向按失败处理（返回 `502`，原因 `upstream-status`），避免被引到白名单以外的地址。

## 地址段拦截（自定义 XYZ）

自定义 XYZ 底图除了拦截内网、回环、链路本地等地址，还默认拦截下面三段。每段都可以单独放行：

| 地址段 | 用途 | 放行开关（默认 false） |
| --- | --- | --- |
| `198.18.0.0/15` | 基准测试网段；fake-ip 代理也用它 | `mugsun.gis.xyz.allow-benchmark-net` |
| `64:ff9b::/96` | NAT64 | `mugsun.gis.xyz.allow-nat64` |
| `2002::/16` | 6to4 | `mugsun.gis.xyz.allow-6to4` |

NAT64 和 6to4 放行后，地址中内嵌的 IPv4 仍按 IPv4 规则检查：内嵌内网或回环地址照样拦截。

::: tip fake-ip 代理环境
如果机器上开了 fake-ip 模式的代理（公网域名被解析成 `198.18.x.x`），自定义 XYZ 瓦片会全部返回 `403`（原因 `blocked-address`），地图上会提示底图没有加载出来。处理办法（关闭 fake-ip、瓦片域名直连，或开启 `allow-benchmark-net` 及其风险）见 [底图配置 · 排障](./gis-basemap#troubleshooting)。
:::

## 失败响应与日志 {#failure-responses}

瓦片代理取图失败时不会返回 200 加透明图，而是返回错误码和原因头 `X-Mugsun-Tile-Error`。响应正文为空，并带 `Cache-Control: no-store`：

| 原因代码 | 状态码 | 是否打 WARN |
| --- | --- | --- |
| `upstream-status`、`bad-content-type`、`too-large`、`upstream-unreachable`、`bad-template` | 502 | 是 |
| `timeout` | 504 | 是 |
| `blocked-address`、`host-not-allowed` | 403 | 是 |
| `not-configured`、`disabled`、`out-of-range` | 404 | 否 |

WARN 日志按「域名 + 原因」限频，每 60 秒最多一条，并带上期间被抑制的次数。日志只记服务商、域名、原因、上游状态码和缩放级别，不记 URL、查询串和密钥。管理台据此在地图上提示瓦片加载失败，见 [底图配置 · 排障](./gis-basemap#troubleshooting)。
