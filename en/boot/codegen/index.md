# Code generation

Code generation turns a table structure into a backend entity, mapper and controller, plus an admin list page, API files and menu SQL.

## Pick an entry point

| What you have | Entry point | Page |
| --- | --- | --- |
| An idea but no table yet | [AI-assisted modeling](./ai-modeling) | System → Dynamic Tables |
| An existing business table | [Import an existing table](./import) | System → Code Generator |
| A finished table configuration | [Preview and download](./output) | System → Code Generator |

Both paths end in the same table configuration. A table confirmed in Dynamic tables appears in the Code Generator list right away.

## Permission codes

| Permission code | Purpose |
| --- | --- |
| `sys:gen:list` | View tables and table configurations, and generate modeling candidates |
| `sys:gen:import` | Import an existing table |
| `sys:gen:edit` | Save column settings, sync the table structure and delete a table configuration |
| `sys:gen:preview` | Preview code, preview DDL and download the zip |
| `sys:gen:ddl` | Confirm a model, create tables and sync physical tables |

Administrators hold every permission code. Other roles need the buttons under Code Generator checked in menu management.

## See it work

Sign in to the admin console as an administrator and open System → Code Generator. You see the table picker and the list of imported table configurations.

![Code generation page](/screenshots/codegen/gen-list.png)

Next: [AI-assisted modeling](./ai-modeling)
