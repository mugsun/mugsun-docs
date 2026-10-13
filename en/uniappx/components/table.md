---
title: Table
demo: pages/demo/display/table
---

# Table

`ms-table` — Table for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-table` (commercial edition; source not public).
Demo route: `#/pages/demo/display/table`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/table.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
const baseColumns = [
  { key: 'name', title: '姓名', width: 96 },
  { key: 'role', title: '角色', width: 120 },
  { key: 'city', title: '城市', width: 96 },
] as UTSJSONObject[]

const baseData = [
  { id: '1', name: '张三', role: '产品', city: '上海' },
  { id: '2', name: '李四', role: '设计', city: '北京' },
  { id: '3', name: '王五', role: '开发', city: '杭州' },
] as UTSJSONObject[]

const emptyData = ref([] as UTSJSONObject[])

const scrollColumns = [
  { key: 'name', title: '姓名', width: 88 },
  { key: 'dept', title: '部门', width: 110 },
  { key: 'role', title: '岗位', width: 100 },
  { key: 'city', title: '城市', width: 96 },
  { key: 'phone', title: '手机', width: 120 },
  { key: 'mail', title: '邮箱', width: 160 },
] as UTSJSONObject[]

const scrollData = [
  {
    id: 's1',
    name: '张三',
    dept: '产品中心',
    role: '经理',
    city: '上海',
    phone: '13800001111',
    mail: 'zhang@example.com',
  },
  {
    id: 's2',
    name: '李四',
    dept: '设计组',
    role: '主设',
    city: '北京',
    phone: '13800002222',
    mail: 'li@example.com',
  },
] as UTSJSONObject[]

const selectedKeys = ref([] as string[])

const sortColumns = [
  { key: 'name', title: '姓名', width: 96, sortable: true },
  { key: 'score', title: '分数', width: 96, sortable: true },
  { key: 'city', title: '城市', width: 96 },
] as UTSJSONObject[]

const sortData = [
  { id: 'p1', name: '周七', score: '88', city: '成都' },
  { id: 'p2', name: '吴八', score: '95', city: '南京' },
  { id: 'p3', name: '郑九', score: '76', city: '苏州' },
] as UTSJSONObject[]

const styleData = [
  { id: 'a', name: '张三', role: '产品', city: '上海' },
  { id: 'b', name: '李四', role: '设计', city: '北京' },
  { id: 'c', name: '王五', role: '开发', city: '杭州' },
  { id: 'd', name: '赵六', role: '测试', city: '深圳' },
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
