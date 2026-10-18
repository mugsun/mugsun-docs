---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table` is a lightweight mobile table with horizontal scrolling, striped rows, borders, column sorting, row selection and an empty state.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-table`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/table`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/table.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
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
  <!-- Styles -->
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
  <!-- Advanced -->
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
  <ms-table :columns="baseColumns" :data="emptyData" empty-text="No table data" />
</template>

<script setup lang="uts">
const baseColumns = [
  { key: 'name', title: 'Name', width: 96 },
  { key: 'role', title: 'Role', width: 120 },
  { key: 'city', title: 'City', width: 96 },
] as UTSJSONObject[]

const baseData = [
  { id: '1', name: 'Zhang San', role: 'Product', city: 'Shanghai' },
  { id: '2', name: 'Li Si', role: 'Design', city: 'Beijing' },
  { id: '3', name: 'Wang Wu', role: 'Developer', city: 'Hangzhou' },
] as UTSJSONObject[]

const emptyData = ref([] as UTSJSONObject[])

const scrollColumns = [
  { key: 'name', title: 'Name', width: 88 },
  { key: 'dept', title: 'Department', width: 110 },
  { key: 'role', title: 'Position', width: 100 },
  { key: 'city', title: 'City', width: 96 },
  { key: 'phone', title: 'Phone', width: 120 },
  { key: 'mail', title: 'Email', width: 160 },
] as UTSJSONObject[]

const scrollData = [
  {
    id: 's1',
    name: 'Zhang San',
    dept: 'Product Center',
    role: 'Manager',
    city: 'Shanghai',
    phone: '13800001111',
    mail: 'zhang@example.com',
  },
  {
    id: 's2',
    name: 'Li Si',
    dept: 'Design Team',
    role: 'Lead Designer',
    city: 'Beijing',
    phone: '13800002222',
    mail: 'li@example.com',
  },
] as UTSJSONObject[]

const selectedKeys = ref([] as string[])

const sortColumns = [
  { key: 'name', title: 'Name', width: 96, sortable: true },
  { key: 'score', title: 'Score', width: 96, sortable: true },
  { key: 'city', title: 'City', width: 96 },
] as UTSJSONObject[]

const sortData = [
  { id: 'p1', name: 'Zhou Qi', score: '88', city: 'Chengdu' },
  { id: 'p2', name: 'Wu Ba', score: '95', city: 'Nanjing' },
  { id: 'p3', name: 'Zheng Jiu', score: '76', city: 'Suzhou' },
] as UTSJSONObject[]

const styleData = [
  { id: 'a', name: 'Zhang San', role: 'Product', city: 'Shanghai' },
  { id: 'b', name: 'Li Si', role: 'Design', city: 'Beijing' },
  { id: 'c', name: 'Wang Wu', role: 'Developer', city: 'Hangzhou' },
  { id: 'd', name: 'Zhao Liu', role: 'QA', city: 'Shenzhen' },
] as UTSJSONObject[]

function onCellClick(rowKey: string, columnKey: string) : void {
  console.log('onCellClick')
}

function onSortChange(key: string, order: string) : void {
  console.log('onSortChange')
}

function onSelectionChange(keys: string[]) : void {
  console.log('onSelectionChange')
}
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
