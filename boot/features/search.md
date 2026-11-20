# 全局搜索

顶栏的搜索框除了按菜单名称联想，还会联想用户、部门、角色和通知公告。

![搜索「财务」的联想结果，部门、角色和通知各一条](/screenshots/features/search.png)

## 能做什么

- 输入关键词后，结果按用户、部门、角色、通知分组显示，每类最多几条。
- 点击结果跳转到对应的管理页面。

## 启用

全局搜索随后端和管理后台一起启动，不需要配置。

## 使用

在管理后台顶栏点搜索框，或按快捷键打开，输入关键词。后端接口是 `GET /system/search/suggest?keyword=关键词`。

## 注意事项

- 搜索结果按租户隔离，用户结果还会按[数据权限](/boot/datascope/)过滤，看不到的人不会出现在结果里。
- 用户结果只显示昵称和账号，不包含手机号等敏感字段。

## 验证

在搜索框输入 `adm`，结果里出现账号为 `admin` 的用户。

也可以直接调用接口：

```bash
curl -s "http://localhost:8080/system/search/suggest?keyword=adm" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"type":"user","typeName":"用户","title":"超级管理员","subtitle":"账号 admin","path":"/system/user"}],"msg":"操作成功","dataType":null}
```

## 下一步

<div class="ms-cards">

- [数据权限](/boot/datascope/) 搜索结果里的用户就是按这套规则过滤的。
- [多租户](/boot/tenant/) 搜索结果按租户隔离，原理在这里。

</div>
