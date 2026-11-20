---
title: Sticky
demo: pages/demo/nav/sticky
---

# Sticky

`ms-sticky` pins its content once it scrolls to the top. It does not rely on CSS `position: sticky`, which uni-app x supports only on Web.

Use it inside a `scroll-view` and pass `detail.scrollTop` from the scroll event to `scrollTop`; the component decides from that value whether to stick.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-sticky :scroll-top="baseScrollTop" :anchor-top="80" @change="onBaseStuck">
    <view>
      <text>Basic sticky bar</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="boxScrollTop" :anchor-top="80">
    <view>
      <text>Sticky bar in container</text>
    </view>
  </ms-sticky>
  <!-- States -->
  <ms-sticky :scroll-top="disabledScrollTop" :anchor-top="80" :disabled="true">
    <view>
      <text>Disabled sticky bar</text>
    </view>
  </ms-sticky>
  <!-- Offset top -->
  <ms-sticky :scroll-top="offsetScrollTop" :anchor-top="80" :offset-top="40">
    <view>
      <text>Sticky bar 40px from top</text>
    </view>
  </ms-sticky>
  <!-- Advanced -->
  <ms-sticky
    :scroll-top="depthScrollTop"
    :anchor-top="80"
    :z-index="100"
    :height="44"
    @change="onDepthStuck"
  >
    <view>
      <text>Higher z-index sticky bar</text>
    </view>
  </ms-sticky>
  <ms-sticky :scroll-top="stackScrollTop" :anchor-top="80" :height="40" :z-index="20">
    <view>
      <text>Upper bar</text>
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
      <text>Lower bar, offset 40</text>
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | Scroll offset of the surrounding `scroll-view`, taken from `detail.scrollTop` of its `@scroll` event |
| offsetTop | `number` | `0` | Distance from the container top once stuck (px); when stacking several, use the height of the previous one |
| height | `number` | `0` | Content height (px); when above 0 it is not measured |
| zIndex | `number` | `10` | z-index while stuck |
| disabled | `boolean` | `false` | Whether to disable sticking |
| anchorTop | `number` | `0` | Initial position of the content inside the scroll area (px); when above 0 it is not measured |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `stuck: boolean` | Fires when the stuck state changes; `stuck` tells whether it is stuck |
| scroll | `payload: UTSJSONObject` | Fires when `scrollTop` changes; `payload` has `scrollTop` and `stuck` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content to pin; the scoped value `stuck` tells whether it is stuck |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `isStuck(): boolean` | Whether it is stuck |
| `getOffsetTop(): number` | Returns the value of `offsetTop` |
