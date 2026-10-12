# 快速开始

目标：用 **一条 docker compose**（或文档标明的等价命令）从空环境到管理台登录。

## 你需要

- Docker / Docker Compose
- 能访问 [mugsun-boot](https://github.com/mugsun/mugsun-boot) 仓库

## 步骤（提纲）

1. 克隆 `mugsun-boot`，进入含 `docker-compose.yml` 的目录。
2. 按仓库 README 启动依赖与应用（Postgres、Redis 等以 README 为准）。
3. 浏览器打开管理台地址（默认端口以 README 为准）。
4. 使用文档中的演示账号登录，**登录后立刻修改密码**。
5. 冒烟：打开系统管理任一列表页；若启用 track，按 [第一个事件](/track/first-event) 验证采集。

::: warning
具体命令与默认口令以各仓 README 为准；本页后续会收成「复制即跑」的单一脚本，并链接到公网 Demo。
:::

## 相关链接

- [mugsun-boot](https://github.com/mugsun/mugsun-boot)
- [mugsun-pc](https://github.com/mugsun/mugsun-pc)
- [演示说明](/demo)
