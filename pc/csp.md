# 内容安全策略（CSP）

管理台镜像（nginx）由启动脚本 `15-mugsun-gateway.sh` 生成 CSP 响应头。用 `MUGSUN_CSP_MODE` 选择只报告还是强制拦截。

## 开关

| 变量 | 默认 | 说明 |
|---|---|---|
| `MUGSUN_CSP_MODE` | `report-only` | `report-only`：只下发 `Content-Security-Policy-Report-Only`，浏览器报告违规，但不拦截。<br>`enforce`：下发 `Content-Security-Policy`，违规直接拦截。同时附加一份更严的 `Content-Security-Policy-Report-Only`，用来观察下一轮收紧。 |
| `MUGSUN_CSP_REPORT_URI` | 空 | 违规报告收集地址。为空时不输出 `report-uri`、`report-to` 和 `Reporting-Endpoints`。 |
| `MUGSUN_CSP_TILE_HOSTS` | 空 | 额外放行的地图瓦片域，空格分隔。瓦片默认走同源 `/api/system/gis/tile` 代理，一般不用填。 |
| `MUGSUN_CSP_TRACK_HOSTS` | 空 | 额外放行的埋点上报域，空格分隔。 |

::: warning 公开部署必须用 enforce
默认值 `report-only` 只报告、不拦截，没有任何 CSP 防护。演示站和所有对公网开放的部署都必须设 `MUGSUN_CSP_MODE=enforce`。`report-only` 只适合内网试运行：先跑一段时间，确认浏览器控制台没有违规，再切到 `enforce`。
:::

### 启动校验

下面任一项不符合，容器都会拒绝启动（日志里有 `15-mugsun-gateway.sh:` 开头的原因）：

| 变量 | 规则 | 例子 |
|---|---|---|
| `MUGSUN_CSP_MODE` | 只能是 `report-only` 或 `enforce`。 | `enforce` ✅；`x; script-src *` ❌ |
| `MUGSUN_CSP_TILE_HOSTS`、`MUGSUN_CSP_TRACK_HOSTS` | 只允许字母、数字、`.`、`*`、`:`、`/`、`-` 和空格。空格分隔的每一项都必须是 `https://` 或 `wss://` 加具体域名，可以带端口和路径；`*.` 只能用在域名开头，表示子域通配。单独的 `*`、只写协议（`https:`、`http:`）、`https://*`、明文 `http://` 地址都会被拒绝。 | `https://tile.example.com` ✅；`https://*.example.com` ✅；`*` ❌；`https:` ❌；`http://tile.example.com` ❌ |
| `MUGSUN_CSP_REPORT_URI` | 只允许 `A-Z a-z 0-9 . _ ~ : / ? = & % @ + -`，不能有空格、引号、分号、逗号。而且必须是 `https://` 开头的地址，或以 `/` 开头的同源路径（不接受 `//` 开头的协议相对地址）。报告里带页面 URL，所以不能明文发送，也不能发往未加密的外域。 | `/api/csp-report` ✅；`https://csp.example.com/report` ✅；`http://csp.example.com` ❌ |

```bash
docker run -e MUGSUN_CSP_MODE=enforce -e MUGSUN_CSP_REPORT_URI=https://csp.example.com/report mugsun/pc
```

## 策略

`enforce` 模式下发的强制策略（未填追加域名和报告地址时）：

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
worker-src 'self' blob:; child-src 'self' blob:; frame-src 'self'; media-src 'self' blob:;
manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

- 不含 `'unsafe-eval'`、`'wasm-unsafe-eval'`，也没有 `https:` 这样的通配。
- `style-src 'unsafe-inline'`：Element Plus 运行时要写内联样式。
- `worker-src blob:`：Cesium 要用。`media-src blob:`：视频播放器（xgplayer，MSE）要用。
- 不再写死天地图、高德的域名，瓦片统一走同源代理。
- 附加的 Report-Only 策略和上面相同，只是 `style-src` 去掉了 `'unsafe-inline'`。它只用来观察，不拦截。
- `report-uri` 只在填了 `MUGSUN_CSP_REPORT_URI` 时输出。收集端要能接收匿名 POST，并做好限流。

为配合强制模式，前端做了这些调整：

- vue-i18n 用 JIT 编译（`__INTLIFY_JIT_COMPILATION__`），不再依赖 `new Function`。
- Iconify 图标改为离线子集，运行时不请求 `api.iconify.design`。
- 主题初始化脚本从 `index.html` 内联移到 `/theme-init.js`。

## 已知限制

| 功能 | 强制模式下的表现 | 处理 |
|---|---|---|
| 表单设计器 / 低代码表单（form-create） | 规则里写函数、条件、公式的表单（form-create 用 `new Function` 编译）不能执行。打开设计器页会出现 1 条 `script-src eval` 违规，页面本身可以正常使用。 | 不为此放开 `'unsafe-eval'`。需要动态逻辑时，用组件事件或后端规则代替函数串。 |
| 图标 | 只能显示离线子集里的图标。菜单里配了子集之外的图标时，显示为空白，不会外联。 | 前端仓库新增图标后运行 `scripts/gen-offline-icons.mjs`；后端菜单种子数据里的图标写进 `scripts/offline-icons.extra.txt`。 |
| 外链 iframe 菜单 | `frame-src 'self'`：外域页面被拦。 | 改成新窗口打开。 |
| 会话回放 | 录制页上的外域图片、字体加载不出来，只影响画面还原。 | 不为此放开 `https:`。 |

## 自查

前端仓库带了一套强制模式检查（`playwright.csp.config.ts`），必须对 nginx 镜像运行，不能对 vite dev 或 preview 运行。它会逐菜单统计 `securitypolicyviolation`，检查响应头、中英文切换、离线图标、地图、WebSocket，并跑注入探针。

::: warning 不在 CI 里
这套检查目前没有接进 CI（它需要真实后端和 nginx 镜像）。每次发版前，必须用 `MUGSUN_CSP_MODE=enforce` 启动 nginx 镜像，手动跑一遍：

```bash
E2E_BASE_URL=http://localhost:<端口> pnpm exec playwright test -c playwright.csp.config.ts
```
:::
