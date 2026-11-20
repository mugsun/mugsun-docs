# Open API

The open platform lets other systems call the backend with their own credentials, without an admin console session.

The backend has three kinds of external credentials. Each one guards its own endpoints and is issued in a different place:

| Credential | Where to get it | What it is for |
| --- | --- | --- |
| OAuth client | Open Platform → OAuth Clients | Get access tokens and call the `/open/**` endpoints |
| API key (AK/SK) | Open Platform → API Keys | A key pair you hand to a partner and check with the verify endpoint |
| AI key (starts with `sk-`) | AI Center → API keys | Call the OpenAI-compatible `/v1/**` endpoints |

![The OAuth Clients page: one row per client with its grant types, scopes and token lifetime](/screenshots/pc/open-platform-oauth-clients.png)

Use the first one to integrate a third-party system. The steps below go from creating a client to a working call.

## Make your first Open API call

The commands use `http://localhost:8080`, the local backend address. Replace it with your own.

<div class="ms-steps">

### Create a client

Sign in to the admin console as an administrator, open Open Platform → OAuth Clients and click New Client:

- Name: say who the client is for.
- Grant Types: check Client Credentials.
- Scopes: pick `user:read`.

After you save, the Client Secret window opens. The ClientSecret is shown only this once, so copy it before you click I Have Saved It.

Store the ClientId and ClientSecret in shell variables:

```bash
CLIENT_ID='<the ClientId from the list>'
read -rs CLIENT_SECRET
```

The second line waits for you to paste the ClientSecret and press Enter. What you paste is not echoed.

### Get an access token

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=client_credentials \
  -d scope=user:read
```

Expected response:

```json
{
  "access_token": "mo_…",
  "token_type": "Bearer",
  "expires_in": 7200,
  "scope": "user:read"
}
```

Store the value of `access_token` in `TOKEN`:

```bash
TOKEN='<the access_token value>'
```

### Call an endpoint with a signature

Open API endpoints check a signature by default. Compute it with the ClientSecret first:

```bash
TS=$(($(date +%s) * 1000))
NONCE=$(openssl rand -hex 16)
SIGN=$(printf 'GET\n/open/user/list\n\n%s\n%s\n' "$TS" "$NONCE" \
  | openssl dgst -sha256 -hmac "$CLIENT_SECRET" | awk '{print $NF}')
