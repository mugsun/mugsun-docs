---
title: Popover
demo: pages/demo/feedback/popover
---

# Popover

`ms-popover` is a popover. Put the trigger element in the default slot, and set the popover content with the `content` prop or the `content` slot.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-popover
    :visible="showArrow"
    content="Popover content"
    placement="top"
    @update:visible="onArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapArrow">
      With arrow
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showNoArrow"
    content="Popover content"
    placement="top"
    :show-arrow="false"
    @update:visible="onNoArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapNoArrow">
      Without arrow
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showCustom"
    placement="top"
    @update:visible="onCustomVisible"
  >
    <template #content>
      <view>
        <text>Option 1</text>
        <text>Option 2</text>
        <text>Option 3</text>
      </view>
    </template>
    <ms-button size="sm" variant="outline" theme="primary" @click="tapCustom">
      Custom content
    </ms-button>
  </ms-popover>
</template>

<script setup lang="uts">
const showArrow = ref(false)

const showCustom = ref(false)

const showNoArrow = ref(false)

function onArrowVisible(value: boolean): void {
  showArrow.value = value
}

function tapArrow() : void {
  console.log('tapArrow')
}

function onNoArrowVisible(value: boolean): void {
  showNoArrow.value = value
}

function tapNoArrow() : void {
  console.log('tapNoArrow')
}

function onCustomVisible(value: boolean): void {
  showCustom.value = value
}

function tapCustom() : void {
  console.log('tapCustom')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Text in the popover; use the `content` slot for richer content |
| placement | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | Position of the popover relative to the trigger |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | Color scheme |
| showArrow | `boolean` | `true` | Whether to show arrow |
| closeOnClickOutside | `boolean` | `true` | Whether tapping outside the popover closes it |
| zIndex | `number` | `900` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the popover opens or closes; used by `v-model:visible` |
| visible-change | `value: boolean` | Fires when the popover opens or closes |

## Slots

| Slot | Description |
| --- | --- |
| default | Trigger element; a tap shows or hides the popover |
| content | Custom popover content; `content` by default |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Shows the popover; requires `v-model:visible` |
| `close()` | Hides the popover; requires `v-model:visible` |
