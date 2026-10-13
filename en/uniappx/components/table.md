---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table` — Table for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-table` (repository not yet public).
Demo route: `#/pages/demo/display/table`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/table.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-table
    :columns="baseColumns"
    :data="baseData"
    @cell-click="onCellClick"
  />
  <ms-table
    :columns="scrollColumns"
    :data="scrollData"
    @cell-click="onCellClick"
  />
  <!-- 组件样式 -->
  <ms-table
    :columns="baseColumns"
    :data="styleData"
    stripe
    @cell-click="onCellClick"
  />
  <ms-table
    :columns="baseColumns"
    :data="styleData"
    bordered
    @cell-click="onCellClick"
  />
  <!-- 组件深度 -->
  <ms-table
    :columns="sortColumns"
    :data="sortData"
    @sort-change="onSortChange"
    @cell-click="onCellClick"
  />
  <ms-table
    :columns="baseColumns"
    :data="styleData"
    selectable
    :selected-keys="selectedKeys"
    @selection-change="onSelectionChange"
    @cell-click="onCellClick"
  />
  <ms-table :columns="baseColumns" :data="emptyData" empty-text="暂无表格数据" />
</template>

<script setup lang="uts">
const selectedKeys = ref([] as string[])
const emptyData = ref([] as UTSJSONObject[])
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | Column config |
| data | `UTSJSONObject[]` | `[]` | Data source |
| rowKey | `string` | `'id'` | Row key field name |
| stripe | `boolean` | `false` | Whether striped |
| bordered | `boolean` | `false` | Whether to show border |
| showHeader | `boolean` | `true` | Whether to show the header |
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
