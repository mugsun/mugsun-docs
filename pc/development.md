# 本地开发

前置：Node.js ≥ 20.19、pnpm ≥ 8.8（锁定版本见 pc 仓）；[mugsun-boot](https://github.com/mugsun/mugsun-boot) 已在 `:8080` 运行。启用埋点时需与 [mugsun-track](https://github.com/mugsun/mugsun-track) **平级**克隆。

1. （启用 Track 时）在 pc 仓执行 `pnpm setup:sdk`（或按 README 先构建平级 `mugsun-track`）。
2. `pnpm install`
3. 确认 `.env.development` 中 `VITE_API_PROXY_URL` 指向本地 boot（默认 `http://localhost:8080`）。
4. `pnpm dev` → `http://localhost:3006`
5. 需要类型时，用仓内 `pnpm gen:api`（或等价脚本）从 OpenAPI 生成请求类型——优先生成，少写手写 `any`。

模块开关、构建与 lint 命令以 [mugsun-pc README](https://github.com/mugsun/mugsun-pc/blob/main/README.md) 与 CI 为准。

下一步：[管理台概述](/pc/) · [快速开始](/guide/getting-started) · [接入埋点](/track/install)
