# Open API

boot's open platform supports OAuth2 (with PKCE) and API keys. This page covers the gateway protections for API-key calls: IP allowlists, client IP resolution and rate limiting.

## IP allowlist

Each API key can restrict where calls come from (`allowIps`). Separate multiple entries with commas, semicolons or whitespace:

| Entry | Meaning |
| --- | --- |
| empty | No restriction |
| `*` | No restriction |
| `203.0.113.10` | A single IPv4 address |
| `10.0.0.0/8` | An IPv4 CIDR range |
| `2001:db8::/32` | An IPv6 CIDR range |
| `0.0.0.0/0` | Any **IPv4** address (not IPv6; use `::/0` for IPv6, or `*` for both) |
| `10.1.2.*` / `10.1.*` / `10.*` | Legacy wildcard entries, treated as `/24`, `/16` and `/8` |

Since 2026-10-13, matching uses real CIDR prefixes for IPv4 and IPv6 rather than string prefixes (so `10.1.1.1` no longer wrongly matches `10.1.11.0/24`). Saved legacy entries like `a.b.c.*` keep working without a migration. Entries with a wildcard in the middle (such as `10.*.1.1`) or otherwise invalid entries are ignored and logged as a warning. Only literal IPs are accepted; hostnames are not resolved.

## Client IP and trusted proxies

By default only the TCP peer address (`remoteAddr`) is used and `X-Forwarded-For` is ignored, so callers can't spoof their origin to get past the allowlist.

If boot sits behind a reverse proxy or load balancer, you **must** add the proxy addresses to the trusted list as comma-separated CIDRs. Otherwise every request appears to come from the proxy, and IP allowlists on API keys either reject every request or no longer have any effect:

```bash
# Only your reverse proxy's own address (/32 for a single proxy); don't trust a whole private range
MUGSUN_OPENAPI_TRUSTED_PROXIES=172.30.88.10/32,::1/128
```

The matching key is `mugsun.openapi.trusted-proxies`. Only when `remoteAddr` falls inside the list does boot read `X-Forwarded-For`, taking the first address **from the right** that isn't itself a trusted proxy. API call logs use the same rule. In detail:

- `remoteAddr` not in the trusted list: `remoteAddr` is used and forwarding headers are ignored.
- Empty `X-Forwarded-For`: `remoteAddr` is used.
- An invalid value while walking from the right: the walk stops and `remoteAddr` is used.
- `X-Real-IP` is never trusted.

::: warning
Don't add broad ranges such as `0.0.0.0/0` as trusted proxies. That is the same as trusting any `X-Forwarded-For` header again.
:::

## Signature check

`mugsun.open-api.sign-required` defaults to `true`, and Open API requests must carry valid `X-Timestamp`, `X-Nonce` and `X-Sign` headers.

When it is `false`, only the access token or API key is checked; signatures are not verified and replays are not blocked. In production, `false` stops startup unless `mugsun.open-api.i-understand-unsigned-requests-are-insecure=true` is also set, which logs a WARN on every start. No profile at all also counts as production; see [Startup guards and exemption switches](/en/boot/configuration#startup-guards-and-exemption-switches). Keep it `true` in production.

## Rate limiting

Requests are rate-limited per API key over a sliding one-minute window; requests over the limit are rejected.

## Next

[Configuration](/en/boot/configuration) · [Security checklist](/en/boot/security-checklist)
