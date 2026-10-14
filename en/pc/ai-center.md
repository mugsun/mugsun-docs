# AI center pages

## Opening a detail page that does not exist

If you open an AI detail page by its ID (knowledge base detail, dataset config, dataset chat, dashboard designer) and that ID does not exist or has been deleted, the page shows only "… 不存在或已删除" (does not exist or was deleted), the ID and a button back to the list. It no longer renders a blank page you can edit, upload to or save, and no error message pops up.

| Page | Path | Back to |
| --- | --- | --- |
| Knowledge base detail | `/ai/knowledge/detail/:id` | Knowledge base list |
| Dataset config | `/ai/dataset/config/:id` | Dataset list |
| Dataset chat | `/ai/dataset/run/:id` | Dataset list |
| Dashboard designer | `/ai/dashboard/design/:id` | Dataset list |

The dashboard designer accepts either a dashboard ID or a dataset ID (a new dashboard is created when you come from the dataset list). It shows "does not exist or was deleted" only when neither is found.
