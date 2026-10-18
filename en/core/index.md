# Core overview

[mugsun-core](https://github.com/mugsun/mugsun-core) is mugsun's shared kernel: a BOM, common utilities and Spring Boot starters. It wires up the response envelope, Sa-Token annotation checks, request encryption and the MyBatis-Flex base entity. It has no runnable HTTP entry point of its own.

| Item | Details |
| --- | --- |
| Coordinates | `com.mugsun:mugsun-*:0.1.0`, published to [Maven Central](https://central.sonatype.com/search?q=com.mugsun) |
| Runtime | JDK 21 · Maven 3.9+ |
| Parent | Spring Boot 3.5.13 |
| Key dependencies | MyBatis-Flex 1.11.8 · Sa-Token 1.44.0 · JetCache · Hutool Crypto / BouncyCastle · FastExcel (versions pinned by `mugsun-bom`) |
| License | MIT |

## Modules

| Module | Contents |
| --- | --- |
| `mugsun-bom` | Dependency version management |
| `mugsun-core-tool` | `R` response envelope, `ResultCode`, business exceptions, `TreeUtil` |
| `mugsun-starter-web` | Global exception handling, Sa-Token annotation interceptor, ApiCrypto request encryption, SafeNumber, Excel |
| `mugsun-starter-mybatis` | MyBatis-Flex starter and `BaseEntity` (snowflake IDs, audit timestamps, logical delete) |

## Using it in your project

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

Offline environments: clone this repository and run `mvn clean install -DskipTests`.

## Next

[Boot overview](/en/boot/) · [Architecture](/en/guide/architecture)
