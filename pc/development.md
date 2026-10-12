# 本地开发

1. 安装 Node.js（版本以 pc 仓 `package.json` / README 为准）与 pnpm。
2. 克隆 [mugsun-pc](https://github.com/mugsun/mugsun-pc)，`pnpm install`。
3. 配置环境变量指向本地 boot API。
4. `pnpm dev` 启动；联调前确认 boot 已起。
5. 使用仓内 `pnpm gen:api`（或等价脚本）从 OpenAPI 生成请求类型——**优先生成类型，少写手写 any**。

::: tip
构建、lint、e2e 命令以仓库 README 与 CI 为准。本文将补环境变量表与常见联调错误。
:::
