# Security Checklist (before production)

At minimum:

1. Default accounts changed; demo passwords not exposed publicly
2. API / field encryption keys rotated—never ship repo sample values
3. Reverse proxy trusts `X-Forwarded-For` only from known networks
4. Attachment downloads check tenant and ownership (IDOR)
5. Outbound URLs (knowledge base, MCP, channel callbacks) go through a shared safety gate
6. Dependency CVEs (including document parsers) scanned and upgraded
7. Replay and apiBody redaction match [Privacy](/en/track/privacy)

Details and config keys follow [mugsun-boot](https://github.com/mugsun/mugsun-boot) source and README. Disclosure: each repo’s `SECURITY.md` when present.

Next: [Configuration](/en/boot/configuration) · [Getting started](/en/guide/getting-started)
