# Your first API

This page adds a `GET /hello` endpoint to mugsun-boot. Before you start, run the backend locally as described in [Getting started](/en/guide/getting-started#local-development).

## Create a controller

The examples live in the `com.mugsun.boot.note` package of `mugsun-boot-core`. The next three pages use the same package.

```java
// mugsun-boot-core/src/main/java/com/mugsun/boot/note/HelloController.java
package com.mugsun.boot.note;

import com.mugsun.core.tool.api.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

	@GetMapping
	public R<String> hello(@RequestParam(defaultValue = "mugsun") String name) {
		return R.data("你好，" + name);
	}
}
```

Every endpoint returns `R<T>` from mugsun-core. Use `R.data(...)` or `R.success(...)` on success. On failure, throw `ServiceException`; the global exception handler turns it into `R.fail`.

## Login checks

This controller has no annotations, so it can be called without logging in. Business endpoints add `@SaCheckLogin` to the class or method, and `@SaCheckPermission` when a permission code is required. The next page uses both.

## See it work

Rebuild and start from the repository root:

```bash
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

Call the endpoint from another terminal:

```bash
curl "http://localhost:8080/hello?name=mugsun"
```

Expected response:

```json
{"code":200,"success":true,"data":"你好，mugsun","msg":"操作成功","dataType":null}
```

Next: [Your first CRUD](./first-crud)
