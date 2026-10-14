---
title: Popover
demo: pages/demo/feedback/popover
---

# Popover

`ms-popover` is a popover. Put the trigger element in the default slot, and set the popover content with the `content` prop or the `content` slot.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-popover`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/popover`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/popover.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Plain text; use content slot for rich content |
| placement | `\| 'top'` | `'top'` | Popup / placement |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | Theme color |
| showArrow | `boolean` | `true` | Whether to show arrow |
| closeOnClickOutside | `boolean` | `true` | Whether clicking outside (transparent overlay) closes |
| zIndex | `number` | `900` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| visible-change | visible-change |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| content | `content` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-popover/`
- Demo: `#/pages/demo/feedback/popover`
- Chinese docs: [/uniappx/components/popover](/uniappx/components/popover)
