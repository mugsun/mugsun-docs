# 安全清单（上线前）

逐项核对后再对公网开放。括号内为相关配置或文档。

每项下面附有自检方法，全部是只读检查。示例中的 `https://your-host` 请换成实际域名，`<...>` 按实际情况填写。经 pc 网关访问后端时，接口路径要加 `/api` 前缀。

下文的 `CODE` 是只输出 HTTP 状态码的 curl，可以先定义：

```bash
alias CODE="curl -s -o /dev/null -w '%{http_code}\n'"
```

## 账号与密钥

- [ ] 已注入 `MUGSUN_INIT_PASSWORD`，任何环境都没有使用默认初始口令（仓库公开值）；首次登录后已改密
  - 在部署机上执行 `printenv MUGSUN_INIT_PASSWORD >/dev/null && echo set || echo MISSING`。
  - 这条命令只判断变量是否设置，不会打印口令。
  - 用 admin 登录后进入「个人中心 → 修改密码」，确认口令已经改过。
- [ ] `SPRING_PROFILES_ACTIVE=prod`，`strict-keys` 为 `true`（prod 默认）
  - 执行 `printenv SPRING_PROFILES_ACTIVE`，结果应包含 `prod`，并且不包含 `dev`、`test` 或 `local`。
  - 启动日志中应有 `The following 1 profile is active: "prod"`，多个 profile 时会一并列出。
