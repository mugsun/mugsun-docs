---
title: Drag
demo: pages/demo/media/drag
---

# Drag

`ms-drag` is a drag-to-sort container for [`ms-drag-item`](./drag-item) children. Long-press an item and drag it to reorder; it works for lists and grids.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-drag :list="list1" @change="onChange1" @start="onStart">
    <ms-drag-item v-for="(item, index) in list1" :key="itemLabel(item)" :order="index">
      <view>
        <text>Long-press {{ itemLabel(item) }} to reorder</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <ms-drag :list="listFixed" @change="onChangeFixed">
    <ms-drag-item
      v-for="(item, index) in listFixed"
      :key="'f-' + itemLabel(item)"
      :order="index"
      :disabled="index == 1"
    >
      <view>
        <text>{{ index == 1 ? 'Pinned at position 2' : 'Long-press ' + itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <!-- Styles -->
  <ms-drag :col="2" :list="list2">
    <ms-drag-item v-for="(item, index) in list2" :key="'g2-' + itemLabel(item)" :order="index">
      <view>
        <text>{{ itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
  <ms-drag :col="4" :list="list4">
    <ms-drag-item v-for="(item, index) in list4" :key="'g4-' + itemLabel(item)" :order="index">
      <view>
        <text>{{ itemLabel(item) }}</text>
      </view>
    </ms-drag-item>
  </ms-drag>
</template>

<script setup lang="uts">
function itemLabel(item: UTSJSONObject): string {
  const id = item.getNumber('id')
  return id == null ? '?' : id.toString()
}

const list1 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
] as UTSJSONObject[])

const list2 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
  { id: 5 } as UTSJSONObject,
  { id: 6 } as UTSJSONObject,
] as UTSJSONObject[])

const list4 = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
  { id: 5 } as UTSJSONObject,
  { id: 6 } as UTSJSONObject,
  { id: 7 } as UTSJSONObject,
  { id: 8 } as UTSJSONObject,
] as UTSJSONObject[])

const listFixed = ref([
  { id: 1 } as UTSJSONObject,
  { id: 2 } as UTSJSONObject,
  { id: 3 } as UTSJSONObject,
  { id: 4 } as UTSJSONObject,
] as UTSJSONObject[])

function onChange1(next: UTSJSONObject[]) : void {
  console.log('onChange1')
}

function onStart() : void {
  console.log('onStart')
}

function onChangeFixed(next: UTSJSONObject[]) : void {
  console.log('onChangeFixed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list; the reordered list is returned through `change` |
| col | `number` | `1` | Number of columns: `1` for a list, more for a grid |
| scrollDiff | `number` | `25` | Distance (px) requested through `move` each time the drag reaches the screen edge |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `list: UTSJSONObject[]` | Fires on release; `list` is the reordered list |
| start | — | Fires when a drag starts |
| end | — | Fires when a drag ends |
| move | `delta: number` | Fires when the drag reaches the top or bottom edge of the screen; `delta` is the suggested scroll distance in px, negative for upward |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-drag-item` children here |
