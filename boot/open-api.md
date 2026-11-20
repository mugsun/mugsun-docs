# 开放平台

开放平台让别的系统凭自己的凭据调用后端接口，不需要管理后台的登录态。

后端有三种对外凭据。它们各管各的接口，申请的位置也不同：

| 凭据 | 在哪里申请 | 用途 |
| --- | --- | --- |
| OAuth 客户端 | 开放平台 → 客户端管理 | 换取访问令牌，调用 `/open/**` 开放接口 |
| API 密钥（AK/SK） | 开放平台 → API密钥 | 发给对接方的一对密钥，由校验接口核对 |
| AI 密钥（`sk-` 开头） | AI 中心 → 超级密钥 | 调用 `/v1/**` 的 OpenAI 兼容接口 |

![客户端管理页：每个客户端一行，列出授权类型、授权范围和令牌有效期](/screenshots/pc/open-platform-oauth-clients.png)

和第三方系统对接，用第一种。下面从新建客户端开始，一直做到调通一个开放接口。

## 调通第一个开放接口

命令里的 `http://localhost:8080` 是本地后端的地址，请换成你自己的。

<div class="ms-steps">

### 新建客户端

用管理员账号登录管理后台，打开「开放平台 → 客户端管理」，点「新建客户端」：

- 名称：写清楚是给谁用的。
- 授权类型：勾选「客户端凭证」。
- 授权范围：选 `user:read`。

保存后弹出「客户端密钥」窗口。ClientSecret 只显示这一次，复制好再点「我已保存」。

在终端里把 ClientId 和 ClientSecret 存进变量：

```bash
CLIENT_ID='<列表里的 ClientId>'
read -rs CLIENT_SECRET
```

第二行会等你粘贴 ClientSecret，按回车结束。粘贴的内容不会显示出来。

### 取访问令牌

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=client_credentials \
  -d scope=user:read
```

预期响应：

```json
{
  "access_token": "mo_…",
  "token_type": "Bearer",
  "expires_in": 7200,
  "scope": "user:read"
}
```

把 `access_token` 的值存进 `TOKEN`：

```bash
TOKEN='<access_token 的值>'
```

### 带签名调用接口

开放接口默认要验签。先用 ClientSecret 算出签名：

```bash
TS=$(($(date +%s) * 1000))
NONCE=$(openssl rand -hex 16)
SIGN=$(printf 'GET\n/open/user/list\n\n%s\n%s\n' "$TS" "$NONCE" \
  | openssl dgst -sha256 -hmac "$CLIENT_SECRET" | awk '{print $NF}')
