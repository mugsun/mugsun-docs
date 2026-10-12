# 快速开始

目标：从空环境拉起 **Postgres + Redis + boot**，用管理台登录并做一次冒烟。命令以 [mugsun-boot README](https://github.com/mugsun/mugsun-boot/blob/main/README.md) 为准；本页只给最短诚实路径。

## 你需要

- JDK 21、Maven 3.9+、Docker / Docker Compose
- 与 `mugsun-boot` **平级**克隆 [mugsun-core](https://github.com/mugsun/mugsun-core)（尚未发布到 Maven Central，须本地 `mvn install`）
- 可选：Node.js ≥ 20.19、pnpm，用于 [mugsun-pc](https://github.com/mugsun/mugsun-pc) 管理台

建议目录：

```text
mugsun/
  mugsun-core/
  mugsun-boot/
  mugsun-pc/      # 可选
  mugsun-track/   # 接埋点时再克隆
```

## 1. 安装 core

```bash
git clone https://github.com/mugsun/mugsun-core.git
cd mugsun-core
mvn clean install -DskipTests
```

## 2. 拉起基础设施 + 启动 boot

`docker compose` 只起 **PostgreSQL（5432）与 Redis（6379）**；应用本身以 JAR / `spring-boot:run` 运行，不是「一条 compose 起完整栈」。

```bash
git clone https://github.com/mugsun/mugsun-boot.git
cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am spring-boot:run
```

健康检查：`http://localhost:8080/ping`（应返回正常响应）。

OpenAPI（开发环境）：`http://localhost:8080/swagger-ui/index.html`（`prod` 下关闭）。

::: warning 口令
默认初始账号见 boot README：`admin` / `123456`（可用环境变量 `MUGSUN_INIT_PASSWORD` 覆盖）。**登录后立刻改密**；切勿把演示口令暴露到公网。`prod` 未注入初始口令时会拒绝启动。
:::

开发库账号默认与 JDBC 一致（`mugsun` / `mugsun`）。无 Docker 时可参考仓内 `scripts/init-db.sql`。细节变动以 [mugsun-boot](https://github.com/mugsun/mugsun-boot) 当前 README 为准。

## 3. （可选）打开管理台

boot 在 `:8080` 跑通后：

```bash
git clone https://github.com/mugsun/mugsun-pc.git
# 若启用埋点，需与 mugsun-track 平级，并先 pnpm setup:sdk（见 pc README）
cd mugsun-pc
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:3006`（`VITE_PORT`）。开发期 `/api` 代理到 boot `:8080`。登录账号与 boot 一致。

## 4. 冒烟

1. 登录管理台，打开任一系统管理列表页。
2. 若启用 track：按 [第一个事件](/track/first-event) 验证采集。
3. 上线前过一遍 [安全清单](/boot/security-checklist)。

## 相关链接

- [mugsun-boot](https://github.com/mugsun/mugsun-boot) · [配置](/boot/configuration)
- [mugsun-pc](https://github.com/mugsun/mugsun-pc) · [本地开发](/pc/development)
- [mugsun-track](https://github.com/mugsun/mugsun-track) · [安装埋点](/track/install)
- [演示说明](/demo)
