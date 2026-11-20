# 接入管理

「接入管理」管理埋点应用和它们的采集配置。一个应用有一个 AppKey，前端用它初始化 SDK。

页面在「埋点分析」菜单下，分五个页签：

| 页签 | 用来做什么 |
| --- | --- |
| 应用管理 | 新建应用，改采样率、保留期和各项功能开关 |
| 事件定义 | 给事件加显示名和负责人，停用不要的事件 |
| 符号表 | 上传符号表，供错误监控还原堆栈 |
| 圈选规则 | 不改代码给页面元素加点击埋点 |
| 接入健康 | 看每个应用最近有没有收到事件，被拒收的原因是什么 |

![编辑应用的弹窗，表单里有采样率、数据保留期和会话回放等开关](/screenshots/track/track-app.png)

## 应用管理

点「新增应用」，只有应用名称必填。保存后弹出「应用创建成功」，里面有 AppKey 和一段接入代码。

AppKey 由后端生成，以 `ak_` 开头，建好后不能改。列表的 AppKey 一列随时能看到它。

拿到 AppKey 以后怎么接 SDK，见[第一个事件](/track/first-event)。

### 应用表单

| 表单项 | 字段 | 取值 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| 应用名称 | `appName` | 最长 64 字 | 无 | 必填 |
| 采样率 | `sampleRate` | 1 到 100 | 100 | 百分比，按访客采样。100 表示全部采集 |
| 启用 | `enabled` | 开或关 | 开 | 关掉后采集接口拒收这个应用的全部上报 |
| 脱敏选择器 | `maskSelectors` | CSS 选择器，逗号分隔 | 空 | 命中的区域不自动采集，也不录进回放 |
| 数据保留期 | `retentionDays` | 1 到 3650 天 | 90 | 事件保留多少天 |
| 会话回放 | `replayEnabled` | 开或关 | 关 | 打开后 SDK 开始录制 |
| 回放采样率 | `replaySampleRate` | 0 到 100 | 10 | 百分比。0 表示只上传出过错的会话 |
| 回放保留期 | `replayRetentionDays` | 1 到 30 天 | 14 | 录制保留多少天 |
| 接口监控 | `apiMonitorEnabled` | 开或关 | 关 | 记录页面发出的接口请求 |
| 响应体采集 | `apiBodyEnabled` | 开或关 | 关 | 只采 JSON 接口，凭证接口不采 |
| 响应体脱敏 | `apiBodyMaskEnabled` | 开或关 | 关 | 把响应体里个人信息字段的值换成 `***` |
| 响应体保留期 | `apiBodyRetentionDays` | 1 到 30 天 | 7 | 响应体保留多少天 |
| 精确位置 | `geoEnabled` | 开或关 | 关 | 征得用户同意后上报约 11 米精度的坐标 |
| 错误告警 | `alertEnabled` | 开或关 | 关 | 出现新错误或错误变多时发站内信 |
| 告警阈值 | `alertThreshold` | 1 到 1000 | 10 | 同一个指纹 10 分钟内达到这个次数就告警 |
| 备注 | `remark` | 文字 | 空 | 只用来记事 |

开关类的字段在接口里用 `1` 表示开，`0` 表示关。

下面几项要先打开上一级开关才出现：

- 「回放采样率」和「回放保留期」，要先打开「会话回放」。
- 「响应体采集」，要先打开「接口监控」。
- 「响应体脱敏」和「响应体保留期」，要先打开「响应体采集」。
- 「告警阈值」，要先打开「错误告警」。

每项功能的细节在各自的页面里：

