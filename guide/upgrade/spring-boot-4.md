---
pageClass: ms-first-col-nowrap
---

# 升级到 Spring Boot 4

2026-11-22 起，mugsun-core、单体版和微服务版的主干从 Spring Boot 3.5 升到 4.1，JDK 仍是 21。

接口地址、返回的 JSON 和配置项的名字都没有变。只部署、不改代码的项目，更新代码后重新构建。

做了二次开发的项目，或者自己的工程引了 mugsun-core 的，按下面的表跟着改。

## 先看哪些变更影响你

| 变更 | 谁受影响 | 要做什么 |
| --- | --- | --- |
| [mugsun-core 换了版本](#core-version) | 所有从源码构建的项目 | 重新安装 mugsun-core |
| [构件改名](#artifacts) | pom 里直接写了这些构件的工程 | 换成 Spring Boot 4 的构件 |
| [类换了包](#packages) | 代码里用到这些类的工程 | 改 import |
| [JSON 仍用 Jackson 2](#jackson) | 自己配置过 JSON 序列化的工程 | 一般不用处理 |
| [测试依赖](#tests) | 写了集成测试的工程 | 换构件，加一个注解 |
| [留在 Spring Boot 3](#stay-on-3) | 暂时不升级的工程 | 用 mugsun-core 的 0.2 版 |

## mugsun-core 换了版本 {#core-version}

主干的 mugsun-core 从 `0.2.0-SNAPSHOT` 改成了 `0.3.0-SNAPSHOT`，单体版和微服务版的主干都依赖它。

这个版本不在 Maven Central 上。更新代码后，先重新安装一次 mugsun-core：

```bash
cd mugsun-core && git pull && mvn -B clean install -DskipTests
```

自己的工程导入了 `mugsun-bom` 的，把它的版本改成 `0.3.0-SNAPSHOT`，工程的 Spring Boot 也升到 4.1。

用 Docker 部署的项目重新构建镜像，镜像里用的 mugsun-core 已经换成新版本。

## 构件改名 {#artifacts}

Spring Boot 4 拆分了一些启动包，几个第三方库也为它出了新构件。pom 里直接写了左边构件的，换成右边的。

| 原来 | 现在 |
| --- | --- |
| `spring-boot-starter-aop` | `spring-boot-starter-aspectj` |
| `flyway-core` | `spring-boot-starter-flyway` |
| `spring-boot-starter-webflux`（只用 WebClient 时） | `spring-boot-starter-webclient` |
| `sa-token-spring-boot3-starter` | `sa-token-spring-boot4-starter` |
| `mybatis-flex-spring-boot-starter` | `mybatis-flex-spring-boot4-starter` |
| `warm-flow-mybatis-sb3-starter` | `warm-flow-mybatis-sb4-starter` |
| `liteflow-spring-boot-starter` | `liteflow-spring-boot4-starter` |

只引 `flyway-core` 时，启动不再自动执行数据库迁移，所以这一项要先改。

经 `mugsun-starter-web` 和 `mugsun-starter-mybatis` 间接引入的构件不用改，两个 Starter 里已经换好。

## 类换了包 {#packages}

Spring Boot 4 按模块重新分了包。代码里用到下面这些类的，把 import 换成新的包。

| 类 | 现在的包 |
| --- | --- |
| `EnvironmentPostProcessor` | `org.springframework.boot` |
| `ServerProperties` | `org.springframework.boot.web.server.autoconfigure` |
| `MultipartProperties` | `org.springframework.boot.servlet.autoconfigure` |
| `WebMvcAutoConfiguration` | `org.springframework.boot.webmvc.autoconfigure` |
| `FlywayConfigurationCustomizer` | `org.springframework.boot.flyway.autoconfigure` |
| `HttpMessageConvertersAutoConfiguration` | `org.springframework.boot.http.converter.autoconfigure` |
| `JacksonAutoConfiguration`（Jackson 2） | 改名为 `Jackson2AutoConfiguration`，在 `org.springframework.boot.jackson2.autoconfigure` |

`EnvironmentPostProcessor` 登记在 `META-INF/spring.factories` 里的，键也要换成新的全名。

Spring Framework 7 的 `HttpHeaders` 不再是 `Map`，判断有没有某个请求头改用 `containsHeader`。

## JSON 仍用 Jackson 2 {#jackson}

Spring Boot 4 默认用 Jackson 3。这一步后端仍用 Jackson 2，接口返回的 JSON 和升级前一样。

`mugsun-starter-web` 引入了 `spring-boot-jackson2`，并给下面三个配置项设了默认值：

```properties
spring.http.converters.preferred-json-mapper=jackson2
spring.http.codecs.preferred-json-mapper=jackson2
spring.websocket.messaging.preferred-json-mapper=jackson2
```

自己的配置里写了同名配置项时，以自己写的为准。

::: warning 不要改成 jackson3
改了以后接口不报错，但 Long 不再转成字符串，前端拿到的大整数会丢精度。
:::

微服务版的网关不引 `mugsun-starter-web`，它在自己的 `application.yml` 里写了第二个配置项。

换到 Jackson 3 是后面单独的一步，到时在本页补充要改的地方。

## 测试依赖 {#tests}

集成测试用到 `TestRestTemplate` 或 Testcontainers 的，按下表改。

| 原来 | 现在 |
| --- | --- |
| `spring-boot-starter-test` 自带 `TestRestTemplate` | 另引 `spring-boot-resttestclient` 和 `spring-boot-starter-restclient` |
| 测试类直接注入 `TestRestTemplate` | 测试类上加 `@AutoConfigureTestRestTemplate` |
| `org.springframework.boot.test.web.client.TestRestTemplate` | `org.springframework.boot.resttestclient.TestRestTemplate` |
| `org.testcontainers:postgresql` | `org.testcontainers:testcontainers-postgresql` |
| `org.testcontainers:junit-jupiter` | `org.testcontainers:testcontainers-junit-jupiter` |
| `org.testcontainers.containers.PostgreSQLContainer` | `org.testcontainers.postgresql.PostgreSQLContainer` |

## 一起升级的组件

| 范围 | 组件 |
| --- | --- |
| 三个仓库 | Spring Framework 7、Spring Security 7.1 |
| 单体版和微服务版 | Tomcat 11、Flyway 12、Lettuce 7 |
| mugsun-core | Sa-Token 1.46、springdoc 3.1、mybatis-spring 4.0 |
| 微服务版 | Spring Cloud 2025.1、Spring Cloud Gateway 5.0、Spring Cloud Alibaba 2025.1 |
| 微服务版 | Nacos 客户端 3.1，服务端仍是 3.0；监控中心的 Spring Boot Admin 4.1 |

配置项的名字都没有变，`application*.yml`、环境变量和 Nacos 里的配置不用改。

## 留在 Spring Boot 3 {#stay-on-3}

mugsun-core 的 0.2 版仍基于 Spring Boot 3.5，代码在 `release/0.2.0` 分支，装出来的版本是 `0.2.0`：

```bash
git clone -b release/0.2.0 https://github.com/mugsun/mugsun-core.git
cd mugsun-core && mvn -B clean install -DskipTests
```

单体版和微服务版只有主干一条线。要留在 Spring Boot 3，就停在升级前的最后一个提交：

| 仓库 | 升级前的最后一个提交 |
| --- | --- |
| mugsun-boot | `0a92c8f` |
| mugsun-cloud | `f501863` |

这两个提交依赖 mugsun-core `0.2.0-SNAPSHOT`，从 mugsun-core 的提交 `763b1ed` 安装。

## 下一步

<div class="ms-cards">

- [版本总览](/guide/upgrade/) 各仓库已发布的版本和主干版本。
- [后端升级指南](/boot/upgrade) 已经部署了主干的项目，更新前要处理的其他变更。
- [更新日志](/guide/changelog) 按日期列出的变更。

</div>
