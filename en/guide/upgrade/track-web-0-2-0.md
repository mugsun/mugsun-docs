# Analytics SDK 0.1.0 → 0.2.0

`@mugsun/track-web` 0.1.0 was published to npm on 2026-08-19 and 0.2.0 on 2026-10-13.

The tags are `v0.1.0` and `v0.2.0`. The 0.1.1 entry in the CHANGELOG was never published, so you can upgrade straight to 0.2.0.

::: tip The latest version is 0.3.0
0.3.0 turns the two defaults described on this page back off. If you plan to go straight to 0.3.0, read [Next version](#next) first.
:::

## See which changes affect you

| Change | Who is affected | What to do |
| --- | --- | --- |
| [Replay masks page text by default](#replay-mask) | Apps with session replay turned on | Turn masking off if you need the original text |
| [Response bodies are masked by default](#body-mask) | Apps with response body capture turned on | State in code whether you want masking |
| [Sensitive parameters removed from API URLs](#url-params) | Teams whose analysis uses URL parameter values | Check whether you still depend on those values |

## Replay masks page text by default {#replay-mask}

In 0.2.0 the replay plugin passes `maskTextSelector: '*'` by default, so all page text shows as `*` in replays. 0.1.0 masked only input values.

To see the text, pass `maskTextSelector: false` when you register the replay plugin, or pass a narrower selector:

```ts
import { replayPlugin } from '@mugsun/track-web/replay'

replayPlugin({ maskTextSelector: false })
```

## Response bodies are masked by default {#body-mask}

The default of `apiBodyMaskEnabled` changed from `false` to `true`. When response body capture is on, JSON bodies are masked against the built-in list of sensitive keys before upload.

If you rely on the original response body, set `apiBodyMaskEnabled: false` explicitly.

::: warning With boot, this default may not apply
When the option is not set locally, the SDK uses the value sent by `/track/config`, starting from the next launch. In boot the switch is off by default, so the value sent is false.

To be sure masking is on, write `apiBodyMaskEnabled: true` in code, or turn on Response body masking in the app form under Integration.
:::

## Sensitive parameters removed from API URLs {#url-params}

URLs reported by API monitoring have the values of sensitive parameters replaced with `***`, and other parameters are kept. 0.1.0 reported the full query string.

0.2.0 handles the ten parameters below, and matching ignores case:

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

## New

- An optional location plugin, `geoPlugin`, captures the location at most once per session. It is not in the default plugin set, so add it to `plugins` explicitly.
- A new option, `geoEnabled`, is off by default. A local setting wins, and without one the remote value is used.

## Configuration changes

| Option | 0.1.0 | 0.2.0 |
| --- | --- | --- |
| `apiBodyMaskEnabled` | default `false` | default `true` |
| `replayPlugin({ maskTextSelector })` | does not exist | default `'*'`; pass `false` to turn off |
| `geoEnabled` | does not exist | off by default |

## Other changes

- The repository URL in the package moved from `curdx/mugsun-track` to `mugsun/mugsun-track`.
- The license is still MIT, and the copyright holder is now mugsun.

## Upgrade steps

1. Upgrade the dependency:

   ```bash
   pnpm add @mugsun/track-web@0.2.0
   ```

2. If replays should show the original text, pass `maskTextSelector: false` when you register the replay plugin.
3. If you rely on the original response body, set `apiBodyMaskEnabled: false`. If you need masking, set `apiBodyMaskEnabled: true`.
4. Check whether anything depends on the values of parameters such as `token` in reported URLs. After the upgrade they become `***`.

## See it work

Check the installed version:

```bash
npm ls @mugsun/track-web
```

You can also read the version in code:

```ts
import { SDK_VERSION } from '@mugsun/track-web'
console.log(SDK_VERSION) // 0.2.0
```

Record a session on a page with replay turned on and play it under Session Replay in the admin console. All page text shows as `*`.

Call an API whose URL has a `token` parameter, then look at the request the SDK sends. The value of that parameter is `***`.

## Next version {#next}

Analytics SDK `0.3.0` was published to npm on 2026-10-22. It turns the defaults for replay masking and response body masking back off.

0.1.0 masked input values, and replay in 0.3.0 does not mask them by default. If your pages show personal data, turn masking on before you upgrade.

See [Privacy and compliance](/en/track/privacy#upgrading-from-0-2-0-and-keeping-the-old-masking) for how to turn it on, and [Plugins](/en/track/plugins#session-replay) for the replay options.
