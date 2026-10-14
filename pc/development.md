# 本地开发

## 前置条件

- Node.js ≥ 22.13、pnpm ≥ 11.11（`packageManager` 锁定 `pnpm@11.28.2`）
- [mugsun-boot](/boot/) 已在 `:8080` 运行
- 无论是否启用埋点模块，[mugsun-track](https://github.com/mugsun/mugsun-track) 与本仓**平级**克隆：SDK 以 `file:../mugsun-track` 引用，且 SDK 仓不提交 `dist/`

## 启动

```bash
pnpm setup:sdk
pnpm install
pnpm dev
```

`pnpm setup:sdk` 对 `../mugsun-track` 执行 install + build，`VITE_ENABLE_TRACK=false` 时可跳过，但平级目录仍须存在，`pnpm install` 要解析它。开发地址 `http://localhost:3006`（`VITE_PORT`）。

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

对使用者的影响（[pc#4](https://github.com/mugsun/mugsun-pc/pull/4)）：

- 同一标签页内刷新保持登录；**新开标签页或关闭后重开浏览器，需要重新登录**。
- 锁屏后刷新页面，锁屏状态不保留。
- 升级到该版本后，旧版存在 `localStorage` 中的 token 不再读取，**所有人需要重新登录一次**。

## 个人中心头像

个人中心上传头像（[pc#8](https://github.com/mugsun/mugsun-pc/pull/8)）：

- 只接受 png / jpg / jpeg / gif / webp（同时校验文件类型与扩展名），大小不超过 2MB；不符合时提示且不上传。
- 调用 `POST /auth/avatar/upload`，后端上传成功即设为本人头像；页面与顶栏头像立即更新。
- 头像地址形如 `/auth/avatar/raw/{id}`，管理台按接口同一规则加前缀（如 `/api/auth/avatar/raw/{id}`）；**该地址不需要登录即可访问**，可直接用作 `<img src>`。旧的 `http(s)://` 头像原样显示，无头像显示默认图。

接口细节见 [权限 · 头像](/boot/permissions#头像)。

## 下一步

[管理台概述](/pc/) · [接入埋点](/track/install)
