# Online sessions and login clients

The Online Sessions page lists every terminal that is signed in right now, and can force any one of them offline. The Login Clients page sets a token lifetime and a per-account limit of online terminals for each kind of client.

![Online Sessions page: four online terminals, one per row, with account, device and login IP, and Force Offline at the end of each row](/screenshots/features/session-online.png)

## What it does

- One account can be signed in on several terminals at once, and each terminal has its own row in the list.
- Force Offline removes only the selected terminal; its page receives a push, shows a notice and returns to the sign-in page.
- When an account is disabled, locked or deleted, all of its terminals go offline automatically; the same happens when its password is reset.
- Each login client has its own online limit and token lifetime; `web` and `app` are built in.

## Enable it

Online sessions and login clients start with the backend. Sessions are stored in Redis, so terminals stay online after the backend restarts.

The global defaults are in `application.yml`:

```yaml
sa-token:
  timeout: 2592000
  is-concurrent: true
  is-share: false
  max-login-count: 12
```

`timeout` is the default token lifetime in seconds. `max-login-count` is the most terminals one account can have online at once; beyond it, the terminal that signed in first goes offline.

## Use it

### Force a terminal offline

Open System Settings → Online Sessions, click Force Offline on the row you want and confirm. The backend revokes that terminal's token and closes its push connection.

Other terminals of the same account are not affected. The list shows only the first and last 4 characters of each token.

### Clean stale sessions

When an account is no longer in the database but its session is still in Redis, the row is tagged Stale. A Clean stale button then appears at the top of the page; click it and confirm to take all those terminals offline.

Deleting a user in the admin console also removes its sessions, so stale sessions usually appear after the database was changed directly.

### Set a client policy

Open System Settings → Login Clients and click Add Client:

| Field | Description |
| --- | --- |
| Client Code | Starts with a lowercase letter; lowercase letters, digits, underscores and hyphens; up to 64 characters; cannot be changed after creation |
| Name | Up to 64 characters |
| Max Online | The limit of online terminals for one account; `0` means unlimited, 9999 at most |
| Token TTL (seconds) | 60 to 31536000; the default is 2592000, which is 30 days |
| Captcha | No longer has any effect; the behavioral captcha follows the global switch and the tenant switch only |

![Login Clients page: three rows for the mini program, the mobile workbench and the admin console, with online limit, token lifetime and status](/screenshots/features/session-client.png)

The `clientId` in the sign-in request body decides which client applies; without it, `web` applies. The mobile workbench always uses `app`.

After a successful sign-in, if the account has more online terminals than this client allows, the terminal that signed in first goes offline. The limit counts all terminals of the account, whatever client they used.

The built-in `web` and `app` clients cannot be disabled or deleted.

## Notes

- Only the platform super admin can call the endpoints behind these two pages; admins of other tenants cannot open them.
- A changed online limit or token lifetime applies to later sign-ins only; terminals that are already signed in keep theirs.
- Client policies apply to account and password sign-in only. SMS sign-in, third-party sign-in and two-factor sign-in in the admin console use the global defaults.
- The client code is supplied by the sign-in request, and the backend does not verify where it comes from. A code that is not registered or is disabled signs in with no online limit and a 30-day token.
- When the backend runs behind a reverse proxy, configure [trusted proxies](/en/boot/open-api#client-ip-and-trusted-proxies) so that the login IP is the user's real address.

## Verify

List the online terminals:

```bash
curl -s http://localhost:8080/system/online/list -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"loginId":"109460988842000151","stale":false,"username":"admin","nickname":"超级管理员","tokenMask":"1f3a****9c2e","deviceType":"web","ip":"192.168.1.20","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36","loginTime":"2026-11-21 00:41:42"}],"msg":"操作成功","dataType":null}
```

After a terminal is forced offline, a request with its token returns 401:

```json
{"code":401,"success":false,"data":null,"msg":"请求未授权","dataType":null}
```

## Next steps

<div class="ms-cards">

- [Logs and auditing](./log) Login logs record the result of every sign-in, and accounts locked after repeated failures are unlocked there.
- [Messages and announcements](./message) The force-offline notice travels over the same WebSocket connection as in-app messages.
- [Behavioral captcha](/en/boot/captcha#tenant-switch) Whether sign-in needs verification is decided by the global switch and the tenant switch.
- [Tenants and plans](/en/boot/tenant/manage#platform-endpoints) Which endpoints are for the platform super admin only.

</div>
