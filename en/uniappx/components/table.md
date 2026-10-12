---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table` — Table for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-table`).
Demo route: `#/pages/demo/display/table`.

## Basic usage

```vue
<template>
  <ms-table>
    …
  </ms-table>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | Columns config / count |
| data | `UTSJSONObject[]` | `[]` | Data source |
| rowKey | `string` | `'id'` | rowKey string value |
| stripe | `boolean` | `false` | Whether stripe is enabled |
| bordered | `boolean` | `false` | Whether bordered |
| showHeader | `boolean` | `true` | Whether to show header |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| selectable | `boolean` | `false` | Enable row selection column |
| selectedKeys | `string[]` | `[]` | Controlled selected row keys |
| sortKey | `string` | `''` | Controlled sort column; empty = unsorted |
| sortOrder | `string` | `'none'` | none \| asc \| desc |

## Events

| Event | Description |
| --- | --- |
| cell-click | cell-click |
| sort-change | sort-change |
| selection-change | selection-change |
| update:selectedKeys | update:selectedKeys |
| update:sortKey | update:sortKey |
| update:sortOrder | update:sortOrder |

## Slots

| Slot | Description |
| --- | --- |
| empty | `empty` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-table/`
- Demo: `#/pages/demo/display/table`
- Chinese docs: [/uniappx/components/table](/uniappx/components/table)
