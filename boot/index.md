# Boot 概述

[mugsun-boot](https://github.com/mugsun/mugsun-boot) 是 mugsun 的模块化单体后端：一个可执行 JAR，依赖 PostgreSQL 与 Redis，按 Maven 模块装配可选能力。

| 项 | 说明 |
| --- | --- |
| 坐标 | `com.mugsun:mugsun-boot:0.1.0` |
| 运行时 | JDK 21 · Maven 3.9+ |
| 框架 | Spring Boot 3.5.13 · MyBatis-Flex · Sa-Token · JetCache · Warm-Flow · Flyway · Spring AI 1.1.2（AI 模块） |
| 数据层 | PostgreSQL 16（PostGIS + pgvector）· Redis 7（默认库号 `3`） |
| 信创 | `kingbase` / `dameng` Maven Profile 追加驱动；写库经 `BizTables` 带 schema |
| 许可 | Apache-2.0 |

## 模块

```text
mugsun-boot/
  mugsun-boot-core/     # 认证、系统、流程、租户、文件、开放平台等
  mugsun-boot-gis/      # 可选：图层、空间查询、矢量瓦片（依赖 PostGIS）
  mugsun-boot-track/    # 可选：采集摄入、配置下发、聚合、回放相关 API
  mugsun-boot-ai/       # 可选：模型、对话、知识库、MCP（Spring AI）
  mugsun-boot-server/   # 装配壳；默认 profile = full
```

## 核心能力

- **认证与权限**：用户、角色、菜单、部门、数据权限；Sa-Token 权限码注解；登录与操作审计
- **多租户**：租户上下文贯穿查询，跨租户数据按不存在处理
- **工作流**：Warm-Flow
- **文件存储**：附件归属到上传者与租户，权限码 `sys:file:*` 控制管理、公开与删除（见 [权限与附件](/boot/permissions)）
- **开放平台**：OAuth2（含 PKCE）、API Key；IP 白名单支持 CIDR（见 [开放平台](/boot/open-api)）
- **国密**：SM2 传输加密、SM3 摘要、SM4 字段与接口加密，`MUGSUN_GM_ENABLED` 一处开关
- **代码生成、在线表单、消息**

## 运行与打包

```bash
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

打包产物为 `mugsun-boot-server/target/mugsun-boot.jar`，需在仓库根目录运行。

::: details 5432 端口被占用怎么办？
`docker compose up -d` 报端口冲突，通常是本机已有 PostgreSQL 在跑：

- 查占用：macOS / Linux 用 `lsof -nP -iTCP:5432 -sTCP:LISTEN`，Windows 用 `netstat -ano | findstr :5432`。
- 方案一：停掉本机 PostgreSQL（如 `brew services stop postgresql@16`、`sudo systemctl stop postgresql`），再 `docker compose up -d`。
- 方案二：改映射端口。把 `docker-compose.yml` 中 postgres 的 `"5432:5432"` 改为如 `"5433:5432"`，并在 `config/application-local.yml` 中覆盖连接地址：

```yaml
mybatis-flex:
  datasource:
    primary:
      url: jdbc:postgresql://localhost:5433/mugsun
```
:::

只要核心模块：`mvn -pl mugsun-boot-server -am package -Pbasic,'!full'`。

## 下一步

[配置参考](/boot/configuration) · [权限与附件](/boot/permissions) · [开放平台](/boot/open-api) · [安全清单](/boot/security-checklist)
