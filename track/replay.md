# 会话回放与用户细查

「会话回放」把用户在页面上的操作录下来重放。「用户细查」按用户或访客列出一段时间里的全部事件，接口请求也在里面。

两个页面都在「埋点分析」菜单下。回放要应用打开「会话回放」，前端注册回放插件，见[插件](/track/plugins#会话回放)。

![会话回放的播放抽屉，上面是会话信息，中间是录下的页面，下面是进度条、倍速和事件打点条](/readme/track-replay.png)

## 回放列表

选应用后，列表列出这个应用有录制的会话，按开始时间从新到旧排。选「仅含错误」只留出过错的会话。

| 列 | 说明 |
| --- | --- |
| 开始时间 | 会话开始的时间 |
| 时长 | 这段录制的时长 |
| 页面数 | 会话里看过的页面数。单页应用切换路由也算一页 |
| 事件数 | 录制数据的条数，不是埋点事件的条数 |
| 大小 | 录制数据的大小 |
| 错误 | 会话里出过错误时显示「含错误」 |
| 入口页 | 会话的第一个页面 |
| 访客 | 访客的匿名 ID |

列表没有时间范围，保留期内的录制都在。

不是每个会话都有录制。录制上不上传由应用的「回放采样率」决定，规则见[插件](/track/plugins#录了不一定上传)。

## 播放

点「播放」打开播放抽屉，打开后自动开始放。

- 倍速可选 1、2、4、8 倍。没有操作的时间段默认跳过，可以关掉。
- 进度条下面是事件打点条，把这个会话的埋点事件标在时间轴上。
- 打点分五种颜色，对应页面浏览、点击、错误、接口和其他事件。
- 鼠标停在点上显示事件名、时间和路径，点一下跳到那一刻接着放。

打点条最多标 500 个事件，只标落在录制时间范围内的。

录制有缺失时播放器顶部会提示缺了几块。为什么会缺、缺了怎么播，见[插件](/track/plugins#页面关闭时)。

除了回放列表，还有三个地方能打开同一个播放抽屉：

- 错误监控的错误详情，会话有录制时出现「回放」。
- 用户细查的时间线，有录制的会话带「回放」按钮。
- 带 `sessionId` 和 `appKey` 参数的链接，比如[问数据](/track/ask)给出的会话链接。

回放是敏感数据。播放时每读一块录制，后端写一条标题为「查看会话回放」的操作日志。

页面上有个人信息时，先按[隐私与合规](/track/privacy#开启遮罩与过滤)打开遮罩再录。

## 录制存多久、能存多少

录制文件存在后端的[对象存储](/boot/features/storage)里，不进数据库。

| 限制 | 默认 | 在哪里改 |
| --- | --- | --- |
| 保留多少天 | 14 天，最长 30 天 | 应用表单的「回放保留期」 |
| 一个会话的录制总量 | 20 MB | 参数 `track.replay.session-max-bytes` |
| 全平台每天新增 | 10 GB | 参数 `track.storage.daily-max-bytes` |
| 一个应用每天新增 | 2 GB | 参数 `track.storage.app-daily-max-bytes` |
| 存储盘剩余空间 | 低于 5 GB 暂停接收 | 参数 `track.storage.min-free-bytes` |

一个会话超过总量后，后面的录制不再接收，已经收到的部分照常能放。

每天的两项额度由回放和接口响应体共用，按 UTC 的一天算。剩余空间这一项只在文件存在本机磁盘时检查。

额度用完或空间不够时，接入健康里会出现 `STORAGE_FULL`，见[第一个事件](/track/first-event#接入健康)。

到期的录制每天清理一次，按会话的开始时间算。这几个参数的说明见[接入管理](/track/apps#系统参数)。

## 用户细查

用户细查回答的是一个人在一段时间里做了什么。客服排查用户反馈的问题时用它。

![用户细查页，时间线按会话分组，展开的接口请求里有状态码、耗时和查看响应体按钮](/screenshots/track/track-user.png)

<div class="ms-steps">

### 选应用和查法

选「系统用户」时输入账号搜索，从下拉里选人。选「访客 UUID」时填访客的匿名 ID。

### 选时间范围

默认是最近 24 小时，最长 7 天。

### 点「查询」

时间线按会话分组，新的在前。一次取 50 条，点「加载更多」取下一批。

</div>

两种查法查到的范围不一样：

| 查法 | 查到什么 |
| --- | --- |
| 系统用户 | 这个用户登录后的事件，加上他登录过的设备在没登录时的事件 |
| 访客 UUID | 只有这一个匿名 ID 名下的事件 |

按系统用户查时，最多合并这个用户最近活跃的 1000 台设备。超过时页面会提示，这时改用访客 UUID 查某一台。

每个会话的组头写着开始时间和持续时长，后面是页面数和会话 ID。会话有录制时，组头上有「回放」按钮。

时间线里的事件分这几种，其余的直接显示事件名：

| 种类 | 事件 |
| --- | --- |
| 页面浏览 | `$pageview` |
| 页面停留 | `$pageleave` |
| 点击 | `$click` |
| 错误 | `$error` |
| 接口 | `api_request` |
| 身份绑定 | `$identify` |

事件按发生时间排。从错误问题单这类页面跳过来时，条件已经填好，还要自己点「查询」。

### 接口请求和响应体

接口一行显示状态码、耗时和响应大小。点开能看到请求方法和完整地址，网络失败时还有错误信息。

接口事件要应用打开「接口监控」才有，响应体还要再打开「响应体采集」，见[插件](/track/plugins#接口监控)。

| 情况 | 页面显示 |
| --- | --- |
| 采到了响应体 | 「查看响应体」按钮 |
| 这是一个凭证接口 | 响应体未采集（凭证端点硬屏蔽） |
| 响应体超过大小上限 | 响应体未采集（超过大小上限） |
| 响应体取不出来，比如已经过了保留期 | 点「查看响应体」后提示没有采到或已经清理 |

响应体默认保留 7 天，最长 30 天，在应用表单的「响应体保留期」里改。单个响应体的上限默认 1 MB。

每查看一次响应体，后端写一条标题为「查看接口响应体」的操作日志。

## 权限

| 权限 | 能做什么 |
| --- | --- |
| `sys:track-replay:list` | 打开会话回放，看列表 |
| `sys:track-replay:view` | 播放录制。没有它列表里不出现「播放」 |
| `sys:track-user:list` | 打开用户细查，查时间线 |
| `sys:track-user:view-body` | 查看接口的响应体 |
| `sys:user:list` | 按系统用户查时搜索用户，只能搜到自己数据范围内的用户 |
| `sys:track-app:list` | 加载页面顶部的应用下拉 |

只能看到本租户的数据，别的租户的会话一律当作不存在。操作日志在哪里查见[日志与审计](/boot/features/log)。

## 接口

接口都在 `/system/track` 下面，都是 GET，要登录。

| 路径 | 权限 | 参数 |
| --- | --- | --- |
| `/replay/page` | `sys:track-replay:list` | `appKey` `hasError` `pageNum` `pageSize` |
| `/replay/detail` | `sys:track-replay:list` | `sessionId` |
| `/replay/events` | `sys:track-replay:list` | `appKey` `sessionId` |
| `/replay/data` | `sys:track-replay:view` | `sessionId` `seq` |
| `/user/timeline` | `sys:track-user:list` | `appKey` `userId` `distinctId` `startTs` `endTs` `cursor` `pageSize` |
| `/user/api-body` | `sys:track-user:view-body` | `eventId` |

回放的四个接口：

| 路径 | 说明 |
| --- | --- |
| `/replay/page` | `appKey` 必填。`hasError=1` 只返回含错误的会话。`pageSize` 默认 10，最大 500 |
| `/replay/detail` | `replay` 是会话信息，`blocks` 是录制分块的列表，每块有序号 `seq` |
| `/replay/events` | 打点条用的事件，每项有 `eventName` `ts` `urlPath`，最多 500 项 |
| `/replay/data` | 一块录制的内容，是一个 JSON 数组。每次调用写一条操作日志 |

会话信息里常用的字段是 `sessionId` `distinctId` `userId` `startTime` `durationMs` `pageCount` `rrwebEvents` `sizeBytes` `hasError` 和 `entryPath`。

用户细查的两个接口：

| 参数 | 说明 |
| --- | --- |
| `userId` `distinctId` | 二选一，都给时用 `userId` |
| `startTs` `endTs` | 毫秒时间戳，相隔不能超过 7 天 |
| `cursor` | 上一页返回的 `nextCursor`，第一页不传 |
| `pageSize` | 默认 20，最大 100 |

`/user/timeline` 返回 `records` 和 `nextCursor`。`nextCursor` 为空表示已经到底。

按 `userId` 查时还返回 `deviceCount` 和 `devicesTruncated`，含义见[升级说明](/track/upgrade#用户时间线的设备上限)。

每条记录的字段是 `eventId` `eventName` `ts` `clientTs` `urlPath` `routePath` `durationMs` `sessionId` `props` `hasReplay` 和 `hasApiBody`。

`props` 是 JSON 字符串。`/user/api-body` 成功时直接返回采到的响应体原文，取不到时返回 HTTP 400。

## 下一步

<div class="ms-cards">

- [插件](/track/plugins#会话回放) 回放怎么录、怎么上传，接口监控怎么开。
- [隐私与合规](/track/privacy) 遮罩怎么开，回放和响应体留多久。
- [错误问题单](/track/error-issues) 从一张问题单跳到出错用户的时间线。

</div>
