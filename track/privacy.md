# 隐私与合规

产品原则：**默认安全**，而不是「能录再说」。

应覆盖的能力（以实现与版本为准）：

- 输入框 / 密码类不采集或默认遮罩
- 会话回放默认遮罩页面文本；放开需显式配置
- 上报 URL 剥离敏感 query（如 `token`）
- 尊重 DNT；提供 `optOut()`
- apiBody 等敏感载荷脱敏默认开启

::: warning
若文档与实际行为不一致，以「更严格的隐私行为」为准，并在 [mugsun-track](https://github.com/mugsun/mugsun-track) 提 issue。
:::

相关：[安装](/track/install) · [第一个事件](/track/first-event) · [安全清单](/boot/security-checklist)
