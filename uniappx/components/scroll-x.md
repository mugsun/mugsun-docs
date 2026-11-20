---
title: Scroll X 横向滚动
demo: pages/demo/display/scroll-x
---

# Scroll X 横向滚动

`ms-scroll-x` 是横向滚动容器，底部带滚动进度条，里面的每一项用 [`ms-scroll-x-item`](./scroll-x-item) 包裹。

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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | 是否显示底部的滚动进度条 |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | 子项间距：sm / md / lg |
| inset | `boolean` | `false` | 首尾是否留出边距 |
| showScrollbar | `boolean` | `false` | 是否显示原生滚动条 |
| scrollWithAnimation | `boolean` | `false` | 调用 `scrollTo` 时是否带动画 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| scroll | `e: UniScrollEvent` | 滚动时触发 |
| scrolltoupper | `e: UniScrollToUpperEvent` | 滚动到最左侧时触发 |
| scrolltolower | `e: UniScrollToLowerEvent` | 滚动到最右侧时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 放置 `ms-scroll-x-item`，组件内部已经横向排列 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `scrollTo(left: number)` | 滚动到指定的横向位置（px） |
| `getScrollLeft(): number` | 返回当前的横向滚动位置（px） |
