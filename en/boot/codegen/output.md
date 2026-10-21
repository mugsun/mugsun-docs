# Preview and download

When the table configuration is ready, click Preview in System → Code Generator to view the generated code, or Download to get a zip.

## What is generated

Paths inside the zip follow the project layout, so you can unzip it at the project root. With module `system` and entity `ProductComment`:

| File | Location |
| --- | --- |
| Entity | `mugsun-boot/src/main/java/com/mugsun/boot/system/entity/ProductComment.java` |
| Mapper | `mugsun-boot/src/main/java/com/mugsun/boot/system/mapper/ProductCommentMapper.java` |
| Controller | `mugsun-boot/src/main/java/com/mugsun/boot/system/controller/ProductCommentController.java` |
| List page | `mugsun-pc/src/views/system/productcomment/index.vue` |
| API and types | `mugsun-pc/src/api/system/productcomment/index.ts`, `type.ts` |
| Menu SQL | `sql/product_comment_menu.sql` |

The Master-Sub template also generates the child entity, its mapper and a service.

## Generated endpoints

The controller path is `/{module}/{business name}`, which is `/system/productcomment` here:

| Endpoint | Purpose | Permission code |
| --- | --- | --- |
| `GET /page` | Paging | Login only |
| `GET /detail?id=` | Detail | Login only |
| `POST /submit` | Create or update | `system:productcomment:save` |
| `POST /remove` | Delete by a list of ids | `system:productcomment:remove` |

::: warning
Paging and detail only check that the user is signed in. Add `@SaCheckPermission` to those two methods when the data must be restricted by permission.
:::

## Go live

1. Unzip the archive at the project root and rebuild the backend and the admin console.
2. Run the menu SQL. It creates one menu with Add and Delete buttons. The parent menu defaults to the top level, and you can change `parent_id`.
3. Grant the new menu to the roles that need it in role management.

## See it work

Click Preview on the table configuration row. The dialog shows Entity, Mapper, Controller, List Page, api.ts, type.ts and Menu SQL in tabs.

Download ZIP at the bottom right downloads the files.

![Code preview](/screenshots/codegen/gen-preview.png)

Previous: [Import an existing table](./import)
