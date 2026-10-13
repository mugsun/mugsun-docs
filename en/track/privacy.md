# Privacy

Principle: **safe by default**—not “record first, ask later”. Defaults below apply from `@mugsun/track-web` 0.2.0.

| Capability | Default | How to change |
| --- | --- | --- |
| Inputs / passwords | `input` / `textarea` values are never read; `password` trees and `maskSelectors` matches are masked | Add areas via `maskSelectors` |
| Session replay | Masks inputs and page text (`maskTextSelector: '*'`) | For debugging, `replayPlugin({ maskTextSelector: false })` or a narrower selector |
| Collected URLs | Sensitive query keys are stripped: `token` / `access_token` / `authorization` / `id_token` / `refresh_token`, etc. (case-insensitive), values replaced with `***`; business params kept | — |
| API response body (apiBody) | When collected, redacted by the built-in sensitive-key list (`apiBodyMaskEnabled: true`) | Set `apiBodyMaskEnabled: false` only if you truly need raw bodies |
| DNT / opt-out | DNT honored; `optOut()` / `optIn()` available | — |

::: tip Upgrading from 0.1.x
Since 0.2.0, replay masks page text and apiBody is redacted by default—this is a behavior change. If you rely on readable replay or raw bodies, opt out explicitly as shown above. See the [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md).
:::

::: warning
If docs and behavior disagree, prefer the stricter privacy behavior and file an issue on [mugsun-track](https://github.com/mugsun/mugsun-track).
:::

Related: [Install](/en/track/install) · [First event](/en/track/first-event) · [Security checklist](/en/boot/security-checklist)
