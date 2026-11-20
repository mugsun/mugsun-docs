# 安全清单（上线前）

对公网开放之前，把这一页从头到尾过一遍。每一项下面是自检方法，全部是只读检查，不会改动系统。

每一项前面的方框可以勾选。勾选状态只保存在你自己的浏览器里，换一台电脑不会带过去。

## 开始之前

- 示例里的 `https://your-host` 换成实际域名，`<...>` 按实际情况填写。
- 经管理后台的网关访问后端时，接口路径要加 `/api` 前缀，下面的示例都带了。
- `CODE` 是只输出 HTTP 状态码的 curl，先定义好：

```bash
alias CODE="curl -s -o /dev/null -w '%{http_code}\n'"
```

## 账号与密钥

- [ ] 已注入 `MUGSUN_INIT_PASSWORD`，对外可访问的环境都没有用仓库里公开的缺省口令
  - 在部署机上执行下面的命令。它只判断变量有没有设置，不会打印口令：

    ```bash
    printenv MUGSUN_INIT_PASSWORD >/dev/null && echo set || echo MISSING
    ```

- [ ] 内置的 admin 账号首次登录后已经改过密码
  - 用 admin 登录后进入「个人中心」，在「修改密码」里改掉初始口令。
  - 重置密码、新建租户管理员得到的是各自随机的一次性口令，不会复用初始口令。
