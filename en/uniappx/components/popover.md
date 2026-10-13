---
title: Popover
demo: pages/demo/feedback/popover
---

# Popover

`ms-popover` — Popover for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-popover`).
Demo route: `#/pages/demo/feedback/popover`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/popover.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-popover
    :visible="showArrow"
    content="弹出气泡内容"
    placement="top"
    @update:visible="onArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapArrow">
      带箭头
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showNoArrow"
    content="弹出气泡内容"
    placement="top"
    :show-arrow="false"
    @update:visible="onNoArrowVisible"
  >
    <ms-button size="sm" variant="outline" theme="primary" @click="tapNoArrow">
      不带箭头
    </ms-button>
  </ms-popover>
  <ms-popover
    :visible="showCustom"
    placement="top"
    @update:visible="onCustomVisible"
  >
    <template #content>
      <view>
        <text>选项 1</text>
        <text>选项 2</text>
        <text>选项 3</text>
      </view>
    </template>
    <ms-button size="sm" variant="outline" theme="primary" @click="tapCustom">
      自定义内容
    </ms-button>
  </ms-popover>
</template>

<script setup lang="uts">
const showArrow = ref(false)
const showNoArrow = ref(false)
const showCustom = ref(false)
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
