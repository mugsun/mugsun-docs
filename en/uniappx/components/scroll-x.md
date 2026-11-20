---
title: Scroll X
demo: pages/demo/display/scroll-x
---

# Scroll X

`ms-scroll-x` is a horizontal scroll container with a progress bar at the bottom. Wrap each item in [`ms-scroll-x-item`](./scroll-x-item).

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | Whether to show the progress bar at the bottom |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap between items: sm / md / lg |
| inset | `boolean` | `false` | Whether to leave a margin before the first item and after the last |
| showScrollbar | `boolean` | `false` | Whether to show the native scrollbar |
| scrollWithAnimation | `boolean` | `false` | Whether `scrollTo` scrolls with animation |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| scroll | `e: UniScrollEvent` | Fires while scrolling |
| scrolltoupper | `e: UniScrollToUpperEvent` | Fires when scrolled to the far left |
| scrolltolower | `e: UniScrollToLowerEvent` | Fires when scrolled to the far right |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-scroll-x-item` children here; they are already laid out in a row |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `scrollTo(left: number)` | Scrolls to the given horizontal position (px) |
| `getScrollLeft(): number` | Returns the current horizontal scroll position (px) |
