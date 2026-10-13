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

Download and delete rules: **attachments you uploaded**, or any attachment if you hold `sys:file:manage`. Other users' and other tenants' attachments are treated as nonexistent. The `manage`, `public` and `remove` codes are added by the Flyway baseline; grant them under role management as needed.

## Avatars

Avatars don't need `sys:file:public`; use the dedicated endpoints:

| Endpoint | Auth | Description |
| --- | --- | --- |
| `POST /auth/avatar/upload` | Signed in | `multipart/form-data` with a `file` field. Sets the upload as your avatar and returns the attachment (`data.url` is the avatar URL) |
| `GET /auth/avatar/raw/{id}` | Anonymous | Serves the avatar image (avatar scope only); usable directly as `<img src>` |
| `POST /auth/update-avatar` | Signed in | Binds an existing attachment as your avatar. Only public attachments you uploaded in your tenant are accepted; external URLs are rejected |

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <token from sign-in>" \
  -F "file=@avatar.png"
```

The console's profile page already uses `/auth/avatar/upload`.

## Next

[Open API](/en/boot/open-api) · [Security checklist](/en/boot/security-checklist)
