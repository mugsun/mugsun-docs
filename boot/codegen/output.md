# 预览和下载产物

表配置调好后，在「系统管理 → 代码生成」里点「预览」查看生成的代码，点「下载」得到 zip。

## 产物清单

zip 里的路径按工程结构组织，解压后放到工程根目录即可。以模块 `system`、实体 `ProductComment` 为例：

| 文件 | 位置 |
| --- | --- |
| 实体 | `mugsun-boot/src/main/java/com/mugsun/boot/system/entity/ProductComment.java` |
| Mapper | `mugsun-boot/src/main/java/com/mugsun/boot/system/mapper/ProductCommentMapper.java` |
| 控制器 | `mugsun-boot/src/main/java/com/mugsun/boot/system/controller/ProductCommentController.java` |
| 列表页 | `mugsun-pc/src/views/system/productcomment/index.vue` |
| 接口与类型 | `mugsun-pc/src/api/system/productcomment/index.ts`、`type.ts` |
| 菜单 SQL | `sql/product_comment_menu.sql` |

主子表模板还会生成子表的实体、Mapper 和一个 Service。

## 生成的接口

控制器的路径是 `/{模块}/{业务名}`，示例是 `/system/productcomment`：

| 接口 | 说明 | 权限码 |
| --- | --- | --- |
| `GET /page` | 分页 | 只要求登录 |
| `GET /detail?id=` | 详情 | 只要求登录 |
| `POST /submit` | 新增或修改 | `system:productcomment:save` |
| `POST /remove` | 按 id 列表删除 | `system:productcomment:remove` |

::: warning
分页和详情只做登录校验。数据需要按权限隔离时，请在这两个方法上加 `@SaCheckPermission`。
:::

## 上线

1. 把 zip 解压到工程根目录，重新构建后端和管理台。
2. 执行菜单 SQL。它会建一个菜单和「新增」「删除」两个按钮，父菜单默认为顶级，可以按需改 `parent_id`。
3. 在角色管理里给需要的角色勾选新菜单。

## 看效果

点表配置这一行的「预览」，弹窗里按 Entity、Mapper、Controller、列表页、api.ts、type.ts、菜单SQL 分页显示生成结果。

右下角的「下载 zip」可以直接下载产物。

![代码预览](/screenshots/codegen/gen-preview.png)

上一节：[导入已有表](./import)
