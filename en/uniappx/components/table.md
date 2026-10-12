---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table`: Table. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-table`).
Demo route: `#/pages/demo/display/table`.

## Basic usage

```vue
<template>
  <ms-table>
    …
  </ms-table>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | — |
| data | `UTSJSONObject[]` | `[]` | — |
| rowKey | `string` | `'id'` | — |
| stripe | `boolean` | `false` | — |
| bordered | `boolean` | `false` | — |
| showHeader | `boolean` | `true` | — |
| emptyText | `string` | `'暂无数据'` | — |
| selectable | `boolean` | `false` | 开启行勾选列 |
| selectedKeys | `string[]` | `[]` | 受控选中行 key 列表 |
| sortKey | `string` | `''` | 受控排序列；空串表示无排序 |
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
