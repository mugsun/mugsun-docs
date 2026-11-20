# 数据概览与事件分析

「数据概览」看一个应用的整体流量：来了多少人，看了哪些页面，从哪里来。「事件分析」按事件名统计次数，并显示刚收到的事件。

两个页面都在「埋点分析」菜单下。进页面先选应用，再选时间范围，可选今天、近 7 天和近 30 天。

选中的应用和时间范围记在浏览器里，「埋点分析」下的其他页面会沿用。

![数据概览页，上面是六张指标卡，中间是访问趋势和当前在线，下面是 Top 页面和三张分布图](/readme/track-overview.png)

## 指标卡

| 指标 | 怎么算 |
| --- | --- |
| 浏览量(PV) | `$pageview` 事件的条数 |
| 访客数(UV) | 整个时间范围内去重后的设备数，不是每天的 UV 相加 |
| 会话数 | 每天有事件的会话数相加。跨过 0 点的会话两天各算一次 |
| 事件数 | 全部事件的条数，自动采集的和自己上报的都算 |
| 平均会话时长 | 在时间范围内开始、并且已经结束的会话的平均时长 |
| 跳出率 | 已经结束的会话里，页面浏览不超过一次的占多少 |
| 当前在线 | 最近 5 分钟有事件的会话数，页面每 5 秒取一次 |

