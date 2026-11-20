# 权限与附件

这一页说明接口怎样鉴权，以及附件、头像、导入导出这几类接口要哪些权限码。上传的限制和部署要求也在这里。

权限码在「系统管理 → 角色管理」里授予：点某个角色的「授权」，勾选菜单和按钮。

![角色管理页：每个角色右侧是授权按钮](/screenshots/pc/system-roles.png)

## 权限模型

- 菜单、按钮权限码和用户信息由后端下发。管理后台据此渲染侧边栏和按钮，不另存一份权限。
- 接口用 Sa-Token 注解声明权限：`@SaCheckLogin` 只要求登录，`@SaCheckPermission` 要求持有权限码。
- 多租户隔离在查询层生效。跨租户或无权访问的数据统一按「不存在」返回，错误信息里看不出数据是否存在。
- 用户的新增、修改、删除和角色同步在同一个事务里完成。
- 删除用户会清理用户和角色的关联，事务提交后强制其会话下线。

### 没有声明权限的写接口 {#derived-code}

`/system/` 下的 POST、PUT、DELETE 接口如果没有声明权限，后端会按路径推出一个权限码并校验。

「没有声明」指方法和类上都没有 `@SaCheckPermission`、`@SaCheckRole` 和 `@SaIgnore`。

权限码的格式是 `sys:<域>:<动作>`。域是 `/system/` 后的第一段，动作是第二段，按下表换算：

| 路径里的动作 | 权限码里的动作 |
| --- | --- |
| `submit`、`save`、`create`、`update`、`add` | `save` |
| `remove`、`delete` | `remove` |
| `status`、`enable`、`disable` | `edit` |
| `import` | `import` |
| `grant` | `grant` |
| 其他 | 原样使用 |

例如 `POST /system/demo/submit` 要求 `sys:demo:save`。

没有这个权限码的用户得到 403，持有通配 `*` 的管理员照常通过。

- `POST /system/demo` 这样只有两段的路径推不出权限码，只要求登录。
- 工作台、站内信、流程的发起和办理等个人或公共接口不受这条规则约束。
- 完整的豁免列表在后端的 `PermissionModules.EXEMPT_PREFIXES` 里。

## 附件权限码

| 权限码 | 名称 | 作用 |
| --- | --- | --- |
| `sys:file:list` | 附件列表 | 查看附件列表 |
| `sys:file:upload` | 上传附件 | 调用 `/system/file/upload`、`presigned-put`、`create` 上传附件 |
| `sys:file:manage` | 管理全部附件 | 下载或删除他人的私有附件；没有上传者记录的私有附件只有它能操作 |
| `sys:file:public` | 上传公开附件 | 上传时可设为公开；没有它的上传一律强制为私有 |
| `sys:file:remove` | 删除附件 | 删除附件，同时要是上传者本人或持有 `sys:file:manage` |

`manage`、`public`、`remove` 三项由数据库迁移预置给管理员角色，其他角色在「角色管理」里按需授予。

新建的角色要勾选「上传附件」，否则上传返回 403。

### 谁能下载和删除

所有判断都先按租户过滤：

| 操作 | 允许 |
| --- | --- |
| 下载 | 上传者本人；持有 `sys:file:manage`；附件已公开时，本租户任意登录用户 |
| 删除 | 上传者本人或持有 `sys:file:manage`，并且持有 `sys:file:remove` |
| 上传为公开 | 持有 `sys:file:public`；其他用户选择公开会被自动降为私有 |

跨租户、不存在或无权访问一律返回 404，不暴露附件是否存在。

历史附件没有记录上传者，其中的私有附件只有持有 `sys:file:manage` 的用户能下载或删除。

## 上传限制

### 文件类型和大小

- 接受图片（png、jpg、gif、webp、bmp）、PDF 和 Office 文档。
- 另外接受 txt、csv、md、zip、mp4、mp3。html、svg、js、xml 等一律拒绝。
- 服务端核对扩展名和文件头，改了扩展名的文件会被拒绝。
- 文件头校验只防改扩展名，不检查文件是否完整。
- 单个文件不超过 20MB。超出时在接收阶段就被截断，返回 400「文件超过 20MB」。
- 存储文件名和 Content-Type 由服务端按扩展名决定。
- 用户上传的文件名只作展示，客户端上报的类型不采用。

下载时，本地直出和授权下载都带两个响应头：

- `Content-Disposition: attachment`
- `X-Content-Type-Options: nosniff`

公开文件也一样。云存储对象在上传时就写入 `Content-Disposition: attachment`。

### 超限请求怎样被拒绝

后端配置了 `server.tomcat.max-swallow-size: 32MB`，超限上传能稳定收到 400。

- Tomcat 默认只多读 2MB 被拒的请求体，之后直接断开，客户端可能收不到 400。
- 这个值必须大于请求上限（`max-request-size` 21MB）。
- 超过 32MB 的请求仍会在请求体没读完时被断开，这是有意的带宽保护。
- `server.tomcat.connection-timeout` 保持默认或更短，不要调大。

