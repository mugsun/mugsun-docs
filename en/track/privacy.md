# Privacy

Principle: **safe by default**—not “record first, ask later”.

Capabilities (per current SDK / server version):

- Inputs / passwords not collected or masked by default
- Session replay masks page text unless explicitly disabled
- Collect URLs strip sensitive query params (e.g. `token`)
- Honor DNT; expose `optOut()`
- Redact sensitive payloads such as apiBody by default

::: warning
If docs and behavior disagree, prefer the stricter privacy behavior and file an issue on [mugsun-track](https://github.com/mugsun/mugsun-track).
:::

Related: [Install](/en/track/install) · [First event](/en/track/first-event) · [Security checklist](/en/boot/security-checklist)
