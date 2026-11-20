---
title: Barrage
demo: pages/demo/media/barrage
---

# Barrage

`ms-barrage` is a bullet-comment layer displayed on top of the default slot content.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-barrage :list="list" :height="120" :rows="3" :paused="paused" @complete="onComplete">
    <view>
      <text>Multiple tracks · promo scroll example</text>
    </view>
  </ms-barrage>
  <!-- Advanced -->
  <ms-barrage :list="slowList" :height="96" :rows="2" :speed="40">
    <view>
      <text>2 tracks · slow</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="fastList" :height="140" :rows="4" :speed="120">
    <view>
      <text>4 tracks · fast</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="singleList" :height="56" :rows="1" :speed="60">
    <view>
      <text>1 track · single-line scroll</text>
    </view>
  </ms-barrage>
</template>

<script setup lang="uts">
const fastList = [
  'Fast A',
  'Fast B',
  'Fast C',
  'Fast D',
  'Fast E',
  'Fast F',
  'Fast G',
  'Fast H',
] as string[]

const list = ref(seed.slice(0) as string[])

const paused = ref(false)

const singleList = ['Single-track bullet A', 'Single-track bullet B', 'Single-track bullet C'] as string[]

const slowList = ['Slow bullet 1', 'Slow bullet 2', 'Slow bullet 3', 'Slow bullet 4'] as string[]

function onComplete() : void {
  console.log('onComplete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | Comment texts; assigning a new list restarts playback |
| height | `number` | `120` | Height (px) |
| speed | `number` | `80` | Scroll speed (px per second) |
| rows | `number` | `3` | Number of rows |
| paused | `boolean` | `false` | Whether barrage is paused |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| complete | — | Fires when every comment in the list has finished scrolling |

## Slots

| Slot | Description |
| --- | --- |
| default | Content under the comments, such as a video or an image |
