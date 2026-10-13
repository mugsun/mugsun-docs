---
title: Finger
demo: pages/demo/media/finger
---

# Finger

`ms-finger` — Finger for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-finger` (repository not yet public).
Demo route: `#/pages/demo/media/finger`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/finger.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-finger @tap="onTap" @doubletap="onDouble" @longpress="onLong">
    <view>
      <text>点按 / 双击 / 长按此区域</text>
      <text>{{ basicLog }}</text>
    </view>
  </ms-finger>
  <ms-finger @swipe="onSwipe">
    <view>
      <text>上下左右滑动</text>
      <text>{{ swipeLog }}</text>
    </view>
  </ms-finger>
  <!-- 组件样式 -->
  <ms-finger @pinch="onPinch" @rotate="onRotate">
    <view>
      <text>双指捏合 / 旋转</text>
      <text>{{ pinchLog }}</text>
    </view>
  </ms-finger>
  <!-- 组件深度 -->
  <ms-finger :swipe-threshold="80" @swipe="onSwipeStrict">
    <view>
      <text>需滑动更远才触发</text>
      <text>{{ strictLog }}</text>
    </view>
  </ms-finger>
  <ms-finger disabled @tap="onDisabledTap">
    <view>
      <text>已禁用 · 点击无效</text>
    </view>
  </ms-finger>
  <ms-finger
    :double-tap-interval="450"
    :long-press-delay="800"
    @tap="onTimedTap"
    @doubletap="onTimedDouble"
    @longpress="onTimedLong"
  >
    <view>
      <text>双击窗 450ms · 长按 800ms</text>
      <text>{{ timedLog }}</text>
    </view>
  </ms-finger>
</template>

<script setup lang="uts">
function onTap(_e: UTSJSONObject) : void {
  console.log('onTap')
}

function onDouble(_e: UTSJSONObject) : void {
  console.log('onDouble')
}

function onLong(_e: UTSJSONObject) : void {
  console.log('onLong')
}

function onSwipe(e: UTSJSONObject) : void {
  console.log('onSwipe')
}

function onPinch(e: UTSJSONObject) : void {
  console.log('onPinch')
}

function onRotate(e: UTSJSONObject) : void {
  console.log('onRotate')
}

function onSwipeStrict(e: UTSJSONObject) : void {
  console.log('onSwipeStrict')
}

function onDisabledTap(_e: UTSJSONObject) : void {
  console.log('onDisabledTap')
}

function onTimedTap(_e: UTSJSONObject) : void {
  console.log('onTimedTap')
}

function onTimedDouble(_e: UTSJSONObject) : void {
  console.log('onTimedDouble')
}

function onTimedLong(_e: UTSJSONObject) : void {
  console.log('onTimedLong')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | Swipe gesture threshold (px) |
| doubleTapInterval | `number` | `280` | Double-tap interval (ms) |
| longPressDelay | `number` | `500` | Long-press trigger delay (ms) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| move | move |
| end | end |
| tap | tap |
| click | Click |
| doubletap | doubletap |
| longpress | longpress |
| swipe | swipe |
| pinch | pinch |
| rotate | rotate |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-finger/`
- Demo: `#/pages/demo/media/finger`
- Chinese docs: [/uniappx/components/finger](/uniappx/components/finger)
