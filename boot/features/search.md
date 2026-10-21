# 全局搜索

顶栏的搜索框除了按菜单名称联想，还会联想用户、部门、角色和通知公告。

## 能干什么

- 输入关键词后，结果按用户、部门、角色、通知分组显示，每类最多几条。
- 点击结果跳转到对应的管理页面。

## 怎么开

全局搜索随后端和管理台一起启动，不需要配置。

## 怎么用

在管理台顶栏点搜索框，或按快捷键打开，输入关键词。后端接口是 `GET /system/search/suggest?keyword=关键词`。

## 注意点

- 搜索结果按租户隔离，用户结果还会按[数据权限](/boot/datascope/)过滤，看不到的人不会出现在结果里。
- 用户结果只显示昵称和账号，不包含手机号等敏感字段。

## 看效果

在搜索框输入 `adm`，结果里出现账号为 `admin` 的用户。

![全局搜索](/screenshots/features/search.png)

也可以直接调用接口：

```bash
curl -s "http://localhost:8080/system/search/suggest?keyword=adm" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"type":"user","typeName":"用户","title":"超级管理员","subtitle":"账号 admin","path":"/system/user"}],"msg":"操作成功","dataType":null}
```

上一节：[单号规则](./serial-number)
