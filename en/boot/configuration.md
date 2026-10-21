# Configuration

boot follows standard Spring Boot conventions: `application.yml` holds defaults, `application-prod.yml` overrides them for production, and local overrides go in `config/application-local.yml` (git-ignored; the working directory must be the repository root). The tables below cover the most common environment variables; `mugsun-boot-core/src/main/resources/application*.yml` has the full set of keys.

## Local development

```bash
cp config/application-local.yml.example config/application-local.yml
```

`config/application-local.yml` is loaded last, so it can override any key from `application.yml` and from module configs such as `mugsun-module-track.yml`, for example the tracking database URL `mybatis-flex.datasource.track.url`. Before [mugsun-boot #29](https://github.com/mugsun/mugsun-boot/pull/29) it was loaded ahead of the module configs, so module keys set here were ignored and only environment variables (such as `TRACK_JDBC_URL`) worked. After upgrading, keys that used to be ignored take effect, so check the file for stale values.

The example no longer ships key values; with the dev profile the API and field encryption keys can stay empty (see "Local development" below). It also ships a mock social login. If you leave the SM2 key pair empty, a new pair is generated on every start and sign-in can break when it changes, so set a fixed local pair.

## Data sources and cache (prod)

| Variable | Purpose |
| --- | --- |
| `JDBC_URL` / `JDBC_USERNAME` / `JDBC_PASSWORD` | Primary database |
| `REDIS_HOST` / `REDIS_PORT` (default 6379) / `REDIS_PASSWORD` / `REDIS_DB` (prod default 0) | Redis |
| `FILE_STORAGE_PATH` (default `/var/lib/mugsun/files/`) / `FILE_DOMAIN` | Local file storage and its public domain |
| `MUGSUN_FRONT_URL` | Console origin, used for OAuth redirects and similar; defaults to `http://localhost:3006` in dev, required in prod |

## Security and keys

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_INIT_PASSWORD` | — | Initial admin password. Production (see "Startup guards and exemption switches" below) refuses to start if it's missing |
| `MUGSUN_GM_ENABLED` | `true` | Master switch for SM-series crypto (SM2 transport / SM3 digests) |
| `MUGSUN_SM4_KEY` | empty | SM4 key for field encryption; required outside dev, see "API and field encryption keys" below |
| `MUGSUN_API_KEY` | empty | API encryption key, 32 hex chars or 16-byte base64; required outside dev |
| `MUGSUN_SM2_PRIVATE_KEY` / `MUGSUN_SM2_PUBLIC_KEY` | empty | SM2 transport key pair (hex); generated with a warning if empty |
| `MUGSUN_SIGN_PRIVATE_KEY` / `MUGSUN_SIGN_PUBLIC_KEY` | empty | Audit-signing key pair, kept separate from transport keys |
| `MUGSUN_STRICT_KEYS` | `false` (`true` in prod) | When `true`, any missing key stops startup and ephemeral keys or the local key file are not allowed |
| `MUGSUN_OPENAPI_TRUSTED_PROXIES` | empty | CIDR list of trusted reverse proxies; see [Open API](/en/boot/open-api#client-ip-and-trusted-proxies) |
| `MUGSUN_FILE_SIGN_SECRET` | empty | Signing key for local file download links (at least 32 characters); see "Local file access" below |

When `MUGSUN_GM_ENABLED` (setting `mugsun.crypto.gm-enabled`) is off:

- Passwords for sign-in, password change and registration are no longer SM2-encrypted. They are sent in plain text and protected only by HTTPS.
- The console reads this switch at runtime and stops encrypting automatically, with no rebuild needed.
- General-purpose digests switch from SM3 to SHA-256; currently only the encryption demo endpoint uses them. Audit signing uses its own SM2 key pair and is not affected.
- Password storage is not affected by this switch. The server always stores passwords with BCrypt, a salted slow hash, and never with SHA-256.

Turning SM-series crypto off in production stops startup unless the exemption switch is also set; see "Startup guards and exemption switches" below. Once it is off, passwords rely entirely on TLS. Keep it on for MLPS (Dengbao) or commercial cryptography assessments.

## API and field encryption keys (breaking change)

::: warning Breaking change
mugsun-core and mugsun-boot no longer have any built-in fallback keys.
After upgrading, any non-dev environment without `MUGSUN_API_KEY` or `MUGSUN_SM4_KEY` refuses to start.
:::

### New `MUGSUN_API_KEY` format

- API encryption now uses SM4-GCM with integrity protection; tampered ciphertext fails to decrypt.
- After trimming surrounding whitespace, the key must be either:
  - 32 hex characters (any case), or
  - padded standard base64 that decodes to exactly 16 bytes.
- Anything else stops startup. Keys are no longer zero-padded or truncated.
- Ciphertext is `base64(IV 12 bytes ‖ ciphertext ‖ tag 16 bytes)`, padded.
- Old SM4-CBC ciphertext is no longer accepted; the console frontend must be upgraded at the same time.

::: danger Transport obfuscation only, not a replacement for TLS
The symmetric key is shipped to the browser, so it is not secret from clients. Always use HTTPS in production.

No replay protection and no endpoint binding: ciphertext can be replayed or moved to another encrypted endpoint.
:::

### Upgrade steps

1. Generate a key with `openssl rand -hex 16`, or rerun `scripts/gen-keys.sh`.
2. Replace `MUGSUN_API_KEY` in every deployment. The old 16-character form is rejected, so change it before upgrading.
3. Set the frontend `VITE_CRYPTO_API_KEY` to the same value and release frontend and backend together.
4. Make sure `MUGSUN_SM4_KEY` is set and valid (see "`MUGSUN_SM4_KEY` format" below).
   These deployments must re-encrypt with "Migration" below before upgrading; putting the old
   value back does not make old data readable:
   - those that used the old fallback or a short key;
   - those whose `MUGSUN_SM4_KEY` is 32 hex or 24 base64 characters. Older versions used the
     first 16 characters of that string as the key, while this version decodes it as hex or
     base64, which gives a different key. Migrate with the original value as the old key and
     `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED=true`.
   - Only deployments that always used the 16-character form keep the same key bytes and can
     upgrade directly.

### `MUGSUN_SM4_KEY` format

- Only three forms are accepted, after trimming surrounding whitespace:
  - 32 hex characters, any case (generate new keys with `openssl rand -hex 16`);
  - padded standard base64 that decodes to exactly 16 bytes;
  - transition only: the old 16-character form, which logs a WARN; the next release accepts only 32 hex.
- Anything else stops startup: no zero padding, no truncation, no legacy switch.
- Older versions treated every key as characters: short ones were zero-padded, long ones cut to
  16 characters. So 32-hex and 24-base64 keys from older versions decode differently now and
  must be migrated too.
- Startup self-check: at startup the application samples 3 rows per encrypted column and
  test-decrypts every value that looks like ciphertext. If any fail, startup stops and names
  the table, column and primary key, with a hint to migrate using `LEGACY_PADDED`.
  An empty database passes. `mugsun.crypto.sm4-self-check=false` turns it off; use that only
  briefly while troubleshooting. In production the skip switch has no effect and the
  self-check always runs.

### Local development

- Start with the dev profile: `--spring.profiles.active=dev`.
- `mugsun.crypto.allow-ephemeral-keys=true`: without `MUGSUN_API_KEY`, a key valid only for this process is generated. It changes on restart, differs between instances, and logs a WARN.
- `mugsun.crypto.sm4-local-key-file` (default `${user.home}/.mugsun/dev-sm4.key`): without `MUGSUN_SM4_KEY`, a random key is written to this file on first start and reused afterwards, so local data survives restarts. The file is created with mode 600 and its directory with 700; wider permissions log a WARN. Deleting the file makes data encrypted with it unreadable.
- Local data encrypted with the old fallback key can't be decrypted after upgrading; recreate the local database or migrate as below.
- The field encryption key is never regenerated on each start.
- With `MUGSUN_STRICT_KEYS=true` (the prod default) neither option applies. For API crypto `strict-keys` only acts as a veto; it is not deprecated.

### Migration: deployments that used the old fallback, a short key, or a 32-hex / base64 key on an older version

Older versions fell back to a fixed key that is public in the repository when no key was configured, zero-padded short keys and truncated long ones.
If such a deployment just sets a new key, all old data becomes unreadable; setting the old value again keeps using a public key.
The application holds only one key at a time, so re-encryption uses the offline tool
`com.mugsun.boot.common.crypto.Sm4KeyMigrationTool`, which takes both keys.

All inputs come from environment variables, never the command line:

| Variable | Meaning |
| --- | --- |
| `MUGSUN_SM4_OLD_KEY` | Old key (the old fallback is in git history; use it only for the migration) |
| `MUGSUN_SM4_OLD_KEY_LEGACY_PADDED` | Set `true` when the old key is short or the old fallback, to rebuild it with the old zero padding |
| `MUGSUN_SM4_NEW_KEY` | New key, same format as above |
| `MUGSUN_MIGRATE_JDBC_URL`, `MUGSUN_MIGRATE_DB_USER`, `MUGSUN_MIGRATE_DB_PASSWORD` | Target database |

Migration:

1. Back up the database and stop the application.
2. Run a dry run first (the default, writes nothing):
   `java -cp mugsun-boot.jar -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool org.springframework.boot.loader.launch.PropertiesLauncher`.
   It prints, per table and column, the total, to re-encrypt, already on the new key, legacy plaintext and undecryptable counts.
   With the Docker image, override the entrypoint and run java directly:

   ```bash
   docker run --rm --env-file migrate.env --entrypoint java <image> \
     -cp /app/app.jar \
     -Dloader.main=com.mugsun.boot.common.crypto.Sm4KeyMigrationTool \
     org.springframework.boot.loader.launch.PropertiesLauncher --dry-run
   ```

   Delete `migrate.env` afterwards and never commit it.
3. When every undecryptable count is 0, **make sure the backup from step 1 is usable**, then rerun with `--apply`. It writes in one transaction and rolls back everything if any row fails.
4. Start with `MUGSUN_SM4_KEY` set to the new key.

   Then check that the error log has no "SM4 解密失败" (SM4 decrypt failed) entries.
5. Rotate every third-party credential stored in these columns.

- Identical old and new keys (including the hex and base64 forms of one key) are refused.
- Keys come only from environment variables; the command line accepts only `--dry-run` and `--apply`. Output lists only tables, columns, row counts and the primary keys that failed, never keys, plaintext or ciphertext.
- Run it once per tenant database configured in `sys_tenant_datasource`.
- With `mugsun.db.default-schema` set, put that schema in the JDBC URL (for example `currentSchema=`
  on PostgreSQL); run once per schema if there are several.
- A column that fails to decrypt reads as empty and is not written back; still, don't save these records in the admin console before migrating.

Affected columns:

| Table | Columns |
| --- | --- |
| `sys_user` | `id_card` |
| `sys_tenant_datasource` | `ds_password` |
| `sys_notify_channel` | `secret` |
| `sys_oauth_client` | `client_secret` |
| `sys_api_key` | `secret_key` |
| `sys_oss` | `access_key`, `secret_key` |
| `ai_model` | `api_key`, `secret_key` |
| `ai_secret` | `secret_key` |
| `ai_datasource` | `password` |
| `ai_vector_store` | `password` |
| `ai_mcp_tool` | `api_key` |
| `gis_map_provider` | `api_key`, `secret` |

- API encryption is transport-only and stores nothing, so replacing the key is enough.


### ECB exception for field encryption

Field encryption currently uses SM4-ECB. This is an exception kept only for `sys_user.id_card`, to support equality lookups. Its limits:

- the same plaintext gives the same ciphertext, so duplicate values are visible in the database;
- the ciphertext is not tamper-proof;
- the ciphertext is not bound to its row and can be moved to another row.

The other 14 columns move to SM4-GCM in the next round. If `id_card` ever needs equality lookups,
switch to an HMAC blind-index column for lookups and encrypt the column itself with GCM.

## Audit log

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.audit.anonymous-max-pending` (env `MUGSUN_AUDIT_ANONYMOUS_MAX_PENDING`) | `64` | How many operation-log entries from unauthenticated requests may be queued at once. Extra entries are dropped and the running count is logged as a warning (on the 1st and every 100th). Entries from signed-in requests are never limited or dropped |

Operation logs are written as a hash chain. With several instances, each one locks the same chain-head row inside its transaction before writing, and a unique index backs this up, so the chain can't fork. No extra setup is needed.

## Local file access

With the default (dev) settings, the app serves locally stored files directly under `/file/**`. So that nobody can download a private attachment just by knowing its address:

- Public files under `mugsun/public/` (such as avatars) can still be fetched without signing in.
- Every other file needs a short-lived signature. After signing in, `GET /system/file/download/{id}` returns an address with `e` (expiry) and `s` (signature) parameters, valid for 300 seconds by default. Requests with no signature, a wrong one or an expired one get a 404.

```yaml
mugsun:
  file:
    local-access:
      public-prefixes: [mugsun/public/]   # path prefixes anyone can fetch
      sign-secret: ${MUGSUN_FILE_SIGN_SECRET:}
      expire-seconds: 300
```

If `sign-secret` is empty, a random key is generated on every start, which only works for a single instance. With several instances, give them all the same value, or an address signed by one instance will 404 on another. The `prod` profile turns off direct `/file/**` serving by default and private attachments go through the authorized download endpoint, so this setting doesn't affect it. If you turn direct serving on under `prod`, `sign-secret` must be at least 32 characters; an empty or shorter value stops startup.

Every directly served file carries `X-Content-Type-Options: nosniff`. Types a browser might execute, such as HTML and SVG, and PDFs are always sent as attachments to download rather than opened in the browser. HTML, SVG and similar types also get `Content-Security-Policy: sandbox`.

## Operation log exclusions

Every controller write endpoint (POST/PUT/DELETE/PATCH) automatically gets an operation log entry (titled 「自动留痕」). Endpoints that browsers call constantly and that aren't admin actions can be excluded, so they write no log entry and stay out of the operation log hash chain. By default the analytics SDK's reporting endpoints are excluded:

```yaml
mugsun:
  oper-log:
    exclude-paths:          # Ant-style, matched against the path without the context path
      - /track/collect
      - /track/replay
      - /track/api-body
```

Setting this list replaces the default entirely, so include these three if you want to keep them; `exclude-paths: []` logs everything. Exclusions only affect automatic logging. Endpoints explicitly marked `@OperationLog` are still logged, and the admin endpoints under `/system/track/**` are unaffected.

## Optional modules

| Variable | Default | Purpose |
| --- | --- | --- |
| `MUGSUN_GIS_ENABLED` | `true` | GIS module |
| `MUGSUN_TRACK_ENABLED` | `true` | Analytics module |
| `MUGSUN_AI_ENABLED` | `true` | AI module |
| `POWERJOB_ENABLED` | `false` | PowerJob worker; requires a separate server and `POWERJOB_SERVER` |
| `MUGSUN_IP2REGION_ENABLED` / `MUGSUN_IP2REGION_XDB_PATH` | `false` / empty | IP-to-region lookup |

The three module switches are on when unset. Once set, they accept only `true` or `false` (case-insensitive, no surrounding spaces); an empty value, `1`, `0` or anything else stops the service from starting. See [Architecture](/en/guide/architecture#two-layers-of-module-switches) for the full rules.

## AI outbound allowlist

Model calls (chat, streaming chat and embeddings), knowledge-base fetches, channel webhooks, remote MCP calls and the workflow HTTP node are checked for SSRF before any request goes out; private, loopback and cloud-metadata addresses are rejected by default. To reach an internal service, such as a local model server or an internal MCP endpoint, allow it explicitly:

```yaml
mugsun:
  ai:
    outbound:
      allow-hosts: [localhost, ollama.internal]
      # Ports allowed for hosts not on the list; 80/443 by default, [] means any port
      allowed-ports: [80, 443]
```

Entries are exact hostnames or `*.example.com` wildcards. A matching host may resolve to a private address.

Example: a local Ollama listens on `http://localhost:11434` by default. Add `localhost` to `allow-hosts` before that URL can be saved and called from model management, a knowledge base or a channel. `allow-hosts` can only be set in the platform configuration file, so tenants can't open internal addresses themselves. Models saved with an internal address before the upgrade fail when called until their host is added to the list.

- The check runs when the configuration is saved (including a model's API address) and again before every request, so an IP written directly into the address is caught too; only `http` and `https` are allowed.
- Hosts not on the list can only use ports 80 and 443 by default; open others with `allowed-ports`. Hosts on the list can use any port.
- When the connection is opened, the hostname is resolved again, every address is checked, and the connection goes to the address that was checked. A hostname that switches to an internal address after the check (DNS rebinding) still can't be reached. If any one of the resolved addresses is in a blocked range, the whole request is rejected.
- Blocked ranges cover private, loopback, link-local, CGNAT (which includes cloud metadata addresses), multicast, reserved and documentation addresses. The same applies to IPv6 (including `2001:db8::/32` and Teredo `2001::/32`), including IPv4-mapped, NAT64 and 6to4 addresses that embed one of those IPv4 addresses. The workflow HTTP node ignores `allow-hosts` and always blocks internal addresses.
- Redirects are not followed: when the other side answers with a 3xx, the request ends there and the `Location` address is never requested. If a webhook, MCP or model address redirects, enter the final address instead.
- The default is `allow-hosts: []`, so no private address is allowed. Public hosts not on the list are unaffected.
- Cloud metadata addresses are always refused, even when the host is on `allow-hosts`: the whole link-local range `169.254.0.0/16` (including `169.254.169.254`, the AWS ECS task credentials endpoint `169.254.170.2` and Tencent Cloud's `169.254.0.23`), plus `100.100.100.200` and `fd00:ec2::254`. IPv6 forms that embed an IPv4 address (`::ffff:` mapped, `::a.b.c.d` compatible, NAT64 `64:ff9b::/96` and 6to4 `2002::/16`) are decoded to the embedded IPv4 address before the check.
- `*.example.com` matches any subdomain but not `example.com` itself. Hosts ending in `.local` or `.internal` are rejected unless listed explicitly. List only the hosts you actually need.

## Human verification (behavioral captcha)

Login, registration, the forgot-password code and the SMS code request require a behavioral captcha by default. All five challenge types are enabled by default, and each challenge picks one of them at random. The captcha is built into boot and uses no third-party service.

```yaml
mugsun:
  captcha:
    enabled: true          # global switch
    store: redis           # redis | memory; memory is single-node dev only and fails to start in prod
    slider:
      tolerance-px: 6      # drop tolerance in native background pixels (background is 320×180)
      expire-seconds: 120  # challenge lifetime
      token-expire-seconds: 120
      decoy-count: 2       # fake gaps (same outline as the real gap), 0–3
      keyboard-step-px: 4  # native pixels moved per key press in keyboard mode
      bind-ip: false       # enforce token binding to IP / UA (recorded either way)
      bind-ua: false       # true by default in prod
    background:
      dir: classpath:captcha/bg/   # or file:/opt/mugsun/captcha-bg/
      rotate: random               # random | round-robin
      reload-seconds: 600          # rescan interval, 0 = load at startup only
    rate-limit:
      challenge-per-minute: 30     # challenges per IP per minute
      verify-fail-max: 5           # failures in 10 minutes before a 10-minute lock (3 in keyboard mode)
      global-challenge-per-second: 200   # global per-second cap (shared across nodes with Redis)
      sms-phone-per-day: 10        # SMS codes per phone number per day
      sms-ip-per-hour: 20          # SMS codes per IP per hour
      sms-phone-per-minute: 5      # short window: per phone per minute (counts only after a token is consumed; recovers on its own)
      sms-ip-per-minute: 30        # short window: per IP per minute (every request counts, even without a token)
```

See `mugsun.captcha` in `application.yml` for every key and default.

**Backgrounds:** jpg or png, 640×360 (16:9) recommended, up to 200KB each, at least 20 images, avoiding large flat areas. A plain-colour placeholder is used while the folder is empty. Use only images you own or may use commercially, and list their sources in a `SOURCES.md` in the folder.

**Endpoints:**

| Endpoint | Purpose |
| --- | --- |
| `GET /auth/captcha/config?scene=&clientId=&tenantId=` | Whether verification is needed; a hint for the front end only |
| `POST /auth/captcha/challenge` | Background and puzzle piece, valid for `expireSeconds` |
| `POST /auth/captcha/verify` | Submit the drop position and track (or key presses in keyboard mode) for a one-time `captchaToken` |

`scene` is `login`, `register`, `sms` (sending the SMS code) or `forget`. The challenge request declares `inputMode` (`pointer` for mouse/touch or `keyboard`), and verify must use the same one; keyboard challenges return `keyboardStep`, and the number of key presses must match the drop position. Put the `captchaToken` in the body of `/auth/login`, `/auth/register`, `/auth/sms-code` or `/auth/forget-code`. It works once and must match the scene, client and tenant used for the challenge. The server decides on its own whether verification is needed; it does not rely on `config`.

**Challenge types:** besides the slider (`SLIDER`), there are rotate (`ROTATE`), word click (`WORD_CLICK`, click the characters of a common 3–4 character word or idiom in order), icon click (`ICON_CLICK`, click 3 icons in order) and jigsaw (`JIGSAW`, 2×2). For every challenge the server picks one at random from the types enabled for the tenant, and the front end renders whatever `type` comes back; a `type` in the request is ignored. In keyboard mode (`inputMode: keyboard`) the server picks only from the slider and rotate types the tenant has enabled; if neither is enabled, the challenge request returns `40015` (no accessible challenge type enabled) instead of issuing another type. Keyboard challenge requests first count against a stricter per-IP limit (`rate-limit.keyboard-challenge-per-minute`, including requests that end in `40015`), and only then is `40015` decided. The per-tenant keyboard challenge count is kept in Redis only and is not audited; only `40015` writes an audit log entry, at most one per tenant and IP every 10 minutes. The `type` from `config` is `RANDOM` when two or more types are enabled, otherwise the type name. Everything is checked on the server, the answer is kept only in the challenge record and is gone after one verify attempt, and error codes, failure counts and lockouts are the same for every type.

```yaml
mugsun:
  captcha:
    default-types: [SLIDER, WORD_CLICK, ROTATE, ICON_CLICK, JIGSAW]   # types enabled for tenants without their own setting (all five by default), one picked at random per challenge
    slider: { expire-seconds: 120, decoy-count: 2 }   # challenge lifetime (s); slider decoy gaps (same outline as the real gap, 0–3)
    rotate: { dir: classpath:captcha/rotate/, piece-size: 160, tolerance-deg: 10, keyboard-step: 5, track-replay-window-seconds: 600 }  # a drag track can be used once per window; ≤0 disables
    click:  { count: 3, decoys: 2, min-radius-px: 22, min-duration-ms: 400, max-duration-ms: 30000, words-file: "" }  # count/decoys apply to icon click only; words-file is a private word list, empty = bundled list
    jigsaw: { rows: 2, cols: 2 }
    icon-dir: classpath:captcha/icons/   # icon directory; must contain manifest.json and <slug>.png
    render-max-concurrent: 16           # max concurrent image renders on this node, 40012 when exceeded; ≤0 means no limit
    render-acquire-timeout-ms: 200      # longest wait for a render permit, 40012 on timeout
    rate-limit:
      keyboard-challenge-per-minute: 10 # per-IP keyboard challenges per minute
```

Tolerances are set so an ordinary user passes in 1–2 seconds: ±10° for rotate (the applied angle is a whole multiple of `keyboard-step` between 30° and 330°), a hit radius of 0.75 × the character or icon size (at least 22 px) for clicks, and any two click items are at least the sum of their hit radii plus 6 px apart. Rotate is judged on the submitted angle. Besides showing that a person is operating it, the drag track's start-to-end travel converted to an angle, a_t (travel ÷ display width × 360°), must satisfy 0.5 × submitted angle − 10° ≤ a_t ≤ submitted angle + 10°. The front end may offer slow fine-tuning (travel counts at 0.5× when moving slowly); the track's x must record that accumulated logical position, not the raw pointer coordinate. The same track can be used only once in 10 minutes, so a replayed track fails. The rotate tolerance was deliberately not narrowed: a touch release is usually 3–8 px off and repeated failures lock the IP, so a tighter tolerance causes false lockouts. It is not varied by `pointerType` either, because the client reports that itself. Blind guessing is covered by lockouts, rate limits and per-challenge background randomisation. The 0.4–30 second limit for click and jigsaw counts from the first interaction; the time between opening the challenge and the first interaction is not counted and is bounded only by the challenge lifetime `slider.expire-seconds` (120 seconds by default), after which verify returns `40010`.

Word click words come from a bundled list by default (477 common words and idioms compiled by the project, using only level-1 characters of the Table of General Standard Chinese Characters). The list is public, so an attacker who recognises the characters can correct them against it; in production, point `click.words-file` at a private list (one 3–4 character word per line, `#` starts a comment). Every character must be in the bundled font subset, otherwise that word is skipped with a startup warning; if the private list cannot be read or has no usable words, the bundled list is used. The image also contains 1–2 decoy characters, preferably look-alikes or homophones; clicking a decoy or the wrong order fails. Characters are drawn on the server from a bundled Noto Sans SC subset (SIL OFL 1.1) with added noise, and icons that look alike never appear in the same challenge. If the icon manifest is missing or broken, a warning is logged at startup and icon click is disabled without affecting other types. If a tenant has enabled only icon click, the challenge request returns `40016` (challenge type temporarily unavailable) instead of quietly issuing a slider, and an audit log entry is written (at most one per tenant and IP every 10 minutes).

Every challenge randomly scales, crops, mirrors and recolours the background and rotate images, jigsaw tiles get extra noise and a slight colour shift (±4 per tile) with at least 3 tiles starting out of place, and the slider decoy gaps share the real gap's outline (2 by default). Icon-click icons no longer sit on a white disc; they get a shadow and thin outline that follow their shape, and the noise lines are drawn underneath them. In word click, characters with fewer than 3 strokes (such as 一, 十, 人) are rotated by at most ±15°. The `Accept-Language` header only sets the prompt language (icon-click prompts use English names for English); it never changes which challenge type is served. Click challenges are judged against the background size recorded when the challenge was issued, so changing the size settings does not affect challenges already issued.

**Asset sources and licence:**

- Source: the background and rotate images are the project's own assets, generated by Grok Bot's built-in image generation feature and scaled and cropped by 体验设计官, with no third-party material.
- The icons, word list and decoy character map were compiled by the project.
- Confirmation: the user confirmed public release with the repository on 2026-10-14 07:21.
- Licence: the same as the repository code (MIT); the font subset is SIL OFL 1.1.
- See `captcha/SOURCES.md` in the boot repository.

**Rotate is an auxiliary challenge type:** it is in the platform default random mix, but only partly resistant to automated solving.

- The hole is filled with an opaque solid colour, and the piece gets its own colour shift, blur, noise and feathered edge. Solvers that compare the piece with the pixels inside the hole no longer work.
- Matching the piece edge against the pattern just outside the hole still finds the angle within ±10° for about half of the challenges.
- Never use rotate as the only line of defence: combine it with failure lockout and rate limiting, and enable other types as well.
- If a tenant enables only `ROTATE`, the save still succeeds but the response carries a `data.warning`.

**Icon click is also an auxiliary challenge type:** it is in the platform default random mix, and only partly resistant to automated solving.

- The icon library (including `manifest.json`) is public in the repository, so an attacker can use the icons directly for template matching.
- A template-matching solver runs as a regression test, 200 challenges per run. It currently gets all three icons right in about 2% of challenges, and CI fails above 20%. That only shows it holds up against this kind of solver.
- Never use icon click as the only line of defence: combine it with failure lockout and rate limiting, and enable the slider or other types as well.
- Use a private icon library in production.
- If a tenant enables only `ICON_CLICK`, the save still succeeds but the response carries a `data.warning`.

**Trade-off of random types:** with five types picked at random, an attacker can keep refreshing until the weakest type comes up, so overall strength is close to that of the weakest type. Planned next:

- Keep the same type for a session or IP for a while
- Count a challenge that is fetched but never answered, or expires, as a failure
- Move jigsaw to 3×3 and add seam noise

**Production must use a private asset library:** the default backgrounds (12), rotate images (16) and icons (44) ship with the open-source repository, so an attacker can diff a challenge against the public original to find the gap, or build answer tables for rotate and icons in advance. In production, point `background.dir`, `rotate.dir` and `icon-dir` at your own directories (`file:` or `classpath:`) and rotate them regularly; the icon directory needs a `manifest.json` (`slug`, `name_zh`, `name_en`, `confusable`; without `name_en`, English UIs fall back to the Chinese name). With the `prod` profile, a warning is logged at startup while the bundled assets are still in use (detected by directory or file hash); not setting `click.words-file` also counts as using bundled assets.

Errors come back as HTTP 200 with `R.code`:

| code | Meaning |
| --- | --- |
| `40010` | Challenge expired; fetch a new one |
| `40011` | Failed; fetch a new one (no reason given) |
| `40012` | Too many attempts; retry after `data.retryAfter` seconds. The failure that triggers the lock (the 5th pointer or 3rd keyboard failure) already returns `40012`, as does any failed verify when the IP is already locked (including by a concurrent request or the other input mode). Challenge and verify also return `40012` while locked |
| `40013` | Captcha is required, but the request has no `captchaToken`, or the token was already used, has expired, or belongs to another scene or tenant. The HTTP status is 200; the frontend checks `code` and shows the captcha again |
| `40014` | Verification is not needed right now |
| `40015` | Keyboard challenge requested, but the tenant has neither slider nor rotate enabled (no accessible challenge type) |
| `40016` | None of the tenant's enabled types is available right now (for example only icon click is enabled and the icon manifest is missing); contact the administrator and do not retry automatically |

The verify request body is capped at 32KB, chunked uploads included; an oversized body also gets HTTP 200 with `40011`.

**Forgotten password:** `/auth/forget-code` sends its email asynchronously, so response time does not depend on whether the account exists, and it returns the same success message ("如账号存在，验证码已发送至绑定邮箱"; the admin site shows it in English as "If the account exists, a verification code has been sent to its linked email.") whether the account is missing, has no email, the mail channel is not configured, or sending failed. The actual reason only goes to the server log, so the response reveals neither the account nor the channel state. Check the mail channel after deploying, or users will see "sent" and get nothing.

**Sending SMS:** `/auth/sms-code` runs these steps in order: (1) a per-IP short window of 30 per minute, which counts every request, including ones without a token, and recovers after 60 seconds; (2) a read-only check of the daily quotas (per phone per day, per IP per hour), so an over-quota request does not burn the token; (3) consume the `captchaToken`; (4) a per-phone short window of 5 per minute, counted only once the token has been consumed; (5) atomically count against the daily quotas only if they are not yet full; (6) send. Requests with no token or a bad token only count toward the per-IP window, never the per-phone window or the daily quota, so nobody can lock out a number or use up its quota for the day on its owner's behalf. A failed send still counts and is written to the audit log. Every limit returns `40012` with `retryAfter`. The phone number has spaces and `-` removed and any `+86`/`0086`/`86` prefix stripped, and the limits, sending and SMS login all use that form.

**Redis keys:** captcha state lives under the prefix `mugsun:captcha:v2:` (with `store: memory` the same keys live in-process):

| Key | Purpose | Expiry |
| --- | --- | --- |
| `challenge:<captchaId>` | Challenge (answer and bindings), taken and deleted on verify | `expire-seconds` |
| `token:<captchaToken>` | One-time token, taken and deleted by the business endpoint | `token-expire-seconds` |
| `rl:challenge:<ip>` | Challenges per IP per minute | 60 s |
| `rl:keyboard:<ip>` | Keyboard verifies per IP per minute | 60 s |
| `rl:global:<second>` | Global challenges per second | 2 s |
| `rl:sms-phone:<phone hash>` / `rl:sms-ip:<ip>` | SMS daily quotas (counted only after the token is consumed) | 1 day / 1 hour |
| `rl:sms-burst-phone:<phone hash>` / `rl:sms-burst-ip:<ip>` | SMS short-window limit | 60 s |
| `fail:<pointer\|keyboard>:<ip>` | Failure counter | `fail-window-seconds` |
| `lock:<ip>` | IP lock; its remaining TTL is `retryAfter` | `lock-seconds` |

`:` in IPv6 addresses is written as `_`. To unlock an IP by hand: `DEL mugsun:captcha:v2:lock:<ip>`.

::: warning Turning captcha off removes brute-force protection
With `mugsun.captcha.enabled=false`, or with captcha turned off for a tenant, that tenant's login, registration and forgot-password code no longer require human verification. Only login lockout and rate limits remain. Turn it off only briefly, for troubleshooting or until the frontend is upgraded.
:::

**Tenant switch:** on by default for every tenant. The platform super admin can turn it off for one tenant with `POST /system/tenant/captcha` (`{"id": tenantId, "enabled": false}`); the change is audited and other tenants are unaffected. With several nodes, the others pick it up within 60 seconds. Sending SMS codes does not depend on the tenant: only the global switch applies, plus per-phone daily and per-IP hourly limits. The client switch (`sys_client.captcha_enabled`) plays no part, because the caller chooses the clientId. New tenants always start with verification on. The platform super admin can also pass `types` on the same endpoint (for example `{"id": 1, "enabled": true, "types": ["SLIDER", "ROTATE"]}`) to choose the tenant's challenge types: at least one, from the five above. Leaving `types` out keeps the current setting, passing `null` or `[]` resets it to the platform default (`default-types`), and tenants that never set it use `default-types`. A setting without `SLIDER` and `ROTATE` is still saved, but `data.warning` in the response says keyboard users will get `40015`. The setting lives in `sys_tenant.captcha_types` (migration `V10__tenant_captcha_types.sql`).

## Social login

Social login is built on JustAuth and supports four sources: `github`, `gitee`, `qq` and `wechat_open` (WeChat Open Platform QR login). Source names are case-insensitive.

```yaml
mugsun:
  social:
    enabled: true            # master switch; when false, every source is rejected
    type:
      github:
        client-id: <app ID>
        client-secret: <app secret>
        redirect-uri: <callback URL registered with the provider>
        scopes: []
```

- A source appears in `GET /auth/social/sources`, and gets a button on the login page, only when both `client-id` and `client-secret` are set.
- With no source configured, the login page hides the social login area and startup is not affected.
- `redirect-uri` is set per source by whoever deploys; the backend does not build it. The console callback page is `/auth/social-callback`.
- The console uses hash routing, so the callback URL contains `#`. Test on each provider whether it accepts such a URL.
- Sign-in flow: `GET /auth/social/render/{source}` returns the authorization URL, and the callback page then calls `POST /auth/social/login`.
- Signed-in users bind with `POST /auth/social/bind` and unbind with `DELETE /auth/social/unbind/{source}`.
- When a third-party account is not bound yet, the console does not register a new user; it asks the user to sign in and bind first.
- Only requests with `clientType=app` from mobile apps create and bind a new account, which joins the default tenant.
- Binding a third-party account that is already bound to another user fails. Sign-in is refused when the account is disabled or the tenant is no longer valid.
- Social sign-ins are written to the login log with type `social`.

The `mock` source is only for local development. It needs `mock-enabled: true` and a `type.mock` entry, which the example file already has. The `prod` profile always turns the `mock` source off.

## IP location

IP location for the login log is off by default. While it is off, the location column in the login log shows `-`.

| Setting | Environment variable | Default | Purpose |
| --- | --- | --- | --- |
| `mugsun.ip2region.enabled` | `MUGSUN_IP2REGION_ENABLED` | `false` | Whether to resolve IP locations |
| `mugsun.ip2region.xdb-path` | `MUGSUN_IP2REGION_XDB_PATH` | empty | Absolute path of the xdb data file on the server |

To turn it on:

1. Download `ip2region_v4.xdb` from the `data` directory of the lionsoul2014/ip2region repository on GitHub. The file is not shipped with mugsun.
2. Put it in a local directory on the server, point `xdb-path` at it, and set `enabled=true`.

Check the upstream repository's license before use. Only IPv4 is supported. Locations are shown as country, province and city, without the ISP.

If it is turned on without a path, or the file fails to load, the backend logs an error and disables lookups. Startup is not blocked.

## Serial numbers

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.serial-number.provider` | `redis` | How serial numbers are generated: `redis` or `db` |

- `redis`: an atomic increment in Redis, warmed up from the last value in the database at startup so numbers never go backwards.
- `db`: a row lock inside a transaction. It needs no Redis but has lower throughput, and suits setups without Redis or with strict consistency needs.
- Any other value does not stop startup, but generating a serial number then fails. At most 1000 numbers are generated per call.
- With several nodes, every node must use the same provider.
- With `redis`, every node must connect to the same Redis, and persistence is recommended.

## Database schema

| Setting | Default | Purpose |
| --- | --- | --- |
| `mugsun.db.default-schema` | empty | Schema that holds the business tables |

This setting is for PostgreSQL-protocol databases such as KingbaseES, so that business tables live in their own schema and do not clash with the system catalog.

When it is set, business tables (except `track_*`) and table names in hand-written SQL get this schema prefix, and Flyway uses the schema and creates it if needed.

When it is empty, nothing changes and the connection's default schema is used, usually `public` on PostgreSQL. openGauss has not been tested.

## Startup guards and exemption switches

The settings below stop startup when they are misconfigured in production. Only explicitly active profiles (`spring.profiles.active`) count: the list must be non-empty, include
`dev`, `test` or `local`, and include no production name (see below). Everything else is treated as production.
Names are trimmed and lowercased before comparison:

- No profile at all is treated as production. **This is a behavior change**: for local testing, pass `--spring.profiles.active=dev` explicitly (`mvn spring-boot:run` already activates `dev`).
- If the active list contains `prod`, `production`, `prd` or `staging`, it is production even with `dev`; `DEV` equals `dev`.
- Any other name on its own (such as `demo` or `qa`) is also production.
- `spring.profiles.default` is ignored: `default=dev` with no active profile is production.

| Setting | Dangerous value in production | Exemption switch |
| --- | --- | --- |
| `mugsun.security.init-password` | not set | none |
| `mugsun.lab.seed-fronttest` | `true` (seeds a test account with a weak password) | none |
| `mugsun.open-api.sign-required` | `false` | `mugsun.open-api.i-understand-unsigned-requests-are-insecure=true` |
| `mugsun.crypto.gm-enabled` | `false` | `mugsun.crypto.i-understand-plaintext-passwords-rely-on-tls=true` |

Use an exemption switch only when you truly cannot meet the requirement; every start then logs a WARN.

**With SM-series crypto off, passwords rely entirely on TLS.** Even with the exemption, in production sign-in, registration, password change and password reset requests must be HTTPS (checked with `request.isSecure()`) or they are rejected. Behind a reverse proxy, have the proxy send `X-Forwarded-Proto` and set `server.forward-headers-strategy=native` on the backend; a forged header on its own is not trusted.

## Production

The `prod` profile turns off the OpenAPI docs (springdoc / swagger-ui), forces `strict-keys: true` and disables mock social login. A minimal start looks like this:

```bash
export SPRING_PROFILES_ACTIVE=prod
export JDBC_URL=jdbc:postgresql://db:5432/mugsun
export JDBC_USERNAME=mugsun JDBC_PASSWORD=******
export REDIS_HOST=redis MUGSUN_FRONT_URL=https://admin.example.com
export MUGSUN_INIT_PASSWORD=****** MUGSUN_SM4_KEY=****** MUGSUN_API_KEY=******
export MUGSUN_SM2_PRIVATE_KEY=... MUGSUN_SM2_PUBLIC_KEY=...
export MUGSUN_SIGN_PRIVATE_KEY=... MUGSUN_SIGN_PUBLIC_KEY=...
java -jar mugsun-boot.jar
```

Work through the [Security checklist](/en/boot/security-checklist) before going live.
