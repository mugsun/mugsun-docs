# 安装

```bash
pnpm add @mugsun/track-web
# 或 npm / yarn
```

初始化时指定采集 `endpoint`（指向你的 boot 网关）。若 URL 已含 `/track/collect`，勿再重复拼接。Vue 应用建议传入 `router`，便于路径模板聚合。

完整选项表与框架示例以 [mugsun-track README](https://github.com/mugsun/mugsun-track) 为准。pc 仓本地联调时，可用 `file:../mugsun-track` 依赖（见 pc README 的 `pnpm setup:sdk`）。

下一步：[第一个事件](/track/first-event) · [隐私与合规](/track/privacy)
