---
title: Table 表格
demo: pages/demo/display/table
---

# Table 表格

`ms-table` 是面向移动端的轻量表格，列多时可以横向滚动，支持斑马纹、列排序和行勾选。

点击可排序的表头，组件会对当前数据排序。勾选的行用 `v-model:selectedKeys` 绑定。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | 列配置，每项含 `key` 和 `title`，可选 `width` 和 `sortable` |
| data | `UTSJSONObject[]` | `[]` | 数据，每行是一个对象，按列的 `key` 取值 |
| rowKey | `string` | `'id'` | 行的唯一标识字段名 |
| stripe | `boolean` | `false` | 是否斑马纹 |
| bordered | `boolean` | `false` | 是否显示边框 |
| showHeader | `boolean` | `true` | 是否显示表头 |
| emptyText | `string` | `'暂无数据'` | 没有数据时的提示文字 |
| selectable | `boolean` | `false` | 是否显示勾选列 |
| selectedKeys | `string[]` | `[]` | 勾选行的 key 列表，可用 `v-model:selectedKeys` |
| sortKey | `string` | `''` | 当前排序的列，空字符串表示不排序，可用 `v-model:sortKey` |
| sortOrder | `string` | `'none'` | 排序方向：none / asc / desc，可用 `v-model:sortOrder` |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| cell-click | `rowKey: string, columnKey: string` | 点击单元格时触发，参数是行的 key 和列的 key |
| sort-change | `key: string, order: string` | 点击可排序的表头时触发，排序方向依次为升序、降序和不排序 |
| selection-change | `keys: string[]` | 勾选变化时触发，`keys` 是全部勾选行的 key |
| update:selectedKeys | `keys: string[]` | 勾选变化时触发，用于 `v-model:selectedKeys` |
| update:sortKey | `key: string` | 排序列变化时触发，用于 `v-model:sortKey` |
| update:sortOrder | `order: string` | 排序方向变化时触发，用于 `v-model:sortOrder` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| empty | 自定义没有数据时的内容，默认显示 `emptyText` |
