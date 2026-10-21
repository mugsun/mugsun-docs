# Messages and announcements

In-app messages go to selected users; announcements go to everyone or to a chosen scope. Both are pushed to online users over WebSocket.

## What it does

- Send Message lets you pick recipients and write a title and body, or use a Message Template.
- Recipients read messages in My Messages. The bell in the top bar shows the unread count, and messages can be marked read one by one or all at once.
- Announcements can be pinned, limited to chosen users or departments, and record who read them and how many times.
- Users read the announcements visible to them in My Notifications.

## How to turn it on

Messages and announcements start with the backend. The WebSocket address is `/ws/message`, and the handshake carries the login token as a query parameter:

```text
ws://localhost:8080/ws/message?token=<login token>
```

With several instances, keep the default `mugsun.websocket.sender-type: redis` so that messages are relayed to every instance through Redis publish/subscribe. Use `local` only for single-machine debugging.

## How to use it

The console is already connected to the WebSocket and needs no extra work. To send an in-app message from the backend, call `POST /system/message/send`, or use the in-app channel of `NotifySendApi` described in [SMS and mail](./notify).

Pushed frames have the types `message.new` (new message), `notice.new` (new announcement) and `force.offline` (forced sign-out).

## Notes

- Sending messages and managing message templates need `sys:message:manage`; managing announcements needs `sys:notice:manage`.
- A handshake with an invalid token is rejected.
- Users cannot see announcements outside their scope; opening one by id is treated as not found.

## See it work

Send yourself a message:

```bash
curl -s -X POST http://localhost:8080/system/message/send \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Test","content":"In-app message test","recipientIds":["<your user id>"]}'
```

The response says it was sent to 1 person, the unread count on the bell goes up by one, and the message appears in My Messages.

![My messages](/screenshots/features/message.png)

The unread count matches this query:

```sql
SELECT count(*) FROM sys_message_user WHERE user_id = <your user id> AND is_read = 0 AND is_deleted = 0;
```

Previous: [SMS and mail](./notify) · Next: [Serial numbers](./serial-number)
