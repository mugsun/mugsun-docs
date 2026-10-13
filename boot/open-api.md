# 开放平台

boot 的开放平台提供 OAuth2（含 PKCE）与 API Key 两种接入方式。本页说明 API Key 调用的网关防护：IP 白名单、客户端 IP 识别与限流。

## IP 白名单

每个 API Key 可配置允许的来源地址（`allowIps`），多个值用逗号、分号或空白分隔：

| 写法 | 含义 |
| --- | --- |
| 留空 | 不限制来源 |
| `*` | 不限制来源 |
| `203.0.113.10` | 单个 IPv4 |
| `10.0.0.0/8` | IPv4 CIDR 网段 |
| `2001:db8::/32` | IPv6 CIDR 网段 |

自 2026-10-13 起使用真正的 CIDR 前缀匹配（IPv4 / IPv6），不再按字符串前缀判断。

## 客户端 IP 与可信代理

默认**只使用 TCP 连接的对端地址**（`remoteAddr`），忽略 `X-Forwarded-For`，防止调用方伪造来源绕过白名单。

部署在反向代理或负载均衡之后时，把代理地址加入可信列表：

```bash
# CIDR 列表，逗号分隔
MUGSUN_OPENAPI_TRUSTED_PROXIES=10.0.0.0/8,::1/128
```

对应配置键 `mugsun.openapi.trusted-proxies`。只有当 `remoteAddr` 落在列表内时，才从 `X-Forwarded-For` **从右往左**取第一个不在列表内的地址作为客户端 IP。接口调用记录使用同一套规则。

::: warning
不要把 `0.0.0.0/0` 之类的宽网段配成可信代理，否则等同于重新信任任意 `X-Forwarded-For`。
:::

## 限流

按 API Key 维度做滑动分钟窗口限流，超限请求被拒绝。

## 下一步

[配置参考](/boot/configuration) · [安全清单](/boot/security-checklist)
