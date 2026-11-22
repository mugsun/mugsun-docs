# Core 概述

[mugsun-core](https://github.com/mugsun/mugsun-core) 是 mugsun 后端的公共库，由一个 BOM、一个工具包和两个 Spring Boot Starter 组成。

引入后，接口就有了统一的响应格式、全局异常处理和 Sa-Token 注解鉴权。

它是依赖库，不能单独运行。可以运行的后端是 [mugsun-boot](/boot/)。

## 安装

主干版本还没有发布到 Maven Central，要先装到本地仓库。需要 JDK 21 和 Maven 3.9+。

```bash
git clone https://github.com/mugsun/mugsun-core.git && cd mugsun-core
mvn -B clean install -DskipTests
```

然后在自己的工程里导入 BOM，再声明要用的 Starter：

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.mugsun</groupId>
      <artifactId>mugsun-bom</artifactId>
      <version>0.3.0-SNAPSHOT</version>
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

::: warning Maven Central 上的旧版本
Maven Central 上只有一个旧版本，不要和 mugsun-boot 主干一起用。

它的接口加密和主干不兼容，发布时的许可是 Apache-2.0。两个版本的差别见[升级说明](/guide/upgrade/core-0-2-0)。
:::

## 写一个接口

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
            throw new ServiceException("图书不存在");
        }
        return R.data(book);
    }
}
```

查到数据时，响应是这样的：

```json
{
  "code": 200,
  "success": true,
  "data": { "id": "277980892367867904", "title": "三体" },
  "msg": "操作成功",
  "dataType": null
}
```

`id` 是字符串。超出 ±2^53 的 `Long` 和 `BigInteger` 会序列化成字符串，长整型主键到了浏览器里不会丢精度。

其他情况不用自己处理，Starter 会转成同一种格式：

| 情况 | HTTP 状态码 | `code` |
| --- | --- | --- |
| 抛出 `ServiceException` | 200 | 400，也可以传入别的 `ResultCode` |
| 参数校验失败 | 400 | 400 |
| 未登录 | 401 | 401 |
| 没有权限或角色，或抛出 `ForbiddenException` | 403 | 403 |
| 地址不存在 | 404 | 404 |
| 请求方法不对 | 405 | 400 |
| 唯一约束冲突（需要 `mugsun-starter-mybatis`） | 400 | 400 |
| 其他没有捕获的异常 | 500 | 500 |

没有捕获的异常还会交给 `ErrorLogListener`。实现这个接口并注册成 Bean，就能把错误写进自己的日志表。

## 有哪些模块

| 模块 | 内容 |
| --- | --- |
| `mugsun-bom` | 锁定本仓库构件和第三方依赖的版本，比如 MyBatis-Flex、Sa-Token 和 JetCache |
| `mugsun-core-tool` | 统一响应 `R`、业务异常和树形工具，不依赖 Spring |
| `mugsun-starter-web` | 全局异常处理、注解鉴权和接口加解密，另有大整数序列化和 Excel 工具 |
| `mugsun-starter-mybatis` | MyBatis-Flex 和实体基类 `BaseEntity`，以及唯一约束冲突的处理 |

Starter 注册的 Bean 都可以覆盖。自己声明一个同类型的 Bean，Starter 的那个就不再生效。

## 继承实体基类

```java
@Table("book")
public class Book extends BaseEntity {
    private String title;
}
```

继承 `BaseEntity` 后，实体就有了自动生成的长整型主键 `id`。创建时间、更新时间和逻辑删除标记也由它维护。

保存前调用 `sanitizeForInsert()`，可以清掉请求体里带进来的时间和删除标记。

遇到唯一约束冲突时，接口返回「数据已存在，请勿重复提交」。响应里不带 SQL、约束名和字段值。

::: details 使用达梦数据库时
达梦的错误码 -6602、-6612 和 -6625 已经包含在内。

应用自己在 classpath 根目录放了 `sql-error-codes.xml` 时，会遮住本模块的那份，需要把达梦的条目抄过去。
:::

## 加密接口的请求和响应

在接口上加 `@ApiDecrypt` 会解密请求体，加 `@ApiEncrypt` 会加密响应里的 `data`。算法是 SM4-GCM。

```java
@ApiDecrypt
@ApiEncrypt
@PostMapping("/login")
public R<LoginVO> login(@RequestBody LoginDTO dto) {
    return R.data(authService.login(dto));
}
```

请求体要写成 `{"encryptData": "<密文>"}`。响应里的 `data` 是密文，`dataType` 的值是 `ENCRYPT`。

::: warning 不能代替 HTTPS
这只是传输混淆。密钥要下发给浏览器，对客户端不保密，密文也不防重放。
:::

密钥不配也能启动，第一次启动时会自动生成一个。用 Docker 或多个实例部署时要自己配置，见[密钥与加密](/boot/crypto-keys#接口传输密钥)。

## 目前的限制

- 主干版本没有发布到 Maven Central，只能本地安装。
- 需要 Spring Boot 4 和 JDK 21。还在用 Spring Boot 3 的工程见[升级到 Spring Boot 4](/guide/upgrade/spring-boot-4#stay-on-3)。
- 只支持 Spring MVC，不支持 WebFlux。

## 下一步

<div class="ms-cards">

- [后端概述](/boot/) mugsun-boot 是这个库最主要的使用者。
- [架构](/guide/architecture) 各个仓库怎样组合在一起。
- [升级说明](/guide/upgrade/core-0-2-0) 从 Maven Central 上的旧版本升级时要改什么。
- [密钥与加密](/boot/crypto-keys) 接口传输密钥怎么配，前端怎么拿到。

</div>
