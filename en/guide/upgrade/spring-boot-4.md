---
pageClass: ms-first-col-nowrap
---

# Upgrading to Spring Boot 4

Since 2026-11-22, the main branches of mugsun-core, the monolith and the microservice edition run on Spring Boot 4.1 instead of 3.5. The JDK is still 21.

API paths, the JSON in responses and the names of settings have not changed. If you only deploy and do not change the code, update the code and rebuild.

If you have built on top of these repositories, or your own project uses mugsun-core, follow the table below.

## See which changes affect you

| Change | Who is affected | What to do |
| --- | --- | --- |
| [mugsun-core has a new version](#core-version) | Every project built from source | Install mugsun-core again |
| [Renamed artifacts](#artifacts) | Projects that name these artifacts in a pom | Switch to the Spring Boot 4 artifacts |
| [Classes moved to new packages](#packages) | Projects whose code uses these classes | Fix the imports |
| [JSON still uses Jackson 2](#jackson) | Projects that configure JSON serialization themselves | Usually nothing |
| [Test dependencies](#tests) | Projects with integration tests | Switch artifacts and add one annotation |
| [Staying on Spring Boot 3](#stay-on-3) | Projects that are not upgrading yet | Use mugsun-core 0.2 |

## mugsun-core has a new version {#core-version}

mugsun-core on the main branch moved from `0.2.0-SNAPSHOT` to `0.3.0-SNAPSHOT`, and the main branches of the monolith and the microservice edition both depend on it.

This version is not on Maven Central. After you update the code, install mugsun-core again first:

```bash
cd mugsun-core && git pull && mvn -B clean install -DskipTests
```

If your own project imports `mugsun-bom`, change its version to `0.3.0-SNAPSHOT` and move the project to Spring Boot 4.1 as well.

If you deploy with Docker, rebuild the images. The mugsun-core they use has already been switched to the new version.

## Renamed artifacts {#artifacts}

Spring Boot 4 split some starters, and several third-party libraries published new artifacts for it. If a pom names an artifact on the left, switch it to the one on the right.

| Before | Now |
| --- | --- |
| `spring-boot-starter-aop` | `spring-boot-starter-aspectj` |
| `flyway-core` | `spring-boot-starter-flyway` |
| `spring-boot-starter-webflux` (when you only use WebClient) | `spring-boot-starter-webclient` |
| `sa-token-spring-boot3-starter` | `sa-token-spring-boot4-starter` |
| `mybatis-flex-spring-boot-starter` | `mybatis-flex-spring-boot4-starter` |
| `warm-flow-mybatis-sb3-starter` | `warm-flow-mybatis-sb4-starter` |
| `liteflow-spring-boot-starter` | `liteflow-spring-boot4-starter` |

With only `flyway-core`, database migrations no longer run automatically at startup, so change this one first.

Artifacts that come in through `mugsun-starter-web` and `mugsun-starter-mybatis` need no change, because both starters have already switched.

## Classes moved to new packages {#packages}

Spring Boot 4 reorganized its packages by module. If your code uses the classes below, change the imports to the new packages.

| Class | Package now |
| --- | --- |
| `EnvironmentPostProcessor` | `org.springframework.boot` |
| `ServerProperties` | `org.springframework.boot.web.server.autoconfigure` |
| `MultipartProperties` | `org.springframework.boot.servlet.autoconfigure` |
| `WebMvcAutoConfiguration` | `org.springframework.boot.webmvc.autoconfigure` |
| `FlywayConfigurationCustomizer` | `org.springframework.boot.flyway.autoconfigure` |
| `HttpMessageConvertersAutoConfiguration` | `org.springframework.boot.http.converter.autoconfigure` |
| `JacksonAutoConfiguration` (Jackson 2) | Renamed to `Jackson2AutoConfiguration`, in `org.springframework.boot.jackson2.autoconfigure` |

If an `EnvironmentPostProcessor` is registered in `META-INF/spring.factories`, change the key to the new fully qualified name too.

`HttpHeaders` in Spring Framework 7 is no longer a `Map`, so use `containsHeader` to check whether a header is present.

## JSON still uses Jackson 2 {#jackson}

Spring Boot 4 uses Jackson 3 by default. In this step the backend still uses Jackson 2, so the JSON in API responses is the same as before the upgrade.

`mugsun-starter-web` brings in `spring-boot-jackson2` and sets defaults for the three settings below:

```properties
spring.http.converters.preferred-json-mapper=jackson2
spring.http.codecs.preferred-json-mapper=jackson2
spring.websocket.messaging.preferred-json-mapper=jackson2
```

If your own configuration sets one of them, your value wins.

::: warning Do not switch to jackson3
The APIs keep working, but Long values are no longer turned into strings, so large integers lose precision in the frontend.
:::

The gateway of the microservice edition does not use `mugsun-starter-web`, so it sets the second setting in its own `application.yml`.

Moving to Jackson 3 is a separate later step, and this page will list what to change when it happens.

## Test dependencies {#tests}

If your integration tests use `TestRestTemplate` or Testcontainers, change them as shown below.

| Before | Now |
| --- | --- |
| `spring-boot-starter-test` includes `TestRestTemplate` | Add `spring-boot-resttestclient` and `spring-boot-starter-restclient` |
| The test class injects `TestRestTemplate` directly | Add `@AutoConfigureTestRestTemplate` to the test class |
| `org.springframework.boot.test.web.client.TestRestTemplate` | `org.springframework.boot.resttestclient.TestRestTemplate` |
| `org.testcontainers:postgresql` | `org.testcontainers:testcontainers-postgresql` |
| `org.testcontainers:junit-jupiter` | `org.testcontainers:testcontainers-junit-jupiter` |
| `org.testcontainers.containers.PostgreSQLContainer` | `org.testcontainers.postgresql.PostgreSQLContainer` |

## Components upgraded along the way

| Scope | Components |
| --- | --- |
| All three repositories | Spring Framework 7 and Spring Security 7.1 |
| Monolith and microservice edition | Tomcat 11, Flyway 12 and Lettuce 7 |
| mugsun-core | Sa-Token 1.46, springdoc 3.1 and mybatis-spring 4.0 |
| Microservice edition | Spring Cloud 2025.1, Spring Cloud Gateway 5.0 and Spring Cloud Alibaba 2025.1 |
| Microservice edition | Nacos client 3.1 with the server still on 3.0; Spring Boot Admin 4.1 in the monitoring center |

No setting was renamed, so `application*.yml`, environment variables and the configuration in Nacos need no change.

## Staying on Spring Boot 3 {#stay-on-3}

mugsun-core 0.2 still runs on Spring Boot 3.5. Its code is on the `release/0.2.0` branch, and installing it gives you version `0.2.0`:

```bash
git clone -b release/0.2.0 https://github.com/mugsun/mugsun-core.git
cd mugsun-core && mvn -B clean install -DskipTests
```

The monolith and the microservice edition have only the main branch. To stay on Spring Boot 3, stop at the last commit before the upgrade:

| Repository | Last commit before the upgrade |
| --- | --- |
| mugsun-boot | `0a92c8f` |
| mugsun-cloud | `f501863` |

These two commits depend on mugsun-core `0.2.0-SNAPSHOT`, which you install from mugsun-core commit `763b1ed`.

## Next steps

<div class="ms-cards">

- [Versions](/en/guide/upgrade/) Released versions and main branch versions of each repository.
- [Backend upgrade guide](/en/boot/upgrade) Other changes to handle before you update a project that already runs the main branch.
- [Changelog](/en/guide/changelog) Changes listed by date.

</div>
