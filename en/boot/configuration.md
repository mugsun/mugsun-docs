# Configuration

Key settings (datasource, Redis, secrets, module flags). **Concrete keys follow boot’s `application*.yml` and [README](https://github.com/mugsun/mugsun-boot/blob/main/README_EN.md).**

Local: copy `config/application-local.yml.example` to `config/application-local.yml` (gitignored). Working directory must be the boot repo root.

Production tips:

- No demo secrets
- Fail-fast if keys are missing—do not silently fall back to public strings
- Enable modules only when needed: `MUGSUN_TRACK_ENABLED` / `MUGSUN_GIS_ENABLED` / `MUGSUN_AI_ENABLED`
- `prod` requires an injected initial password (e.g. `MUGSUN_INIT_PASSWORD`) or it refuses to start

Next: [Security checklist](/en/boot/security-checklist) · [Getting started](/en/guide/getting-started)
