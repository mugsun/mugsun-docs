# 租户与套餐

租户和套餐都由平台超管在管理台的「租户运营」菜单里维护。

## 新建租户

在「租户运营 → 租户管理」点「新增租户」，填写名称、联系人、账号上限、过期时间和套餐。保存后系统生成 6 位租户编号，并为这个租户创建以下默认数据：

- 一个与租户同名的部门；
- 一个编码为 `default` 的默认岗位；
- 一个编码为 `admin`、数据范围为全部数据的管理员角色；
- 一个账号为 `admin` 的管理员，初始密码取 `mugsun.security.init-password`。

租户管理员登录时，在登录页填写租户编号、账号和密码。租户编号留空表示平台租户。

## 停用、过期和账号上限

- 状态改为停用后，这个租户的用户不能登录。已经登录的用户再调用 `/system` 下的接口时会被拒绝。
- 过了过期时间，效果与停用相同。
- 账号上限填 `-1` 表示不限制。达到上限后，新增用户会提示联系管理员开通。

平台租户不能停用，也不能删除。删除其他租户时，它的用户、部门、岗位和角色会一起被逻辑删除。

## 套餐

套餐限定租户能用哪些功能。在「租户运营 → 租户套餐」新建套餐，勾选功能菜单，再在租户上选择这个套餐。

套餐在服务端生效，不只是隐藏菜单。租户调用套餐外功能的接口时，返回 403 和「该功能不在您的套餐内，请联系管理员开通」。在管理台修改套餐或租户后立即生效。没有选择套餐的租户不受限制。

![租户套餐列表](/screenshots/tenant/tenant-package.png)

## 平台级接口

租户管理、套餐、租户数据源、在线用户、存储配置、定时任务等平台级接口只允许平台超管访问。菜单、字典和参数是全局配置，租户只能读取，不能修改。

请求头 `X-Tenant-Id` 与登录会话的租户不一致时，请求会被拒绝，返回「无权跨租户操作」。

## 看效果

新建一个名为「示例门店」、套餐为「基础版」的租户后，列表里多出一行，编号由系统生成。

![租户列表](/screenshots/tenant/tenant-list.png)

用下面的语句核对租户和它的默认数据，把 `226994` 换成实际的租户编号：

```sql
SELECT tenant_code, tenant_name, status, account_count, package_id
FROM sys_tenant
WHERE is_deleted = 0
ORDER BY tenant_code;

SELECT 'dept' AS kind, dept_name AS name FROM sys_dept WHERE tenant_id = '226994' AND is_deleted = 0
UNION ALL SELECT 'post', post_name FROM sys_post WHERE tenant_id = '226994' AND is_deleted = 0
UNION ALL SELECT 'role', role_code FROM sys_role WHERE tenant_id = '226994' AND is_deleted = 0
UNION ALL SELECT 'user', username FROM sys_user WHERE tenant_id = '226994' AND is_deleted = 0;
```

第二条语句返回四行：部门「示例门店」、岗位「默认岗位」、角色 `admin` 和用户 `admin`。再看租户绑定的套餐：

```sql
SELECT t.tenant_code, p.name, p.menu_keys
FROM sys_tenant t
LEFT JOIN sys_tenant_package p ON p.id = t.package_id AND p.is_deleted = 0
WHERE t.is_deleted = 0
ORDER BY t.tenant_code;
```

「基础版」的 `menu_keys` 是 `User,Dept`。用这个租户的管理员登录，调用接口验证套餐：

```bash
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"tenantId":"226994","username":"admin","password":"123456"}' | jq -r .data.token)
curl -s "http://localhost:8080/system/user/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
curl -s "http://localhost:8080/system/role/page?pageNum=1&pageSize=10" -H "Authorization: $TOKEN"
```

用户列表正常返回本租户的一个管理员。角色列表返回 `{"code":403,...,"msg":"该功能不在您的套餐内，请联系管理员开通"}`。

上一节：[多租户](./) · 下一节：[在代码里切换租户](./context)
