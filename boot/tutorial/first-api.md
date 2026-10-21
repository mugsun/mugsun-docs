# 第一个接口

本节在 mugsun-boot 里新增一个 `GET /hello` 接口。开始前请先按[快速开始](/guide/getting-started#本地开发)把后端在本地跑起来。

## 新建控制器

示例代码放在 `mugsun-boot-core` 的 `com.mugsun.boot.note` 包下，后面三节沿用这个包。

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

接口统一返回 mugsun-core 的 `R<T>`。

成功用 `R.data(...)` 或 `R.success(...)`，失败时抛 `ServiceException`，全局异常处理会转成 `R.fail`。

## 登录校验

这个控制器没有加注解，所以不登录也能访问。

业务接口要在类或方法上加 `@SaCheckLogin`，需要权限码时再加 `@SaCheckPermission`，下一节会用到。

## 看效果

在仓库根目录重新构建并启动：

```bash
mvn -pl mugsun-boot-server -am package -DskipTests
java -jar mugsun-boot-server/target/mugsun-boot.jar
```

另开一个终端调用接口：

```bash
curl "http://localhost:8080/hello?name=mugsun"
```

预期响应：

```json
{"code":200,"success":true,"data":"你好，mugsun","msg":"操作成功","dataType":null}
```

下一节：[第一个 CRUD](./first-crud)
