# 配置

关键配置入口（数据源、Redis、密钥、模块开关）。**详细键名以 boot 仓 `application*.yml` 与 [README](https://github.com/mugsun/mugsun-boot/blob/main/README.md) 为准。**

本地：从 `config/application-local.yml.example` 复制为 `config/application-local.yml`（已 gitignore），工作目录须为 boot 仓库根目录。

生产建议：

- 勿使用文档或仓库中的演示密钥
- 缺密钥时拒绝启动（fail-fast），不要静默回落公开串
- 模块（track / gis / ai）按需开启：`MUGSUN_TRACK_ENABLED` / `MUGSUN_GIS_ENABLED` / `MUGSUN_AI_ENABLED`
- `prod` 须注入初始口令（如 `MUGSUN_INIT_PASSWORD`），否则拒绝启动

下一步：[安全清单](/boot/security-checklist) · [快速开始](/guide/getting-started)
