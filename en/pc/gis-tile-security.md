# Tile proxy security

Every basemap tile the browser asks for is relayed by the backend through `/system/gis/tile/**`, which requires sign-in. Vendor keys therefore never reach the browser.

This page lists the protections applied by default during the relay, and what is returned on failure.

## Protections at a glance

| Protection | What it does | Adjustable |
| --- | --- | --- |
| Rate limit | Limits tiles per minute by user and by IP | Yes, see [Rate limit](#rate-limit) |
| Images only | Only four image formats are passed back to the browser | No |
| No redirects | A 3xx from the provider counts as a failure | No |
| Host check | Vendor basemaps only reach the vendor's hosts, and custom tiles only reach hosts on the allow-list | The allow-list can be changed, see [Basemaps and allow-list](/en/pc/gis-basemap#allow-list) |
| Blocked ranges | Custom tile hosts that resolve to internal addresses are rejected | Three special ranges can be allowed |
| Size and timeout | At most 2 MB per tile, and a timeout after 8 seconds | The size limit of custom tiles can be changed |

## Rate limit {#rate-limit}

The limit counts tiles per minute, separately for the signed-in user and for the client IP.

```yaml
mugsun:
  gis:
    tile:
      rate-limit-per-user: ${MUGSUN_GIS_TILE_RATE_PER_USER:1200}
      rate-limit-per-ip: ${MUGSUN_GIS_TILE_RATE_PER_IP:2400}
```

- The defaults are 1,200 tiles per minute per user and 2,400 per IP. Set `0` for no limit.
- Counting uses calendar minutes and resets on each full minute.
- Going over either limit is rejected with `429 Too Many Requests` and an empty body.
- The `Retry-After` header holds the seconds left in the current minute.
- Counters live in the memory of the backend process. With several instances, the limit applies per instance.
- One screen of map usually takes a few dozen tiles, so the defaults are enough for normal browsing.
- When many users come from the same egress IP, raise `rate-limit-per-ip`.

## Images only {#images-only}

- Of what the provider returns, only PNG, JPEG, WebP and GIF are passed back to the browser.
- The `Content-Type` must match the signature at the start of the file.
- SVG, HTML and content whose type does not match get `502` with the reason code `bad-content-type`.
- Every tile response carries `X-Content-Type-Options: nosniff`.
- A successful tile carries `Cache-Control: private, max-age=86400`, so the browser caches it for a day.

## No redirects {#no-redirect}

- The tile, place search and reverse geocoding APIs of the four vendors never follow 3xx redirects.
- The same goes for the Google session request and for custom tiles.
- A redirect on a tile counts as a failure and returns `502` with the reason code `upstream-status`.
- This way a provider's response cannot lead the backend to an address outside the allow-list.

## Blocked ranges {#blocked-ranges}

A custom tile host passes the allow-list first and is then resolved through DNS. If any resolved address falls in the ranges below, the request is rejected.

| Range | Examples |
| --- | --- |
| Local and loopback | `127.0.0.1` and `::1` |
| Internal networks | `10.0.0.0/8`, `172.16.0.0/12` and `192.168.0.0/16` |
| Link-local | `169.254.0.0/16`, which contains the cloud metadata address `169.254.169.254` |
| Carrier-grade NAT | `100.64.0.0/10` |
| Multicast and reserved | Addresses from `224.0.0.0` up |
| IPv6 local and documentation addresses | `fc00::/7` and `2001:db8::/32` |

Three more ranges are blocked by default and can be allowed one by one.

| Range | Used for | Switch |
| --- | --- | --- |
| `198.18.0.0/15` | Benchmarking range, also used by fake-ip proxies | `mugsun.gis.xyz.allow-benchmark-net` |
| `64:ff9b::/96` | NAT64 | `mugsun.gis.xyz.allow-nat64` |
| `2002::/16` | 6to4 | `mugsun.gis.xyz.allow-6to4` |

- All three switches default to `false`.
- They can also be set through environment variables, for example `MUGSUN_GIS_XYZ_ALLOW_NAT64`. The other two follow the same pattern.
- With NAT64 or 6to4 allowed, the IPv4 address embedded in the address is still checked against the table above. An embedded internal or loopback address is still blocked.
- A host that fails to resolve is treated as blocked too.
- A blocked request returns `403` with the reason code `blocked-address`.
- With a fake-ip proxy on the machine, every custom tile is blocked. For the fixes, see [Troubleshooting](/en/pc/gis-basemap#fake-ip).

## Failure responses and logs {#failure-responses}

When a tile fetch fails, the backend returns the matching status code and puts the reason code in the `X-Mugsun-Tile-Error` response header.

| Reason code | Status | Meaning | WARN log |
| --- | --- | --- | --- |
| `upstream-status` | 502 | The provider returned a status other than 200 | Yes |
| `bad-content-type` | 502 | The response is not an allowed image | Yes |
| `too-large` | 502 | The tile is over the size limit | Yes |
| `upstream-unreachable` | 502 | The provider cannot be reached, including TLS and DNS failures | Yes |
| `bad-template` | 502 | The custom tile URL is not valid | Yes |
| `timeout` | 504 | Connecting or reading timed out | Yes |
| `blocked-address` | 403 | The host resolved to a blocked address | Yes |
| `host-not-allowed` | 403 | The host is not on the allow-list, or the URL uses an IP literal | Yes |
| `not-configured` | 404 | No key is set, or the allow-list is empty | No |
| `disabled` | 404 | This basemap is disabled | No |
| `out-of-range` | 404 | Beyond the maximum zoom level, or the row or column is out of bounds | No |

- A failure response has an empty body and carries `Cache-Control: no-store`.
- For the same host and reason, at most one WARN log is written every 60 seconds, with the number of failures left out in between.
- The log only records the provider, the host and the reason, plus the status code the provider returned and the zoom level.
- The log never records the URL, the query string or the key. Search for `GIS tile proxy failed` to find these logs.
- The last three are normal situations and are not logged.
- The admin console uses these responses to show "The basemap didn't load" on the map. See [Troubleshooting](/en/pc/gis-basemap#troubleshooting).

## Next steps

<div class="ms-cards">

- [Basemaps and allow-list](/en/pc/gis-basemap) How to set up basemaps, how to change the allow-list, and what to check when the map does not show.
- [GIS and maps](/en/pc/gis) How to use the map pages, and how accurate meters are.
- [Content Security Policy (CSP)](/en/pc/csp) Which sources the page may load resources from.

</div>
