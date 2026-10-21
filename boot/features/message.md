# 站内信与公告

站内信发给指定用户，公告发给全体或指定范围。两者都通过 WebSocket 实时推送给在线用户。

## 能干什么

- 「发送站内信」选择收件人，填写标题和内容，或选用「消息模板」。
- 收件人在「我的消息」查看，顶栏铃铛显示未读数，可以单条或全部标记已读。
- 「通知公告」发布公告，可以置顶，可以限定可见的用户或部门，并记录谁读过、读了几次。
- 用户在「我的通知」查看自己可见的公告。

## 怎么开

站内信和公告随后端一起启动。WebSocket 地址是 `/ws/message`，握手时在查询参数里带登录令牌：

```text
ws://localhost:8080/ws/message?token=<登录令牌>
```

多实例部署时保持默认的 `mugsun.websocket.sender-type: redis`，消息经 Redis 发布订阅转发到每个实例。

`local` 只用于单机调试。

## 怎么用

管理台已经接好 WebSocket，不需要额外开发。

后端要发站内信时，调用 `POST /system/message/send`，或者用[短信与邮件](./notify)里的 `NotifySendApi` 走站内信渠道。

推送的消息帧类型有 `message.new`（新站内信）、`notice.new`（新公告）和 `force.offline`（被强制下线）。

## 注意点

- 发送站内信和管理消息模板需要 `sys:message:manage`，管理公告需要 `sys:notice:manage`。
- 令牌无效时握手直接被拒绝。
- 用户看不到不在可见范围内的公告，按 id 访问也按不存在处理。

## 看效果

给自己发一条站内信：

```bash
curl -s -X POST http://localhost:8080/system/message/send \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"测试消息","content":"站内信测试","recipientIds":["<你的用户 id>"]}'
```

返回「已发送给 1 人」，顶栏铃铛的未读数加一，「我的消息」里出现这一条。

![我的消息](/screenshots/features/message.png)

未读数与下面这条语句的结果相同：

```sql
SELECT count(*) FROM sys_message_user WHERE user_id = <你的用户 id> AND is_read = 0 AND is_deleted = 0;
```

上一节：[短信与邮件](./notify) · 下一节：[单号规则](./serial-number)
