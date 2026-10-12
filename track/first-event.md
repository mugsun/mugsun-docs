# 第一个事件

目标：从接入到在管理台看板看到**至少一条**事件。

1. 按 [安装](/track/install) 完成 SDK 初始化。
2. 确认 boot 已启用 track 模块，采集地址可达（默认 profile `full` 含 track；可用 `MUGSUN_TRACK_ENABLED` 开关）。
3. 在页面触发一次 PV 或自定义事件。
4. 打开 pc 埋点相关看板 / 实时视图核对。

::: tip 验收
看板出现对应应用下的新事件；网络面板中采集请求为 2xx。具体菜单名以当前 pc 版本为准。
:::

相关：[埋点概述](/track/) · [隐私与合规](/track/privacy) · [快速开始](/guide/getting-started)
