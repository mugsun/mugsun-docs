# Permissions & attachments

This page explains how endpoints are authorized and which permission codes the attachment, avatar, import and export endpoints need. Upload limits and deployment requirements are here too.

Grant permission codes in System Settings → Role Manage: click Authorize on a role and check its menus and buttons.

![Role management page: each role has an Authorize button on the right](/screenshots/pc/system-roles.png)

## Permission model

- The backend delivers menus, button permission codes and user info. The admin console renders the sidebar and buttons from them and keeps no second copy of the permissions.
- Endpoints declare access with Sa-Token annotations: `@SaCheckLogin` needs any signed-in user, `@SaCheckPermission` needs a permission code.
- Tenant isolation is enforced at the query layer. Data from another tenant, or data you can't access, is reported as not found, so error messages don't reveal whether it exists.
- Creating, updating and deleting users, and syncing their roles, run in one transaction.
- Deleting a user removes its role links and, after commit, signs out its sessions.

### Write endpoints that declare no permission {#derived-code}

When a POST, PUT or DELETE endpoint under `/system/` declares no permission, the backend derives a permission code from the path and checks it.

"Declares no permission" means that neither the method nor the class has `@SaCheckPermission`, `@SaCheckRole` or `@SaIgnore`.

The code has the form `sys:<domain>:<action>`. The domain is the first path segment after `/system/`, and the action is the second, mapped as follows:

| Action in the path | Action in the code |
| --- | --- |
| `submit`, `save`, `create`, `update`, `add` | `save` |
| `remove`, `delete` | `remove` |
| `status`, `enable`, `disable` | `edit` |
| `import` | `import` |
| `grant` | `grant` |
| anything else | used as is |

For example, `POST /system/demo/submit` requires `sys:demo:save`. Users without that code get 403. Administrators, who hold the wildcard `*`, pass as usual.

- A path with only two segments, such as `POST /system/demo`, yields no code and needs sign-in only.
- Personal and shared endpoints, such as the workbench, messages, and starting or handling a flow, are exempt from this rule.
- The full exemption list is `PermissionModules.EXEMPT_PREFIXES` in the backend.

## Attachment permission codes

| Code | Name | Effect |
| --- | --- | --- |
| `sys:file:list` | List attachments | View the attachment list |
| `sys:file:upload` | Upload attachments | Call `/system/file/upload`, `presigned-put` and `create` to upload attachments |
| `sys:file:manage` | Manage all attachments | Download or delete other users' private attachments; private attachments with no recorded uploader can only be handled with this code |
| `sys:file:public` | Upload public attachments | Allows marking an upload as public; without it, uploads are always private |
| `sys:file:remove` | Delete attachments | Delete attachments; you must also be the uploader or hold `sys:file:manage` |

The `manage`, `public` and `remove` codes are pre-granted to the admin role by a database migration. Grant them to other roles in Role Manage as needed.

A newly created role needs the upload permission checked, otherwise uploads return 403.

### Who can download and delete

Every check filters by tenant first:

| Action | Allowed for |
| --- | --- |
| Download | The uploader; holders of `sys:file:manage`; any signed-in user in the same tenant if the attachment is public |
| Delete | The uploader or a holder of `sys:file:manage`, and `sys:file:remove` is required as well |
| Upload as public | Holders of `sys:file:public`; other users asking for public get private instead |

Other tenants' attachments, missing attachments and attachments you can't access all return 404, so their existence isn't revealed.

Legacy attachments have no recorded uploader. Their private ones can only be downloaded or deleted with `sys:file:manage`.

## Upload limits

### File types and size

- Images (png, jpg, gif, webp, bmp), PDF and Office documents are accepted.
- txt, csv, md, zip, mp4 and mp3 are accepted too. html, svg, js, xml and the like are always rejected.
- The server checks both the extension and the file header, so a file with a changed extension is rejected.
- The header check only catches a changed extension. It does not check that the file is complete.
- A single file is limited to 20MB. A larger upload is cut off while it is being received and gets HTTP 400.
- The stored file name and the Content-Type are decided by the server from the extension.
- The file name sent by the user is only displayed, and the type reported by the client is ignored.

On download, both local serving and authorized downloads send `Content-Disposition: attachment` and `X-Content-Type-Options: nosniff`.

Public files get the same headers. Objects in cloud storage are written with `Content-Disposition: attachment` at upload time.

### How oversized requests are rejected

The backend sets `server.tomcat.max-swallow-size: 32MB` so that an oversized upload reliably gets the 400 response.

- By default Tomcat reads only 2MB of a rejected body, then closes the connection, and the client may never see the 400.
- The value must be larger than the request limit (`max-request-size`, 21MB).
- Requests over 32MB are still cut off before the body is fully read. This is deliberate bandwidth protection.
- Keep `server.tomcat.connection-timeout` at the default or shorter. Do not raise it.

