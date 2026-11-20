---
title: Scroll X Item 横向滚动项
demo: pages/demo/display/scroll-x
---

# Scroll X Item 横向滚动项

`ms-scroll-x-item` 是 [`ms-scroll-x`](./scroll-x) 的子项，宽度由内容决定，间距跟随 `ms-scroll-x` 的 `gap`。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

这个组件没有属性。

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 子项内容 |
