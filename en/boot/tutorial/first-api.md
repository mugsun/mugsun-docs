# Your first API

This section adds a `GET /hello` endpoint to mugsun-boot and calls it with a token.

Before you start, follow [Getting started](/en/guide/getting-started#local-development) to run the backend and the admin console locally, and sign in once as `admin`.

The first sign-in asks you to change the password. Other endpoints work only after that.

<div class="ms-steps">

### Create a controller

The sample code lives in the `com.mugsun.boot.note` package of the `mugsun-boot-core` module. The next three sections reuse this package.

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
		return R.data("Hello, " + name);
	}
}
```

Every endpoint returns `R<T>` from mugsun-core. Use `R.data(...)` or `R.success(...)` on success.

On failure, throw `ServiceException`. The global exception handler turns it into a failure response.

### Rebuild and restart

Run these from the repository root:

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

### Get a token

By default the backend requires sign-in for every endpoint. Calling `/hello` without a token returns 401.

Sign in to the admin console, press F12 to open the developer tools and switch to the Network panel. Open any API request and copy the value of the `Authorization` request header:

```bash
TOKEN='<the Authorization value you copied>'
```

::: details Or sign in from the command line
For local debugging you can turn off the sign-in captcha and SM2 transport encryption in `config/application-local.yml`, then exchange a plain-text password for a token.

Use these two settings for local debugging only. Production must keep the defaults.

```yaml
mugsun:
  captcha:
    enabled: false
  crypto:
    gm-enabled: false
```

Restart the backend, then run:

```bash
read -rs ADMIN_PASSWORD   # type the admin password; it is not echoed
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"admin\",\"password\":\"$ADMIN_PASSWORD\"}" | jq -r .data.token)
```
:::

### Call the endpoint

```bash
curl "http://localhost:8080/hello?name=mugsun" -H "Authorization: $TOKEN"
```

Expected response:

```json
{"code":200,"success":true,"data":"Hello, mugsun","msg":"操作成功","dataType":null}
```

</div>

## Which endpoints need no sign-in

Paths that need no sign-in are listed in `LoginPublicPaths`, for example `/ping`, `/auth/login` and the open API under `/open`.

A new endpoint is not on that list, so it requires sign-in by default. Add `@SaCheckPermission` when it also needs a permission code. The next section uses it.

## Next steps

<div class="ms-cards">

- [Your first CRUD](./first-crud) Build a notes table with the five create, read, update and delete endpoints.
- [Core overview](/en/core/) The response format and the status code each exception maps to.

</div>