- [ ] 以生产方式启动：`SPRING_PROFILES_ACTIVE` 含 `prod`
  - 执行 `printenv SPRING_PROFILES_ACTIVE`，结果应包含 `prod`，并且不含 `dev`、`test`、`local`。
  - 启动日志里应有 `The following 1 profile is active: "prod"`；多个 profile 会一并列出。
  - `prod` 会把 `strict-keys` 设为 `true`，并关闭接口文档和 mock 社交登录。
  - 没配任何 profile 时启动守卫也按生产拦截，但上面这些生产默认值不会生效。
  - 详见[启动守卫](/boot/configuration#启动守卫与豁免开关)。
- [ ] 四类密钥都有固定来源，没有临时生成的（[密钥与加密](/boot/crypto-keys)）
  - `MUGSUN_SM4_KEY` 和 SM2 传输密钥对必须自己配，生产环境缺了会拒绝启动。
  - 接口传输密钥和审计签名密钥没配时自动生成到 `~/.mugsun`。
  - 容器不给这个目录挂卷，或者多实例部署时，这两类密钥也必须自己配。
  - 在启动日志里查找密钥相关的告警：

    ```bash
    grep -E "临时生成|自动生成的密钥|本地开发密钥文件|检测到容器环境" <日志文件> \
      && echo CHECK || echo OK
    ```

  - 输出 `OK` 算通过。输出 `CHECK` 时看命中的那几行：
    - 只有「自动生成的密钥」，并且是单实例、密钥目录已持久化，可以接受；
    - 其他情况都要补上对应的密钥配置。
- [ ] mock 社交登录是关闭的（prod 默认关闭）
  - 执行 `curl -s https://your-host/api/auth/social/sources`。
  - 响应 `data` 里的 `mockEnabled` 应为 `false`。
- [ ] 没有开启 `mugsun.lab.seed-fronttest`
  - 它会创建一个弱口令的联调账号。生产环境开启会拒绝启动。
  - 用 admin 在「系统管理 → 用户管理」里搜索 `fronttest`，应查不到这个账号。
- [ ] 国密开关 `mugsun.crypto.gm-enabled` 保持开启，等保或密评场景尤其如此
  - 关闭后密码完全靠 TLS 保护，见[配置参考](/boot/configuration#安全与密钥)。
  - 打开登录页和浏览器开发者工具的 Network 面板，用一个错误口令提交登录。
  - 请求体里的口令字段应是一串密文，看不到输入的原文。
- [ ] 没有开启任何 `i-understand-...` 豁免开关
  - 在部署配置和环境变量里搜索 `i-understand` 和 `I_UNDERSTAND`，应没有命中。
  - 确实要开时，写下原因，并确认登录、改密的流量全部走 HTTPS。
  - 豁免开关的清单见[启动守卫](/boot/configuration#启动守卫与豁免开关)。
- [ ] 不需要自助注册时保持关闭（prod 默认关闭）
  - 执行 `curl -s 'https://your-host/api/auth/captcha/config?scene=login'`。
  - 响应 `data` 里的 `registerMode` 应为 `OFF`。
  - 要开放注册时，先配好限流和可信代理，见[自助注册](/boot/configuration#自助注册)。

## 网络与网关

- [ ] 接口文档在生产环境是关闭的（prod 默认关闭）
  - `CODE https://your-host/api/v3/api-docs` 不应返回 200。
  - `CODE https://your-host/api/swagger-ui/index.html` 不应返回 200。
- [ ] actuator 未登录时只能访问 `health` 和 `info`
  - `CODE https://your-host/api/actuator/health` 应返回 200，用于探活。
  - `CODE https://your-host/api/actuator/prometheus` 未登录应返回 401。
  - `CODE https://your-host/api/actuator/env` 未登录同样应返回 401。
  - 部署配置没有往 `management.endpoints.web.exposure.include` 里追加 `env`、`heapdump`。
- [ ] 在反向代理后面时，可信代理只填了真实的代理网段
  - 执行 `printenv MUGSUN_OPENAPI_TRUSTED_PROXIES` 查看。
  - 结果不应包含 `0.0.0.0/0`、`::/0` 或整段 `10.0.0.0/8`。
  - 登录一次，再看「系统管理 → 登录日志」：记录的应是真实的出口 IP。
  - 记成了代理的 IP，说明可信代理没配对，见[开放平台](/boot/open-api#客户端-ip-与可信代理)。
- [ ] 每把 AI 密钥的「允许 IP」只填调用方的出口 IP 或最小网段
  - 在「AI 中心 → 超级密钥」里逐个查看。
  - 留空或 `*` 表示不限制来源；不应出现 `0.0.0.0/0`。
- [ ] 开放接口的验签保持开启：`mugsun.open-api.sign-required` 为 `true`
  - 先按[开放平台](/boot/open-api#调通第一个开放接口)取得一个有效令牌，放进 `TOKEN`。
  - 再故意带一个错误的签名调用 `/open/ping`：

    ```bash
    curl -s -w '\n%{http_code}\n' https://your-host/api/open/ping \
      -H "Authorization: Bearer $TOKEN" \
      -H "X-Timestamp: $(($(date +%s) * 1000))" \
      -H "X-Nonce: $(openssl rand -hex 16)" \
      -H "X-Sign: invalid"
    ```

  - 应返回 401，并提示签名校验失败。返回 200 说明验签已被关闭。
  - 不带令牌也返回 401，但那是令牌校验，不能说明验签开着。
- [ ] `MUGSUN_FRONT_URL` 指向正式的管理后台域名
  - 执行 `printenv MUGSUN_FRONT_URL`。
  - 结果应是 `https://` 开头的正式域名，不含 `localhost`。
- [ ] 行为验证码开着，题型不只有辅助题型（[行为验证码](/boot/captcha)）
  - `default-types` 不能只有 `ROTATE`、`ICON_CLICK` 这两种辅助题型。
  - `store` 为 `redis`，`show-code` 为 `false`。
  - 退出登录后打开登录页，应弹出行为验证。多刷新几次，题型不应只有旋转或图标点选。
  - 用下面的命令取一次登录挑战，返回的 `type` 是本次题型。挑战本身不含答案：

    ```bash
    curl -s -X POST https://your-host/api/auth/captcha/challenge \
      -H "Content-Type: application/json" -d '{"scene":"login"}'
    ```

  - 关闭了验证的租户都有明确的理由。
- [ ] 知道跨域目前对所有来源放行
  - 当前版本对所有来源放行跨域请求，但不带凭据。这一项只作提醒，不算不通过。
  - 可以用一个不相干的来源发预检确认：

    ```bash
    curl -s -i -X OPTIONS https://your-host/api/auth/captcha/config \
      -H "Origin: https://evil.example" \
      -H "Access-Control-Request-Method: GET" | grep -i '^access-control-allow-origin'
    ```

## 数据与附件

- [ ] 附件的管理、公开、删除权限只给了需要的角色（[权限与附件](/boot/permissions#附件权限码)）
  - 在「系统管理 → 角色管理」里逐个点「授权」。
  - 检查 `sys:file:manage`、`sys:file:public`、`sys:file:remove` 对应的三项。
- [ ] 文件存储目录不在 Web 根目录下
  - 执行 `printenv FILE_STORAGE_PATH`，这个目录不应位于 nginx 的 `root` 目录下。

## AI 与出站请求

- [ ] `mugsun.ai.outbound.allow-hosts` 只列出确实要访问的内网主机
  - 查看部署配置里的这一项，不应包含 `*` 或 `169.254.169.254`。
  - 没列出的内网、回环和云元数据地址默认就会被拒绝。
  - 规则见 [AI 出站白名单](/boot/configuration#ai-出站白名单)。
- [ ] 不用 AI 模块时已经关掉：`MUGSUN_AI_ENABLED=false`，或打包时不带 ai 模块
  - 未登录执行 `CODE https://your-host/api/system/ai/model/list`。
  - 关闭后返回 404，开启时返回 401。

## 依赖与埋点

- [ ] 依赖扫描通过，文档解析组件 `tika-core` 不低于 3.2.2
  - 在仓库的 GitHub Actions 里确认最近一次依赖扫描通过。
  - 执行 `unzip -l mugsun-boot.jar | grep tika-core`，查看 jar 里打包的版本号。
- [ ] 埋点的会话回放、响应体采集和遮罩设置符合[隐私与合规](/track/privacy)
  - 这些开关在前端创建 tracker 的代码里，管理后台没有对应的设置页。
  - 检查是否注册了 `replayPlugin()`、是否开了 `apiBodyEnabled`，以及遮罩选项。
  - 开启前先在隐私政策里告知用户，见[开启遮罩与过滤](/track/privacy#开启遮罩与过滤)。

## 报告安全问题

发现安全问题请私下披露，不要公开提 issue。方式见各仓的 `SECURITY.md`，或 [mugsun/.github](https://github.com/mugsun/.github)。

## 下一步

<div class="ms-cards">

- [配置参考](/boot/configuration) 清单里提到的配置项和环境变量。
- [密钥与加密](/boot/crypto-keys) 四类密钥怎么配，旧数据怎么迁移。
- [升级指南](/boot/upgrade) 更新到新的主干之前先看。

</div>
