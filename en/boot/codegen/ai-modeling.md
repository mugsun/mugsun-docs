# AI-assisted modeling

Enter a description in System → Dynamic Tables and the system proposes an editable table structure. Nothing is saved or created until you confirm the candidate.

## Write the description

The first segment holds the English table name and a Chinese label. Each following segment describes one column: English column name, Chinese meaning and a type word. Separate segments with semicolons, commas, enumeration commas or line breaks.

```text
product_comment 商品评论；content 评论内容 文本，score 评分 整数，author 作者 文本，comment_time 评论时间 日期
```

The type word sets the Java type and the form control:

| Type word | Java type | Control |
| --- | --- | --- |
| 文本, 内容, 备注, 描述 (text) | `String` | Multi-line text |
| 金额, 价格, 小数 (decimal) | `BigDecimal` | Number |
| 长整数, 编号 (long) | `Long` | Number |
| 整数, 数量, 评分 (int) | `Integer` | Number |
| 时间, 日期时间 (datetime) | `LocalDateTime` | Date and time |
| 日期 (date) | `LocalDate` | Date and time |
| 开关, 是否 (switch) | `Integer` | Switch |
| 状态, 类型, 下拉 (select) | `String` | Select |

A column without a type word becomes a `String` with a text input. The `id`, `create_time`, `update_time` and `is_deleted` columns are added automatically.

## Use a large language model

When the backend includes the AI module (the default `full` build does), the AI module is enabled and a chat model is configured, the description goes to the model first. You can then write a plain sentence such as "track daily visitors and sales for each store".

The model used is the chat model marked as default in the AI center. Without a default, the most recently added active chat model is used.

If the model returns an invalid table or column name, the call fails, or no model is configured, the system falls back to the rule parser above. The rule parser needs English identifiers. A description with Chinese only returns "describe at least a table name and one column".

::: tip
The hint on the page only describes the rule parser. With a model connected, a plain sentence also produces a candidate.
:::

## Confirm and create the table

Once the candidate appears, you can edit the table name, the label, and each column's name, type, list, required and query settings. You can also add or remove columns.

- Confirm & Create saves the table configuration and creates the physical table immediately. If table creation fails, the configuration is rolled back as well.
- Save Config Only saves the configuration. Create the table later from the Dynamic Tables tab.

Table and column names must start with a lowercase letter and contain only lowercase letters, digits and underscores. Tables starting with `sys_`, `flyway_`, `flow_`, `qrtz_` or `act_`, and `gen_table` and `gen_column`, are protected and cannot be created or rebuilt.

## Manage created tables

The Dynamic Tables tab lists every saved table with five actions:

- Field Config: edit columns. A renamed column becomes RENAME and a new column becomes ADD, so data is kept.
- Preview DDL: shows the statements that would run, without running them.
- Create Table: creates the physical table when it does not exist.
- Incremental Sync: runs ADD and RENAME from the column settings, so data is kept.
- Force Rebuild: drops and recreates the table, and all its data is lost.

## See it work

Open System → Dynamic Tables, paste the sample description into Rule Modeling and click Generate Draft.

![Candidate from rule modeling](/screenshots/codegen/gen-modeling-draft.png)

The `comment_time` segment contains both 时间 and 日期. The system matches 时间 first, so the type is `LocalDateTime` and the label keeps only 评论. Change the type and label in the table as needed.

Click Confirm & Create, then switch to the Dynamic Tables tab. `product_comment` appears in the list.

![Dynamic table management](/screenshots/codegen/gen-modeling-manage.png)

You can also call the API directly. `/system/gen/ai/draft` only returns a candidate and writes nothing:

```bash
curl -s -X POST http://localhost:8080/system/gen/ai/draft \
  -H "Authorization: $TOKEN" -H 'Content-Type: application/json' \
  -d '{"description":"product_comment 商品评论；score 评分 整数"}'
```

The response `data` holds `table` and `columns`. Put them unchanged into the request body of `/system/gen/ai/confirm` and add `"build": true` to save the configuration and create the table.

Previous: [Code generation](./) · Next: [Import an existing table](./import)
