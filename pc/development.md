# 本地开发

在本机启动管理后台并连上后端。后面几节是常用命令、测试，和开发时要知道的几件事。

## 准备

| 需要 | 说明 |
| --- | --- |
| Node.js | 22.13 及以上 |
| pnpm | 11.11 及以上，`package.json` 里锁定的是 `pnpm@11.28.2` |
| 后端 | [mugsun-boot](/boot/) 已在 `8080` 端口运行，做法见[快速开始](/guide/getting-started) |

埋点 SDK `@mugsun/track-web` 从 npm 安装，不用另外克隆仓库。

## 启动

<div class="ms-steps">

### 安装依赖

```bash
git clone https://github.com/mugsun/mugsun-pc.git && cd mugsun-pc
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

浏览器会自动打开 <http://localhost:3006>。

### 登录

账号是 `admin`，口令是启动后端时用 `MUGSUN_INIT_PASSWORD` 设置的那个。

</div>

开发时 `/api` 开头的请求会转发到后端，转发前去掉 `/api` 前缀。

| 要改什么 | 改哪里 |
| --- | --- |
| 后端地址 | `.env.development` 的 `VITE_API_PROXY_URL`，默认 `http://localhost:8080` |
| 前端端口 | `.env` 的 `VITE_PORT`，默认 `3006` |

换了前端端口，后端的 `MUGSUN_FRONT_URL` 也要跟着改，跨域和 OAuth 回跳都用它。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 先做类型检查，再打包到 `dist/` |
| `pnpm serve` | 预览打包结果 |
| `pnpm test` | 单元测试，使用 Vitest |
| `pnpm test:ui-check` | [UI 自检](/pc/ui-check)，不需要后端 |
| `pnpm test:e2e` | 端到端测试，使用 Playwright，见[下文](#e2e) |
| `pnpm lint` / `pnpm fix` | ESLint 检查 / 自动修复 |
| `pnpm gen:api` | 按后端的 OpenAPI 生成接口类型，后端要在运行 |

`pnpm gen:api` 读取 `http://localhost:8080/v3/api-docs`，结果写到 `src/types/api/openapi.d.ts`。

## 新增一个页面

<div class="ms-steps">

### 写接口

在后端实现接口，用 `@SaCheckPermission` 声明权限码。

### 更新接口类型

```bash
pnpm gen:api
```

### 登记菜单

在「菜单管理」里登记菜单和按钮的权限码。前端路由随菜单下发。

### 写页面

页面放在 `src/views/` 下。成块的可选功能放进 `modules/<名称>/`，再加一个 `VITE_ENABLE_<名称>` 开关。

</div>

现有的三个可选模块怎么关，见[关闭可选模块](/pc/#关闭可选模块)。

## 权限模式和跨域

这两个变量写在 `.env` 里，构建时生效。

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `VITE_ACCESS_MODE` | `backend` | 菜单和权限从哪里来，只能取 `backend` 或 `frontend` |
| `VITE_WITH_CREDENTIALS` | `false` | 设为 `true` 时，请求带上 Cookie |

- `backend`：菜单和权限由后端接口返回，正式项目用这个。
- `frontend`：菜单和权限写在前端路由配置里，适合小项目和演示。

管理后台和后端跨域部署、又要带 Cookie 时，才把 `VITE_WITH_CREDENTIALS` 设为 `true`。

这时后端也要允许跨域携带凭据。

## 端到端测试 {#e2e}

端到端测试连真实的后端，不解验证码，所以分成两套，各对应一种后端配置。

| 套件 | 命令 | 后端要求 |
| --- | --- | --- |
| 主套 | `pnpm test:e2e` | 验证码关闭，PowerJob Server 在 `7700` 端口可达 |
| 验证码开启套 | `pnpm test:e2e:captcha-on` | 验证码保持开启（默认） |

两套都要先用 `pnpm dev:e2e` 在 `3007` 端口启动前端。

后端的 `MUGSUN_FRONT_URL` 也要指向这个端口。

### 主套

- 关闭验证码有两种办法：设 `mugsun.captcha.enabled=false`，或关掉平台租户的验证码开关。
- 开跑前会请求 `/auth/captcha/config`。验证码还开着，或者接口返回异常，都会直接报错。
- 定时任务的用例要用 PowerJob，后端要带 `--powerjob.worker.enabled=true` 启动。
- `7700` 端口不通时直接报错，不会去启动容器。

想让测试代为启动 PowerJob 容器，设 `E2E_START_POWERJOB=1`：

```bash
E2E_START_POWERJOB=1 E2E_POWERJOB_CONTAINERS=my-pj-db,my-pj pnpm test:e2e
```

容器名用逗号分隔，默认是 `powerjob-mysql,powerjob-server`。

### 验证码开启套

- 用例在 `e2e/captcha-on/`，不需要 PowerJob。
- 它检查不带 `captchaToken` 时，登录、注册和忘记密码发码都被拒绝。
- 被拒绝的表现是 HTTP 200，`code` 为 `40013`。
- 后端明确返回 `enabled=false` 时，这几条用例会跳过并写明原因。

## 登录状态存在哪里

| 内容 | 存放位置 | 什么时候失效 |
| --- | --- | --- |
| 访问令牌、刷新令牌、登录标记 | `sessionStorage`，键 `sys-v{version}-user-session` | 关闭标签页 |
| 语言、用户信息、搜索历史 | `localStorage` | 手动清除 |
| 锁屏口令 | 只在内存里，保存加盐的 SHA-256 哈希 | 刷新页面 |

所以在同一个标签页里刷新不会掉登录，新开标签页或重开浏览器要重新登录。

::: warning 锁屏不是安全边界
锁屏只是遮住界面，解锁在前端比对，不经过后端。刷新页面就会解锁。
:::

## 个人中心头像

个人中心可以上传头像，接口是 `POST /auth/avatar/upload`。

- 只接受 `png` `jpg` `jpeg` `gif` `webp` 五种格式，大小不超过 2MB。
- 上传成功后立刻设为本人头像，页面和顶栏同时更新。
- 头像地址形如 `/auth/avatar/raw/{id}`，不用登录就能访问，可以直接放进 `<img src>`。

接口细节见[权限 · 头像](/boot/permissions#头像)。

## 下一步

<div class="ms-cards">

- [管理后台概述](/pc/) 有哪些页面，代码怎么组织。
- [UI 自检](/pc/ui-check) 提交前要通过的界面检查。
- [Docker 部署](/pc/deploy-docker) 打成镜像，用 Nginx 托管。
- [接入埋点](/track/install) 给自己的页面装上埋点 SDK。

</div>
