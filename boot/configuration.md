# 配置参考

boot 采用 Spring Boot 标准配置：`application.yml` 给默认值，`application-prod.yml` 覆盖生产，本地覆盖写在 `config/application-local.yml`（已 gitignore，工作目录须为仓库根目录）。下表列出最常用的环境变量，完整键名以 `mugsun-boot-core/src/main/resources/application*.yml` 为准。

## 本地开发

```bash
cp config/application-local.yml.example config/application-local.yml
```

`config/application-local.yml` 最后加载，能覆盖 `application.yml` 和各模块自带配置（`mugsun-module-track.yml` 等）里的任意键，例如埋点库地址 `mybatis-flex.datasource.track.url`。[mugsun-boot #29](https://github.com/mugsun/mugsun-boot/pull/29) 之前它排在模块配置前面，模块键写在这里不生效，只能用环境变量（如 `TRACK_JDBC_URL`）覆盖；升级后原先被忽略的这些键会开始生效，请检查文件里是否留有旧值。

示例文件已带本地密钥占位（`sm4-key`、`api-key`）与 mock 社交登录。SM2 密钥对留空时每次启动临时生成，登录可能因密钥变化失败，建议填入固定的本地密钥对。

## 数据源与缓存（prod）

| 变量 | 说明 |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | 主库连接 |
| `REDIS_HOST` / `REDIS_PORT`（默认 6379）/ `REDIS_PASSWORD` / `REDIS_DB`（prod 默认 0） | Redis |
| `FILE_STORAGE_PATH`（默认 `/var/lib/mugsun/files/`）/ `FILE_DOMAIN` | 本地文件存储与访问域名 |
| `MUGSUN_FRONT_URL` | 管理端 origin，用于 OAuth 回跳等；开发默认 `http://localhost:3006`，prod 必填 |

## 安全与密钥

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | 初始管理员口令。prod 未注入或仍为内置默认口令时拒绝启动 |
| `MUGSUN_GM_ENABLED` | `true` | 国密总开关（传输 SM2 / 摘要 SM3） |
| `MUGSUN_SM4_KEY` | 空 | SM4 字段加密密钥 |
| `MUGSUN_API_KEY` | 空 | 接口加解密 SM4 密钥 |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | 空 | SM2 传输密钥对（hex）；留空启动时生成并告警 |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | 空 | 审计签名密钥对，与传输密钥分离 |
| `MUGSUN_STRICT_KEYS` | `false`（prod 为 `true`） | 为 `true` 时任一密钥缺失即拒绝启动 |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | 空 | 可信反向代理 CIDR 列表，见 [开放平台](/boot/open-api#客户端-ip-与可信代理) |
| `MUGSUN_FILE_SIGN_SECRET` | 空 | 本地文件下载链接的签名密钥（至少 32 个字符），见下方「本地文件访问」 |

## 本地文件访问

开发环境（默认配置）下，本地存储的文件由应用在 `/file/**` 下直接提供。为避免私有附件被人拿着地址匿名下载：

- `mugsun/public/` 下的公开文件（如头像）仍可匿名访问。
- 其余文件必须带短时签名才能下载。登录后调用 `GET /system/file/download/{id}` 会返回一个带 `e`（过期时间）和 `s`（签名）参数的地址，默认 300 秒内有效；没有签名、签名不对或过期的请求一律返回 404。

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # 匿名可访问的路径前缀
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

`sign-secret` 留空时每次启动随机生成，只适合单实例；多实例部署必须给所有实例配置同一个值，否则一个实例签发的地址在另一个实例上会 404。`prod` profile 默认关闭 `/file/**` 直出，私有附件走授权下载接口，不受此项影响；如果在 `prod` 下手动开启直出，必须配置至少 32 个字符的 `sign-secret`，留空或过短都会拒绝启动。

直出的文件都带 `X-Content-Type-Options: nosniff`。HTML、SVG 等浏览器可能执行的类型以及 PDF 一律作为附件下载，不在浏览器里直接打开；HTML、SVG 等还会附加 `Content-Security-Policy: sandbox`。

## 可选模块

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS 模块 |
| `MUGSUN_TRACK_ENABLED` | `true` | 埋点模块 |
| `MUGSUN_AI_ENABLED` | `true` | AI 模块 |
| `POWERJOB_ENABLED` | `false` | PowerJob Worker；启用须独立部署 Server 并设置 `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / 空 | IP 归属地解析 |

## AI 出站白名单

模型调用（对话、流式对话、向量）、知识库抓取、渠道 Webhook、MCP 远程调用和工作流 HTTP 节点在发起请求前统一做 SSRF 校验，默认拒绝内网、回环与云元数据地址。需要访问内网服务（如本地模型服务、内网 MCP）时显式放行：

```yaml
mugsun:
  ai:
    outbound:
      # 精确主机或 *.example.com 通配；命中即允许解析到内网地址
      allow-hosts: [localhost, ollama.internal]
      # 非白名单主机允许的端口；默认只放 80/443，[] 表示不限
      allowed-ports: [80, 443]
```

示例：本地 Ollama 默认监听 `http://localhost:11434`，把 `localhost` 加入 `allow-hosts` 后，模型管理、知识库、渠道中填写该地址才能保存和调用。`allow-hosts` 只能在平台配置文件里设置，租户无法自行放行内网地址；升级前已保存为内网地址的模型，在加入白名单之前调用会失败。

- 校验在保存配置（包括模型的接口地址）时和每个请求发出前各做一次，IP 直接写在地址里的也会被拦；只允许 `http` / `https`。
- 非白名单主机默认只能访问 80 和 443 端口，其它端口用 `allowed-ports` 放开；白名单主机不限端口。
- 建立连接时会再解析一次域名并逐个检查地址，然后直接连接检查过的那个地址。域名在检查之后才改指向内网（DNS rebinding）也连不上；只要解析结果里有一个地址落在禁止网段，整个请求就会被拒绝。
- 禁止网段包括私网、回环、链路本地、CGNAT（含云厂商元数据地址）、组播、保留与文档示例地址，IPv6 同样适用（含 `2001:db8::/32` 和 Teredo `2001::/32`），也包括内嵌这些 IPv4 地址的 IPv4-mapped、NAT64、6to4 地址。工作流 HTTP 节点不读 `allow-hosts`，一律禁止内网。
- 不会自动跟随重定向：对方返回 3xx 时请求就此结束，不会再去请求 `Location` 指向的地址。Webhook、MCP 或模型地址如果会跳转，请直接填写跳转后的最终地址。
- 默认 `allow-hosts: []`，即不放行任何内网地址；未命中白名单的公网主机不受影响。
- `*.example.com` 匹配其任意子域名，不含 `example.com` 本身；`.local`、`.internal` 结尾的主机默认拒绝，需显式列出。只列确需访问的主机。

## 生产环境

`prod` profile 会关闭 OpenAPI 文档（springdoc / swagger-ui）、强制 `strict-keys: true`、关闭 mock 社交登录。最小启动示例：

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=****** MUGSUN_API_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

上线前逐项过一遍 [安全清单](/boot/security-checklist)。
