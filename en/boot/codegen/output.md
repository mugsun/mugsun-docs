# Preview and download

When the table configuration is ready, click Preview in System Settings → Code Generator to view the generated code, or Download to get a zip.

![Code preview](/screenshots/codegen/gen-preview.png)

## What is generated

Paths inside the zip start with `mugsun-boot/` and `mugsun-pc/`. Unzip it in the directory that holds those two repositories.

With module `system` and entity `ProductComment`:

| File | Location |
| --- | --- |
| Entity | `mugsun-boot/src/main/java/com/mugsun/boot/system/entity/ProductComment.java` |
| Mapper | `mugsun-boot/src/main/java/com/mugsun/boot/system/mapper/ProductCommentMapper.java` |
| Controller | `mugsun-boot/src/main/java/com/mugsun/boot/system/controller/ProductCommentController.java` |
| List page | `mugsun-pc/src/views/system/productcomment/index.vue` |
| API and types | `mugsun-pc/src/api/system/productcomment/index.ts`, `type.ts` |
| Menu SQL | `sql/product_comment_menu.sql` |

The Master-Sub template also generates the child entity, its mapper and a service.

::: warning Backend files need one more move
The backend is a multi-module project. Its source lives under `mugsun-boot/mugsun-boot-core/src/main/java/`.

The zip puts backend files under `mugsun-boot/src/main/java/`. Move them into the same package directory inside `mugsun-boot-core`, or they are not compiled.
:::

## Generated endpoints

The controller path is `/{module}/{business name}`, which is `/system/productcomment` here:

| Endpoint | Purpose | Permission code |
| --- | --- | --- |
| `GET /page` | Paging | Login only |
| `GET /detail?id=` | Detail | Login only |
| `GET /tree?parentId=` | Tree template only: direct children of a node, or the root nodes when omitted | Login only |
| `POST /submit` | Create or update | `system:productcomment:save` |
| `POST /remove` | Delete by a list of ids | `system:productcomment:remove` |

::: warning Note
Query endpoints only check that the user is signed in. Add `@SaCheckPermission` to those methods when the data must be restricted by permission.
:::

## Go live

1. Unzip the archive in the directory that holds `mugsun-boot` and `mugsun-pc`.
2. Move the backend files into the same package directory inside `mugsun-boot-core`, then rebuild the backend and the admin console.
3. Run the menu SQL. It creates one menu with Add and Delete buttons. The parent menu defaults to the top level, and you can change `parent_id`.
4. Grant the new menu to the roles that need it in role management.

## Verify

Click Preview on the table configuration row. The dialog shows Entity, Mapper, Controller, List Page, api.ts, type.ts and Menu SQL in tabs.

Download ZIP at the bottom right downloads the files.

## Next steps

<div class="ms-cards">

- [Your first CRUD](/en/boot/tutorial/first-crud) Compare with the hand-written version to see what each generated part does.
- [Enable it on an endpoint](/en/boot/datascope/annotation) Add data permissions to the generated page endpoint.

</div>
