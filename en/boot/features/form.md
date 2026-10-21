# Forms

mugsun has two kinds of forms. Form Designer builds forms by drag and drop and stores the submitted data separately. Online Forms read and write a business table directly without generating code.

## What it does

- Form Designer is based on the form-create designer. Drag in fields, set validation, and save the result as a form definition.
- A form definition can be filled in on its own or bound to a [workflow](./workflow) node.
- Online Forms read the table settings imported in code generation and render the list, filters and edit form from them. Inserts, updates and deletes go straight to the business table.

## How to turn it on

Both kinds of forms start with the backend. For Online Forms, first import the business table in [code generation](/en/boot/codegen/import).

## How to use it

Form Designer:

1. Open System Settings → Form Designer, create a form, and fill in its name and form key (`formKey`).
2. Drag in fields and save.
3. The frontend loads the form with `GET /system/form/by-key/{formKey}`.
4. When the user submits, call `POST /system/form/submit-data/{formKey}`.

Online Forms:

1. Import a table in code generation, and in its settings choose which fields appear in the list, the form and the filters.
2. Open System Settings → Online Forms and pick the table to list, add, edit and delete rows.

## Notes

- The permission codes of Online Forms are `sys:online:list` (read) and `sys:online:edit` (insert, update and delete).
- After you change the column settings in code generation, Online Forms render with the new settings immediately, without a restart.
- Regular users see only their own submissions in the submission list.

## See it work

After saving a form, look at the form definitions:

```sql
SELECT name, form_key, status FROM sys_form WHERE is_deleted = 0;
```

The tables listed in Online Forms are the tables imported in code generation:

```sql
SELECT table_name, table_comment FROM gen_table WHERE is_deleted = 0;
```

Previous: [Workflow](./workflow) · Next: [Rule chains](./rule)