```

Then send the request with the token and the three signature headers:

```bash
curl -s http://localhost:8080/open/user/list \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Timestamp: $TS" -H "X-Nonce: $NONCE" -H "X-Sign: $SIGN"
```

`data` in the response lists up to 20 users of the client's tenant, each with only `username` and `nickname`.

</div>

Send the last `curl` again unchanged and you get a 401 saying the request is a replay (the nonce was already used).

Every request needs a fresh `TS` and `NONCE`, and a signature computed from them.

::: tip Prefer clicking
Open Open Platform → API Debugging, fill in the ClientId and ClientSecret, click Get Token, then Call API.
:::

## Signature check

Every `/open/**` request carries three headers:

| Header | Value |
| --- | --- |
| `X-Timestamp` | Current time in milliseconds. It may differ from the server clock by at most 300 seconds |
| `X-Nonce` | A random string. One client cannot reuse it within 600 seconds |
| `X-Sign` | The signature as a hex string |

The signature is HMAC-SHA256 with the ClientSecret as the key. The message is the six parts below joined with newline characters:

```text
HTTP method, e.g. GET
Request path, e.g. /open/user/list
Query string, e.g. pageNum=1&pageSize=10
The X-Timestamp value
The X-Nonce value
SHA-256 of the request body, lower-case hex
```

Where it usually goes wrong:

- The request path is the path the backend receives. A prefix that your reverse proxy strips (such as `/api`) is not part of it.
- The query string is signed exactly as sent: not decoded, not sorted. Without a query string this part is empty.
- Without a request body the last part is empty, so the message ends with a newline.
- The body hash covers the bytes you actually send. Fix the body first, then sign.

For a request with a body, hash the body first:

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

`/open/echo` requires the `user:write` scope. A token without that scope gets a 403.

API Debugging in the admin console uses the same algorithm. See `src/utils/open-api-sign.ts` in `mugsun-pc` for reference.

### Turn off signature checks

`mugsun.open-api.sign-required` defaults to `true`. When it is `false`, only the access token is checked: signatures are not verified and replays are not blocked.

In production, `false` stops startup unless you also set this exemption switch:

```properties
mugsun.open-api.i-understand-unsigned-requests-are-insecure=true
```

With the exemption on, every start logs a WARN. Keep the setting `true` in production.

No profile at all also counts as production; see [Startup guards and exemption switches](/en/boot/configuration#startup-guards-and-exemption-switches).

## When a request is rejected

Open API endpoints run these checks in order and return at the first one that fails:

| Check | Status | Reason returned |
| --- | --- | --- |
| Access token | 401 | The token is invalid or has expired |
| Signature | 401 | Missing signature headers, invalid timestamp, expired request or clock skew, replayed request, or signature mismatch |
| Scope | 403 | A scope is missing, followed by the scope the endpoint requires |
| Tenant status | 401 or 403 | The token's tenant was deleted, disabled or has expired |

The reason text itself is in Chinese.

An expired-request error usually means the timestamp is in seconds rather than milliseconds, or the caller's clock is off.

Every call, allowed or denied, is recorded under Open Platform → Call Logs with the client, the path and the reason.

## Grant types

| Grant type | `grant_type` | When to use it |
| --- | --- | --- |
| Client Credentials | `client_credentials` | Two systems talk directly and no user is involved |
| Authorization Code | `authorization_code` | A third-party app needs an admin console user's consent first |
| Refresh token | `refresh_token` | Replace an expired access token without asking the user again |

Lifetimes of tokens and codes:

- Access tokens start with `mo_`. The lifetime is set on the client, from 60 seconds to 30 days, 7200 seconds by default.
- Refresh tokens start with `mr_` and last 30 days. Each use issues a new one and invalidates the old one.
- Authorization codes last 300 seconds and work once.
- The client credentials grant issues no refresh token. Request a new token when the old one expires.

At the token endpoint the client can identify itself with HTTP Basic (the `-u` above) or with `client_id` and `client_secret` form fields.

The requested `scope` must be within the client's scopes. Without `scope`, the token gets all of the client's scopes.

Errors use the standard OAuth format, such as `{"error":"invalid_client","error_description":"…"}`.

A wrong client identity returns 401; other errors return 400.

## Use the authorization code flow

<div class="ms-steps">

### Register a redirect URI

When you create or edit the client, check Authorization Code and put the address where the third-party app receives the code in Redirect URI.

The redirect URI must start with `http://` or `https://`. The `redirect_uri` sent during authorization must match it exactly.

### Send the user to the authorize URL

The third-party app first generates a PKCE pair. It keeps `VERIFIER` and puts `CHALLENGE` in the authorize URL:

```bash
VERIFIER=$(openssl rand -hex 32)
CHALLENGE=$(printf '%s' "$VERIFIER" | openssl dgst -sha256 -binary \
  | openssl base64 -A | tr '+/' '-_' | tr -d '=')
```

The authorize URL looks like this. It is wrapped here for reading; the real URL is one line:

```text
http://localhost:8080/oauth2/authorize
  ?response_type=code
  &client_id=<ClientId>
  &redirect_uri=<redirect URI>
  &scope=user:read
  &state=<random string>
  &code_challenge=<the CHALLENGE value>
  &code_challenge_method=S256
```

The browser is sent to the Authorization Confirmation page of the admin console. After signing in, the user clicks Approve and the browser returns to the redirect URI with `code` and `state`.

If the user clicks Deny, the redirect URI receives `error=access_denied`.

### Exchange the code for tokens

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=authorization_code \
  -d code="$CODE" \
  --data-urlencode redirect_uri="$REDIRECT_URI" \
  -d code_verifier="$VERIFIER"
```

Besides `access_token`, the response contains a `refresh_token`.

### Renew with the refresh token

```bash
curl -s -X POST http://localhost:8080/oauth2/token \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d grant_type=refresh_token \
  -d refresh_token="$REFRESH_TOKEN"
```

The response holds a new access token and a new refresh token. The old refresh token stops working at once.

</div>

Notes:

- The address of the Authorization Confirmation page comes from `MUGSUN_FRONT_URL`. Set it to the real admin console address when you deploy.
- If authorization carried a `code_challenge`, the token request must carry `code_verifier`, or it fails with `invalid_grant`.
- Renewal needs `refresh_token` among the client's grant types. The next section shows how to enable it.

### Enable refresh tokens for a client {#enable-refresh}

The client form in the admin console only offers Client Credentials and Authorization Code. To use refresh tokens, create the client through the API instead:

```bash
curl -s -X POST http://localhost:8080/system/oauth-client/save \
  -H "Authorization: $ADMIN_TOKEN" -H 'Content-Type: application/json' \
  -d '{
    "name": "Sample third-party app",
    "grantTypes": "authorization_code,refresh_token",
    "scopes": "user:read",
    "redirectUri": "https://app.example.com/callback"
  }'
```

`ADMIN_TOKEN` is the request header of a signed-in administrator; see [Get a token](/en/boot/tutorial/first-api#get-a-token).

The `clientSecret` in the response is also returned only this once, so save it right away.

## Check and revoke tokens

Both endpoints need the client identity, sent the same way as at the token endpoint:

```bash
# Check: returns active (valid or not) plus the token's scope, client_id and more
curl -s -X POST http://localhost:8080/oauth2/introspect \
  -u "$CLIENT_ID:$CLIENT_SECRET" -d token="$TOKEN"

# Revoke: the token stops working at once; revoking again still returns 200
curl -s -X POST http://localhost:8080/oauth2/revoke \
  -u "$CLIENT_ID:$CLIENT_SECRET" -d token="$TOKEN"
```

In the client list you can disable or delete a client, or click Reset Secret under More.

After a reset, getting tokens and signing with the old secret both fail, so hand the new secret to your partner.

## Add an Open API endpoint

Write a backend endpoint whose path starts with `/open/` and mark the scope it requires with `@OpenScope`:

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

- Under `/open/`, the token, signature and scope checks and the call log apply automatically. You don't write a login check.
- A method without `@OpenScope` can be called with any valid token, like the built-in `GET /open/ping`.
- Queries in the endpoint are filtered by the token's tenant, the same as for signed-in endpoints; see [Multi-tenancy](/en/boot/tenant/).
- The caller's ClientId is available in the request attribute `oauthClientId`.
- Add a new scope name (such as `order:read`) to the client's scopes. You can type it straight into the form.

## API keys (AK/SK)

An API key is an AccessKey and SecretKey pair. Click Generate Key under Open Platform → API Keys to get one.

![The API Keys page: one row per key with its scope, allowed paths and expiry](/screenshots/pc/open-platform-api-keys.png)

- The AccessKey starts with `AK`. The SecretKey is shown once when generated; the list shows a masked value.
- Scope: names that start with a letter, separated by commas, such as `read,write`.
- Allowed paths: start with `/`, may use `*` and `**` wildcards, separated by commas. Empty means no restriction.
- Expires: empty means the key never expires.

API keys take no part in `/open/**` authentication. What the backend offers is a verify endpoint, for your own service to check a key pair it receives:

```bash
curl -s -X POST http://localhost:8080/system/api-key/verify \
  -H "Authorization: $ADMIN_TOKEN" -H 'Content-Type: application/json' \
  -d "{\"accessKey\":\"$AK\",\"secretKey\":\"$SK\",\"path\":\"/open/order/count\"}"
```

In `data`, `valid` says whether the pair passed, `scope` is the key's scope and `message` is the reason when it did not.

- The verify endpoint requires a signed-in session and only checks keys of the signed-in account's tenant.
- It checks, in order, that the key is enabled, not expired, allowed for the path, in a usable tenant, and that the SecretKey matches.
- Every check writes a call record. See it under Call log on the right of the list.

## AI keys

AI keys start with `sk-`. Create them under AI Center → API keys and use them to call the OpenAI-compatible endpoints:

| Endpoint | What it does |
| --- | --- |
| `GET /v1/models` | Lists the enabled chat models |
| `POST /v1/chat/completions` | Chat completion, returned in one response |

```bash
read -rs AI_KEY
curl -s http://localhost:8080/v1/chat/completions \
  -H "Authorization: Bearer $AI_KEY" -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

- Set `model` to an `id` returned by `GET /v1/models`. If it is missing or doesn't match, the default chat model is used.
- `"stream": true` is not supported and returns an error.
- Every call counts against the tenant's quota and leaves a record under AI Center → Billing.
- An invalid, disabled or expired key, or a source address outside the allowlist, all return the same invalid-key error.

These endpoints belong to the AI module and are unavailable when the module is off; see [Choose the modules you need](/en/guide/architecture#two-layers-of-module-switches).

### IP allowlist

Each AI key can restrict where calls come from in Allowed IPs. Separate multiple entries with commas, semicolons or whitespace:

| Entry | Meaning |
| --- | --- |
| empty | No restriction |
| `*` | No restriction |
| `203.0.113.10` | A single IPv4 address |
| `10.0.0.0/8` | An IPv4 CIDR range |
| `2001:db8::/32` | An IPv6 CIDR range |
| `0.0.0.0/0` | Any **IPv4** address (not IPv6; use `::/0` for IPv6, or `*` for both) |
| `10.1.2.*` / `10.1.*` / `10.*` | Legacy wildcard entries, treated as `/24`, `/16` and `/8` |

- Matching uses CIDR ranges, for both IPv4 and IPv6.
- Only literal IPs are accepted; hostnames are not resolved.
- Invalid entries (such as `10.*.1.1`) are ignored and logged as a warning.

### Rate limit

Each AI key can set Rate limit / min: the most calls allowed in one calendar minute. Empty or 0 means no limit.

Calls over the limit get a too-many-requests error until the next minute starts.

The counter lives in the memory of the backend process. With several backend instances, each one counts on its own.

## Client IP and trusted proxies

By default the backend only uses the TCP peer address (`remoteAddr`) and ignores `X-Forwarded-For`, so callers can't spoof their origin to get past the allowlist.

If the backend sits behind a reverse proxy or load balancer, you must add the proxy addresses to the trusted list as comma-separated CIDRs.

Otherwise every request appears to come from the proxy, and allowlists either reject everything or no longer mean anything.

```bash
# Only your reverse proxy's own address (/32 for a single proxy); don't trust a whole private range
MUGSUN_OPENAPI_TRUSTED_PROXIES=172.30.88.10/32,::1/128
```

The matching key is `mugsun.openapi.trusted-proxies`. The rules:

- `remoteAddr` in the trusted list: walk `X-Forwarded-For` from the right and take the first address that is not in the list.
- `remoteAddr` not in the trusted list: `remoteAddr` is used and forwarding headers are ignored.
- Empty `X-Forwarded-For`: `remoteAddr` is used.
- An invalid value during the walk: the walk stops and `remoteAddr` is used.
- `X-Real-IP` is never trusted.

::: warning Note
Don't add broad ranges such as `0.0.0.0/0` as trusted proxies. That is the same as trusting any `X-Forwarded-For` header again.
:::

AI key allowlists and billing records, and API key call records, all use these rules.

Open Platform → Call Logs does not: it records the address that connects to the backend directly.

## Next steps

<div class="ms-cards">

- [Security checklist](/en/boot/security-checklist) Go through it before launch, including trusted proxies and the signature switch.
- [Configuration](/en/boot/configuration) The settings and environment variables mentioned on this page.
- [Permissions & attachments](/en/boot/permissions) How the admin console's own endpoints are protected.

</div>
