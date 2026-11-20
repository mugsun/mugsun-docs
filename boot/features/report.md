# 报表

报表用内置数据集出图表，由管理后台用 ECharts 渲染，不依赖报表引擎。

![报表预览弹窗：一张饼图显示用户状态分布，一张柱状图显示各租户的用户数](/screenshots/features/report.png)

## 能做什么

- 在「报表管理」新建报表，一份报表可以放多张图表。
- 每张图表选择一个内置数据集和图表类型。
- 预览报表，按数据集实时取数。

内置数据集有两个：`user_status`（用户状态分布）和 `tenant_user`（租户用户数）。

## 启用

报表随后端一起启动，不需要额外配置。

## 使用

1. 打开「系统管理 → 报表管理」，点新建，填写报表名称。
2. 添加图表，选择数据集和图表类型，保存。
3. 在列表里点预览。

要增加数据集，在 `SysReportController` 里加一个数据集键和对应的聚合 SQL，并在 `DATASET_LABELS` 里加上展示名。

## 注意事项

- 数据集是白名单，报表定义里只能引用已有的数据集键，不能写任意 SQL。
- 报表管理页只有平台超管能访问。

## 验证

取用户状态分布数据集：

```bash
curl -s "http://localhost:8080/system/report/preview-dataset?key=user_status" -H "Authorization: $TOKEN"
```

```json
{"code":200,"success":true,"data":[{"name":"启用","key":"enabled","value":1}],"msg":"操作成功","dataType":null}
```

`value` 与下面这条语句的结果相同：

```sql
SELECT status, count(*) FROM sys_user WHERE is_deleted = 0 GROUP BY status;
```

## 下一步

<div class="ms-cards">

- [权限与附件](/boot/permissions) 接口权限怎么判定，平台超管指的是谁。
- [功能特性](./) 回到功能列表，看看后端还自带了什么。

</div>
