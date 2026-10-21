# 权限与附件

## 权限模型

- 菜单、按钮权限码与用户信息由 boot 下发，管理台据此渲染侧边栏与按钮，不维护第二份权限。
- 接口用 Sa-Token 注解声明：`@SaCheckLogin`（登录即可）、`@SaCheckPermission("sys:xxx:yyy")`（需权限码）。
- 多租户隔离在查询层生效；跨租户或无权访问的数据统一按「不存在」返回，避免通过错误信息探测。
- 用户新增、修改、删除及角色同步在同一事务内完成；删除用户会清理用户-角色关联，并在事务提交后强制其会话下线。

## 附件权限码

| 权限码 | 名称 | 作用 |
| --- | --- | --- |
| `sys:file:list` | 附件列表 | 查看附件列表 |
| `sys:file:upload` | 上传附件 | 调用 `/system/file/upload`、`presigned-put`、`create` 上传附件（0.1.1 起必需） |
| `sys:file:manage` | 管理全部附件 | 可下载 / 删除他人的私有附件；历史无上传者的私有附件仅此权限可操作 |
| `sys:file:public` | 上传公开附件 | 上传时可设为公开；无此权限的上传一律强制为私有 |
| `sys:file:remove` | 删除附件 | 删除附件（仍需是上传者本人或持有 `sys:file:manage`） |

访问规则（所有判断先按租户过滤）：

| 操作 | 允许 |
| --- | --- |
| 下载 | 上传者本人；持有 `sys:file:manage`；附件已公开时，本租户任意登录用户 |
| 删除 | 仅上传者本人或持有 `sys:file:manage`（且需 `sys:file:remove`） |
| 上传为公开 | 仅持有 `sys:file:public`；普通用户选择公开会被自动降为私有 |

跨租户、不存在或无权访问一律返回 404，不暴露附件是否存在。历史附件没有记录上传者，其私有附件仅持有 `sys:file:manage` 的用户可下载或删除。

`manage` / `public` / `remove` 三项权限点由数据库迁移预置给管理员角色，其他角色在「角色管理」中按需授予。

## 上传限制

- 只接受图片（png、jpg、gif、webp、bmp）、PDF、Office 文档、txt、csv、md、zip、mp4、mp3；html、svg、js、xml 等一律拒绝。
- 服务端核对扩展名和文件头，改了扩展名的文件会被拒绝。文件头校验只防改扩展名，不检查文件是否完整。
- 单个文件不超过 20MB，超出时在接收阶段就被截断，返回 400「文件超过 20MB」。
- 存储文件名和 Content-Type 由服务端按扩展名决定，用户上传的文件名只作展示，客户端上报的类型不采用。
- 前端直传（`presigned-put`）必须带 `size`（字节），超过 20MB 直接拒绝；签名绑定 `Content-Length`、`Content-Type`、`Content-Disposition: attachment`，PUT 时要原样带上返回的 `headers`。签名有效期 15 分钟。
- 调 `create` 登记时，服务端会回查存储里的对象：大小、类型和申请时不一致，或文件头对不上，会删掉对象并拒绝登记。
- 回查通过后，服务端把对象复制到一个新的存储 key（客户端不知道），删掉直传用的原 key，只登记新 key。所以返回的附件 `filename` 和直传 URL 里的文件名不同。签名在 15 分钟内仍可再次 PUT，但写进去的只是一个没登记的对象，碰不到已登记的附件。
- 原 key 或回查失败的对象删不掉时，会进入待清理队列，定时任务每 10 分钟重删一次，连续失败 20 次后写 error 日志，需要人工处理。
- 本地直出、授权下载一律 `attachment` + `X-Content-Type-Options: nosniff`，公开文件也一样；云存储对象上传时写入 `Content-Disposition: attachment`。
- 升级时 V13 把 `sys:file:upload` 授给全部现有角色，保持原有功能；之后新建的角色需要在「角色管理」里勾选「上传附件」，否则意见反馈等页面上传会返回 403。

