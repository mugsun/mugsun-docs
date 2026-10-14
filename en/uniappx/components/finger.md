---
title: Finger
demo: pages/demo/media/finger
---

# Finger

`ms-finger` is a gesture container that recognizes tap, double tap, long press, swipe, pinch and rotate.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-finger`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/media/finger`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/finger.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-finger @tap="onTap" @doubletap="onDouble" @longpress="onLong">
    <view>
      <text>Tap / double-tap / long-press here</text>
      <text>{{ basicLog }}</text>
    </view>
  </ms-finger>
  <ms-finger @swipe="onSwipe">
    <view>
      <text>Swipe in any direction</text>
      <text>{{ swipeLog }}</text>
    </view>
  </ms-finger>
  <!-- Styles -->
  <ms-finger @pinch="onPinch" @rotate="onRotate">
    <view>
      <text>Pinch / rotate with two fingers</text>
      <text>{{ pinchLog }}</text>
    </view>
  </ms-finger>
  <!-- Advanced -->
  <ms-finger :swipe-threshold="80" @swipe="onSwipeStrict">
    <view>
      <text>Requires a longer swipe</text>
      <text>{{ strictLog }}</text>
    </view>
  </ms-finger>
  <ms-finger disabled @tap="onDisabledTap">
    <view>
      <text>Disabled · taps ignored</text>
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
      <text>Double-tap window 450ms · long-press 800ms</text>
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
