---
title: Swiper 轮播
demo: pages/demo/display/swiper
---

# Swiper 轮播

`ms-swiper`：轮播：dots/fraction/controls；`v-model:current`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-swiper`（商业版，源码不公开）。
演示路由：`#/pages/demo/display/swiper`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/swiper.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / image / tone（brand / success / warning / muted） |
| current | `number` | `0` | 当前项下标 |
| height | `number` | `160` | 轮播高度（px），蒸汽禁百分比高度 |
| autoplay | `boolean` | `false` | 自动播放 |
| interval | `number` | `3000` | 自动播放间隔 ms |
| duration | `number` | `300` | 切换动画时长 ms |
| loop | `boolean` | `true` | 衔接滑动 |
| vertical | `boolean` | `false` | 纵向滑动 |
| navigation | `string` | `'dots'` | 导航器：dots / dots-bar / fraction / controls / none |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-swiper/`
- 演示: `#/pages/demo/display/swiper`
