# 在线演示

## 本地体验管理台与埋点

在本机按以下命令跑起完整后端（需 Docker 与 JDK 21）：

```bash
git clone https://github.com/mugsun/mugsun-boot.git && cd mugsun-boot
docker compose up -d
cp config/application-local.yml.example config/application-local.yml
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

管理台（pc）与验收步骤见 [快速开始](/guide/getting-started)。账号以 [boot README](https://github.com/mugsun/mugsun-boot/blob/main/README.md) 为准，**首次登录请改密**。

## uni-app x（ms-ui） 组件 H5

组件文档页右下角有手机框，嵌入本站托管的 H5 预览（`/demo/index.html`）。例如打开 [Button](/uniappx/components/button)，即可在框内切换组件演示。

也可直接访问完整 H5 入口：[打开 ms-ui 演示](/demo/index.html)（新标签页）。

## 对外展示

自行部署只读环境，使用非生产密钥。下一步：[快速开始](/guide/getting-started) · [安全清单](/boot/security-checklist) · [ms-ui](/uniappx/)
