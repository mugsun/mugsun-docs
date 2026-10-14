# Content Security Policy (CSP)

The admin console image (nginx) generates its CSP headers in the startup script `15-mugsun-gateway.sh`. `MUGSUN_CSP_MODE` chooses between report-only and enforcing.

## Switches

| Variable | Default | Description |
|---|---|---|
| `MUGSUN_CSP_MODE` | `report-only` | `report-only`: sends only `Content-Security-Policy-Report-Only`. The browser reports violations but blocks nothing.<br>`enforce`: sends `Content-Security-Policy` and blocks violations. It also sends a stricter `Content-Security-Policy-Report-Only` to observe the next round of tightening. |
| `MUGSUN_CSP_REPORT_URI` | empty | Where violation reports go. When empty, `report-uri`, `report-to` and `Reporting-Endpoints` are not sent. Spaces, quotes and semicolons are rejected and the container refuses to start. |
| `MUGSUN_CSP_TILE_HOSTS` | empty | Extra map tile origins, space separated. Tiles go through the same-origin `/api/system/gis/tile` proxy by default, so this is usually empty. |
| `MUGSUN_CSP_TRACK_HOSTS` | empty | Extra tracking report origins, space separated. |

Any other value for `MUGSUN_CSP_MODE` makes the container refuse to start. The demo site uses `enforce`. For your own deployment, you can run `report-only` for a while and switch once the browser console shows no violations.

```bash
docker run -e MUGSUN_CSP_MODE=enforce -e MUGSUN_CSP_REPORT_URI=https://csp.example.com/report mugsun/pc
```

## Policy

The enforced policy in `enforce` mode (with no extra origins or report URI):

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
worker-src 'self' blob:; child-src 'self' blob:; frame-src 'self'; media-src 'self' blob:;
manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

- There is no `'unsafe-eval'`, no `'wasm-unsafe-eval'` and no wildcard such as `https:`.
- `style-src 'unsafe-inline'`: Element Plus writes inline styles at runtime.
- `worker-src blob:` is for Cesium. `media-src blob:` is for the video player (xgplayer, MSE).
- Tianditu and AMap origins are no longer hard-coded; tiles go through the same-origin proxy.
- The extra Report-Only policy is the same except that `style-src` drops `'unsafe-inline'`. It only observes and blocks nothing.
- `report-uri` is sent only when `MUGSUN_CSP_REPORT_URI` is set. The collector must accept anonymous POSTs and should be rate limited.

The frontend was adjusted for enforce mode:

- vue-i18n uses JIT compilation (`__INTLIFY_JIT_COMPILATION__`) and no longer relies on `new Function`.
- Iconify icons come from an offline subset. Nothing is requested from `api.iconify.design` at runtime.
- The theme init script moved from inline in `index.html` to `/theme-init.js`.

## Known limitations

| Feature | Under enforce | What to do |
|---|---|---|
| Form designer / low-code forms (form-create) | Rules containing functions, conditions or formulas (compiled with `new Function` by form-create) don't run. Opening the designer page logs one `script-src eval` violation; the page itself works. | `'unsafe-eval'` is not added for this. Use component events or server-side rules instead of function strings. |
| Icons | Only icons in the offline subset show. An icon configured on a menu but missing from the subset shows blank and is never fetched. | Run `scripts/gen-offline-icons.mjs` in the frontend repo after adding icons. Put icons from the backend menu seed data in `scripts/offline-icons.extra.txt`. |
| External iframe menus | `frame-src 'self'` blocks other origins. | Open them in a new window. |
| Session replay | External images and fonts from the recorded page don't load. Only the visual fidelity suffers. | `https:` is not added for this. |

## Self-check

The frontend repo ships an enforce-mode check (`playwright.csp.config.ts`). It must run against the nginx image, not vite dev or preview. It counts `securitypolicyviolation` events per menu, and checks the response headers, zh/en switching, offline icons, maps and WebSocket, plus an injection probe.
