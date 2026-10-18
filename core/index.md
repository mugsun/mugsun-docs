# Core 概述

[mugsun-core](https://github.com/mugsun/mugsun-core) 是 mugsun 的共享内核：BOM、通用工具与 Spring Boot Starter。统一响应体、Sa-Token 注解鉴权、接口加解密与 MyBatis-Flex 实体基类在此装配。本仓不提供可执行的 HTTP 入口。

| 项 | 说明 |
| --- | --- |
| 坐标 | `com.mugsun:mugsun-*:0.1.0`，已发布至 [Maven Central](https://central.sonatype.com/search?q=com.mugsun) |
| 运行时 | JDK 21 · Maven 3.9+ |
| 父工程 | Spring Boot 3.5.13 |
| 主要依赖 | MyBatis-Flex 1.11.8 · Sa-Token 1.44.0 · JetCache · Hutool Crypto / BouncyCastle · FastExcel（版本由 `mugsun-bom` 锁定） |
| 许可 | MIT |

## 模块

| 模块 | 内容 |
| --- | --- |
| `mugsun-bom` | 依赖版本锁定 |
| `mugsun-core-tool` | `R` 统一响应、`ResultCode`、业务异常、`TreeUtil` |
| `mugsun-starter-web` | 全局异常、Sa-Token 注解拦截、ApiCrypto 接口加解密、SafeNumber、Excel |
| `mugsun-starter-mybatis` | MyBatis-Flex starter 与 `BaseEntity`（雪花主键、审计时间、逻辑删除） |

## 在自己的工程中使用

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.mugsun</groupId>
      <artifactId>mugsun-bom</artifactId>
      <version>0.1.0</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>com.mugsun</groupId>
    <artifactId>mugsun-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>com.mugsun</groupId>
    <artifactId>mugsun-starter-mybatis</artifactId>
  </dependency>
</dependencies>
```

离线环境：克隆本仓库后执行 `mvn clean install -DskipTests`。

## 下一步

[Boot 概述](/boot/) · [架构全景](/guide/architecture)
