---
title: Finger 手势
demo: pages/demo/media/finger
---

# Finger 手势

`ms-finger` 是手势识别容器，识别其中内容上的手势，包括单击、双击和长按，以及滑动、捏合和旋转。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | 滑动手势触发阈值（px） |
| doubleTapInterval | `number` | `280` | 双击判定间隔（ms） |
| longPressDelay | `number` | `500` | 长按触发延迟（ms） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| start | `point: UTSJSONObject` | 手指按下时触发，`point` 含触点坐标 `x` 和 `y` |
| move | `payload: UTSJSONObject` | 单指移动时触发，`payload` 含坐标 `x`、`y` 和相对起点的位移 `dx`、`dy` |
| end | `point: UTSJSONObject` | 手指抬起时触发 |
| tap | `point: UTSJSONObject` | 单击时触发 |
| click | `point: UTSJSONObject` | 单击时触发，紧跟在 `tap` 之后 |
| doubletap | `point: UTSJSONObject` | 在 `doubleTapInterval` 内连续点击两次时触发 |
| longpress | `point: UTSJSONObject` | 按住不动超过 `longPressDelay` 时触发 |
| swipe | `payload: UTSJSONObject` | 滑动距离超过 `swipeThreshold` 后抬起时触发，`payload` 含 `direction`、`dx` 和 `dy`；`direction` 为 `up`、`down`、`left` 或 `right` |
| pinch | `payload: UTSJSONObject` | 双指捏合时触发，`payload.scale` 是相对起始距离的缩放比例 |
| rotate | `payload: UTSJSONObject` | 双指旋转时触发，`payload.angle` 是相对起始方向转过的角度 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 需要识别手势的内容 |