生产环境在反向代理上把 `client_max_body_size` 设为约 21MB（或等效上限），作为第一道闸门。

32MB 只在客户端直连 Tomcat 时起作用。

## 前端直传

浏览器可以把文件直接传到对象存储，不经过后端转发。分三步：

<div class="ms-steps">

### 申请直传地址

调 `POST /system/file/presigned-put`，请求体带 `filename` 和 `size`（字节）。超过 20MB 直接拒绝。

返回 `uploadUrl`、`headers` 和一次性凭证 `ticket`，有效期 15 分钟。

当前存储不支持直传（比如本地存储）时返回 `supported: false`，这时改用 `/system/file/upload`。

### 上传文件

用 PUT 把文件传到 `uploadUrl`，原样带上返回的 `headers`。

签名绑定了 `Content-Length`、`Content-Type` 和 `Content-Disposition: attachment`。

这三项改了任何一项，签名就失效。

### 登记附件

调 `POST /system/file/create`，请求体带上第一步拿到的 `ticket`。校验通过后返回附件信息。

凭证只能用一次。过期或用过之后，要从第一步重新来。

</div>

### 服务端怎样校验

- 直传地址只签到私有暂存前缀 `tmp/`，不会直接写进 `public/` 或 `private/`。
- 登记时，服务端先把暂存对象复制到一个客户端不知道的新 key。
- 新 key 在 `public/` 或 `private/` 下，然后对**新 key** 回查。
- 大小、类型和申请时不一致，或文件头对不上，新旧两个对象都删掉并拒绝。
- 校验的就是最终登记的那份字节，不存在「校验完又被覆盖」的竞态。
- 返回的附件 `filename` 和直传地址里的文件名不同。

### 暂存对象的清理

- 复制后立即删掉暂存对象，签名过期后（15 分钟加 1 分钟）再删一次。
- 再删一次是为了防止有效期内被再次 PUT 后遗留。
- 删不掉的对象进入待清理队列，定时任务每 10 分钟重删一次。
- 连续失败 20 次后写 error 日志，需要人工处理。
- 登记时抛异常的新 key 立即入队，60 秒后才处理。处理时先查登记表，已登记就不删。
- 登记表查询失败时原样放回，不计失败次数，下一轮重试。
- 连续查不了超过 144 轮（约 1 天）时，写一条汇总 error 日志，条目仍然不删。
- 汇总日志带当轮越线的条数和前 5 个 key。
- 删除前再校验：只删 `tmp/` 下的对象，或本次新生成、还没登记的随机 key。
- 已登记的对象一律不删，打告警并丢弃该项。
- 本地存储不签直传，但定时任务也会清掉本地 `tmp/` 下超过 1 天的文件。

### 部署：暂存前缀 `tmp/`

`tmp/` 只是直传的中转区。部署时必须做到两点：

- **不能公开读，不能走 CDN。** 公开读策略和 CDN 回源只配 `public/`。
- **配生命周期规则，`tmp/` 下的对象 1 天后自动删除。** 这是部署侧的兜底。

服务端已经会删暂存对象，生命周期规则防的是进程宕机或队列丢失。各家存储的写法：

| 存储 | 规则 |
| --- | --- |
| S3 | Lifecycle 规则，Filter 前缀 `tmp/`，Expiration Days=1 |
| 阿里云 OSS | 生命周期规则，按前缀 `tmp/`，文件过期天数 1 天 |
| 腾讯云 COS | 生命周期，指定前缀 `tmp/`，「删除文件」1 天 |
| MinIO | `mc ilm rule add --prefix "tmp/" --expire-days 1 <alias>/<bucket>` |

配了 basePath 时，前缀写成 `<basePath>tmp/`。

## multipart 请求白名单 {#未登录的-multipart-请求}

后端在所有过滤器之前检查 multipart 请求，只按请求行和请求头判断。

只有下面 5 个路径接受 multipart，其他路径收到 multipart 一律返回 415：

- `/system/file/upload`
- `/auth/avatar/upload`
- `/system/user/import`
- `/system/region/import`
- `/system/track/sourcemap/upload`

这 5 个路径要求已登录，否则返回 401。被踢下线、被顶下线或已过期的令牌也是 401。

具体权限仍按接口原有的权限码校验。判断规则：

- 所有 `multipart/*` 都算，Content-Type 不区分大小写。
- 路径精确比对。末尾斜杠、`;参数`、编码字符、双斜杠、大小写不同，都按不在白名单返回 415。
- 令牌只认请求头 `Authorization` 和同名 Cookie。用 URL 参数传令牌的 multipart 请求返回 401。
- 被拒的 multipart 不会被解析，也不会写磁盘，响应带 `Connection: close`。

::: warning 部署和客户端要注意
在 `server.tomcat.max-swallow-size` 以内，容器仍可能读完请求体再丢弃。部署时务必在反向代理上设置请求体上限（约 21MB）。

