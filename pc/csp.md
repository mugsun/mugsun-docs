# 内容安全策略（CSP）

管理后台的镜像会给页面加上 CSP 响应头。默认只报告违规，确认没有问题后再改成拦截。

## 开启拦截

<div class="ms-steps">

### 先用默认模式运行

默认是 `report-only` 模式，浏览器只报告违规，不拦截。镜像的启动方法见 [Docker 部署](/pc/deploy-docker)。

把常用的页面都打开一遍，看浏览器控制台里有没有 CSP 违规。

### 改成拦截

```bash
docker run -d -p 8088:8080 \
  -e MUGSUN_API_UPSTREAM=http://<后端地址>:8080 \
  -e MUGSUN_CSP_MODE=enforce \
  mugsun/pc:local
```

### 确认响应头

```bash
curl -sI http://localhost:8088/ | grep -i '^content-security-policy'
```

应该看到 `Content-Security-Policy` 和 `Content-Security-Policy-Report-Only` 两行。

</div>

::: warning 对公网开放的部署要用 enforce
`report-only` 只报告、不拦截，起不到防护作用，只适合在内网试运行。
:::

## 四个变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MUGSUN_CSP_MODE` | `report-only` | `report-only` 只报告，`enforce` 拦截 |
| `MUGSUN_CSP_REPORT_URI` | 空 | 违规报告的收集地址 |
| `MUGSUN_CSP_TILE_HOSTS` | 空 | 额外放行的地图瓦片域名，空格分隔 |
| `MUGSUN_CSP_TRACK_HOSTS` | 空 | 额外放行的埋点上报域名，空格分隔 |

- 地图瓦片默认经同源的 `/api/system/gis/tile` 转发，一般不用填瓦片域名。
- 报告地址留空时，响应里不带 `report-uri`、`report-to` 和 `Reporting-Endpoints`。

### 取值规则

容器启动时检查这四个变量，有一项不合格就拒绝启动。日志里以 `15-mugsun-gateway.sh:` 开头的那行写着原因。

| 变量 | 可以 | 不可以 |
| --- | --- | --- |
| `MUGSUN_CSP_MODE` | `report-only`、`enforce` | 其他任何值 |
| 两个域名变量 | `https://tile.example.com`<br>`https://*.example.com`<br>`wss://ws.example.com:8443` | `*`<br>`https://*`<br>`http://tile.example.com` |
| `MUGSUN_CSP_REPORT_URI` | `/api/csp-report`<br>`https://csp.example.com/report` | `http://csp.example.com`<br>`//csp.example.com` |

- 域名变量的每一项都是 `https://` 或 `wss://` 加具体域名，可以带端口和路径。
- `*.` 只能放在域名开头，表示所有子域。
- 报告地址只能是 `https://` 开头的地址，或 `/` 开头的同源路径。
- 报告里带着页面网址，所以不允许用明文的 `http://` 发送。

## 下发的策略

`enforce` 模式下发的策略如下。这是没填额外域名和报告地址时的样子。

