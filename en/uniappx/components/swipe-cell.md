---
title: Swipe Cell
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell

`ms-swipe-cell` is a cell that swipes sideways. Swipe left to reveal the action panel on the right, and swipe right to reveal the panel on the left.

Content of the right panel goes in the `actions` slot and its state binds with `v-model:opened`; the left panel uses the `left` slot and `v-model:openedLeft`.

The component does not collapse other open cells for you; do that in the `open` event if you need it.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Whether the right panel is open. Works with `v-model:opened` |
| openedLeft | `boolean` | `false` | Whether the left panel is open. Works with `v-model:openedLeft` |
| disabled | `boolean` | `false` | Whether to disable swiping |
| threshold | `number` | `20` | Swipe distance (px) past which the panel opens on release |
| bordered | `boolean` | `true` | Whether to show the bottom divider |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:opened | `value: boolean` | Fires when the right panel opens or closes; used by `v-model:opened` |
| update:openedLeft | `value: boolean` | Fires when the left panel opens or closes; used by `v-model:openedLeft` |
| open | `side: string` | Fires when a panel opens; `side` is `left` or `right` |
| close | — | Fires when the panel closes |
| click | `area: string` | Fires when the content is tapped while the panels are closed, with `area` set to `content`. Tapping the content while a panel is open only closes it |
| dragstart | — | Fires when a finger touches down and swiping starts |
| dragend | — | Fires when swiping ends |

## Slots

| Slot | Description |
| --- | --- |
| default | Cell content |
| actions | Action panel on the right |
| left | Panel on the left |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the right panel |
| `openLeft()` | Opens the left panel |
| `close()` | Closes the panel |
| `toggle()` | Closes the open panel, or opens the right panel when none is open |
| `isOpened(): boolean` | Whether a panel is open |
