---
title: Finger
demo: pages/demo/media/finger
---

# Finger

`ms-finger` is a gesture container. It recognizes gestures on its content: tap, double tap and long press, as well as swipe, pinch and rotate.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | Swipe gesture threshold (px) |
| doubleTapInterval | `number` | `280` | Double-tap interval (ms) |
| longPressDelay | `number` | `500` | Long-press trigger delay (ms) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| start | `point: UTSJSONObject` | Fires on touch start; `point` has the touch coordinates `x` and `y` |
| move | `payload: UTSJSONObject` | Fires while one finger moves; `payload` has `x`, `y` and the offsets `dx` and `dy` from the start point |
| end | `point: UTSJSONObject` | Fires on touch end |
| tap | `point: UTSJSONObject` | Fires on a single tap |
| click | `point: UTSJSONObject` | Fires on a single tap, right after `tap` |
| doubletap | `point: UTSJSONObject` | Fires when two taps land within `doubleTapInterval` |
| longpress | `point: UTSJSONObject` | Fires when the finger stays still longer than `longPressDelay` |
| swipe | `payload: UTSJSONObject` | Fires on release after moving farther than `swipeThreshold`; `payload` has `direction`, `dx` and `dy`, where `direction` is `up`, `down`, `left` or `right` |
| pinch | `payload: UTSJSONObject` | Fires during a two-finger pinch; `payload.scale` is the scale relative to the starting distance |
| rotate | `payload: UTSJSONObject` | Fires during a two-finger rotation; `payload.angle` is the angle turned from the starting direction |

## Slots

| Slot | Description |
| --- | --- |
| default | Content to recognize gestures on |
