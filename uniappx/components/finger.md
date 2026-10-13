---
title: Finger 手势
demo: pages/demo/media/finger
---

# Finger 手势

`ms-finger`：手势识别容器：单击 / 双击 / 长按 / 滑动 / 捏合 / 旋转。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-finger`（商业版，源码不公开）。
演示路由：`#/pages/demo/media/finger`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/finger.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | 滑动手势触发阈值（px） |
| doubleTapInterval | `number` | `280` | 双击判定间隔（ms） |
| longPressDelay | `number` | `500` | 长按触发延迟（ms） |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| start | 开始 |
| move | move |
| end | end |
| tap | tap |
| click | 点击 |
| doubletap | doubletap |
| longpress | longpress |
| swipe | swipe |
| pinch | pinch |
| rotate | rotate |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-finger/`
- 演示: `#/pages/demo/media/finger`
