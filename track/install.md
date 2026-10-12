# 安装

```bash
pnpm add @mugsun/track-web
# 或 npm / yarn
```

初始化时指定采集 `endpoint`（指向你的 boot 网关，勿重复拼接已含 `/track/collect` 的完整 URL）。Vue 应用建议传入 `router`，便于路径模板聚合。

::: warning
完整选项表与框架示例将补全。请同时阅读 SDK README。
:::

相关：[第一个事件](/track/first-event)
