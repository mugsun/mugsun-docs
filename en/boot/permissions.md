# Permissions & attachments

## Permission model

- boot delivers menus, button permission codes and user info; the console renders the sidebar and buttons from them and keeps no second permission model.
- Endpoints declare access with Sa-Token annotations: `@SaCheckLogin` (any signed-in user) or `@SaCheckPermission("sys:xxx:yyy")` (requires a code).
- Tenant isolation is enforced at the query layer. Data from another tenant, or data you can't access, is reported as not found, so error messages can't be used for probing.
- Creating, updating and deleting users, and syncing their roles, run in one transaction. Deleting a user removes its role links and, after commit, signs out its sessions.

## Attachment permission codes

| Code | Name | Effect |
| --- | --- | --- |
| `sys:file:list` | List attachments | View the attachment list |
| `sys:file:manage` | Manage all attachments | Download or delete other users' private attachments; legacy private attachments without an uploader can only be handled with this code |
| `sys:file:public` | Upload public attachments | Allows marking an upload as public; without it, uploads are always private |
| `sys:file:remove` | Delete attachments | Delete attachments (you must still be the uploader or hold `sys:file:manage`) |

Access rules (every check filters by tenant first):

| Action | Allowed for |
| --- | --- |
| Download | The uploader; holders of `sys:file:manage`; any signed-in user in the same tenant if the attachment is public |
| Delete | Only the uploader or holders of `sys:file:manage` (and `sys:file:remove` is required) |
| Upload as public | Only holders of `sys:file:public`; ordinary users asking for public get private instead |

Other tenants' attachments, missing attachments and attachments you can't access all return 404, so their existence isn't revealed. Legacy attachments have no recorded uploader; their private ones can only be downloaded or deleted with `sys:file:manage`.

The `manage`, `public` and `remove` codes are pre-granted to the admin role by a database migration; grant them to other roles under role management as needed.

## Avatars

Avatars don't need `sys:file:public`; use the dedicated endpoints:

| Endpoint | Auth | Description |
| --- | --- | --- |
| `POST /auth/avatar/upload` | Signed in | `multipart/form-data` with a `file` field. Sets the upload as your avatar and returns the attachment (`data.url` is the avatar URL) |
| `GET /auth/avatar/raw/{id}` | Anonymous | Serves the avatar image, usable directly as `<img src>`; avatar public area only, regardless of storage (local, MinIO or OSS) |
| `POST /auth/update-avatar` | Signed in | Binds an existing attachment as your avatar. Only public attachments you uploaded in your tenant are accepted; external URLs are rejected |

Upload limits: png, jpg / jpeg, gif and webp only (extension, MIME type and file header are checked; svg is rejected), up to 2 MB. Through the gateway, add the `/api` prefix as for other `/auth` endpoints.

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <token from sign-in>" \
  -F "file=@avatar.png"
```

The console's profile page already uses `/auth/avatar/upload`.

## Anonymous multipart requests

The backend checks multipart requests before any other filter, using only the request line and headers. It never reads the body to decide:

- Only these 5 paths accept multipart. Multipart sent to any other path gets 415:
  - `/system/file/upload`
  - `/auth/avatar/upload`
  - `/system/user/import`
  - `/system/region/import`
  - `/system/track/sourcemap/upload`
- These paths need a valid token, otherwise 401. Tokens that were kicked out, replaced by another login, or expired also get 401. The endpoint's own permission codes still apply.
- Every `multipart/*` type counts, and the Content-Type check ignores case.
- Paths must match exactly. A trailing slash, `;params`, encoded characters, double slashes or different case are treated as not listed and get 415.
- The token is read only from the `Authorization` header or a cookie of the same name. A multipart request that passes the token as a URL parameter gets 401.
- Rejected requests are answered without reading the body, with `Connection: close`.

To add an upload endpoint, add its path to `mugsun.security.multipart.allowed-paths`. A YAML list replaces the default as a whole, so list the 5 default paths too:

```yaml
mugsun:
  security:
    multipart:
      allowed-paths:
        - /system/file/upload
        - /auth/avatar/upload
        - /system/user/import
        - /system/region/import
        - /system/track/sourcemap/upload
        - /system/demo/upload   # your new endpoint
```

Use the servletPath, without the context path; wildcards aren't supported. The backend refuses to start if an entry is empty, doesn't start with `/`, or contains `*`, `**`, `..` or `;`. At startup the backend compares the list with endpoints that take a `MultipartFile`, and logs a WARN for any that are missing.

## Pending-delete queue

Storage objects that can't be deleted right away go into a Redis queue.
A scheduled job retries every 10 minutes.

- After 20 failed deletes, an error is logged and the item needs manual cleanup.
- If registering a fresh key throws, the key is queued at once but handled
  only after 60 seconds. This 60-second delay applies only to that path.
- Before each delete the job checks the attachment table.
  - Only keys under `tmp/`, or freshly generated keys that aren't registered,
    are deleted.
  - Registered objects are never deleted: a warning is logged and the item
    is dropped from the queue.
  - If the attachment table can't be queried, the item goes back unchanged
    and the failure isn't counted.
- After more than 144 rounds (about 1 day) without a successful lookup,
  an error is logged and the items are still kept.
  - Items that cross the limit in the same round are merged into one alert,
    with the count and the first 5 keys.
- Local storage doesn't sign direct uploads, but the job still removes files
  under the local `tmp/` that are older than 1 day.

## Next

[Open API](/en/boot/open-api) · [Security checklist](/en/boot/security-checklist)
