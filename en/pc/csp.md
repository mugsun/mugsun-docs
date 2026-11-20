# Content Security Policy (CSP)

The admin console image adds CSP response headers to its pages. By default it only reports violations; switch to blocking once you have confirmed there are none.

## Turn on blocking

<div class="ms-steps">

### Run in the default mode first

The default mode is `report-only`: the browser reports violations and blocks nothing. To start the image, see [Docker deployment](/en/pc/deploy-docker).

Open the pages you use and look for CSP violations in the browser console.

### Switch to blocking

```bash
docker run -d -p 8088:8080 \
  -e MUGSUN_API_UPSTREAM=http://<backend-host>:8080 \
  -e MUGSUN_CSP_MODE=enforce \
  mugsun/pc:local
```

### Check the response headers

```bash
curl -sI http://localhost:8088/ | grep -i '^content-security-policy'
```

You should see two lines, `Content-Security-Policy` and `Content-Security-Policy-Report-Only`.

</div>

::: warning Use enforce on anything public
`report-only` reports and blocks nothing, so it gives no protection. Use it only for a trial run on an internal network.
:::

## The four variables

| Variable | Default | Notes |
| --- | --- | --- |
| `MUGSUN_CSP_MODE` | `report-only` | `report-only` reports, `enforce` blocks |
| `MUGSUN_CSP_REPORT_URI` | empty | Where violation reports are sent |
| `MUGSUN_CSP_TILE_HOSTS` | empty | Extra map tile hosts to allow, separated by spaces |
| `MUGSUN_CSP_TRACK_HOSTS` | empty | Extra analytics hosts to allow, separated by spaces |

- Map tiles go through the same-origin `/api/system/gis/tile` by default, so you rarely need to list tile hosts.
- With an empty report address, responses carry no `report-uri`, `report-to` or `Reporting-Endpoints`.

### Accepted values

The container checks these four variables at startup and refuses to start if one of them fails. The log line that starts with `15-mugsun-gateway.sh:` gives the reason.

| Variable | Accepted | Rejected |
| --- | --- | --- |
| `MUGSUN_CSP_MODE` | `report-only`, `enforce` | Anything else |
| The two host variables | `https://tile.example.com`<br>`https://*.example.com`<br>`wss://ws.example.com:8443` | `*`<br>`https://*`<br>`http://tile.example.com` |
| `MUGSUN_CSP_REPORT_URI` | `/api/csp-report`<br>`https://csp.example.com/report` | `http://csp.example.com`<br>`//csp.example.com` |

- Each entry of a host variable is `https://` or `wss://` plus a concrete host, optionally with a port and a path.
- `*.` may only appear at the start of the host and stands for all subdomains.
- The report address must start with `https://`, or be a same-origin path that starts with `/`.
- Reports contain page URLs, so sending them over plain `http://` is not allowed.

## The policy that is sent

In `enforce` mode the policy looks like this. This is what you get with no extra hosts and no report address.

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
worker-src 'self' blob:; child-src 'self' blob:; frame-src 'self'; media-src 'self' blob:;
manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

| Directive | Notes |
| --- | --- |
| `script-src 'self'` | No `eval`, no inline scripts, and no wildcard such as `https:` |
| `style-src 'unsafe-inline'` | Element Plus writes inline styles at runtime |
| `worker-src blob:` | Needed by Cesium, which draws the 3D map |
| `media-src blob:` | Needed by the video player |
| `img-src` and `connect-src` | No map vendor hosts; tiles all go through the same-origin endpoint |

The two modes send different headers:

| Mode | Header | Content |
| --- | --- | --- |
| `report-only` | `Content-Security-Policy-Report-Only` | The policy above |
| `enforce` | `Content-Security-Policy` | The policy above |
| `enforce` | `Content-Security-Policy-Report-Only` | The policy above without `'unsafe-inline'` in `style-src` |

The extra Report-Only header in `enforce` mode reports and blocks nothing. It shows what tightening `style-src` next would affect.

### Collect violation reports

With `MUGSUN_CSP_REPORT_URI` set, the browser sends violation reports to that address with POST.

- The collector must accept POST requests that carry no sign-in state, and must rate-limit them.
- The backend ships a collector only in [read-only demo mode](/en/boot/demo-mode), at `/api/csp-report`.
- In any other deployment that address returns 404. To collect reports, bring your own collector.

## Limits once blocking is on

| Feature | What happens | What to do |
| --- | --- | --- |
| Form designer | Functions, conditions and formulas written in rules do not run | Use component events or backend rules instead |
| Menu icons | Icons outside the offline icon set show up blank | Regenerate the offline icon set, see the next section |
| External iframe menus | Pages from other domains are blocked by `frame-src 'self'` | Open them in a new window |
| Session replay | Images and fonts from other domains on the recorded page do not load | Only affects how the replay looks; left as is |

Opening the form designer page logs one `script-src` eval violation in the console. The page itself works normally.

## When you change frontend code {#frontend}

- Do not use `eval` or `new Function`. They do not run in blocking mode.
- Do not write inline scripts in `index.html`. The theme init script lives in its own file, `/theme-init.js`.
- Icons are read from the offline icon set. Nothing is requested from `api.iconify.design` at runtime.

After you use a new icon, regenerate the offline icon set and commit it:

- Icons used in the frontend source are picked up by the scan.
- Icons that only appear in the backend's menu data must be added to `scripts/offline-icons.extra.txt` first.
- The command is described at the top of `scripts/gen-offline-icons.mjs`.

## Check blocking mode {#check}

The admin console repository ships a set of Playwright checks. One command runs them:

```bash
scripts/ci/run-csp-e2e.sh
```

- It needs Docker and OpenSSL, and mugsun-core, mugsun-boot and mugsun-pc in the same directory.
- The script generates one-off keys, starts the whole stack in `enforce` mode, and removes it when it is done.
- To keep the stack afterwards for debugging, put `KEEP=1` in front of the command.
- Results and screenshots are written to `test-results/csp/`.

The checks cover:

| Check | Requirement |
| --- | --- |
| Response headers | The blocking policy is present, with no `unsafe-eval`, `*` or `https:` in it |
| Opening every menu | Zero blocked violations |
| Switching languages | Translations are shown |
| Icons | Sidebar icons render, and no icon request goes to another domain |
| Maps | Both the 2D and the 3D map load |
| WebSocket | Same-origin connections work, a forged origin is refused |
| Injection test | An inline event handler is blocked and produces a violation report |
| Analytics and session replay | Neither event upload nor replay playback is blocked by the policy |
| Report collection | Reports arrive, URL parameters are stripped, and going over the rate limit returns 429 |

::: tip Run it against the image only
Neither the dev server nor `pnpm serve` sends CSP headers, so running these checks against them tells you nothing.
:::

The repository's CI runs the same script on every push.

## Next steps

<div class="ms-cards">

- [Docker deployment](/en/pc/deploy-docker) Build the image, set the backend address and the front gateway.
- [Tile proxy security](/en/pc/gis-tile-security) Why map tiles go through a same-origin endpoint.
- [Security checklist](/en/boot/security-checklist) The other settings to verify before launch.

</div>
