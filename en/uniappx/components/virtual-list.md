---
title: Virtual List
demo: pages/demo/display/virtual-list
---

# Virtual List

`ms-virtual-list` is a fixed-row-height virtual list that renders only the visible window plus buffer rows before and after it. It can show a loading bar when scrolled to the bottom, and provides an empty-state slot and a scoped slot for the visible window.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-virtual-list`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/virtual-list`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/virtual-list.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Entries |
| itemHeight | `number` | `56` | Item height (px) |
| visibleCount | `number` | `5` | Approximate visible item count |
| buffer | `number` | `3` | Overscan item count outside the viewport |
| virtual | `boolean` | `true` | Whether virtual list is enabled |
| titleKey | `string` | `'title'` | Title field name |
| descKey | `string` | `'desc'` | Description field name |
| keyField | `string` | `'id'` | Primary key field name |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| loading | `boolean` | `false` | Loading more; when true shows footer and suppresses repeat scrolltolower |
| finished | `boolean` | `false` | No more data; footer shows finishedText |
| loadingText | `string` | `'加载中…'` | Loading text |
| finishedText | `string` | `'没有更多了'` | “No more” text |
| lowerThreshold | `number` | `50` | Distance from bottom (px) to fire scrolltolower |
| showLoadMore | `boolean` | `false` | Whether to render the bottom status bar |

## Events

| Event | Description |
| --- | --- |
| item-click | Item click |
| range-change | range-change |
| scrolltolower | Scrolled to lower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| bottom | `bottom` slot |
| empty | `empty` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-virtual-list/`
- Demo: `#/pages/demo/display/virtual-list`
- Chinese docs: [/uniappx/components/virtual-list](/uniappx/components/virtual-list)
