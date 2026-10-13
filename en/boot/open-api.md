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

Since 2026-10-13, matching uses real CIDR prefixes for IPv4 and IPv6 rather than string prefixes.

## Client IP and trusted proxies

By default only the TCP peer address (`remoteAddr`) is used and `X-Forwarded-For` is ignored, so callers can't spoof their origin to get past the allowlist.

If boot sits behind a reverse proxy or load balancer, add the proxy addresses to the trusted list as comma-separated CIDRs:

```bash
MUGSUN_OPENAPI_TRUSTED_PROXIES=10.0.0.0/8,::1/128
```

The matching key is `mugsun.openapi.trusted-proxies`. Only when `remoteAddr` falls inside the list does boot read `X-Forwarded-For`, taking the first address **from the right** that isn't itself a trusted proxy. API call logs use the same rule.

::: warning
Don't add broad ranges such as `0.0.0.0/0` as trusted proxies. That is the same as trusting any `X-Forwarded-For` header again.
:::

## Rate limiting

Requests are rate-limited per API key over a sliding one-minute window; requests over the limit are rejected.

## Next

[Configuration](/en/boot/configuration) · [Security checklist](/en/boot/security-checklist)
