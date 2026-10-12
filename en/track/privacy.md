# Privacy

Defaults should be safe: mask inputs/passwords, mask replay text unless explicitly disabled, strip sensitive query params (e.g. `token`), honor DNT / `optOut()`, redact apiBody by default.

::: warning
This page will become a checklist once SDK/server defaults are fully aligned. If docs and behavior disagree, prefer the stricter privacy behavior and file an issue.
:::