- 回放和接口监控见[插件](/track/plugins)。
- 精确位置见[空间行为](/track/spatial#先让事件带上坐标)。
- 错误告警见[性能分析与错误监控](/track/perf-errors#错误告警)。

### 改完多久生效

后端这一侧马上生效。保存后，采集接口立刻按新的开关接收或拒收。部署了多个后端实例时，其他实例最多晚 30 秒。

浏览器这一侧要等 SDK 重新取配置。SDK 每次启动取一次，取回的配置到下一次启动才生效。

同一个选项表单和代码里都设了值时听谁的，见[安装与初始化](/track/install#和后台配置的关系)。

删除应用后，采集接口不再接收它的上报。

## 事件定义

事件不用事先登记。一个事件名第一次上报时，后端自动在这里加一行。事件名不能改，也不能手工新增。

列表按最近上报的时间从新到旧排，可以按事件名和状态筛选。能改的有四项：

| 项 | 说明 |
| --- | --- |
| 显示名 | 给事件起一个中文名，最长 64 字 |
| 描述 | 最长 255 字 |
| 负责人 | 最长 64 字 |
| 状态 | 启用或停用 |

停用一个事件后，后端直接丢弃它的上报，接入健康里记成 `EVENT_DISABLED`。已经入库的数据不受影响。

停用马上生效。部署了多个后端实例时，其他实例最多晚 30 秒。

[漏斗分析](/track/funnel-retention)的步骤下拉取的就是这张表，最多列 500 个事件名。

## 符号表

符号表就是构建产物里的 `.map` 文件，用来把压缩代码的堆栈换算回源码位置。用法见[还原堆栈](/track/perf-errors#还原堆栈)。

点「上传符号表」，选应用，填 Release，再选文件。

| 规则 | 说明 |
| --- | --- |
| 文件 | 只收 `.map`，不超过 20 MB，内容要是带 `mappings` 字段的 JSON |
| Release | 必填，最长 128 位，只能用字母和数字，以及 `.` `-` `_` 三种符号 |
| 文件名 | 最长 255 位，能用的字符和 Release 一样 |
| 重复上传 | 同一个 Release 下同名的文件，后传的覆盖先传的 |

Release 要和 SDK 初始化时的 `release` 完全一样，错误事件靠它找符号表。

这个页签的列表、上传和删除都要 `sys:track-app:edit`。只有 `sys:track-app:list` 时看不到列表。

## 圈选规则

圈选的完整步骤见[插件](/track/plugins#圈选)。这个页签管三件事：

- 点「进入圈选」，填目标页面的地址。页面在新窗口打开，进入圈选模式。
- 在页面上圈出来的元素先成为草稿。点「确认」并填事件名后成为规则，点「丢弃」删掉。
- 规则列表里可以编辑、停用和删除规则。选择器不能改。

目标地址要以 `http://` 或 `https://` 开头。事件名要以字母开头，只能用字母、数字和下划线，最长 64 位。

| 限制 | 数值 |
| --- | --- |
| 圈选令牌的有效期 | 30 分钟 |
| 一次圈选的草稿 | 最多 50 条 |
| 一个应用下发的规则 | 最多 200 条 |
| 选择器 | 最长 512 位 |
| 匹配文本 | 最长 128 位 |

圈选令牌只存在管理后台这个页面的内存里。刷新页面后令牌失效，要重新进入圈选。

规则确认后马上下发，接入端下次启动生效。规则的路由留空表示全站生效，匹配文本留空表示不限文字。

## 接入健康

这个页签怎么读、全部原因码是什么意思，见[第一个事件](/track/first-event#接入健康)。

## 系统参数

下面几个参数对全部应用生效，在「系统管理 → 参数管理」里改，见[字典与参数](/boot/features/dict#读写参数)。

| 参数键 | 默认值 | 作用 |
| --- | --- | --- |
| `track.collect.rate-limit` | `600` | 同一个 IP 对一个应用每分钟最多上报多少次。回放上传的上限是它的两倍 |
| `track.collect.batch-max` | `100` | 一次上报最多带多少条事件，多出的被截掉 |
| `track.replay.session-max-bytes` | `20971520` | 一个会话的回放总量上限 |
| `track.api-body.max-bytes` | `1048576` | 单个响应体的大小上限 |
| `track.storage.daily-max-bytes` | `10737418240` | 全平台每天新增的回放和响应体上限 |
| `track.storage.app-daily-max-bytes` | `2147483648` | 一个应用每天新增的回放和响应体上限 |
| `track.storage.min-free-bytes` | `5368709120` | 存储盘剩余空间低于它就暂停接收回放和响应体 |

后五个参数的单位是字节。超过上限的上报被拒收或截掉，接入健康里会出现对应的原因码。

## 权限

| 权限 | 能做什么 |
| --- | --- |
| `sys:track-app:list` | 打开接入管理，看应用管理、事件定义和接入健康 |
| `sys:track-app:add` | 新增应用 |
| `sys:track-app:edit` | 编辑和删除应用，改事件定义，使用符号表页签 |
| `sys:track-visual:list` | 看圈选规则 |
| `sys:track-visual:edit` | 进入圈选，处理草稿，编辑和删除规则 |

只能看到本租户的应用。

## 接口

接口都在 `/system/track` 下面，要登录。写操作都是 POST，请求体是 JSON，上传符号表除外。

| 方法和路径 | 权限 | 说明 |
| --- | --- | --- |
| `GET /app/page` | `sys:track-app:list` | 应用分页，可用 `appName` 筛选 |
| `POST /app/submit` | 见下文 | 请求体是应用表单的字段，带 `id` 表示编辑 |
| `POST /app/remove` | `sys:track-app:edit` | 请求体带 `id` |
| `GET /event-def/page` | `sys:track-app:list` | `appKey` 必填，可用 `eventName` 和 `status` 筛选 |
| `POST /event-def/submit` | `sys:track-app:edit` | 改显示名、描述、负责人和状态 |
| `POST /sourcemap/upload` | `sys:track-app:edit` | 表单上传，字段是 `file` `appKey` `release` |
| `GET /sourcemap/page` | `sys:track-app:edit` | 可用 `appKey` 和 `release` 筛选 |
| `POST /sourcemap/remove` | `sys:track-app:edit` | 请求体带 `id` |
| `GET /visual/rule/page` | `sys:track-visual:list` | 可用 `appKey` 和 `status` 筛选 |
| `POST /visual/rule/submit` | `sys:track-visual:edit` | 改事件名、路由、匹配文本和状态 |
| `POST /visual/rule/remove` | `sys:track-visual:edit` | 请求体带 `id` |

`/app/submit` 新增时要 `sys:track-app:add`，编辑时要 `sys:track-app:edit`。

新增成功返回完整的应用，里面有生成的 `appKey`。

分页接口都接受 `pageNum` 和 `pageSize`，`pageSize` 默认 10。

圈选流程还用到 `/visual/token` 和 `/visual/drafts` 下的几个接口，都要 `sys:track-visual:edit`。

接入健康的两个接口见[第一个事件](/track/first-event#接入健康)。

## 下一步

<div class="ms-cards">

- [第一个事件](/track/first-event) 拿着 AppKey 接 SDK，发出第一条事件。
- [插件](/track/plugins) 回放、接口监控和圈选在前端怎么注册。
- [隐私与合规](/track/privacy) 脱敏选择器和保留期怎么定。

</div>
