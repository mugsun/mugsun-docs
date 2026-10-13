---
title: Scroll X Item
demo: pages/demo/display/scroll-x
---

# Scroll X Item

`ms-scroll-x-item` — Scroll-X Item for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-scroll-x-item` (repository not yet public).
Demo route: `#/pages/demo/display/scroll-x`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/scroll-x.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 基础用法 -->
  <ms-scroll-x @scroll="onScroll">
    <ms-scroll-x-item v-for="item in baseItems" :key="item">
      <view>
        <text>{{ item }}</text>
      </view>
    </ms-scroll-x-item>
  </ms-scroll-x>
  <!-- 滚动指示 -->
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
  <!-- 间距布局 -->
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
const baseItems = ['卡片一', '卡片二', '卡片三', '卡片四', '卡片五', '卡片六'] as string[]

function onScroll() : void {
  console.log('onScroll')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

No public props (slot/event driven).

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-scroll-x-item/`
- Demo: `#/pages/demo/display/scroll-x`
- Chinese docs: [/uniappx/components/scroll-x-item](/uniappx/components/scroll-x-item)
