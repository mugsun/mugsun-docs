# Object storage

Where attachments are stored is set under Storage Config. It is built on x-file-storage and supports local disk, MinIO and Aliyun OSS.

## What it does

- Register several storage settings of type `local`, `minio` or `aliyun`.
- Enable one of them; new attachments are stored there. Each tenant can have only one enabled setting.
- Use Check to verify a setting: local storage does a test write, and remote storage confirms that the endpoint is reachable.

## How to turn it on

With no setting enabled, attachments go to a local directory configured under `dromara.x-file-storage` in `application.yml`. The default directory is `/tmp/mugsun-files/`.

Local storage serves downloads under `/file/**`. With several instances, every instance must use the same `MUGSUN_FILE_SIGN_SECRET` of at least 32 characters.

## How to use it

1. Open System Settings → Storage Config and add a setting with its type, endpoint, AccessKey, SecretKey and bucket.
2. Click Check to confirm it can connect.
3. Click Enable.

For uploading, downloading and attachment permissions, see [Permissions and attachments](/en/boot/permissions).

## Notes

- The SecretKey is not shown again after saving. Leave it empty when editing to keep the current value.
- Private attachments on local storage need a short-lived signature to download. Signatures expire after 300 seconds by default.
- The Storage Config page is open only to the platform super admin.

## See it work

After enabling a setting, check which storage is in use:

```sql
SELECT name, oss_code, category, bucket_name, status
FROM sys_oss
WHERE is_deleted = 0 AND status = 1;
```

Each tenant has at most one row. Attachments uploaded afterwards appear in that bucket or directory.

Previous: [Reports](./report) · Next: [SMS and mail](./notify)
