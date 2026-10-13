---
title: Table 表格
demo: pages/demo/display/table
---

# Table 表格

`ms-table`：移动端轻量表格：横滚、斑马纹、边框、列排序、行勾选、空态。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-table`）。
演示路由：`#/pages/demo/display/table`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/table.uvue`，可在右侧手机框中查看运行效果。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

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
