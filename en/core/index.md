# Core overview

[mugsun-core](https://github.com/mugsun/mugsun-core) holds the shared libraries of the mugsun backend: one BOM, one utility package and two Spring Boot starters.

Once you add it, your endpoints get a unified response format, global exception handling and Sa-Token annotation-based authorization.

It is a library and cannot run on its own. The backend that runs is [mugsun-boot](/en/boot/).

## Install

The main-branch version is not on Maven Central yet, so install it into your local repository first. You need JDK 21 and Maven 3.9+.

```bash
git clone https://github.com/mugsun/mugsun-core.git && cd mugsun-core
mvn -B clean install -DskipTests
```

Then import the BOM in your own project and declare the starters you need:

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

::: warning The old release on Maven Central
Maven Central only has one old release. Do not use it with the main branch of mugsun-boot.

Its API encryption is not compatible with the main branch, and it was released under Apache-2.0. For the differences between the two versions, see the [upgrade notes](/en/guide/upgrade/core-0-2-0).
:::

## Write an endpoint

```java
@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @SaCheckPermission("book:view")
    @GetMapping("/{id}")
    public R<BookVO> detail(@PathVariable Long id) {
        BookVO book = bookService.detail(id);
        if (book == null) {
            throw new ServiceException("Book not found");
        }
        return R.data(book);
    }
}
```

When the book is found, the response looks like this. `msg` is the library's built-in success message:

```json
{
  "code": 200,
  "success": true,
  "data": { "id": "277980892367867904", "title": "The Three-Body Problem" },
  "msg": "操作成功",
  "dataType": null
}
```

`id` is a string. A `Long` or `BigInteger` beyond ±2^53 is serialized as a string, so long primary keys keep their precision in the browser.

You do not handle the other cases yourself. The starter turns them into the same format:

| Case | HTTP status | `code` |
| --- | --- | --- |
| `ServiceException` is thrown | 200 | 400, or another `ResultCode` you pass in |
| Parameter validation fails | 400 | 400 |
| Not signed in | 401 | 401 |
| Missing permission or role, or `ForbiddenException` is thrown | 403 | 403 |
| URL not found | 404 | 404 |
| Wrong request method | 405 | 400 |
| Unique constraint conflict (needs `mugsun-starter-mybatis`) | 400 | 400 |
| Any other uncaught exception | 500 | 500 |

Uncaught exceptions are also passed to `ErrorLogListener`. Implement this interface and register it as a bean to write errors to your own log table.

## What modules it has

| Module | Contents |
| --- | --- |
| `mugsun-bom` | Pins the versions of this repository's artifacts and of third-party dependencies such as MyBatis-Flex, Sa-Token and JetCache |
| `mugsun-core-tool` | The unified response `R`, business exceptions and tree utilities. No Spring dependency |
| `mugsun-starter-web` | Global exception handling, annotation-based authorization and API encryption, plus big-integer serialization and Excel utilities |
| `mugsun-starter-mybatis` | MyBatis-Flex and the entity base class `BaseEntity`, plus unique constraint conflict handling |

Every bean a starter registers can be overridden. Declare a bean of the same type and the starter's bean no longer applies.

## Extend the entity base class

```java
@Table("book")
public class Book extends BaseEntity {
    private String title;
}
```

An entity that extends `BaseEntity` gets an auto-generated long primary key `id`. The base class also maintains the creation time, the update time and the logical delete flag.

Call `sanitizeForInsert()` before saving to clear any timestamps and delete flag that came in with the request body.

On a unique constraint conflict, the endpoint returns a fixed message that says the data already exists. The response contains no SQL, constraint name or field value.

::: details If you use a Dameng database
The Dameng error codes -6602, -6612 and -6625 are already included.

If your application puts its own `sql-error-codes.xml` in the classpath root, it hides the one from this module, and you need to copy the Dameng entries into yours.
:::

## Encrypt an endpoint's request and response

`@ApiDecrypt` on an endpoint decrypts the request body. `@ApiEncrypt` encrypts `data` in the response. The algorithm is SM4-GCM.

```java
@ApiDecrypt
@ApiEncrypt
@PostMapping("/login")
public R<LoginVO> login(@RequestBody LoginDTO dto) {
    return R.data(authService.login(dto));
}
```

The request body must be `{"encryptData": "<ciphertext>"}`. In the response, `data` is ciphertext and `dataType` is `ENCRYPT`.

::: warning Not a replacement for HTTPS
This is transport obfuscation only. The key is sent to the browser, so it is not secret from the client, and the ciphertext is not protected against replay.
:::

The application starts without a configured key and generates one on first start. With Docker or more than one instance you must configure the key yourself. See [Configuration](/en/boot/configuration).

## Current limits

- The main-branch version is not on Maven Central. You can only install it locally.
- It needs Spring Boot 3 and JDK 21. Earlier versions are not supported.
- It supports Spring MVC only, not WebFlux.

## Next steps

<div class="ms-cards">

- [Backend overview](/en/boot/) mugsun-boot is the main user of this library.
- [Architecture](/en/guide/architecture) How the repositories fit together.
- [Upgrade notes](/en/guide/upgrade/core-0-2-0) What to change when you move off the old Maven Central release.
- [Configuration](/en/boot/configuration) The API encryption key and the other settings.

</div>
