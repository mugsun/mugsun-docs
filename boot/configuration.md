# 配置

本文存放关键配置入口（数据源、Redis、密钥、模块开关）。**详细键名以 boot 仓 `application*.yml` 与 README 为准。**

建议生产环境：

- 勿使用文档或仓库中的演示密钥
- 缺密钥时拒绝启动（fail-fast），不要静默回落公开串
- 模块（track / gis / ai）按需开启，减小攻击面与依赖面

::: warning
本文将在下一迭代按实际配置项补全表格。当前请直接阅读 [mugsun-boot](https://github.com/mugsun/mugsun-boot) 仓库。
:::
