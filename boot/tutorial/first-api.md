# 第一个接口

这一节在 mugsun-boot 里新增一个 `GET /hello` 接口，再带着令牌调用它。

开始前先按[快速开始](/guide/getting-started#本地开发)把后端和管理后台在本机跑起来，并用 `admin` 登录一次。

第一次登录要先修改口令，改完之后才能调用其他接口。

<div class="ms-steps">

### 新建控制器

示例代码放在 `mugsun-boot-core` 模块的 `com.mugsun.boot.note` 包下，后面三节沿用这个包。

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

接口统一返回 mugsun-core 的 `R<T>`。成功时用 `R.data(...)` 或 `R.success(...)`。

失败时抛 `ServiceException`，全局异常处理会把它转成失败的响应。

### 重新构建并启动

在仓库根目录执行：

```bash
./mvnw -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar --spring.profiles.active=dev
```

### 取得令牌

后端默认要求所有接口都登录。不带令牌调用 `/hello`，会得到 401 和「请求未授权」。

在管理后台登录后，按 F12 打开开发者工具，切到「网络」面板。点开任意一个接口请求，复制请求头 `Authorization` 的值：

```bash
TOKEN='<复制到的 Authorization 值>'
```

::: details 也可以用命令行登录
本地调试时，可以在 `config/application-local.yml` 里关掉登录验证码和国密传输，再用明文口令换取令牌。

这两项只用于本地调试，生产环境必须保持默认值。

```yaml
mugsun:
  captcha:
    enabled: false
  crypto:
    gm-enabled: false
```

重启后端后执行：

```bash
read -rs ADMIN_PASSWORD   # 输入 admin 的口令，屏幕上不显示
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"admin\",\"password\":\"$ADMIN_PASSWORD\"}" | jq -r .data.token)
```
:::

### 调用接口

```bash
curl "http://localhost:8080/hello?name=mugsun" -H "Authorization: $TOKEN"
```

预期响应：

```json
{"code":200,"success":true,"data":"你好，mugsun","msg":"操作成功","dataType":null}
```

</div>

## 哪些接口不用登录

免登录的路径登记在 `LoginPublicPaths` 里，比如 `/ping`、`/auth/login` 和以 `/open` 开头的开放接口。

新写的接口不在这份名单里，所以默认都要登录。需要权限码时再加 `@SaCheckPermission`，下一节会用到。

## 下一步

<div class="ms-cards">

- [第一个 CRUD](./first-crud) 做一张笔记表，写出增删改查的五个接口。
- [Core 概述](/core/) 统一响应的格式，以及各类异常对应的状态码。

</div>
