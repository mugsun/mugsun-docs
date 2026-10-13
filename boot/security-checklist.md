# 安全清单（上线前）

逐项核对后再对公网开放。括号内为相关配置或文档。

## 账号与密钥

- [ ] 已注入 `MUGSUN_INIT_PASSWORD`，默认 `admin` / `123456` 未在任何环境使用；首次登录已改密
- [ ] `SPRING_PROFILES_ACTIVE=prod`，`strict-keys` 为 `true`（prod 默认）
- [ ] SM4、接口加解密、SM2 传输与审计签名密钥均为自有值，未使用仓库示例中的 `mugsun-local-*`（[配置参考](/boot/configuration#安全与密钥)）
- [ ] mock 社交登录关闭（prod 默认关闭）

## 网络与网关

- [ ] OpenAPI 文档在 prod 已关闭（prod 默认关闭）
- [ ] 若在反向代理之后，`MUGSUN_OPENAPI_TRUSTED_PROXIES` 只包含真实代理网段（[开放平台](/boot/open-api#客户端-ip-与可信代理)）
- [ ] 各 API Key 的 IP 白名单使用最小 CIDR 网段
- [ ] `MUGSUN_FRONT_URL` 指向正式管理端域名

## 数据与附件

- [ ] 角色授权复核：`sys:file:manage` / `sys:file:public` / `sys:file:remove` 只授予需要的角色（[权限与附件](/boot/permissions)）
- [ ] 文件存储目录（`FILE_STORAGE_PATH`）不在 Web 根目录下直接暴露

## AI 与出站请求

- [ ] `mugsun.ai.outbound.allow-hosts` 只列出确需访问的内网主机；未列出的内网 / 回环 / 元数据地址会被拒绝
- [ ] 不需要 AI 能力时设置 `MUGSUN_AI_ENABLED=false`，或使用不含 ai 的 Profile 打包

## 依赖与埋点

- [ ] 已扫描依赖 CVE（文档解析组件 `tika-core` 需 ≥ 3.2.2）
- [ ] 埋点回放、接口监控与响应体采集的开关与脱敏策略符合 [隐私与合规](/track/privacy)

安全问题请通过各仓 `SECURITY.md` 或 [mugsun/.github](https://github.com/mugsun/.github) 中的方式私下披露。
