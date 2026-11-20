---
title: Drag Item
demo: pages/demo/media/drag
---

# Drag Item

`ms-drag-item` is a sortable child of [`ms-drag`](./drag).

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
| order | `number` | `0` | Sort order; keep it equal to the item's index in the list |
| disabled | `boolean` | `false` | Whether the item stays in place and cannot be dragged |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| click | — | Fires when the item is tapped; not fired while disabled |

## Slots

| Slot | Description |
| --- | --- |
| default | Item content |
