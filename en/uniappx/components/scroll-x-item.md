---
title: Scroll X Item
demo: pages/demo/display/scroll-x
---

# Scroll X Item

`ms-scroll-x-item` is an item of [`ms-scroll-x`](./scroll-x). Its width follows its content, and the spacing follows the `gap` of `ms-scroll-x`.

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

This component has no props.

## Slots

| Slot | Description |
| --- | --- |
| default | Item content |