In production, set `client_max_body_size` on the reverse proxy to about 21MB (or the equivalent limit) as the first gate.

The 32MB setting only matters when clients reach Tomcat directly.

## Direct upload from the browser

The browser can send a file straight to object storage without passing it through the backend. There are three steps:

<div class="ms-steps">

### Request an upload URL

Call `POST /system/file/presigned-put` with `filename` and `size` (in bytes) in the body. More than 20MB is rejected right away.

The response holds `uploadUrl`, `headers` and a one-time `ticket`, valid for 15 minutes.

When the active storage cannot sign upload URLs (local storage, for example), the response is `supported: false`. Use `/system/file/upload` instead.

### Upload the file

PUT the file to `uploadUrl` and send the returned `headers` unchanged.

The signature covers `Content-Length`, `Content-Type` and `Content-Disposition: attachment`. Change any of them and the signature no longer matches.

### Register the attachment

Call `POST /system/file/create` with the `ticket` from the first step in the body. When the checks pass, the response is the attachment.

A ticket works once. After it is used or expires, start again from the first step.

</div>

### What the server checks

- Upload URLs are only signed for the private staging prefix `tmp/`, never directly for `public/` or `private/`.
- On registration, the server first copies the staged object to a new key that the client does not know.
- The new key is under `public/` or `private/`, and the server then reads back the **new key**.
- If the size or type differs from the request, or the file header does not match, both the old and the new object are deleted and the request is rejected.
- The bytes that are checked are the bytes that get registered, so nothing can be overwritten between the check and the registration.
- The `filename` of the returned attachment differs from the file name in the upload URL.

### Cleaning up staged objects

- The staged object is deleted right after the copy, and once more after the signature expires (15 minutes plus 1 minute).
- The second delete removes anything that was PUT again while the URL was still valid.
- Objects that can't be deleted go into a pending-delete queue. A scheduled job retries every 10 minutes.
- After 20 failed deletes in a row, an error is logged and the object needs manual cleanup.
- If registering a new key throws, the key is queued at once but handled only after 60 seconds. The job checks the attachment table first and keeps registered objects.
- If the attachment table can't be queried, the item goes back unchanged, the failure isn't counted, and the next round retries.
- After more than 144 rounds (about 1 day) without a successful lookup, one summary error is logged and the items are still kept.
- The summary carries the number of items that crossed the limit in that round and the first 5 keys.
- Before each delete the job checks again: only objects under `tmp/`, or freshly generated random keys that aren't registered, are deleted.
- Registered objects are never deleted. A warning is logged and the item is dropped from the queue.
- Local storage doesn't sign direct uploads, but the job still removes files under the local `tmp/` that are older than 1 day.

### Deployment: the staging prefix `tmp/`

`tmp/` is only a staging area for direct uploads. A deployment must do two things:

- **No public read, no CDN.** Configure public-read policies and CDN origins for `public/` only.
- **Add a lifecycle rule that deletes objects under `tmp/` after 1 day.** This is the safety net on the deployment side.

The server already deletes staged objects. The lifecycle rule covers a crashed process or a lost queue. How to write it for each storage:

| Storage | Rule |
| --- | --- |
| S3 | Lifecycle rule, filter prefix `tmp/`, Expiration Days=1 |
| Alibaba Cloud OSS | Lifecycle rule by prefix `tmp/`, object expiration 1 day |
| Tencent Cloud COS | Lifecycle, prefix `tmp/`, delete objects after 1 day |
| MinIO | `mc ilm rule add --prefix "tmp/" --expire-days 1 <alias>/<bucket>` |

When a basePath is configured, write the prefix as `<basePath>tmp/`.

## Multipart allowlist {#anonymous-multipart-requests}

The backend checks multipart requests before any other filter, deciding from the request line and headers only.

Only these 5 paths accept multipart. Multipart sent to any other path gets 415:

- `/system/file/upload`
- `/auth/avatar/upload`
- `/system/user/import`
- `/system/region/import`
- `/system/track/sourcemap/upload`

These 5 paths need a signed-in user, otherwise the response is 401. Tokens that were kicked out, replaced by another login, or expired also get 401.

The endpoint's own permission codes still apply. The rules:

- Every `multipart/*` type counts, and the Content-Type check ignores case.
- Paths must match exactly. A trailing slash, `;params`, encoded characters, double slashes or different case are treated as not listed and get 415.
- The token is read only from the `Authorization` header or a cookie of the same name. A multipart request that passes the token as a URL parameter gets 401.
- Rejected multipart requests are never parsed or written to disk, and the response carries `Connection: close`.

