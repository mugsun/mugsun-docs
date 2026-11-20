# Security checklist

Go through this page from top to bottom before you expose a deployment to the internet. Each item comes with a self-check. Every check is read-only and changes nothing in the system.

You can tick the box in front of each item. Ticks are saved only in your own browser and do not follow you to another computer.

## Before you start

- Replace `https://your-host` in the examples with your own domain, and fill in each `<...>`.
- When you reach the backend through the admin console gateway, endpoint paths need the `/api` prefix. The examples below already include it.
- `CODE` is a curl call that prints only the HTTP status code. Define it first:

```bash
alias CODE="curl -s -o /dev/null -w '%{http_code}\n'"
```

## Accounts and keys

- [ ] `MUGSUN_INIT_PASSWORD` is set, and no environment reachable from outside uses the public default from the repository
  - Run the command below on the host. It only tells you whether the variable is set and never prints the value:

    ```bash
    printenv MUGSUN_INIT_PASSWORD >/dev/null && echo set || echo MISSING
    ```

- [ ] The built-in admin account changed its password after the first sign-in
  - Sign in as admin, open User Center, and replace the initial value under Change Password.
  - Password resets and new tenant admins get their own random one-time values. They never reuse the initial one.
- [ ] The backend runs in production mode: `SPRING_PROFILES_ACTIVE` contains `prod`
  - Run `printenv SPRING_PROFILES_ACTIVE`. The result should contain `prod` and none of `dev`, `test` or `local`.
  - The startup log should contain `The following 1 profile is active: "prod"`. Several profiles are listed together.
  - `prod` sets `strict-keys` to `true` and turns off the API docs and mock social login.
  - With no profile at all, the startup guards still treat the deployment as production, but those production defaults do not apply.
  - See [Startup guards](/en/boot/configuration#startup-guards-and-exemption-switches).
- [ ] All four kinds of keys have a fixed source and none is generated on the fly ([Keys and encryption](/en/boot/crypto-keys))
  - `MUGSUN_SM4_KEY` and the SM2 transport key pair must be set by you. In production the backend refuses to start without them.
  - The API transport key and the audit signing key are generated into `~/.mugsun` when not set.
  - In a container without a volume for that directory, or with several instances, you must set these two as well.
  - Search the startup log for key warnings. The log text is in Chinese:

    ```bash
    grep -E "临时生成|自动生成的密钥|本地开发密钥文件|检测到容器环境" <log file> \
      && echo CHECK || echo OK
    ```

  - `OK` passes. On `CHECK`, read the matching lines:
    - Only the second pattern matched (an auto-generated audit signing key), on a single instance with a persistent key directory: acceptable.
    - Anything else: add the missing key settings.
- [ ] Mock social login is off (off by default under prod)
  - Run `curl -s https://your-host/api/auth/social/sources`.
  - `mockEnabled` in the response `data` should be `false`.
- [ ] `mugsun.lab.seed-fronttest` is not turned on
  - It creates a test account with a weak password. In production the backend refuses to start when it is on.
  - As admin, search for `fronttest` in System Settings → User Manage. The account should not exist.
- [ ] The SM crypto switch `mugsun.crypto.gm-enabled` stays on, especially where compliance reviews apply
  - When it is off, passwords are protected by TLS alone. See [Configuration](/en/boot/configuration#security-and-keys).
  - Open the sign-in page and the Network panel of the browser developer tools, then submit a wrong password.
  - The password field in the request body should be ciphertext, with the value you typed nowhere in sight.
- [ ] No `i-understand-...` exemption switch is turned on
  - Search the deployment settings and environment variables for `i-understand` and `I_UNDERSTAND`. There should be no match.
  - If you really need one, write down why, and make sure all sign-in and password-change traffic uses HTTPS.
  - The switches are listed under [Startup guards](/en/boot/configuration#startup-guards-and-exemption-switches).
- [ ] Self-registration stays off unless you need it (off by default under prod)
  - Run `curl -s 'https://your-host/api/auth/captcha/config?scene=login'`.
  - `registerMode` in the response `data` should be `OFF`.
  - Before you open registration, set up rate limits and trusted proxies. See [Self-registration](/en/boot/configuration#self-registration).

## Network and gateway

- [ ] The API docs are off in production (off by default under prod)
  - `CODE https://your-host/api/v3/api-docs` should not return 200.
  - `CODE https://your-host/api/swagger-ui/index.html` should not return 200.
- [ ] Without signing in, only `health` and `info` are reachable under actuator
  - `CODE https://your-host/api/actuator/health` should return 200. It is used for liveness probes.
  - `CODE https://your-host/api/actuator/prometheus` should return 401 when not signed in.
  - `CODE https://your-host/api/actuator/env` should return 401 as well.
  - The deployment settings do not add `env` or `heapdump` to `management.endpoints.web.exposure.include`.
- [ ] Behind a reverse proxy, the trusted proxies list holds only the real proxy ranges
  - Run `printenv MUGSUN_OPENAPI_TRUSTED_PROXIES`.
  - The result should not contain `0.0.0.0/0`, `::/0` or the whole `10.0.0.0/8`.
  - Sign in once, then open System Settings → Login Logs. The recorded address should be the real client IP.
  - If it is the proxy's IP, the trusted proxies are wrong. See [Open API](/en/boot/open-api#client-ip-and-trusted-proxies).
- [ ] Allowed IPs on every AI key holds only the caller's address or the smallest range
  - Check each key in AI Center → API keys.
  - An empty value or `*` means any source is allowed. `0.0.0.0/0` should not appear.
- [ ] Signature checks on Open API stay on: `mugsun.open-api.sign-required` is `true`
  - Get a valid token as described in [Open API](/en/boot/open-api#make-your-first-open-api-call) and store it in `TOKEN`.
  - Then call `/open/ping` with a signature that is wrong on purpose:

    ```bash
    curl -s -w '\n%{http_code}\n' https://your-host/api/open/ping \
      -H "Authorization: Bearer $TOKEN" \
      -H "X-Timestamp: $(($(date +%s) * 1000))" \
      -H "X-Nonce: $(openssl rand -hex 16)" \
      -H "X-Sign: invalid"
    ```

  - It should return 401 with a signature error. A 200 means signature checks are off.
  - A request with no token also returns 401, but that is the token check and proves nothing about signatures.
- [ ] `MUGSUN_FRONT_URL` points to the production domain of the admin console
  - Run `printenv MUGSUN_FRONT_URL`.
  - The result should be your production domain, starting with `https://` and without `localhost`.
- [ ] The behavioral captcha is on and not limited to auxiliary types ([Behavioral captcha](/en/boot/captcha))
  - `default-types` must not consist only of `ROTATE` and `ICON_CLICK`, the two auxiliary types.
  - `store` is `redis` and `show-code` is `false`.
  - Sign out and open the sign-in page. A captcha should appear. Refresh a few times: you should see more than rotate and icon-click.
  - The command below fetches one sign-in challenge. `type` in the response is the type drawn this time. The challenge itself holds no answer:

    ```bash
    curl -s -X POST https://your-host/api/auth/captcha/challenge \
      -H "Content-Type: application/json" -d '{"scene":"login"}'
    ```

  - Every tenant with the captcha turned off has a clear reason for it.
- [ ] You know that CORS currently allows every origin
  - This version allows cross-origin requests from any origin, without credentials. This item is a reminder, not a failure.
  - You can confirm it with a preflight from an unrelated origin:

    ```bash
    curl -s -i -X OPTIONS https://your-host/api/auth/captcha/config \
      -H "Origin: https://evil.example" \
      -H "Access-Control-Request-Method: GET" | grep -i '^access-control-allow-origin'
    ```

## Data and attachments

- [ ] The manage, public and delete permissions for attachments are granted only to roles that need them ([Permissions & attachments](/en/boot/permissions#attachment-permission-codes))
  - Click Authorize on each role in System Settings → Role Manage.
  - Check the three entries for `sys:file:manage`, `sys:file:public` and `sys:file:remove`.
- [ ] The file storage directory is not under the web root
  - Run `printenv FILE_STORAGE_PATH`. The directory should not sit under the nginx `root` directory.

## AI and outbound requests

- [ ] `mugsun.ai.outbound.allow-hosts` lists only the internal hosts you really need
  - Check this setting in your deployment. It should not contain `*` or `169.254.169.254`.
  - Internal, loopback and cloud metadata addresses that are not listed are rejected by default.
  - The rules are in [AI outbound allowlist](/en/boot/configuration#ai-outbound-allowlist).
- [ ] The AI module is off when unused: `MUGSUN_AI_ENABLED=false`, or a build without the ai module
  - Without signing in, run `CODE https://your-host/api/system/ai/model/list`.
  - It returns 404 when the module is off and 401 when it is on.

## Dependencies and tracking

- [ ] The dependency scan passes, and the document parser `tika-core` is at least 3.2.2
  - Confirm in the repository's GitHub Actions that the latest dependency scan passed.
  - Run `unzip -l mugsun-boot.jar | grep tika-core` to see the version packed into the jar.
- [ ] Session replay, response body capture and masking in tracking follow [Privacy & compliance](/en/track/privacy)
  - These switches live in the front-end code that creates the tracker. The admin console has no settings page for them.
  - Check whether `replayPlugin()` is registered, whether `apiBodyEnabled` is on, and how masking is configured.
  - Tell users in your privacy policy before turning them on. See [Turning on masking and filtering](/en/track/privacy#turning-on-masking-and-filtering).

## Report a security issue

Please disclose security issues privately instead of opening a public issue. See `SECURITY.md` in each repository, or [mugsun/.github](https://github.com/mugsun/.github).

## Next steps

<div class="ms-cards">

- [Configuration](/en/boot/configuration) The settings and environment variables this checklist mentions.
- [Keys and encryption](/en/boot/crypto-keys) How to set the four kinds of keys and migrate old data.
- [Upgrade guide](/en/boot/upgrade) Read it before you update to a newer main.

</div>
