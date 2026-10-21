# SMS and mail

SMS and mail each have their own settings page. Business code sends through one notification API to several channels at once: in-app messages, mail and SMS.

## What it does

- SMS Config registers SMS providers, Aliyun (`alibaba`) or Tencent Cloud (`tencent`). Each tenant enables one, and you can send a test message to a phone number.
- Mail Templates maintain mail subjects and bodies, and can send a test mail from a template.
- Notify Channels turn the in-app, mail and SMS channels on or off and hold the mail server settings.
- Notify Templates use `${key}` placeholders and set the default channels.
- Every send is recorded per channel and recipient, and failed sends are retried on a schedule.

## How to turn it on

SMS is based on sms4j and mail on SMTP. Enable an SMS provider under SMS Config, and fill in the mail server and enable the mail channel under Notify Channels.

## How to use it

Inject `NotifySendApi` into your code:

```java
notifySendApi.send("welcome",
	List.of(NotifyReceiver.of(userId, "Zhang San", "zhangsan@example.com", "13800000000")),
	Map.of("name", "Zhang San"));
```

Without channel arguments, the template's default channels are used. You can also list channels as the last arguments, for example `"in_app", "mail"`.

## Notes

- If any required parameter declared on the template is missing, the send fails immediately.
- The built-in welcome template `welcome` cannot be deleted or disabled.
- SMS keys and mail passwords are not shown again after saving.
- These settings pages are open only to the platform super admin.

## See it work

Open System Settings → Notify Templates and you will see the built-in welcome template.

![Notify templates](/screenshots/features/notify.png)

After sending, look at the send records:

```sql
SELECT template_code, channel, receiver_contact, status, error_msg, retry_count
FROM sys_notify_record
ORDER BY create_time DESC
LIMIT 10;
```

There is one row per channel and recipient. Failed records have `status` set to `FAILURE` and the reason in `error_msg`.

Previous: [Object storage](./storage) · Next: [Messages and announcements](./message)
