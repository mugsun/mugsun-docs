---
title: Swiper 轮播
demo: pages/demo/display/swiper
---

# Swiper 轮播

`ms-swiper` 是轮播，内容由 `items` 生成，每一项可以是图片，也可以是带底色的文字卡片。

当前项用 `v-model:current` 绑定，指示器有圆点、页码和左右按钮几种样式。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-swiper :items="slides" :height="150" @change="onDotsChange" />
  <ms-swiper
    :items="slides"
    :height="150"
    navigation="dots-bar"
    @change="onBarChange"
  />
  <ms-swiper
    :items="slides"
    :height="150"
    navigation="fraction"
    @change="onFractionChange"
  />
  <!-- 组件状态 -->
  <ms-swiper
    :items="slides"
    :height="150"
    autoplay
    :interval="2000"
    @change="onAutoChange"
  />
  <ms-swiper :items="slides" :height="120" navigation="none" />
  <!-- 方向 -->
  <ms-swiper
    :items="slides"
    :height="160"
    vertical
    @change="onVerticalChange"
  />
  <!-- 组件深度 -->
  <ms-swiper :items="slides" :height="120" :loop="false" navigation="fraction" />
  <ms-swiper :items="imageSlides" :height="120" navigation="dots" />
  <ms-swiper :items="slides" :height="120" :duration="200" navigation="dots" />
</template>

<script setup lang="uts">
const imageSlides = [
  { image: '/static/demo-cover.png', label: '封面一' } as UTSJSONObject,
  { image: '/static/logo.png', label: '封面二' } as UTSJSONObject,
] as UTSJSONObject[]

const slides = [
  { label: '第一屏', tone: 'brand' } as UTSJSONObject,
  { label: '第二屏', tone: 'success' } as UTSJSONObject,
  { label: '第三屏', tone: 'warning' } as UTSJSONObject,
] as UTSJSONObject[]

function onDotsChange(current: number) : void {
  console.log('onDotsChange')
}

function onBarChange(current: number) : void {
  console.log('onBarChange')
}

function onFractionChange(current: number) : void {
  console.log('onFractionChange')
}

function onAutoChange(current: number) : void {
  console.log('onAutoChange')
}

function onVerticalChange(current: number) : void {
  console.log('onVerticalChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 轮播项，每项可含 `label`、`image` 和 `tone`（brand / success / warning / muted） |
| current | `number` | `0` | 当前项的下标，可用 `v-model:current` |
| height | `number` | `160` | 高度（px） |
| autoplay | `boolean` | `false` | 是否自动播放 |
| interval | `number` | `3000` | 自动播放的间隔（ms） |
| duration | `number` | `300` | 切换动画的时长（ms） |
| loop | `boolean` | `true` | 是否循环播放 |
| vertical | `boolean` | `false` | 是否纵向滑动 |
| navigation | `string` | `'dots'` | 指示器样式：dots / dots-bar / fraction / controls / none |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `current: number` | 当前项变化时触发，`current` 是新的下标 |
| click | `index: number` | 点击轮播项时触发，`index` 是被点击项的下标 |
| update:current | `value: number` | 当前项变化时触发，用于 `v-model:current` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getCurrent(): number` | 返回当前项的下标 |
| `next()` | 切换到下一项 |
| `prev()` | 切换到上一项 |