客户端上传前要先确认已登录。未登录时可能收不到 401，而是看到连接被关闭。
:::

### 新增上传接口

新增上传接口时，把路径加进 `mugsun.security.multipart.allowed-paths`。

这个列表在 yml 里整体替换，要连默认 5 条一起写：

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
        - /system/demo/upload   # 新增的接口
```

- 路径写 servletPath，不带 context-path，不支持通配。
- 条目为空、不以 `/` 开头、含 `*` 或 `**`、含 `..`、`;`、`{` 或 `}` 时，后端拒绝启动。
- 上传接口不能带路径变量。
- 启动时后端对照接收文件的接口，不在列表里的打 WARN。
- 能识别的写法：文件参数、`@RequestPart`、`consumes=multipart/*`。
- 在方法里直接调 `getParts()` 的接口识别不了，要手工加进列表。

## 表单、流程、平台写接口

| 接口 | 权限码 | 说明 |
| --- | --- | --- |
| `POST /system/form/submit`、`/remove` | `sys:form:save`、`sys:form:remove` | 表单设计 |
| `POST /system/flow/deploy` | `sys:flow:deploy` | 部署示例流程 |
| `POST /system/flow/design`、`/design-graph` | `sys:flow:design`、`sys:flow:design-graph` | 流程设计 |
| `POST /system/flow/definition/publish/{id}`、`unpublish/{id}` | `sys:flow:definition` | 发布、下线 |
| `POST /system/rule/tenant-init` | `sys:rule:tenant-init` + 平台超管 | 演示用编排链，只记录三个步骤名 |
| 租户、套餐、租户数据源的写接口 | `sys:tenant:*`、`sys:tenant-package:*`、`sys:tenant-datasource:*` + 平台超管 | 路径拦截之外再加一层 |

平台超管指平台租户 `000000` 下持 `admin` 角色的账号。

## 导出与导入权限码

导出、导入和下载导入模板都用独立的权限码，按「模块:资源:export|import」命名。

只有列表读权（`*:list`）的角色不能整表导出。

| 接口 | 权限码 | 数据范围 |
| --- | --- | --- |
| `GET /system/user/export` | `sys:user:export` | 与用户列表相同：租户隔离 + 角色数据权限 |
| `GET /system/user/import-template` | `sys:user:import` | 只含表头和一行示例 |
| `POST /system/user/import` | `sys:user:import` | 写入当前租户 |
| `GET /system/region/export` | `sys:region:export` | 行政区划是全局数据 |
| `GET /system/region/template`、`POST /system/region/import` | `sys:region:import` | 全局数据 |
| `GET /system/ai/*/export`、`POST /system/ai/app/import` | AI 模块各自的导出、导入码 | 见 AI 文档 |

- 「用户管理」下有「导出用户」`sys:user:export` 和「导入用户」`sys:user:import` 两个按钮权限。
- 行政区划没有菜单节点，`sys:region:*` 只有超级管理员（通配 `*`）可用。
- 没有权限时接口返回 HTTP 403，响应体 `code` 为 403。
- 导出、导入都会写操作日志。用户导出与列表一样受数据权限约束。
- 手机号按字段权限输出：没有查看权为空，没有明文权为脱敏。身份证号不在导出列里。

从旧版本升级时，这些权限码会按原有权限自动补授，见[升级指南](/boot/upgrade#perm-codes)。

## 头像

头像不需要 `sys:file:public`，使用专用端点：

| 端点 | 鉴权 | 说明 |
| --- | --- | --- |
| `POST /auth/avatar/upload` | 登录 | `multipart/form-data`，字段 `file`；上传后即设为本人头像，返回附件信息（`data.url` 为头像地址） |
| `GET /auth/avatar/raw/{id}` | 匿名 | 输出头像图片，可直接作 `<img src>`；仅限头像公开区，与存储平台（本地 / MinIO / OSS）无关 |
| `POST /auth/update-avatar` | 登录 | 绑定已有附件为头像；只接受本人上传、本租户、公开的附件，外链一律拒绝 |

- 只接受 png、jpg / jpeg、gif、webp，校验扩展名、MIME 与文件头，拒绝 svg。
- 单张不超过 2MB。
- 经网关访问时，与其他 `/auth` 接口一样加 `/api` 前缀。

```bash
curl -X POST http://localhost:8080/auth/avatar/upload \
  -H "Authorization: <登录后获得的 token>" \
  -F "file=@avatar.png"
```

管理后台「个人中心」的头像上传用的就是 `/auth/avatar/upload`。

## 下一步

<div class="ms-cards">

- [数据权限](/boot/datascope/) 权限码之外，再按部门和本人过滤数据。
- [开放平台](/boot/open-api) 让外部系统用密钥或 OAuth 调用接口。
- [安全清单](/boot/security-checklist) 上线前逐项核对。

</div>
