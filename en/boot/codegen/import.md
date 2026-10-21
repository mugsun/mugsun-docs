# Import an existing table

When the business table already exists, import it in System → Code Generator and adjust the column settings as needed.

## Import

1. Under Generator source, choose the primary database or a registered one.
2. Choose the table, then fill in the module, base package, prefix and author.
3. Click Import.

The system reads the table's columns, infers Java types and controls, and creates a table configuration. Deleting a table configuration does not delete the table in the database.

Importing the same table again updates the configuration from the current schema and keeps the column settings you changed. After a schema change you can also click Sync in the list.

## Generator sources

System → Generator Sources registers additional databases. The system tries to connect on save, and the password is never shown again. Only connected data sources appear in the Code Generator picker.

## Generator schemes

System → Generator Schemes stores a module, base package, table prefix and author. Once a scheme is enabled, importing a table fills in these values, and you can still change them before importing.

## Column settings

Click Config in the list to change the template and each column:

- Template: Single, Tree (needs a parent column) or Master-Sub (needs a child table and a foreign key column).
- Columns: Java type, comment, control, dictionary code, and whether the column appears in the list, the form and the query conditions.

## See it work

After you import a table or confirm one from modeling, click Config on its row to open the column settings.

![Column settings](/screenshots/codegen/gen-config.png)

Click Save Config when you are done. Preview and download use this configuration.

Previous: [AI-assisted modeling](./ai-modeling) · Next: [Preview and download](./output)
