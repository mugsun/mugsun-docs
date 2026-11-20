---
title: Virtual List
demo: pages/demo/display/virtual-list
---

# Virtual List

`ms-virtual-list` is a virtual list with a fixed row height. It renders only the visible window plus a few buffer rows, which suits very long lists.

It fires `scrolltolower` at the bottom; together with `loading` and `finished` this gives you paged loading.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
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
  <!-- Styles -->
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
const baseItems = ref(buildItems(200, 'Basic', 1))

const bigItems = ref(buildItems(2000, 'Large data', 1))

const smallItems = ref(buildItems(6, 'Full', 1))

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | List data |
| itemHeight | `number` | `56` | Height of each row (px) |
| visibleCount | `number` | `5` | Rows shown in the visible window; the list height is this times `itemHeight` |
| buffer | `number` | `3` | Extra rows rendered before and after the visible window |
| virtual | `boolean` | `true` | Whether to render only the visible window; with `false` every row is rendered |
| titleKey | `string` | `'title'` | Title field name |
| descKey | `string` | `'desc'` | Description field name |
| keyField | `string` | `'id'` | Field that uniquely identifies a row |
| emptyText | `string` | `'暂无数据'` | Text shown when there is no data; the default is Chinese for "No data" |
| loading | `boolean` | `false` | Whether it is loading; `scrolltolower` does not fire while `true` |
| finished | `boolean` | `false` | Whether everything is loaded; `scrolltolower` does not fire while `true` |
| loadingText | `string` | `'加载中…'` | Text shown while loading; the default is Chinese for "Loading…" |
| finishedText | `string` | `'没有更多了'` | Text shown when everything is loaded; the default is Chinese for "No more items" |
| lowerThreshold | `number` | `50` | Distance from the bottom (px) at which `scrolltolower` fires |
| showLoadMore | `boolean` | `false` | Whether to show the loading footer: `loadingText` while `loading`, `finishedText` once `finished` |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| item-click | `key: string, index: number` | Fires when a row is tapped, with its key and index. Not fired once rows are customized through the default slot |
| range-change | `start: number, end: number` | Fires when the rendered range changes, with the first and last row index |
| scrolltolower | — | Fires when scrolled to the bottom; not fired while `loading` or `finished` is `true` |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom rows; the scoped values are `data` (the rows currently rendered), `startIndex` and `endIndex` |
| bottom | Extra content at the end of the list |
| empty | Custom content when there is no data; `emptyText` by default |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `scrollToIndex(index: number)` | Scrolls to the row at the given index |
| `resetScroll()` | Scrolls back to the top |
| `getRange(): UTSJSONObject` | Returns the current rendered range as `start` and `end` |
