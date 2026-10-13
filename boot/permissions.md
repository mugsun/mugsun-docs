# 权限与附件

## 权限模型

- 菜单、按钮权限码与用户信息由 boot 下发，管理台据此渲染侧边栏与按钮，不维护第二份权限。
- 接口用 Sa-Token 注解声明：`@SaCheckLogin`（登录即可）、`@SaCheckPermission("sys:xxx:yyy")`（需权限码）。
- 多租户隔离在查询层生效；跨租户或无权访问的数据统一按「不存在」返回，避免通过错误信息探测。
- 用户新增、修改、删除及角色同步在同一事务内完成；删除用户会清理用户-角色关联，并在提交后踢下线其会话。

## 附件权限码

| 权限码 | 名称 | 作用 |
| --- | --- | --- |
| `sys:file:list` | 附件列表 | 查看附件列表 |
| `sys:file:manage` | 管理全部附件 | 可下载 / 删除他人的私有附件；历史无上传者的私有附件仅此权限可操作 |
| `sys:file:public` | 上传公开附件 | 上传时可设为公开；无此权限的上传一律强制为私有 |
| `sys:file:remove` | 删除附件 | 删除附件（仍需是上传者本人或持有 `sys:file:manage`） |

下载与删除规则：**本人上传的附件**或持有 `sys:file:manage`；其他用户或其他租户的附件按不存在处理。`manage` / `public` / `remove` 三项权限码随 Flyway 基线脚本写入，升级后在「角色管理」中按需授予。

## 头像

头像不需要 `sys:file:public`，使用专用端点：

| 端点 | 鉴权 | 说明 |
| --- | --- | --- |
| `POST /auth/avatar/upload` | 登录 | `multipart/form-data`，字段 `file`；上传后即设为本人头像，返回附件信息（`data.url` 为头像地址） |
| `POST /auth/update-avatar` | 登录 | 绑定已有附件为头像；只接受本人上传、本租户、公开的附件，外链一律拒绝 |

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <登录后获得的 token>" \
  -F "file=@avatar.png"
```

管理台「个人中心」已改用 `/auth/avatar/upload`。

## 下一步

[开放平台](/boot/open-api) · [安全清单](/boot/security-checklist)
