---
title: Scroll X
demo: pages/demo/display/scroll-x
---

# Scroll X

`ms-scroll-x` is a horizontal scroll container (`scroll-view direction="horizontal"`) with a scroll progress indicator at the bottom.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-scroll-x`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/scroll-x`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/scroll-x.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Basic usage -->
  <ms-scroll-x @scroll="onScroll">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <!-- Scroll indicator -->
  <ms-scroll-x>
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <ms-scroll-x :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <!-- Spacing -->
  <ms-scroll-x gap="sm" :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <ms-scroll-x gap="lg" inset :indicator="false">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
</template>

<script setup lang="uts">
const baseItems = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'] as string[]

function onScroll() : void {
  console.log('onScroll')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | Whether to show indicator |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap (px) |
| inset | `boolean` | `false` | Whether inset style |
| showScrollbar | `boolean` | `false` | Whether to show scrollbar |
| scrollWithAnimation | `boolean` | `false` | Whether scrolling is animated |

## Events

| Event | Description |
| --- | --- |
| scroll | Scroll |
| scrolltoupper | scrolltoupper |
| scrolltolower | Scrolled to lower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-scroll-x/`
- Demo: `#/pages/demo/display/scroll-x`
- Chinese docs: [/uniappx/components/scroll-x](/uniappx/components/scroll-x)
