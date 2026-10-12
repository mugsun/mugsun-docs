# Security Checklist

Before production:

1. Rotate demo passwords
2. Replace sample crypto keys; no silent public fallbacks
3. Trust `X-Forwarded-For` only from known proxies
4. Authorize file downloads by tenant/owner
5. Gate outbound URLs (knowledge / MCP / channels)
6. Scan & upgrade CVEs (including document parsers)
7. Align replay & apiBody redaction with the privacy page

::: tip
Actionable bind to config keys will follow. Unified `SECURITY.md` across repos is planned.
:::
