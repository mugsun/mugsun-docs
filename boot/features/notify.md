# 短信与邮件

短信和邮件有各自的配置页，业务代码通过统一的通知接口，一次发到站内信、邮件和短信多个渠道。

## 能干什么

- 「短信配置」登记短信平台，支持阿里云（`alibaba`）和腾讯云（`tencent`），同一租户启用一套，可以向指定手机试发。
- 「邮件模板」维护邮件标题和正文，可以按模板发送测试邮件。
- 「通知渠道」设置站内信、邮件和短信三个渠道是否启用，以及邮件服务器参数。
- 「通知模板」用 `${key}` 占位写内容，并指定默认发送渠道。
- 每次发送按渠道和接收人逐条记流水，失败的会定时重试。

## 怎么开

短信基于 sms4j，邮件基于 SMTP。在「短信配置」里启用一套短信平台，在「通知渠道」里填写邮件服务器并启用邮件渠道。

## 怎么用

在业务代码里注入 `NotifySendApi`：

```java
notifySendApi.send("welcome",
	List.of(NotifyReceiver.of(userId, "张三", "zhangsan@example.com", "13800000000")),
	Map.of("name", "张三"));
```

不传渠道时按模板的默认渠道发送，也可以在最后一个参数里指定渠道，例如 `"in_app", "mail"`。

## 注意点

- 模板里声明的必填参数缺少任意一个，发送时直接报错。
- 内置的欢迎模板 `welcome` 不能删除，也不能停用。
- 短信密钥和邮件密码保存后不再显示。
- 这几个配置页只有平台超管能访问。

## 看效果

打开「系统管理 → 通知模板」，能看到内置的欢迎模板。

![通知模板](/screenshots/features/notify.png)

发送之后，查看发送流水：

```sql
SELECT template_code, channel, receiver_contact, status, error_msg, retry_count
FROM sys_notify_record
ORDER BY create_time DESC
LIMIT 10;
```

每个渠道和接收人各一行。发送失败的记录 `status` 为 `FAILURE`，`error_msg` 写明原因。

上一节：[对象存储](./storage) · 下一节：[站内信与公告](./message)
