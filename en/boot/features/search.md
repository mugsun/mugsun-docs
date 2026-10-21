# Global search

Besides suggesting menus by name, the search box in the top bar suggests users, departments, roles and announcements.

## What it does

- After you type a keyword, results are grouped into users, departments, roles and announcements, with a few results per group.
- Clicking a result opens the matching management page.

## How to turn it on

Global search starts with the backend and the console and needs no configuration.

## How to use it

Click the search box in the top bar, or open it with the keyboard shortcut, and type a keyword. The backend endpoint is `GET /system/search/suggest?keyword=...`.

## Notes

- Results are isolated by tenant, and user results are also filtered by [data permissions](/en/boot/datascope/), so people you cannot see do not show up.
- User results show only the nickname and username, never phone numbers or other sensitive fields.

## See it work

Type `adm` in the search box and the user with the username `admin` appears.

![Global search](/screenshots/features/search.png)

You can also call the endpoint directly:

```bash
curl -s "http://localhost:8080/system/search/suggest?keyword=adm" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"type":"user","typeName":"用户","title":"超级管理员","subtitle":"账号 admin","path":"/system/user"}],"msg":"操作成功","dataType":null}
```

Previous: [Serial numbers](./serial-number)
