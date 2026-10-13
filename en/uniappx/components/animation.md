---
title: Animation
demo: pages/demo/feedback/animation
---

# Animation

`ms-animation` — Animation for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-animation` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/animation`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/animation.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-animation :name="animName" v-model:playing="playing" :duration="400">
    <view>
      <text>{{ effectLabel }}</text>
    </view>
  </ms-animation>
  <!-- 组件样式 -->
  <ms-animation name="fade-in" :auto-play="true" :duration="500">
    <view>
      <text>挂载自动淡入</text>
    </view>
  </ms-animation>
  <ms-animation name="left-in" :auto-play="true" :duration="500" :delay="80">
    <view>
      <text>条目一</text>
      <text>条目二</text>
      <text>条目三</text>
    </view>
  </ms-animation>
  <!-- 组件深度 -->
  <ms-animation name="up-in" :auto-play="true" :duration="450">
    <view>
      <text>上滑示例</text>
    </view>
  </ms-animation>
  <ms-animation name="fade-out" v-model:playing="outPlaying" :duration="600" :delay="200">
    <view>
      <text>延迟淡出示例</text>
    </view>
  </ms-animation>
  <ms-animation name="down-in" :auto-play="true" :duration="420">
    <view>
      <text>下滑示例</text>
    </view>
  </ms-animation>
</template>

<script setup lang="uts">
type AnimName =

const animName = ref('fade-in' as AnimName)

const outPlaying = ref(false)

const playing = ref(false)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `\| 'fade-in'` | `'fade-in'` | Name / field name |
| duration | `number` | `300` | Duration (ms) |
| delay | `number` | `0` | Delay (ms) |
| autoPlay | `boolean` | `false` | Whether to autoplay |
| playing | `boolean` | `false` | Whether playing (supports v-model:playing) |

## Events

| Event | Description |
| --- | --- |
| before-play | before-play |
| complete | complete |
| update:playing | update:playing |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-animation/`
- Demo: `#/pages/demo/feedback/animation`
- Chinese docs: [/uniappx/components/animation](/uniappx/components/animation)