设备按 SDK 给每个浏览器生成的匿名 ID 区分，见[安装与初始化](/track/install#识别用户)。

会话在 30 分钟没有新事件后结束，收到 `$session_end` 事件时也会结束。后端每分钟检查一次。

时间范围内还没有结束的会话时，平均会话时长和跳出率显示「—」。

## 趋势和分布

| 卡片 | 内容 |
| --- | --- |
| 访问趋势 | 选「今天」时每 5 分钟一个点，画 PV、会话数和事件数。选 7 天或 30 天时每天一个点，多画一条 UV |
| Top 页面 | PV 最高的 10 个页面，每个页面有 PV、UV 和平均停留 |
| 来源分布 | 按来源页面的主机名统计 PV，取前 10。没有来源的记成 `direct` |
| 设备分布 | 按设备类型统计 PV，取前 10。识别不出的记成 `unknown` |
| 浏览器 Top | 按浏览器统计 PV，取前 10。识别不出的记成 `unknown` |
| 地域分布 | 按 IP 所在的省份列出 PV、UV 和事件数，按事件数排，最多 50 行 |
| 访问热力 | 把最近 2000 条带坐标的事件画在地图上 |

Top 页面的路径优先用路由模板，比如 `/order/:id`，同一类页面合成一行。没有路由模板时用实际路径。

平均停留是 `$pageleave` 事件上报的停留时长的平均值。

按天的趋势怎么切天、没有数据的日子怎么画，见[看板怎么统计](/track/#看板趋势)。

### 地域和热力

地域分布要后端打开 IP 归属地解析，配置见 [IP 归属地](/boot/configuration#ip-归属地)。没打开时全部事件归在「未知」一行。

打开以后，内网地址归在「内网」一行，解析不出省份的归在「未知」。

访问热力要同时满足三个条件：

- 应用打开了「精确位置」，前端注册了定位插件，见[空间行为](/track/spatial#先让事件带上坐标)。
- 管理后台构建时带了地图模块。
- 后端启用了地图服务，见[地图](/pc/gis)。

卡片标题旁的「精确坐标 N 条」是时间范围内带坐标的事件总数。要按区域细看，用[空间行为](/track/spatial)页。

## 事件分析

![事件分析页，上面是按事件名统计的列表，下面是实时事件流](/screenshots/track-event.png)

列表每个事件名一行，按次数从多到少排：

| 列 | 说明 |
| --- | --- |
| 事件名 | 自动采集的事件以 `$` 开头，比如 `$pageview` |
| 次数 | 时间范围内这个事件的条数 |
| 会话数 | 出现过这个事件的会话数 |
| UV | 出现过这个事件的设备数 |
| 最近发生 | 后端最近一次收到这个事件的时间 |

筛选框要填完整的事件名，回车后只留这一个事件。它按全名匹配，填一半查不到。

点一行的操作按钮打开「事件趋势」，画出这个事件的次数和会话数。粒度跟时间范围走，和访问趋势一样。

### 实时事件流

列表下方的「实时事件流」显示最新收到的 20 条事件，每 5 秒刷新，可以暂停和继续。

事件一到后端就能在这里看到，不用等入库。接入时用它核对事件有没有发出来，步骤见[第一个事件](/track/first-event)。

每个应用只保留最近约 1000 条供这里展示，更早的要到列表或[用户细查](/track/replay#用户细查)里看。

## 数据多久更新

| 内容 | 更新方式 |
| --- | --- |
| 指标卡、三张分布图、访问趋势、Top 页面 | 结果在后端缓存 45 秒，点「刷新」也要等缓存过期 |
| 地域分布、访问热力、事件列表 | 每次都查库，不缓存 |
| 当前在线、实时事件流 | 读 Redis，页面每 5 秒取一次 |

缓存在每个后端实例自己的内存里。部署了多个实例时，连续刷新可能看到略有出入的数字。

选「今天」时，趋势图读的是每分钟汇总一次的结果。新事件要等下一次汇总，再等缓存过期，大约晚两分钟出现在图上。

统计的时间范围按后端收到事件的时间算。断网后补发的事件记在补发到达的那一天。

## 权限

| 权限 | 能看什么 |
| --- | --- |
| `sys:track-overview:list` | 数据概览的全部卡片 |
| `sys:track-event:list` | 事件列表和实时事件流 |
| `sys:track-app:list` | 页面顶部的应用下拉。没有它选不了应用 |

「事件趋势」用的是 `/trend` 接口，所以还要有 `sys:track-overview:list`。

只能看到本租户的应用和数据。

## 接口

接口都在 `/system/track` 下面，都是 GET，要登录。

| 路径 | 权限 | 参数 |
| --- | --- | --- |
| `/overview` | `sys:track-overview:list` | `appKey` `days` |
| `/trend` | `sys:track-overview:list` | `appKey` `days` `dimType` `dimKey` |
| `/pages` | `sys:track-overview:list` | `appKey` `days` `limit` |
| `/online` | `sys:track-overview:list` | `appKey` |
| `/geo` | `sys:track-overview:list` | `appKey` `days` |
| `/events/page` | `sys:track-event:list` | `appKey` `days` `eventName` `pageNum` `pageSize` |
| `/events/realtime` | `sys:track-event:list` | `appKey` `limit` |

参数的取值：

| 参数 | 说明 |
| --- | --- |
| `appKey` | 必填 |
| `days` | 默认 7，可取 1 到 90，超出范围报错。1 表示今天 |
| `dimType` | `overview` `event` `page` `referrer` `device` 之一，默认 `overview` |
| `dimKey` | 这个维度下的一个取值，比如 `dimType=event` 时填事件名 |
| `limit` | `/pages` 默认 10，`/events/realtime` 默认 100，最大都是 500 |
| `pageSize` | 默认 10，最大 500 |

返回的内容：

| 路径 | 返回 |
| --- | --- |
| `/overview` | `cards` 是指标卡，`referrerDist` `deviceDist` `browserTop` 是三张分布图，每项有 `name` 和 `value` |
| `/trend` | `days` 不超过 2 时每项有 `time` `pv` `eventCount` `sessionCount`，其余每项有 `date` `pv` `uv` `sessionCount` `bounceCount` `eventCount` |
| `/pages` | 每项有 `pagePath` `pv` `uv` `avgDurationMs` |
| `/online` | `online` 是会话数，`windowSeconds` 是 300 |
| `/geo` | `regions` 是地域分布，`points` 是坐标点，`geoCount` 是带坐标的事件总数 |
| `/events/page` | 每行有 `eventName` `eventCount` `sessionCount` `uv` `lastTime` |
| `/events/realtime` | 每项有 `id` `eventId` `eventName` `ts` `distinctId` `sessionId` `userId` `urlPath` |

`cards` 里有 `pv` `uv` `sessionCount` `eventCount` 四个计数。

另外三项是 `avgSessionDurationMs` `bounceRate` 和 `settledSessionCount`。

`bounceRate` 是 0 到 1 的比例。`settledSessionCount` 是已经结束的会话数，是 0 时时长和跳出率还没有值。

时间都是毫秒时间戳，`date` 是当地时区的日期。Redis 连不上时，`/online` 返回 0，`/events/realtime` 返回空数组。

## 下一步

<div class="ms-cards">

- [漏斗与留存](/track/funnel-retention) 看用户走到了哪一步，过几天还回不回来。
- [性能分析与错误监控](/track/perf-errors) 页面慢不慢，出了哪些错。
- [问数据](/track/ask) 用一句话查这些指标。

</div>