- [ ] SM4、接口加解密、SM2 传输与审计签名密钥均为自有值，未使用仓库示例中的 `mugsun-local-*`（[配置参考](/boot/configuration#安全与密钥)）
  - 在启动日志中查找回落默认值或临时生成密钥的提示，没有命中才算通过：

    ```bash
    grep -E "回落内置开发默认值|临时生成|跟随传输密钥" <日志文件> && echo FAIL || echo OK
    ```

- [ ] mock 社交登录关闭（prod 默认关闭）
  - 执行 `curl -s https://your-host/api/auth/social/sources`，查看返回的社交登录来源清单。
  - 响应 `data` 中的 `mockEnabled` 应为 `false`。
- [ ] 生产不得开启 `mugsun.lab.seed-fronttest`，开启后会创建一个弱口令测试账号
  - 激活了 `prod` profile 时，开启这项会拒绝启动。未激活 `prod` 的部署不拦截，需要自己确认配置里没有打开。
  - 用 admin 进入「系统管理 → 用户」搜索 `fronttest`，应查不到这个账号。
- [ ] 等保或密评场景保持 `mugsun.crypto.gm-enabled` 开启（[配置参考](/boot/configuration#安全与密钥)）
  - 打开登录页和浏览器开发者工具的 Network 面板，用一个错误口令提交登录。
  - 请求体里的口令字段应是一串密文，而不是输入的原文。

## 网络与网关

- [ ] OpenAPI 文档在 prod 已关闭（prod 默认关闭）
  - `CODE https://your-host/api/v3/api-docs` 和 `CODE https://your-host/api/swagger-ui/index.html` 都不应返回 200。
- [ ] actuator 只公开 `health` 和 `info`
  - `CODE https://your-host/api/actuator/health` 应返回 200，用于探活。
  - 未登录时 `CODE https://your-host/api/actuator/prometheus` 应返回 401 或 403。
  - `CODE https://your-host/api/actuator/env` 和 `.../actuator/heapdump` 应返回 404。
- [ ] 若在反向代理之后，`MUGSUN_OPENAPI_TRUSTED_PROXIES` 只包含真实代理网段（[开放平台](/boot/open-api#客户端-ip-与可信代理)）
  - 执行 `printenv MUGSUN_OPENAPI_TRUSTED_PROXIES` 查看可信代理。
  - 结果不应包含 `0.0.0.0/0`、`::/0` 或整段 `10.0.0.0/8`。
  - 登录一次后查看「监控 → 登录日志」，记录的应是真实出口 IP，而不是代理 IP。
- [ ] 各 API Key 的 IP 白名单使用最小 CIDR 网段
  - 在「开放平台 → API Key」中逐个查看白名单，不应出现 `0.0.0.0/0`。
- [ ] `mugsun.open-api.sign-required` 保持 `true`（[开放平台](/boot/open-api#签名校验)）
  - 先按开放平台文档取得一个有效令牌，再故意带错误签名调用 `/open/ping`：

    ```bash
    curl -s -w '\n%{http_code}\n' https://your-host/api/open/ping \
      -H "Authorization: Bearer <令牌>" \
      -H "X-Timestamp: $(($(date +%s) * 1000))" \
      -H "X-Nonce: $(uuidgen)" \
      -H "X-Sign: invalid"
    ```

  - 应返回 401，提示签名校验失败。返回 200 说明签名校验已关闭。
  - `X-Timestamp` 是毫秒时间戳。不带令牌时也返回 401，但那是令牌校验，不能说明签名校验已开启。
- [ ] `MUGSUN_FRONT_URL` 指向正式管理台域名
  - 执行 `printenv MUGSUN_FRONT_URL`，结果应是 `https://` 开头的正式域名，不含 `localhost`。
- [ ] 安全验证的 `default-types` 不只有辅助题型（`ROTATE`、`ICON_CLICK`）、`store: redis`，`show-code` 为 `false`；关闭验证的租户确有理由（[配置参考](/boot/configuration#安全验证-行为验证码)）
  - 退出登录后打开登录页，应弹出行为验证。多刷新几次，题型不应只有旋转或图标点选。
  - 用下面的命令取一次登录挑战，返回的 `type` 是本次题型。挑战本身不含答案：

    ```bash
    curl -s -X POST https://your-host/api/auth/captcha/challenge \
      -H "Content-Type: application/json" -d '{"scene":"login"}'
    ```

- [ ] 跨域预检
  - 执行下面的命令，用一个不相干的来源发起预检：

    ```bash
    curl -s -i -X OPTIONS https://your-host/api/auth/captcha/config \
      -H "Origin: https://evil.example" \
      -H "Access-Control-Request-Method: GET" | grep -i '^access-control-allow-origin'
    ```

  - 当前版本对所有来源放行跨域（不带凭据），这一项只告警，不算不通过。后续版本加入来源白名单后，预检应被拒绝。

## 数据与附件

- [ ] 角色授权复核：`sys:file:manage` / `sys:file:public` / `sys:file:remove` 只授予需要的角色（[权限与附件](/boot/permissions)）
  - 在「系统管理 → 角色」中逐个打开授权，检查这三个权限码。
- [ ] 文件存储目录（`FILE_STORAGE_PATH`）不在 Web 根目录下直接暴露
  - 执行 `printenv FILE_STORAGE_PATH`，该目录不应位于 nginx 的 `root` 目录下。

## AI 与出站请求

- [ ] `mugsun.ai.outbound.allow-hosts` 只列出确需访问的内网主机；未列出的内网 / 回环 / 元数据地址会被拒绝
  - 查看部署配置中的这一项，不应包含 `*` 或 `169.254.169.254`。
- [ ] 不需要 AI 能力时设置 `MUGSUN_AI_ENABLED=false`，或使用不含 ai 的 Profile 打包
  - 未登录执行 `CODE https://your-host/api/system/ai/model/list`。关闭后应返回 404，开启时返回 401。

## 依赖与埋点

- [ ] 已扫描依赖 CVE（文档解析组件 `tika-core` 需 ≥ 3.2.2）
  - 在仓库的 GitHub Actions 中确认最近一次依赖扫描通过。
  - 执行 `unzip -l mugsun-boot-server.jar | grep tika-core`，查看 jar 里打包的版本号。
- [ ] 埋点回放、接口监控与响应体采集的开关与脱敏策略符合 [隐私与合规](/track/privacy)
  - 在「埋点 → 设置」中确认回放和响应体采集的开关以及脱敏规则。

安全问题请通过各仓 `SECURITY.md` 或 [mugsun/.github](https://github.com/mugsun/.github) 中的方式私下披露。
