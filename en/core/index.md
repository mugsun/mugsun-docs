# Core overview

[mugsun-core](https://github.com/mugsun/mugsun-core) is mugsun's shared kernel: a BOM, common utilities and Spring Boot starters. It wires up the response envelope, Sa-Token annotation checks, request encryption and the MyBatis-Flex base entity. It has no runnable HTTP entry point of its own.

| Item | Details |
| --- | --- |
| Coordinates | tip `com.mugsun:mugsun-*:0.2.0-SNAPSHOT` (see root pom; local install required) |
| Maven Central | currently only `0.1.0` (legacy; not the tip; see [Central](https://central.sonatype.com/search?q=com.mugsun)) |
| Runtime | JDK 21 · Maven 3.9+ |
| Parent | Spring Boot 3.5.13 |
| Key dependencies | MyBatis-Flex 1.11.8 · Sa-Token 1.44.0 · JetCache · Hutool Crypto / BouncyCastle · FastExcel (versions pinned by `mugsun-bom`) |
| License | Source and tip: MIT. Published Central `0.1.0` was Apache-2.0 at release time. |

## Modules

| Module | Contents |
| --- | --- |
| `mugsun-bom` | Dependency version management |
| `mugsun-core-tool` | `R` response envelope, `ResultCode`, business exceptions, `TreeUtil` |
| `mugsun-starter-web` | Global exception handling, Sa-Token annotation interceptor, ApiCrypto request encryption, SafeNumber, Excel |
| `mugsun-starter-mybatis` | MyBatis-Flex starter and `BaseEntity` (snowflake IDs, audit timestamps, logical delete) |

In a Servlet web app that uses `mugsun-starter-mybatis`, when a unique constraint conflict occurs the app returns HTTP 400 with `code` 400 and the message 「数据已存在，请勿重复提交」 ("this data already exists, don't submit it twice"). The response carries no SQL, constraint name or field values, and the app does not call `ErrorLogListener` (so boot's `sys_error_log` no longer records it).

Dameng error codes -6602, -6612 and -6625 are included. If your app puts its own `sql-error-codes.xml` at the classpath root, it shadows the one in this module, so copy the Dameng entry into yours.

## Using it in your project

The tip is currently `0.2.0-SNAPSHOT` and is not on Maven Central.

To follow the tip or integrate with the boot tip, clone this repository and run:

```bash
mvn -B clean install -DskipTests
```

Then import the BOM in the consumer (version matches the tip):

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.mugsun</groupId>
      <artifactId>mugsun-bom</artifactId>
      <version>0.2.0-SNAPSHOT</version>
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

Maven Central currently has only `0.1.0`. You may resolve it, but it is a legacy release and must not be treated as the tip.

To consume Central `0.1.0` only, change the sample version to `0.1.0`. That path is not for tip development.

## Next

[Boot overview](/en/boot/) · [Architecture](/en/guide/architecture)
