# Tracking SDK 0.1.0 → 0.2.0

`@mugsun/track-web` 0.1.0 was published to npm on 2026-08-19 and 0.2.0 on 2026-10-13. Neither has a git tag, so this page compares the two npm packages and the CHANGELOG.

The 0.1.1 entry in the CHANGELOG was never published. You can upgrade from 0.1.0 straight to 0.2.0.

## Breaking changes

### Replay masks page text by default

In 0.2.0 the replay plugin passes `maskTextSelector: '*'` by default, so all page text shows as `*` in replays. 0.1.0 masked only input values.

To see the text, pass `maskTextSelector: false` when you register the replay plugin, or pass a narrower selector.

### Response bodies are masked by default

The default of `apiBodyMaskEnabled` changed from `false` to `true`. When response body capture is on, JSON bodies are masked against the built-in list of sensitive keys before upload.

If you rely on the original response body, set `apiBodyMaskEnabled: false` explicitly.

When the option is not set locally, the SDK uses the remote value from `/track/config`, starting from the next launch. boot's `track_app.api_body_mask_enabled` defaults to 0, so the remote value is false.

To be sure masking is on, set `apiBodyMaskEnabled: true` locally, or turn on response body masking in the admin console.

### Sensitive parameters in API URLs

URLs reported by API monitoring have the values of sensitive parameters removed, such as `token`, `access_token`, `authorization`, `id_token` and `refresh_token`. Matching ignores case, the values become `***`, and other business parameters are kept.

0.1.0 reported the full query string.

## New

- An optional location plugin, `geoPlugin`, captures the location at most once per session. It is not in the default plugin set; add it to `plugins` explicitly.
- A new option, `geoEnabled`, is off by default. A local setting wins; without one, the remote value is used.

## Configuration changes

| Option | 0.1.0 | 0.2.0 |
| --- | --- | --- |
| `apiBodyMaskEnabled` | default `false` | default `true` |
| `replayPlugin({ maskTextSelector })` | does not exist | default `'*'`; pass `false` to turn off |
| `geoEnabled` | does not exist | off by default |

## Other changes

- The repository URL in the package moved from `curdx/mugsun-track` to `mugsun/mugsun-track`.
- The license is still MIT; the copyright holder is now mugsun.

## Upgrade steps

1. Upgrade the dependency:

   ```bash
   pnpm add @mugsun/track-web@0.2.0
   ```

2. If replays should show the original text, pass `maskTextSelector: false` when you register the replay plugin.
3. If you rely on the original response body, set `apiBodyMaskEnabled: false`. If you need masking, set `apiBodyMaskEnabled: true`.
4. Check whether anything depends on values such as `token` in reported URLs. After the upgrade they become `***`.

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

Call an API with `?token=abc` and look at the report request in the browser's developer tools. The parameter value in `url` is `***`.

## Next version

The planned tracking SDK 0.3.0 turns the masking and response body masking defaults back off. See [Session replay](/en/track/plugins) and [Privacy and compliance](/en/track/privacy). A page for it will be added after 0.3.0 is released.
