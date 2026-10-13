# 本地开发

## 前置条件

- Node.js ≥ 20.19、pnpm ≥ 8.8
- [mugsun-boot](/boot/) 已在 `:8080` 运行
- 启用埋点模块（默认）时，[mugsun-track](https://github.com/mugsun/mugsun-track) 与本仓**平级**克隆：SDK 以 `file:../mugsun-track` 引用，且 SDK 仓不提交 `dist/`

## 启动

```bash
pnpm setup:sdk
pnpm install
pnpm dev
```

`pnpm setup:sdk` 对 `../mugsun-track` 执行 install + build，`VITE_ENABLE_TRACK=false` 时可跳过。开发地址 `http://localhost:3006`（`VITE_PORT`）。

`/api/**` 代理至 `.env.development` 的 `VITE_API_PROXY_URL`（默认 `http://localhost:8080`）。登录账号与 boot 一致。

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 开发服务器 |
| `pnpm build` | `vue-tsc --noEmit` 类型检查后 `vite build` |
| `pnpm serve` | 预览构建产物 |
| `pnpm test` | 单元测试（vitest） |
| `pnpm test:e2e` | 端到端测试（playwright；e2e 开发端口 `3007`，boot 侧需设置 `MUGSUN_FRONT_URL`） |
| `pnpm lint` / `pnpm fix` | ESLint 检查 / 自动修复 |
| `pnpm gen:api` | 从 `http://localhost:8080/v3/api-docs` 生成 `src/types/api/openapi.d.ts`（须 boot 已启动） |

## 新增页面的推荐流程

1. 在 boot 中实现接口并声明权限码（`@SaCheckPermission`）。
2. `pnpm gen:api` 更新类型。
3. 在「菜单管理」中登记菜单与按钮权限码，前端路由随菜单下发。
4. 模块化功能放进 `modules/<name>`，并加 `VITE_ENABLE_<NAME>` 开关。

## 登录态说明

`accessToken`、`refreshToken`、`isLogin` 存于 `sessionStorage`（键 `sys-v{version}-user-session`），关闭标签页即失效；语言、用户信息与搜索历史存于 `localStorage`。锁屏密码不持久化，刷新后锁屏状态不保留。

## 下一步

[管理台概述](/pc/) · [接入埋点](/track/install)
