# Live demo

## Try the admin console and analytics locally

Run the full backend on your machine with these commands (requires Docker and JDK 21):

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

For the console (pc) and verification steps see [Getting started](/en/guide/getting-started). Credentials follow the [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README_EN.md)—**change the password on first login**.

## uni-app x (ms-ui) component H5

Component pages show a phone frame (bottom-right) that embeds the hosted H5 preview (`/demo/index.html`). Example: [Button](/en/uniappx/components/button).

Full H5 entry: [Open ms-ui demo](/demo/index.html) (new tab).

## External showcases: read-only demo mode

For a public showcase, run boot with the `demo` profile and non-production secrets:

```bash
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=prod,demo
```

::: warning PostgreSQL only for now
Demo mode currently supports PostgreSQL deployments only. Dameng, KingbaseES, openGauss and MySQL are not supported for demo yet.
:::

With demo mode on (`mugsun.demo.enabled=true`), the backend denies by default:

| Category | Handling |
|---|---|
| GET / HEAD / OPTIONS queries | Allowed |
| Login, logout, two-factor, captcha check | Allowed |
| Tracking collection `/track/collect`, `/track/replay`, `/track/api-body` | Allowed (tracking stays on in demo; set `mugsun.demo.track-collect=false` to turn it off) |
| Every other POST / PUT / DELETE / PATCH (registration, password change/reset, uploads, imports, AI, codegen and low-code DDL, job admin, system settings, …) | HTTP 403 with `msg` "演示环境只读" (demo is read-only) and `errorCode` `DEMO_READONLY` |
| `/open/**`, `/oauth2/**`, `/v1/**`, `/system/crypto/**` | Rejected for every method |
| Requests carrying method-override headers such as `X-HTTP-Method-Override`, or a `_method` parameter | Rejected |
| Inbound WebSocket messages | Dropped (heartbeat only); the channel is push-only |

New write endpoints are rejected by default. `docs/demo/readonly-endpoints.md` in the boot repo is a generated list of every write endpoint, kept in sync with the code by a test.

::: tip Work in progress
A read-only database account (SELECT only on the business database; a separate INSERT/SELECT account for tracking), a daily sample-data reset at 04:00 Beijing time, sensitive-word filtering (word list loaded from an external path, empty by default), six-month access-log retention, and read-only hints in the admin console arrive in later releases. Until then, don't treat demo mode as your only line of defence.
:::

Next: [Getting started](/en/guide/getting-started) · [Security checklist](/en/boot/security-checklist) · [ms-ui](/en/uniappx/)
