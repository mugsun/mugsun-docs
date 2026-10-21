# Security checklist

Work through every item before exposing a deployment to the internet.

Each item comes with a self-check, and every check is read-only. Replace `https://your-host` with your own domain and fill in each `<...>`. When you reach the backend through the pc gateway, add the `/api` prefix to API paths.

`CODE` below is a curl call that prints only the HTTP status code. You can define it first:

```bash
alias CODE="curl -s -o /dev/null -w '%{http_code}\n'"
```

## Accounts and keys

- [ ] `MUGSUN_INIT_PASSWORD` is set, the default initial password (a public value in the repository) is not used anywhere, and the password was changed at first sign-in
  - On the host, run `printenv MUGSUN_INIT_PASSWORD >/dev/null && echo set || echo MISSING`. It only checks whether the variable is set and does not print it.
  - Sign in as admin and open Profile → Change password to confirm the password has been changed.
- [ ] `SPRING_PROFILES_ACTIVE=prod`, with `strict-keys` set to `true` (the prod default)
  - Run `printenv SPRING_PROFILES_ACTIVE`. The result should include `prod` and should not include `dev`, `test` or `local`.
  - The startup log should contain `The following 1 profile is active: "prod"`, or list every active profile if there are several.
- [ ] SM4, request-encryption, SM2 transport and audit-signing keys are your own, not the `mugsun-local-*` samples from the repository ([Configuration](/en/boot/configuration#security-and-keys))
  - Search the startup log for messages about falling back to built-in defaults or generating temporary keys. The check passes only when nothing matches:

    ```bash
    grep -E "回落内置开发默认值|临时生成|跟随传输密钥" <log file> && echo FAIL || echo OK
    ```

- [ ] Mock social login is off (the prod default)
  - Run `curl -s https://your-host/api/auth/social/sources` to get the list of social sign-in sources.
  - `mockEnabled` in the response `data` should be `false`.
- [ ] `mugsun.lab.seed-fronttest` is not enabled in production; it creates a test account with a weak password
  - With the `prod` profile active, turning it on makes startup fail. Deployments without `prod` are not blocked, so confirm the setting is off yourself.
  - Sign in as admin, open System → Users and search for `fronttest`. The account should not exist.
- [ ] For MLPS (Dengbao) or commercial cryptography assessments, `mugsun.crypto.gm-enabled` stays on ([Configuration](/en/boot/configuration#security-and-keys))
  - Open the sign-in page with the browser's developer tools on the Network tab, then submit a wrong password.
  - The password field in the request body should be ciphertext, not the text you typed.

## Network and gateway

- [ ] OpenAPI docs are off in prod (the prod default)
  - Neither `CODE https://your-host/api/v3/api-docs` nor `CODE https://your-host/api/swagger-ui/index.html` should return 200.
- [ ] Actuator exposes only `health` and `info` publicly
  - `CODE https://your-host/api/actuator/health` should return 200 for health probes.
  - Without signing in, `CODE https://your-host/api/actuator/prometheus` should return 401 or 403.
  - `CODE https://your-host/api/actuator/env` and `.../actuator/heapdump` should return 404.
- [ ] Behind a reverse proxy, `MUGSUN_OPENAPI_TRUSTED_PROXIES` lists only the real proxy ranges ([Open API](/en/boot/open-api#client-ip-and-trusted-proxies))
  - Run `printenv MUGSUN_OPENAPI_TRUSTED_PROXIES`. It should not include `0.0.0.0/0`, `::/0` or the whole `10.0.0.0/8` range.
  - Sign in once and check Monitor → Login log. It should record your real public IP, not the proxy IP.
- [ ] Each API key's IP allowlist uses the narrowest CIDR that works
  - Review every allowlist under Open platform → API keys. None should contain `0.0.0.0/0`.
- [ ] `mugsun.open-api.sign-required` stays `true` ([Open API](/en/boot/open-api#signature-check))
  - Get a valid token as described in the Open API docs, then call `/open/ping` with a deliberately wrong signature:

    ```bash
    curl -s -w '\n%{http_code}\n' https://your-host/api/open/ping \
      -H "Authorization: Bearer <token>" \
      -H "X-Timestamp: $(($(date +%s) * 1000))" \
      -H "X-Nonce: $(uuidgen)" \
      -H "X-Sign: invalid"
    ```

  - It should return 401 with a signature error. A 200 means signature checking is off.
  - `X-Timestamp` is in milliseconds. A request without a token also returns 401, but that comes from the token check and does not show that signature checking is on.
- [ ] `MUGSUN_FRONT_URL` points to the production console domain
  - Run `printenv MUGSUN_FRONT_URL`. It should be a production domain starting with `https://` and should not contain `localhost`.
- [ ] Human verification has `default-types` that are not only auxiliary types (`ROTATE`, `ICON_CLICK`), uses `store: redis`, with `show-code` set to `false`; any tenant with it turned off has a reason ([Configuration](/en/boot/configuration#human-verification-behavioral-captcha))
  - Sign out and open the sign-in page. A behavioral check should appear, and after a few reloads the types should not be only rotation or icon clicking.
  - Request a sign-in challenge with the command below. The returned `type` is the challenge type, and the challenge contains no answer:

    ```bash
    curl -s -X POST https://your-host/api/auth/captcha/challenge \
      -H "Content-Type: application/json" -d '{"scene":"login"}'
    ```

- [ ] Cross-origin preflight
  - Run a preflight from an unrelated origin:

    ```bash
    curl -s -i -X OPTIONS https://your-host/api/auth/captcha/config \
      -H "Origin: https://evil.example" \
      -H "Access-Control-Request-Method: GET" | grep -i '^access-control-allow-origin'
    ```

  - The current version allows cross-origin requests from any origin (without credentials), so this item is a warning only and does not count as a failure. Once a later version adds an origin allowlist, the preflight should be rejected.

## Data and attachments

- [ ] Role grants reviewed: `sys:file:manage`, `sys:file:public` and `sys:file:remove` go only to roles that need them ([Permissions & attachments](/en/boot/permissions))
  - Open the grants of each role under System → Roles and check these three permission codes.
- [ ] The file storage directory (`FILE_STORAGE_PATH`) is not served directly from a web root
  - Run `printenv FILE_STORAGE_PATH`. The directory should not be under the nginx `root` directory.

## AI and outbound requests

- [ ] `mugsun.ai.outbound.allow-hosts` lists only internal hosts you actually need; any other private, loopback or metadata address is rejected
  - Check this setting in the deployment config. It should not contain `*` or `169.254.169.254`.
- [ ] If you don't use AI, set `MUGSUN_AI_ENABLED=false` or package without the ai module
  - Without signing in, run `CODE https://your-host/api/system/ai/model/list`. It should return 404 when AI is off and 401 when it is on.

## Dependencies and analytics

- [ ] Dependencies scanned for CVEs (the document parser `tika-core` must be ≥ 3.2.2)
  - Confirm that the latest dependency scan in the repository's GitHub Actions passed.
  - Run `unzip -l mugsun-boot-server.jar | grep tika-core` to see the version packaged in the jar.
- [ ] Replay, API monitoring and response-body capture settings match your [privacy requirements](/en/track/privacy)
  - Under Analytics → Settings, confirm the replay and response-body capture switches and the masking rules.

Report security issues privately as described in each repository's `SECURITY.md` or in [mugsun/.github](https://github.com/mugsun/.github).
