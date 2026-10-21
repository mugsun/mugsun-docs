# 对象存储

附件的存储位置在「存储配置」里设置，基于 x-file-storage，支持本地、MinIO 和阿里云 OSS。

## 能干什么

- 登记多套存储配置，类型为 `local`、`minio` 或 `aliyun`。
- 启用其中一套，上传的附件存到这一套里。同一租户只能启用一套。
- 用「检查」按钮确认配置可用：本地存储会试写一次，远程存储会确认地址能连上。

## 怎么开

没有启用任何配置时，附件存在本地目录，由 `application.yml` 的 `dromara.x-file-storage` 设置。

默认目录是 `/tmp/mugsun-files/`。

本地存储通过 `/file/**` 对外提供下载。

多实例部署时，所有实例必须配置同一个 `MUGSUN_FILE_SIGN_SECRET`，不少于 32 个字符。

## 怎么用

1. 打开「系统管理 → 存储配置」，新增一套配置，填写类型、地址、AccessKey、SecretKey 和桶名。
2. 点「检查」，确认能连上。
3. 点「启用」。

附件的上传、下载和权限说明见[权限与附件](/boot/permissions)。

## 注意点

- SecretKey 保存后不再显示。编辑时留空表示不修改。
- 本地存储的私有附件要带短时签名才能下载，签名默认 300 秒过期。
- 存储配置页只有平台超管能访问。

## 看效果

启用一套配置后，查看当前启用的存储：

```sql
SELECT name, oss_code, category, bucket_name, status
FROM sys_oss
WHERE is_deleted = 0 AND status = 1;
```

每个租户最多一行。之后上传的附件出现在这套存储的桶或目录里。

上一节：[报表](./report) · 下一节：[短信与邮件](./notify)
