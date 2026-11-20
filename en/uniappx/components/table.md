---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table` is a lightweight mobile table. It scrolls horizontally when there are many columns and supports striped rows, column sorting and row selection.

Tapping a sortable header sorts the current data inside the component. Bind the selected rows with `v-model:selectedKeys`.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | Columns; each item has `key` and `title`, plus optional `width` and `sortable` |
| data | `UTSJSONObject[]` | `[]` | Rows; each row is an object read by the column `key` |
| rowKey | `string` | `'id'` | Field that uniquely identifies a row |
| stripe | `boolean` | `false` | Whether striped |
| bordered | `boolean` | `false` | Whether to show border |
| showHeader | `boolean` | `true` | Whether to show the header |
| emptyText | `string` | `'暂无数据'` | Text shown when there is no data; the default is Chinese for "No data" |
| selectable | `boolean` | `false` | Whether to show the selection column |
| selectedKeys | `string[]` | `[]` | Keys of the selected rows. Works with `v-model:selectedKeys` |
| sortKey | `string` | `''` | Column currently sorted by; an empty string means unsorted. Works with `v-model:sortKey` |
| sortOrder | `string` | `'none'` | Sort order: none / asc / desc. Works with `v-model:sortOrder` |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| cell-click | `rowKey: string, columnKey: string` | Fires when a cell is tapped, with the row key and the column key |
| sort-change | `key: string, order: string` | Fires when a sortable header is tapped; the order cycles through ascending, descending and none |
| selection-change | `keys: string[]` | Fires when the selection changes; `keys` holds the keys of all selected rows |
| update:selectedKeys | `keys: string[]` | Fires when the selection changes; used by `v-model:selectedKeys` |
| update:sortKey | `key: string` | Fires when the sort column changes; used by `v-model:sortKey` |
| update:sortOrder | `order: string` | Fires when the sort order changes; used by `v-model:sortOrder` |

## Slots

| Slot | Description |
| --- | --- |
| empty | Custom content when there is no data; `emptyText` by default |
