# Code generation

Code generation turns a table structure into a backend entity, mapper and controller, plus an admin list page, API files and menu SQL.

![The code generation page: the data source and the import form on top, imported tables below](/screenshots/codegen/gen-list.png)

Sign in to the admin console as an administrator and open System Settings → Code Generator. You see the table picker and the list of imported table configurations.

## Pick an entry point

<div class="ms-cards">

- [AI-assisted modeling](./ai-modeling) No table yet: write a description, get a table structure candidate, confirm it to create the table.
- [Import an existing table](./import) The business table already exists: import it, then adjust the column settings.
- [Preview and download](./output) The table configuration is ready: preview the code and download the zip.

</div>

AI-assisted modeling is under System Settings → Dynamic Tables. The other two are under System Settings → Code Generator.

Both paths end in the same table configuration. A table confirmed in Dynamic Tables appears in the Code Generator list right away.

## Permission codes

| Permission code | Purpose |
| --- | --- |
| `sys:gen:list` | View tables and table configurations, and generate modeling candidates |
| `sys:gen:import` | Import an existing table |
| `sys:gen:edit` | Save column settings, sync the table structure and delete a table configuration |
| `sys:gen:preview` | Preview code, preview DDL and download the zip |
| `sys:gen:ddl` | Confirm a model, create tables and sync physical tables |

Administrators hold every permission code. Other roles need the buttons under Code Generator checked in menu management.
