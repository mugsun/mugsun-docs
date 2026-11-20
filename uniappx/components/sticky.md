---
title: Sticky 吸顶
demo: pages/demo/nav/sticky
---

# Sticky 吸顶

`ms-sticky` 让内容滚动到顶部后固定住。它不依赖 CSS 的 `position: sticky`，因为 uni-app x 只在 Web 上支持它。

使用时把它放在 `scroll-view` 里，并把滚动事件里的 `detail.scrollTop` 传给 `scrollTop`，组件据此判断是否吸顶。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-sticky :scroll-top="baseScrollTop" :anchor-top="80" @change="onBaseStuck">
    <view>
      <text>基础吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="boxScrollTop" :anchor-top="80">
    <view>
      <text>容器内吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件状态 -->
  <ms-sticky :scroll-top="disabledScrollTop" :anchor-top="80" :disabled="true">
    <view>
      <text>禁用吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 吸顶距离 -->
  <ms-sticky :scroll-top="offsetScrollTop" :anchor-top="80" :offset-top="40">
    <view>
      <text>距顶 40px 的吸顶条</text>
    </view>
  </ms-sticky>
  <!-- 组件深度 -->
  <ms-sticky
    :scroll-top="depthScrollTop"
    :anchor-top="80"
    :z-index="100"
    :height="44"
    @change="onDepthStuck"
  >
    <view>
      <text>高层吸顶条</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="stackScrollTop" :anchor-top="80" :height="40" :z-index="20">
    <view>
      <text>上层条</text>
    </view>
  </ms-sticky>
  <ms-sticky
    :scroll-top="stackScrollTop"
    :anchor-top="160"
    :offset-top="40"
    :height="40"
    :z-index="19"
  >
    <view>
      <text>下层偏 40</text>
    </view>
  </ms-sticky>
</template>

<script setup lang="uts">
const baseScrollTop = ref(0)

const boxScrollTop = ref(0)

const depthScrollTop = ref(0)

const disabledScrollTop = ref(0)

const offsetScrollTop = ref(0)

const stackScrollTop = ref(0)

function onBaseStuck(next: boolean) : void {
  console.log('onBaseStuck')
}

function onDepthStuck(next: boolean) : void {
  console.log('onDepthStuck')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 所在 `scroll-view` 的滚动距离，取 `@scroll` 事件的 `detail.scrollTop` |
| offsetTop | `number` | `0` | 吸顶后离容器顶部的距离（px）；多个吸顶叠放时填前一个的高度 |
| height | `number` | `0` | 内容高度（px），大于 0 时不再自动测量 |
| zIndex | `number` | `10` | 吸顶时的层级 |
| disabled | `boolean` | `false` | 是否禁用吸顶 |
| anchorTop | `number` | `0` | 内容在滚动区域里的初始位置（px），大于 0 时不再自动测量 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `stuck: boolean` | 吸顶状态变化时触发，`stuck` 表示是否已吸顶 |
| scroll | `payload: UTSJSONObject` | `scrollTop` 变化时触发，`payload` 含 `scrollTop` 和 `stuck` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 需要吸顶的内容，作用域参数 `stuck` 表示是否已吸顶 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `isStuck(): boolean` | 是否已吸顶 |
| `getOffsetTop(): number` | 返回 `offsetTop` 的值 |
