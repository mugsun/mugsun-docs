# Security checklist

Work through every item before exposing a deployment to the internet.

## Accounts and keys

- [ ] `MUGSUN_INIT_PASSWORD` is set, and the default `admin` / `123456` is not used anywhere; the password was changed at first sign-in
- [ ] `SPRING_PROFILES_ACTIVE=prod`, with `strict-keys` set to `true` (the prod default)
- [ ] SM4, request-encryption, SM2 transport and audit-signing keys are your own, not the `mugsun-local-*` samples from the repository ([Configuration](/en/boot/configuration#security-and-keys))
- [ ] Mock social login is off (the prod default)

## Network and gateway

- [ ] OpenAPI docs are off in prod (the prod default)
- [ ] Behind a reverse proxy, `MUGSUN_OPENAPI_TRUSTED_PROXIES` lists only the real proxy ranges ([Open API](/en/boot/open-api#client-ip-and-trusted-proxies))
- [ ] Each API key's IP allowlist uses the narrowest CIDR that works
- [ ] `MUGSUN_FRONT_URL` points to the production console domain
- [ ] Human verification uses `type: SLIDER` and `store: redis`, with `show-code` set to `false`; any tenant with it turned off has a reason ([Configuration](/en/boot/configuration#human-verification-slider-captcha))

## Data and attachments

- [ ] Role grants reviewed: `sys:file:manage`, `sys:file:public` and `sys:file:remove` go only to roles that need them ([Permissions & attachments](/en/boot/permissions))
- [ ] The file storage directory (`FILE_STORAGE_PATH`) is not served directly from a web root

## AI and outbound requests

- [ ] `mugsun.ai.outbound.allow-hosts` lists only internal hosts you actually need; any other private, loopback or metadata address is rejected
- [ ] If you don't use AI, set `MUGSUN_AI_ENABLED=false` or package without the ai module

## Dependencies and analytics

- [ ] Dependencies scanned for CVEs (the document parser `tika-core` must be ≥ 3.2.2)
- [ ] Replay, API monitoring and response-body capture settings match your [privacy requirements](/en/track/privacy)

Report security issues privately as described in each repository's `SECURITY.md` or in [mugsun/.github](https://github.com/mugsun/.github).
