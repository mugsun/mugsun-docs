# Boot 概述

[mugsun-boot](https://github.com/mugsun/mugsun-boot) 是 mugsun 的后端，打包成一个可执行 JAR，运行时需要 PostgreSQL 和 Redis。

## 启动

需要 JDK 21 和 Maven 3.9 以上。在仓库根目录执行：

```bash
docker compose up -d   # PostgreSQL 5432、Redis 6379
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

端口被占用时，用 `MUGSUN_DB_PORT`、`MUGSUN_REDIS_PORT` 改映射端口，见 [常见问题](/guide/faq)。

## 模块

```text
mugsun-boot/
  mugsun-boot-core/     # 认证、系统管理、流程、租户、文件、开放平台
  mugsun-boot-gis/      # 可选：图层、空间查询、矢量瓦片
  mugsun-boot-track/    # 可选：埋点接收、配置下发、统计、回放
  mugsun-boot-ai/       # 可选：模型、对话、知识库、MCP
  mugsun-boot-server/   # 启动模块，默认使用 full profile
```

只打包核心模块：

```bash
mvn -pl mugsun-boot-server -am package -Pbasic,'!full'
```

使用人大金仓或达梦数据库时，加上 `-Pkingbase` 或 `-Pdameng`。

## 功能

- 用户、角色、菜单、部门和数据权限，见 [权限与附件](/boot/permissions)
- 多租户，其他租户的数据按不存在处理
- Warm-Flow 工作流
- 附件按上传者和租户隔离
- OAuth2 和 API Key 开放接口，见 [开放平台](/boot/open-api)
- SM2 传输加密和 SM3 摘要由 `MUGSUN_GM_ENABLED` 开关，SM4 字段加密的密钥由 `MUGSUN_SM4_KEY` 单独配置
- 代码生成、在线表单和站内消息

## 技术栈

| 项 | 说明 |
| --- | --- |
| 框架 | Spring Boot 3、MyBatis-Flex、Sa-Token、Flyway |
| 数据库 | PostgreSQL 16（含 PostGIS、pgvector）、Redis 7 |
| AI 模块 | Spring AI |
| 许可 | Apache-2.0 |

## 下一步

- [配置参考](/boot/configuration)
- [权限与附件](/boot/permissions)
- [开放平台](/boot/open-api)
- [安全清单](/boot/security-checklist)
