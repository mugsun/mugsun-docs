# 第一个事件

目标：从接入到在管理台看板看到**至少一条**事件。

## 前置条件

- boot 已运行，且 track 模块启用（默认 profile `full` 包含；未设置 `MUGSUN_TRACK_ENABLED=false`）
- 能登录管理台（见 [快速开始](/guide/getting-started)）

## 步骤

1. **创建应用**：管理台进入「埋点分析 → 接入管理」，新建应用，复制 `appKey`。
2. **初始化 SDK**：

   ```ts
   import { createTracker } from '@mugsun/track-web'

   const track = createTracker({
     endpoint: 'http://localhost:8080',
     appKey: '<appKey>',
     debug: true, // 控制台输出 SDK 日志，排查完再关
   })
   ```

3. **触发事件**：刷新页面产生 `pageview`，或手动调用：

   ```ts
   track.track('first_event', { source: 'docs' })
   await track.flush() // 不等批量阈值，立即发送
   ```

4. **核对**：浏览器网络面板中 `POST /track/collect` 返回 2xx；管理台埋点看板 / 实时视图出现该应用的新事件。

## 没看到事件？

| 现象 | 排查 |
| --- | --- |
| 没有任何 `/track/collect` 请求 | 浏览器开启了 Do Not Track（`respectDnt` 默认 `true`）；或调用过 `optOut()`；或 `enabled: false` / 采样率为 0 |
| 请求地址是 `…/track/collect/track/collect` | `endpoint` 只填服务根地址，SDK 会自动拼接 `/track/collect` |
| 请求 4xx | `appKey` 不存在或应用被停用；在接入管理中核对 |
| 请求成功但看板为空 | 确认看板选中了正确的应用与时间范围 |

## 下一步

[插件](/track/plugins) · [隐私与合规](/track/privacy)
