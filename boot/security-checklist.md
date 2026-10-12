# 安全清单（上线前）

上线前至少核对：

1. 默认账号已改密；演示口令未暴露到公网
2. API / 字段加密密钥已轮换，且非仓库示例值
3. 反向代理只信任可信网段的 `X-Forwarded-For`
4. 附件下载校验租户与属主（防 IDOR）
5. 出站 URL（知识库、MCP、渠道回调）走统一安全闸门
6. 依赖 CVE（含文档解析组件）已扫描并升级
7. 埋点回放与 apiBody 脱敏策略符合 [隐私与合规](/track/privacy)

操作细节与配置键以 [mugsun-boot](https://github.com/mugsun/mugsun-boot) 源码及 README 为准。安全披露方式见各仓 `SECURITY.md`（若已添加）。

下一步：[配置](/boot/configuration) · [快速开始](/guide/getting-started)
