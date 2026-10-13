---
title: Swipe Cell
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell

`ms-swipe-cell` — Swipe Cell for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-swipe-cell` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/swipe-cell`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/swipe-cell.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-swipe-cell :bordered="false" v-model:opened="singleOpened" @open="onOpen" @close="onClose">
    <template #actions>
      <view @click="onAction('Delete')">
        <text>Delete</text>
      </view>
    </template>
    <view>
      <text>Single row · swipe left to delete</text>
    </view>
  </ms-swipe-cell>
  <ms-swipe-cell :bordered="false">
    <template #actions>
      <view @click="onAction('Favorite')">
        <text>Favorite</text>
      </view>
      <view @click="onAction('Delete')">
        <text>Delete</text>
      </view>
    </template>
    <view>
      <text>Row with two actions</text>
      <text>Extra info</text>
    </view>
  </ms-swipe-cell>
  <!-- States -->
  <ms-swipe-cell :bordered="false" :disabled="true">
    <template #actions>
      <view>
        <text>Delete</text>
      </view>
    </template>
    <view>
      <text>Row with swipe disabled</text>
    </view>
  </ms-swipe-cell>
  <!-- Content sizes -->
  <ms-swipe-cell v-for="row in rows" :key="row" :bordered="row < rows.length">
    <template #actions>
      <view @click="onAction('Delete')">
        <text>Delete</text>
      </view>
    </template>
    <view>
      <text>Large list item {{ row }}</text>
    </view>
  </ms-swipe-cell>
</template>

<script setup lang="uts">
const rows = [1, 2, 3]

const singleOpened = ref(false)

function onOpen() : void {
  console.log('onOpen')
}

function onClose() : void {
  console.log('onClose')
}

function onAction(text: string) : void {
  console.log('onAction')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Controlled: whether the right panel is open |
| openedLeft | `boolean` | `false` | Controlled: whether the left panel is open |
| disabled | `boolean` | `false` | Disable gestures |
| threshold | `number` | `20` | Distance threshold before snapping into place |
| bordered | `boolean` | `true` | Bottom divider |

## Events

| Event | Description |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | Opened |
| close | Closed |
| click | Click |
| dragstart | dragstart |
| dragend | dragend |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| actions | `actions` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-swipe-cell/`
- Demo: `#/pages/demo/feedback/swipe-cell`
- Chinese docs: [/uniappx/components/swipe-cell](/uniappx/components/swipe-cell)
