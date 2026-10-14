---
title: Barrage
demo: pages/demo/media/barrage
---

# Barrage

`ms-barrage` is a bullet-comment layer displayed on top of the default slot content.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-barrage`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/media/barrage`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/barrage.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `string[]` | `[]` | Data list |
| height | `number` | `120` | Height (px) |
| speed | `number` | `80` | Speed |
| rows | `number` | `3` | Row count |
| paused | `boolean` | `false` | Whether barrage is paused |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-barrage/`
- Demo: `#/pages/demo/media/barrage`
- Chinese docs: [/uniappx/components/barrage](/uniappx/components/barrage)
