# 隐私与合规

产品原则：**默认安全**，而不是「能录再说」。以下为 `@mugsun/track-web` 0.2.0 起的默认行为。

| 能力 | 默认 | 如何调整 |
| --- | --- | --- |
| 输入框 / 密码 | 不采集 `input` / `textarea` 的 `value`；`password` 及 `maskSelectors` 命中区域屏蔽 | 用 `maskSelectors` 追加屏蔽区域 |
| 会话回放 | 遮罩输入内容与页面文本（`maskTextSelector: '*'`） | 调试时 `replayPlugin({ maskTextSelector: false })` 或传更窄的选择器 |
| 上报 URL | 剥离敏感 query：`token` / `access_token` / `authorization` / `id_token` / `refresh_token` 等（大小写不敏感），值替换为 `***`，业务参数保留 | — |
| 接口响应体（apiBody） | 开启采集时按内置敏感键清单脱敏（`apiBodyMaskEnabled: true`） | 确需原文时显式 `apiBodyMaskEnabled: false` |
| DNT / 退出 | 尊重 DNT；提供 `optOut()` / `optIn()` | — |

::: tip 从 0.1.x 升级
0.2.0 起回放默认遮罩页面文本、apiBody 默认脱敏，属于行为变更。依赖可读回放或 body 原文的接入，请按上表显式关闭。详见 [CHANGELOG](https://github.com/mugsun/mugsun-track/blob/main/CHANGELOG.md)。
:::

::: warning
若文档与实际行为不一致，以「更严格的隐私行为」为准，并在 [mugsun-track](https://github.com/mugsun/mugsun-track) 提 issue。
:::

相关：[安装](/track/install) · [第一个事件](/track/first-event) · [安全清单](/boot/security-checklist)