```

再带上令牌和三个签名请求头发出请求：

```bash
curl -s http://localhost:8080/open/user/list \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Timestamp: $TS" -H "X-Nonce: $NONCE" -H "X-Sign: $SIGN"
```

返回的 `data` 是这个客户端所在租户的用户，最多 20 个，每项只有 `username` 和 `nickname`。

</div>

把最后一条 `curl` 原样再发一次，会收到 401「重放请求（nonce 已使用）」。

每个请求都要换新的 `TS` 和 `NONCE`，再重算签名。

::: tip 不想敲命令
打开「开放平台 → 接口调试」，填 ClientId 和 ClientSecret，点「获取令牌」，再点「调用接口」。
:::

## 签名校验

每个 `/open/**` 请求都要带三个请求头：

| 请求头 | 内容 |
| --- | --- |
| `X-Timestamp` | 当前时间的毫秒时间戳，和服务器时间相差不能超过 300 秒 |
| `X-Nonce` | 随机字符串，同一个客户端在 600 秒内不能重复使用 |
| `X-Sign` | 签名的十六进制串 |

签名用 HMAC-SHA256 计算，密钥是 ClientSecret，内容是下面六段用换行符连成的签名串：

```text
请求方法，如 GET
请求路径，如 /open/user/list
查询串，如 pageNum=1&pageSize=10
X-Timestamp 的值
X-Nonce 的值
请求体的 SHA-256，十六进制小写
```

容易出错的地方：

- 请求路径是后端收到的路径。反向代理转发时去掉的前缀（如 `/api`）不算在内。
- 查询串按发出时的原样参与签名，不解码、不排序。没有查询串时这一段是空串。
- 没有请求体时最后一段是空串，这时签名串以换行符结尾。
- 请求体的哈希按实际发出的字节计算。先定好请求体，再签名。

带请求体的请求，多算一步请求体的哈希：

```bash
BODY='{"demo":"hello"}'
BODY_HASH=$(printf '%s' "$BODY" | openssl dgst -sha256 | awk '{print $NF}')
TS=$(($(date +%s) * 1000))
NONCE=$(openssl rand -hex 16)
SIGN=$(printf 'POST\n/open/echo\n\n%s\n%s\n%s' "$TS" "$NONCE" "$BODY_HASH" \
  | openssl dgst -sha256 -hmac "$CLIENT_SECRET" | awk '{print $NF}')

curl -s -X POST http://localhost:8080/open/echo \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -H "X-Timestamp: $TS" -H "X-Nonce: $NONCE" -H "X-Sign: $SIGN" \
  -d "$BODY"
```

`/open/echo` 要求 `user:write` 范围，令牌里没有这个范围时返回 403。

管理后台的「接口调试」用的是同一套算法，可以参考 `mugsun-pc` 的 `src/utils/open-api-sign.ts`。

### 关闭验签

`mugsun.open-api.sign-required` 默认为 `true`。设为 `false` 后只校验访问令牌，不再验签，也不再防重放。

生产环境设为 `false` 会拒绝启动，除非同时设置下面这个豁免开关：

```properties
mugsun.open-api.i-understand-unsigned-requests-are-insecure=true
```

开启豁免后每次启动打 WARN 日志。生产环境请保持 `true`。

没配 profile 也按生产处理，见[启动守卫与豁免开关](/boot/configuration#启动守卫与豁免开关)。

## 请求被拒绝时

开放接口按下面的顺序检查，在哪一步不通过就在哪一步返回：

| 检查 | 状态码 | 返回的原因 |
| --- | --- | --- |
| 令牌 | 401 | 令牌无效或已过期 |
| 签名 | 401 | 缺少签名头、时间戳非法、请求已过期或时钟偏差过大、重放请求、签名校验失败 |
| 范围 | 403 | 缺少授权范围，后面跟着接口要求的范围 |
| 租户 | 401 或 403 | 令牌所属的租户已删除、停用或到期 |

「请求已过期或时钟偏差过大」多半是把时间戳写成了秒，或者调用方的时钟不准。

每次调用不论放行还是拒绝，都记在「开放平台 → 调用日志」里，带着客户端、路径和拒绝原因。

## 授权类型

| 授权类型 | `grant_type` | 什么时候用 |
| --- | --- | --- |
| 客户端凭证 | `client_credentials` | 两个系统直接对接，没有具体用户参与 |
| 授权码 | `authorization_code` | 第三方应用要先得到管理后台用户的同意 |
| 刷新令牌 | `refresh_token` | 访问令牌过期后换新的，不用用户再同意一次 |

令牌和授权码的有效期：

- 访问令牌以 `mo_` 开头。有效期在客户端上设置，60 秒到 30 天，默认 7200 秒。
- 刷新令牌以 `mr_` 开头，有效 30 天。每用一次就换发新的，旧的作废。
- 授权码有效 300 秒，只能用一次。
- 客户端凭证模式不发刷新令牌，令牌过期后重新取一个。

取令牌时，客户端的身份可以用 HTTP Basic 传（上面的 `-u`），也可以在表单里传 `client_id` 和 `client_secret`。

申请的 `scope` 必须在客户端的授权范围之内。不传 `scope` 时，令牌带上客户端的全部范围。

出错时返回 OAuth 的标准错误格式，如 `{"error":"invalid_client","error_description":"…"}`。

客户端身份不对时状态码是 401，其余错误是 400。

## 用授权码模式接入

<div class="ms-steps">

### 登记回调地址

新建或编辑客户端时勾选「授权码」，并在「回调地址」里填第三方应用接收授权码的地址。

回调地址要以 `http://` 或 `https://` 开头。授权时传的 `redirect_uri` 必须和它完全一致。

### 把用户带到授权地址

第三方应用先生成一对 PKCE 值。`VERIFIER` 自己留着，`CHALLENGE` 放进授权地址：

```bash
VERIFIER=$(openssl rand -hex 32)
CHALLENGE=$(printf '%s' "$VERIFIER" | openssl dgst -sha256 -binary \
  | openssl base64 -A | tr '+/' '-_' | tr -d '=')
```

授权地址如下。为了好读分了行，实际是一行：

```text
http://localhost:8080/oauth2/authorize
  ?response_type=code
  &client_id=<ClientId>
  &redirect_uri=<回调地址>
  &scope=user:read
  &state=<随机串>
  &code_challenge=<CHALLENGE 的值>
  &code_challenge_method=S256
```

浏览器会被转到管理后台的「授权确认」页。用户登录后点「同意授权」，浏览器带着 `code` 和 `state` 回到回调地址。

用户点「拒绝」时，回调地址收到的是 `error=access_denied`。

### 用授权码换令牌

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=authorization_code \
  -d code="$CODE" \
  --data-urlencode redirect_uri="$REDIRECT_URI" \
  -d code_verifier="$VERIFIER"
```

响应里除了 `access_token`，还有一个 `refresh_token`。

### 用刷新令牌续期

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=refresh_token \
  -d refresh_token="$REFRESH_TOKEN"
```

响应里是新的访问令牌和新的刷新令牌，旧的刷新令牌随即作废。

</div>

几点说明：

- 「授权确认」页的地址取自 `MUGSUN_FRONT_URL`，部署时要设成管理后台的正式地址。
- 授权时带了 `code_challenge`，换令牌时就必须带 `code_verifier`，否则返回 `invalid_grant`。
- 续期要求客户端的授权类型里有 `refresh_token`，开通方法见下一节。

### 给客户端开通刷新令牌 {#enable-refresh}

管理后台的客户端表单里只有「客户端凭证」和「授权码」两个选项。要用刷新令牌，请改用接口新建客户端：

```bash
curl -s -X POST http://localhost:8080/system/oauth-client/save \
  -H "Authorization: $ADMIN_TOKEN" -H 'Content-Type: application/json' \
  -d '{
    "name": "示例第三方应用",
    "grantTypes": "authorization_code,refresh_token",
    "scopes": "user:read",
    "redirectUri": "https://app.example.com/callback"
  }'
```

`ADMIN_TOKEN` 是管理员登录后的请求头，取法见[取得令牌](/boot/tutorial/first-api#取得令牌)。

响应里的 `clientSecret` 同样只返回这一次，请立刻保存。

## 检查和吊销令牌

这两个接口都要带客户端身份，写法和取令牌时一样：

```bash
# 检查：返回 active（是否有效），以及令牌的 scope、client_id 等
curl -s -X POST http://localhost:8080/oauth2/introspect \
  -u "$CLIENT_ID:$CLIENT_SECRET" -d token="$TOKEN"

# 吊销：令牌立即失效，重复吊销也返回 200
curl -s -X POST http://localhost:8080/oauth2/revoke \
  -u "$CLIENT_ID:$CLIENT_SECRET" -d token="$TOKEN"
```

在客户端列表里可以停用或删除客户端，也可以在「更多」里点「重置密钥」。

重置之后，用旧密钥取令牌和签名都会失败，要把新密钥交给对接方。

## 新增开放接口

在后端写一个路径以 `/open/` 开头的接口，用 `@OpenScope` 标出它要求的授权范围：

```java
@RestController
@RequestMapping("/open/order")
public class OpenOrderController {

	private final OrderMapper orderMapper;

	public OpenOrderController(OrderMapper orderMapper) {
		this.orderMapper = orderMapper;
	}

	@GetMapping("/count")
	@OpenScope("order:read")
	public R<Long> count() {
		return R.data(orderMapper.selectCountByQuery(QueryWrapper.create()));
	}
}
```

- 路径在 `/open/` 之下，令牌、签名、范围的检查和调用日志就自动生效，不用再写登录校验。
- 不加 `@OpenScope` 的方法，任何有效令牌都能调用，如自带的 `GET /open/ping`。
- 接口里的查询按令牌所属的租户过滤，和登录后的接口一样，见[多租户](/boot/tenant/)。
- 调用方的 ClientId 可以从请求属性 `oauthClientId` 里取。
- 新的范围名（如 `order:read`）要加进客户端的授权范围，在表单里直接输入即可。

## API 密钥（AK/SK）

API 密钥是一对 AccessKey 和 SecretKey，在「开放平台 → API密钥」里点「生成密钥」得到。

![API 密钥页：每把密钥一行，列出作用域、可调用路径和到期时间](/screenshots/pc/open-platform-api-keys.png)

- AccessKey 以 `AK` 开头。SecretKey 只在生成时显示一次，列表里是打码后的值。
- 作用域：字母开头的名字，多个用英文逗号分隔，如 `read,write`。
- 可调用路径：以 `/` 开头，支持 `*` 和 `**` 通配，多个用英文逗号分隔。留空表示不限制。
- 到期时间：留空表示长期有效。

API 密钥不参与 `/open/**` 的鉴权。后端提供的是一个校验接口，供你自己的服务收到一对密钥时核对：

```bash
curl -s -X POST http://localhost:8080/system/api-key/verify \
  -H "Authorization: $ADMIN_TOKEN" -H 'Content-Type: application/json' \
  -d "{\"accessKey\":\"$AK\",\"secretKey\":\"$SK\",\"path\":\"/open/order/count\"}"
```

返回的 `data` 里，`valid` 表示是否通过，`scope` 是这把密钥的作用域，`message` 是不通过的原因。

- 校验接口要求登录，只能核对登录账号所在租户的密钥。
- 依次检查密钥是否启用、是否过期、路径是否允许、租户是否可用、SecretKey 是否正确。
- 每次校验都记一条调用记录，在列表右侧的「调用记录」里查看。

## AI 密钥

AI 密钥以 `sk-` 开头，在「AI 中心 → 超级密钥」里创建，用来调用 OpenAI 兼容接口：

| 接口 | 作用 |
| --- | --- |
| `GET /v1/models` | 列出已启用的对话模型 |
| `POST /v1/chat/completions` | 对话补全，一次返回完整结果 |

```bash
read -rs AI_KEY
curl -s http://localhost:8080/v1/chat/completions \
  -H "Authorization: Bearer $AI_KEY" -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"你好"}]}'
```

- `model` 填 `GET /v1/models` 返回的 `id`。不填或对不上时，用默认的对话模型。
- 不支持 `"stream": true`，带上会返回错误。
- 每次调用计入租户的配额，并在「AI 中心 → 账单记录」里留一条记录。
- 密钥无效、停用、过期，或来源地址不在白名单内，都返回「无效的 API Key」。

这组接口属于 AI 模块，模块停用时不可用，见[选择要用的模块](/guide/architecture#模块装配-两层开关)。

### IP 白名单

每把 AI 密钥可以在「允许 IP」里限制来源地址，多个值用逗号、分号或空白分隔：

| 写法 | 含义 |
| --- | --- |
| 留空 | 不限制来源 |
| `*` | 不限制来源 |
| `203.0.113.10` | 单个 IPv4 |
| `10.0.0.0/8` | IPv4 CIDR 网段 |
| `2001:db8::/32` | IPv6 CIDR 网段 |
| `0.0.0.0/0` | 任意 **IPv4**（不含 IPv6；IPv6 用 `::/0`，都放行用 `*`） |
| `10.1.2.*` / `10.1.*` / `10.*` | 旧通配写法，自动按 `/24`、`/16`、`/8` 处理 |

- 按 CIDR 网段匹配，IPv4 和 IPv6 都支持。
- 只接受字面量 IP，不解析域名。
- 写法不合法的条目（如 `10.*.1.1`）会被忽略，并记一条告警日志。

### 限流

每把 AI 密钥可以设「限流/分钟」，即每个自然分钟内最多调用多少次。留空或填 0 表示不限。

超过后返回「请求过于频繁，请稍后重试」，到下一分钟恢复。

计数保存在后端进程的内存里。部署了多个后端实例时，每个实例各算各的。

## 客户端 IP 与可信代理

后端默认只认 TCP 连接的对端地址（`remoteAddr`），不看 `X-Forwarded-For`，调用方没法伪造来源绕过白名单。

部署在反向代理或负载均衡之后时，必须把代理的地址加进可信列表。

否则所有请求的来源都是代理的地址，白名单要么把请求全部拒绝，要么形同虚设。

```bash
# CIDR 列表，逗号分隔；只写反向代理自己的地址（单个代理用 /32），不要放行整段内网
MUGSUN_OPENAPI_TRUSTED_PROXIES=172.30.88.10/32,::1/128
```

对应的配置键是 `mugsun.openapi.trusted-proxies`。解析规则：

- `remoteAddr` 在可信列表内：从 `X-Forwarded-For` 的右边往左找，取第一个不在列表内的地址。
- `remoteAddr` 不在可信列表内：直接用 `remoteAddr`，忽略转发头。
- `X-Forwarded-For` 为空：用 `remoteAddr`。
- 往左找的途中遇到非法值：停止，回退为 `remoteAddr`。
- `X-Real-IP` 不被信任。

::: warning
不要把 `0.0.0.0/0` 之类的宽网段配成可信代理，否则等同于重新信任任意 `X-Forwarded-For`。
:::

AI 密钥的白名单和账单、API 密钥的调用记录都用这套规则。

「开放平台 → 调用日志」不用这套规则，记的是直接连到后端的地址。

## 下一步

<div class="ms-cards">

- [安全清单](/boot/security-checklist) 上线前逐项核对，含可信代理和验签开关。
- [配置参考](/boot/configuration) 本页提到的配置项和环境变量。
- [权限与附件](/boot/permissions) 管理后台自己的接口怎样控制权限。

</div>