```text
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
worker-src 'self' blob:; child-src 'self' blob:; frame-src 'self'; media-src 'self' blob:;
manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

| 指令 | 说明 |
| --- | --- |
| `script-src 'self'` | 不允许 `eval` 和内联脚本，也没有 `https:` 这类通配 |
| `style-src 'unsafe-inline'` | Element Plus 运行时要写内联样式 |
| `worker-src blob:` | 三维地图用的 Cesium 需要 |
| `media-src blob:` | 视频播放器需要 |
| `img-src` 和 `connect-src` | 不含地图厂商的域名，瓦片都经同源接口转发 |

两种模式下发的响应头不一样：

| 模式 | 响应头 | 内容 |
| --- | --- | --- |
| `report-only` | `Content-Security-Policy-Report-Only` | 上面的策略 |
| `enforce` | `Content-Security-Policy` | 上面的策略 |
| `enforce` | `Content-Security-Policy-Report-Only` | 上面的策略去掉 `style-src` 里的 `'unsafe-inline'` |

`enforce` 模式附带的那份 Report-Only 只报告、不拦截，用来观察下一步收紧 `style-src` 会影响哪些地方。

### 收集违规报告

填了 `MUGSUN_CSP_REPORT_URI`，浏览器会把违规报告用 POST 发到这个地址。

- 收集端要能接收不带登录状态的 POST 请求，并做好限流。
- 后端只在[只读演示模式](/boot/demo-mode)下自带收集端，地址是 `/api/csp-report`。
- 其他部署方式下这个地址返回 404，要收报告就自己准备收集端。

## 开启拦截后的限制

| 功能 | 表现 | 处理办法 |
| --- | --- | --- |
| 表单设计器 | 规则里写的函数、条件和公式不会执行 | 改用组件事件或后端规则 |
| 菜单图标 | 离线图标集之外的图标显示为空白 | 重新生成离线图标集，见下一节 |
| 外链 iframe 菜单 | 其他域名的页面被 `frame-src 'self'` 拦住 | 改成在新窗口打开 |
| 会话回放 | 被录制页面上的外域图片和字体加载不出来 | 只影响画面还原，不处理 |

打开表单设计器页时，控制台会出现 1 条 `script-src` 的 eval 违规，页面本身可以正常使用。

## 改前端代码时要注意 {#frontend}

- 不要用 `eval` 和 `new Function`，拦截模式下不会执行。
- 不要在 `index.html` 里写内联脚本。主题初始化脚本就放在单独的 `/theme-init.js` 里。
- 图标从离线图标集读取，运行时不请求 `api.iconify.design`。

用了新图标以后，要重新生成离线图标集并提交：

- 前端源码里用到的图标会被自动扫描到。
- 只出现在后端菜单数据里的图标，要先写进 `scripts/offline-icons.extra.txt`。
- 生成命令见 `scripts/gen-offline-icons.mjs` 文件开头的说明。

## 检查拦截模式 {#check}

管理后台仓库带了一套 Playwright 检查，用一条命令运行：

```bash
scripts/ci/run-csp-e2e.sh
```

- 需要 Docker 和 OpenSSL，并且 mugsun-core、mugsun-boot 和 mugsun-pc 在同一个目录下。
- 脚本会生成一次性的密钥，用 `enforce` 模式启动整套环境，跑完后清理掉。
- 想在跑完后保留环境来排查问题，在命令前加 `KEEP=1`。
- 结果和截图写在 `test-results/csp/` 目录。

这套检查包括：

| 检查项 | 要求 |
| --- | --- |
| 响应头 | 带着拦截策略，策略里没有 `unsafe-eval`、`*` 和 `https:` |
| 逐个菜单打开 | 被拦截的违规数为 0 |
| 中英文切换 | 显示译文 |
| 图标 | 侧边栏图标能显示，没有发往外域的图标请求 |
| 地图 | 二维和三维地图都能加载 |
| WebSocket | 同源可以连接，伪造来源被拒绝 |
| 注入测试 | 内联事件处理器被拦住，并产生违规报告 |
| 埋点和会话回放 | 埋点上报和回放播放都没有被策略拦截 |
| 报告收集 | 能收到报告，网址里的参数被去掉，超过限流返回 429 |

::: tip 只能对镜像运行
开发服务器和 `pnpm serve` 都不下发 CSP 响应头，对它们运行这套检查没有意义。
:::

仓库的 CI 在每次推送时也会运行同一个脚本。

## 下一步

<div class="ms-cards">

- [Docker 部署](/pc/deploy-docker) 构建镜像，配置后端地址和前置网关。
- [底图瓦片代理安全](/pc/gis-tile-security) 地图瓦片为什么经同源接口转发。
- [安全清单](/boot/security-checklist) 上线前要逐项核对的其他配置。

</div>