::: warning For deployments and clients
Within `server.tomcat.max-swallow-size`, the container may still read the rest of the body and discard it. In production, always set a request body limit on the reverse proxy (about 21MB).

Clients should make sure they are signed in before uploading. When not signed in, they may see the connection closed instead of a 401.
:::

### Add an upload endpoint

To add an upload endpoint, add its path to `mugsun.security.multipart.allowed-paths`.

A YAML list replaces the default as a whole, so list the 5 default paths too:

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

- Use the servletPath, without the context path. Wildcards aren't supported.
- The backend refuses to start if an entry is empty, doesn't start with `/`, or contains `*`, `**`, `..`, `;`, `{` or `}`.
- Upload endpoints cannot use path variables.
- At startup the backend compares the list with the endpoints that receive files and logs a WARN for any that are missing.
- It recognizes file parameters, `@RequestPart` and `consumes=multipart/*`.
- Endpoints that call `getParts()` directly in the method body cannot be detected and must be added by hand.

## Form, flow and platform write endpoints

| Endpoint | Permission code | Notes |
| --- | --- | --- |
| `POST /system/form/submit`, `/remove` | `sys:form:save`, `sys:form:remove` | Form design |
| `POST /system/flow/deploy` | `sys:flow:deploy` | Deploy the sample flow |
| `POST /system/flow/design`, `/design-graph` | `sys:flow:design`, `sys:flow:design-graph` | Flow design |
| `POST /system/flow/definition/publish/{id}`, `unpublish/{id}` | `sys:flow:definition` | Publish, unpublish |
| `POST /system/rule/tenant-init` | `sys:rule:tenant-init` + platform super admin | Demo rule chain that only records three step names |
| Write endpoints for tenants, plans and tenant data sources | `sys:tenant:*`, `sys:tenant-package:*`, `sys:tenant-datasource:*` + platform super admin | One more layer on top of the path check |

The platform super admin is an account that holds the `admin` role in the platform tenant `000000`.

## Export and import permission codes

Export, import and template download each use their own permission code, named `module:resource:export|import`.

A role that only has list access (`*:list`) cannot export the whole table.

| Endpoint | Permission code | Data scope |
| --- | --- | --- |
| `GET /system/user/export` | `sys:user:export` | Same as the user list: tenant isolation plus the role's data permissions |
| `GET /system/user/import-template` | `sys:user:import` | Header row and one sample row only |
| `POST /system/user/import` | `sys:user:import` | Writes into the current tenant |
| `GET /system/region/export` | `sys:region:export` | Regions are global data |
| `GET /system/region/template`, `POST /system/region/import` | `sys:region:import` | Global data |
| `GET /system/ai/*/export`, `POST /system/ai/app/import` | The AI module's own export and import codes | See the AI docs |

- User Manage has two button permissions: export users (`sys:user:export`) and import users (`sys:user:import`).
- Regions have no menu node, so `sys:region:*` is available only to the super administrator (wildcard `*`).
- Without the permission the endpoint returns HTTP 403, and `code` in the body is 403.
- Export and import both write operation logs. User export follows data permissions the same way the list does.
- The phone number follows field permissions: empty without view access, masked without plaintext access. The ID number is not among the exported columns.

When you upgrade from an older version, these codes are granted automatically according to the permissions a role already has. See the [Upgrade guide](/en/boot/upgrade#perm-codes).

## Avatars

Avatars don't need `sys:file:public`. Use the dedicated endpoints:

| Endpoint | Auth | Description |
| --- | --- | --- |
| `POST /auth/avatar/upload` | Signed in | `multipart/form-data` with a `file` field. Sets the upload as your avatar and returns the attachment (`data.url` is the avatar URL) |
| `GET /auth/avatar/raw/{id}` | Anonymous | Serves the avatar image, usable directly as `<img src>`; avatar public area only, regardless of storage (local, MinIO or OSS) |
| `POST /auth/update-avatar` | Signed in | Binds an existing attachment as your avatar. Only public attachments you uploaded in your tenant are accepted; external URLs are rejected |

- Only png, jpg / jpeg, gif and webp are accepted. The extension, MIME type and file header are checked, and svg is rejected.
- One image is limited to 2MB.
- Through the gateway, add the `/api` prefix as for other `/auth` endpoints.

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <token from sign-in>" \
  -F "file=@avatar.png"
```

The avatar upload in the admin console's User Center uses `/auth/avatar/upload`.

## Next steps

<div class="ms-cards">

- [Data permissions](/en/boot/datascope/) Beyond permission codes, filter data by department and owner.
- [Open API](/en/boot/open-api) Let external systems call the API with a key or OAuth.
- [Security checklist](/en/boot/security-checklist) Go through it item by item before going live.

</div>
