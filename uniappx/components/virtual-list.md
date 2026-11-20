---
title: Virtual List 虚拟列表
demo: pages/demo/display/virtual-list
---

# Virtual List 虚拟列表

`ms-virtual-list` 是固定行高的虚拟列表，只渲染可视区域和前后几行缓冲，适合很长的列表。

滚动到底部时触发 `scrolltolower`，配合 `loading` 和 `finished` 可以做分页加载。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-virtual-list
    :items="baseItems"
    :item-height="56"
    :visible-count="4"
    @item-click="onItemClick"
    @range-change="onRangeChange"
  />
  <ms-virtual-list
    :items="smallItems"
    :item-height="56"
    :visible-count="3"
    :virtual="false"
    @item-click="onItemClick"
  />
  <!-- 组件样式 -->
  <ms-virtual-list
    ref="bigList"
    :items="bigItems"
    :item-height="56"
    :visible-count="4"
    :buffer="4"
    @item-click="onItemClick"
    @range-change="onRangeChange"
  />
</template>

<script setup lang="uts">
const baseItems = ref(buildItems(200, '基础', 1))

const bigItems = ref(buildItems(2000, '大数据', 1))

const smallItems = ref(buildItems(6, '全量', 1))

function onItemClick(key: string, index: number) : void {
  console.log('onItemClick')
}

function onRangeChange(start: number, end: number) : void {
  console.log('onRangeChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 列表数据 |
| itemHeight | `number` | `56` | 每行的高度（px） |
| visibleCount | `number` | `5` | 可视区域显示的行数，列表的高度等于它乘以 `itemHeight` |
| buffer | `number` | `3` | 可视区域前后各多渲染的行数 |
| virtual | `boolean` | `true` | 是否只渲染可视区域，`false` 时渲染全部行 |
| titleKey | `string` | `'title'` | 标题字段名 |
| descKey | `string` | `'desc'` | 描述字段名 |
| keyField | `string` | `'id'` | 行的唯一标识字段名 |
| emptyText | `string` | `'暂无数据'` | 没有数据时的提示文字 |
| loading | `boolean` | `false` | 是否正在加载，为 `true` 时不触发 `scrolltolower` |
| finished | `boolean` | `false` | 是否已经全部加载，为 `true` 时不触发 `scrolltolower` |
| loadingText | `string` | `'加载中…'` | 加载时的文字 |
| finishedText | `string` | `'没有更多了'` | 全部加载后的文字 |
| lowerThreshold | `number` | `50` | 距离底部多少 px 时触发 `scrolltolower` |
| showLoadMore | `boolean` | `false` | 是否在底部显示加载状态，`loading` 时显示 `loadingText`，`finished` 时显示 `finishedText` |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| item-click | `key: string, index: number` | 点击某一行时触发，参数是该行的 key 和下标；用默认插槽自定义行以后不再触发 |
| range-change | `start: number, end: number` | 渲染范围变化时触发，参数是首行和末行的下标 |
| scrolltolower | — | 滚动到底部时触发；`loading` 或 `finished` 为 `true` 时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义行的内容，作用域参数是 `data`（当前渲染的数据）以及 `startIndex` 和 `endIndex` |
| bottom | 列表末尾的附加内容 |
| empty | 自定义没有数据时的内容，默认显示 `emptyText` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `scrollToIndex(index: number)` | 滚动到指定下标的行 |
| `resetScroll()` | 滚动回顶部 |
| `getRange(): UTSJSONObject` | 返回当前的渲染范围，含 `start` 和 `end` |
