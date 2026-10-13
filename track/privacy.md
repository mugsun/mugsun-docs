# 隐私与合规

原则：**默认安全**。本页列出 SDK 当前（`origin/main`）的实际行为；若文档与实现不一致，以更严格的隐私行为为准，并请在 [mugsun-track](https://github.com/mugsun/mugsun-track/issues) 提 issue。

## 默认行为

| 项 | 行为 |
| --- | --- |
| Do Not Track | 默认尊重（`respectDnt: true`），开启 DNT 的浏览器不采集 |
| 用户拒绝 | `optOut()` 后停止采集与回放，`optIn()` 恢复 |
| 输入内容 | 不采集 `input` / `textarea` 的 `value` |
| 密码与敏感区域 | `input[type="password"]`、`maskSelectors` 命中区域与 `data-track-mask` 元素整块屏蔽 |
| 会话回放 | 默认关闭；开启后默认遮罩所有输入与页面文本（0.2.0 起） |
| 响应体 | 默认不采集；开启后敏感字段默认脱敏为 `***`（0.2.0 起）；凭证端点永不采集 |

## URL 敏感参数

接口监控上报的 URL 保留查询串，但以下键（**小写归一后精确匹配**）的值替换为 `***`，业务参数保留：

```text
token  access_token  authorization  id_token  refresh_token
api_key  apikey  auth  secret  password
```

```text
/api/order?id=42&token=abc123   →   /api/order?id=42&token=***
```

非法 URL 原样返回；相对 URL 保持相对形态。

## 合规建议

- 在隐私政策中说明采集范围，并为用户提供拒绝入口（调用 `optOut()`）。
- 包含个人信息的区域加 `data-track-mask` 或写入 `maskSelectors`。
- 开启响应体采集前评估必要性；保持 `apiBodyMaskEnabled` 默认开启，不要为排障长期关闭。
- 数据存储在你自己的 PostgreSQL 中，保留周期与访问权限按企业制度配置。

相关：[插件](/track/plugins) · [安全清单](/boot/security-checklist)
