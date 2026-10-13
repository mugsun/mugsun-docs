---
title: Barrage
demo: pages/demo/media/barrage
---

# Barrage

`ms-barrage` — Barrage for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-barrage` (repository not yet public).
Demo route: `#/pages/demo/media/barrage`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/barrage.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-barrage :list="list" :height="120" :rows="3" :paused="paused" @complete="onComplete">
    <view>
      <text>多行轨道 · 营销滚动示例</text>
    </view>
  </ms-barrage>
  <!-- 组件深度 -->
  <ms-barrage :list="slowList" :height="96" :rows="2" :speed="40">
    <view>
      <text>双轨 · 慢速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="fastList" :height="140" :rows="4" :speed="120">
    <view>
      <text>四轨 · 快速</text>
    </view>
  </ms-barrage>
  <ms-barrage :list="singleList" :height="56" :rows="1" :speed="60">
    <view>
      <text>单轨 · 单行滚动</text>
    </view>
  </ms-barrage>
</template>

<script setup lang="uts">
const fastList = [
  '快速 A',
  '快速 B',
  '快速 C',
  '快速 D',
  '快速 E',
  '快速 F',
  '快速 G',
  '快速 H',
] as string[]

const list = ref(seed.slice(0) as string[])

const paused = ref(false)

const singleList = ['单轨弹幕 A', '单轨弹幕 B', '单轨弹幕 C'] as string[]

const slowList = ['慢速弹幕一', '慢速弹幕二', '慢速弹幕三', '慢速弹幕四'] as string[]

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
