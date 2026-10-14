---
title: Table 表格
demo: pages/demo/display/table
---

# Table 表格

`ms-table` 是面向移动端的轻量表格，支持横向滚动、斑马纹、边框、列排序、行勾选和空状态。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-table`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/table`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/table.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| columns | `UTSJSONObject[]` | `[]` | 列配置 |
| data | `UTSJSONObject[]` | `[]` | 数据源 |
| rowKey | `string` | `'id'` | 行主键字段名 |
| stripe | `boolean` | `false` | 是否斑马纹 |
| bordered | `boolean` | `false` | 是否显示边框 |
| showHeader | `boolean` | `true` | 是否显示头部 |
| emptyText | `string` | `'暂无数据'` | 空态文案 |
| selectable | `boolean` | `false` | 开启行勾选列 |
| selectedKeys | `string[]` | `[]` | 受控选中行 key 列表 |
| sortKey | `string` | `''` | 受控排序列；空串表示无排序 |
| sortOrder | `string` | `'none'` | none \| asc \| desc |

## 事件

| 事件 | 说明 |
| --- | --- |
| cell-click | cell-click |
| sort-change | sort-change |
| selection-change | selection-change |
| update:selectedKeys | update:selectedKeys |
| update:sortKey | update:sortKey |
| update:sortOrder | update:sortOrder |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| empty | `empty` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-table/`
- 演示: `#/pages/demo/display/table`
