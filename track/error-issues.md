# 错误问题单

管理台「埋点分析 → 错误问题单」按错误指纹聚合工作流：列表、详情、指派、解决、重开。
它独立于「错误监控」的事件流水，不替代指纹列表。

摄入 `$error` 事件时，服务端按 `appKey + fingerprint` upsert 问题单。
不做工作流引擎自动建单。

## 状态与 release 标记

| 字段 | 取值 | 含义 |
| --- | --- | --- |
| `status` | `OPEN` / `ASSIGNED` / `RESOLVED` | 未指派 / 已指派 / 已解决 |
| `releaseFlag` | `NEW` / `REGRESSED` / `ONGOING` | 仅在列表筛了 `release` 时返回 |
| `regressed` | 布尔 | 曾解决后同指纹再出现 |

`releaseFlag` 相对当前筛值：

- `NEW`：`firstRelease` 等于筛值（该版本首次出现）
- `REGRESSED`：已复发，且 `lastRelease` 等于筛值
- `ONGOING`：命中筛值，但不是上述两种

未筛 `release` 时响应不带 `releaseFlag`。

RESOLVED 后再摄入同指纹：置 `regressed`、重开并清空 `resolvedAt`；
有指派则为 `ASSIGNED`，否则 `OPEN`。

## 管理台操作

路径：`/track/error-issue`（菜单「错误问题单」）。

1. 选应用（`appKey`），可筛 `release` / 状态 / 指派人 / 仅复发。
2. 打开详情：看指纹、版本区间、最近堆栈与组内错误事件。
3. 有写权限时可指派、标已解决、重开。
4. 详情可一键打开最近会话回放（需 `sys:track-replay:view` 且有 `latestSessionId`）。
5. 有 `latestUserId` 或 `latestDistinctId` 时可跳「用户细查」并带上查询参数。

指派时 `assigneeId` 为空表示取消指派。
对已解决单再指派会重开：有人 → `ASSIGNED`，取消 → `OPEN`，并清 `resolvedAt`。
手动重开：有指派 → `ASSIGNED`，否则 `OPEN`；不清 `regressed`。

组内事件仍走现有 `/system/track/errors/detail`，不是 error-issues 新路径。

## API

前缀：`/system/track/error-issues`（管理台请求经网关时常见为 `/api/system/track/error-issues`）。

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| GET | `/page` | `sys:track-error:list` | 分页；可筛 appKey / release / status / assigneeId / regressedOnly |
| GET | `/detail` | `sys:track-error:list` | 详情；见下方 appKey 规则 |
| POST | `/assign` | `sys:track-error-issue:edit` | body：`id`、`appKey`、`assigneeId`（可空） |
| POST | `/resolve` | `sys:track-error-issue:edit` | body：`id`、`appKey` |
| POST | `/reopen` | `sys:track-error-issue:edit` | body：`id`、`appKey` |

### 防 IDOR：详情与写操作须带 appKey

- 按 `id` 查详情或写操作时，须同时传 `appKey`；服务端按租户 + appKey 校验，禁止只凭 id。
- 也可用 `appKey + fingerprint` 查详情（不传 id）。
- 管理台详情与指派 / 解决 / 重开均带当前应用的 `appKey`；缺则不发请求。

读权限复用错误监控的 `sys:track-error:list`。
写权限为 `sys:track-error-issue:edit`（主库迁移 V18；挂在「错误监控」菜单下，并对已有读权角色补授）。

## 数据与 release 关联

埋点库迁移 **T5** 建表 `track_error_issue`（唯一键 `app_key + fingerprint`）。
字段含 `first_release` / `last_release` / `releases`（JSON 文本数组）等。

SDK 初始化传 `options.release` 后，错误事件会携带版本；
问题单据此关联版本并可按 release 筛选。
未配置则不上报该字段。注入方式见 [安装与初始化](/track/install#配置项)。

## 相关页面

- [安装与初始化](/track/install)（`release`）
- [插件 · 错误](/track/plugins)（指纹口径）
- [埋点概述](/track/)