## 表单、流程、平台写接口

| 接口 | 权限码 | 说明 |
| --- | --- | --- |
| `POST /system/form/submit`、`/remove` | `sys:form:save`、`sys:form:remove` | 表单设计 |
| `POST /system/flow/deploy` | `sys:flow:deploy` | 部署示例流程 |
| `POST /system/flow/design`、`/design-graph` | `sys:flow:design`、`sys:flow:design-graph` | 流程设计 |
| `POST /system/flow/definition/publish/{id}`、`unpublish/{id}` | `sys:flow:definition` | 发布、下线 |
| `POST /system/rule/tenant-init` | `sys:rule:tenant-init` + 平台超管 | 演示用编排链，只记录三个步骤名 |
| 租户、套餐、租户数据源的写接口 | `sys:tenant:*`、`sys:tenant-package:*`、`sys:tenant-datasource:*` + 平台超管 | 路径拦截之外再加一层 |

V13 把表单、流程的新按钮权限补授给各租户的 `admin` 角色。平台超管指平台租户 `000000` 下持 `admin` 角色的账号。

## 导出与导入权限码

导出、导入、下载导入模板都用独立权限码，按「模块:资源:export|import」命名。只有列表读权（`*:list`）不能整表导出。

| 接口 | 权限码 | 数据范围 |
| --- | --- | --- |
| `GET /system/user/export` | `sys:user:export` | 与用户列表相同：租户隔离 + 角色数据权限 |
| `GET /system/user/import-template` | `sys:user:import` | 只含表头和一行示例 |
| `POST /system/user/import` | `sys:user:import` | 写入当前租户 |
| `GET /system/region/export` | `sys:region:export` | 行政区划是全局数据 |
| `GET /system/region/template`、`POST /system/region/import` | `sys:region:import` | 全局数据 |
| `GET /system/ai/*/export`、`POST /system/ai/app/import` | AI 模块各自的导出、导入码 | 见 AI 文档 |

升级说明（0.1.1，迁移 V13）：

- 「用户管理」下新增「导出用户」`sys:user:export`、「导入用户」`sys:user:import` 两个按钮权限。
- 已有 `sys:user:list` 的角色自动补授导出码，已有 `sys:user:add` 的角色自动补授导入码，升级后原来能用的人照样能用。之后可在「角色管理」里单独收回。
- 行政区划没有菜单节点，`sys:region:*` 只有超级管理员（通配 `*`）可用。
- 没有权限时接口返回 HTTP 403，响应体 `code` 为 403。
- 导出、导入都会写操作日志。用户导出与列表一样受数据权限约束；手机号按字段权限输出：没有查看权为空，没有明文权为脱敏，身份证号不在导出列里。

## 头像

头像不需要 `sys:file:public`，使用专用端点：

| 端点 | 鉴权 | 说明 |
| --- | --- | --- |
| `POST /auth/avatar/upload` | 登录 | `multipart/form-data`，字段 `file`；上传后即设为本人头像，返回附件信息（`data.url` 为头像地址） |
| `GET /auth/avatar/raw/{id}` | 匿名 | 输出头像图片，可直接作 `<img src>`；仅限头像公开区，与存储平台（本地 / MinIO / OSS）无关 |
| `POST /auth/update-avatar` | 登录 | 绑定已有附件为头像；只接受本人上传、本租户、公开的附件，外链一律拒绝 |

上传限制：只接受 png、jpg / jpeg、gif、webp（校验扩展名、MIME 与文件头，拒绝 svg），单张不超过 2MB。经网关访问时与其他 `/auth` 接口一样加 `/api` 前缀。

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <登录后获得的 token>" \
  -F "file=@avatar.png"
```

管理台「个人中心」已改用 `/auth/avatar/upload`。

## 下一步

[开放平台](/boot/open-api) · [安全清单](/boot/security-checklist)
