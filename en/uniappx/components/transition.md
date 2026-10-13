---
title: Transition
demo: pages/demo/basic/transition
---

# Transition

`ms-transition` — Transition for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-transition`).
Demo route: `#/pages/demo/basic/transition`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/transition.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-transition :visible="fadeVisible">
    <view>
      <text>淡入淡出内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="slideVisible" name="slide-right" :duration="300">
    <view>
      <text>右侧滑入内容</text>
    </view>
  </ms-transition>
  <!-- 组件样式 -->
  <ms-transition :visible="true" :appear="true" name="zoom">
    <view>
      <text>打开即缩放进场</text>
    </view>
  </ms-transition>
  <ms-transition
    :visible="destroyVisible"
    :destroy-on-hide="true"
    name="slide-up"
    @after-leave="onDestroyed"
  >
    <view>
      <text>隐藏后不留内容</text>
    </view>
  </ms-transition>
  <!-- 组件深度 -->
  <ms-transition :visible="leftVisible" name="slide-left" :duration="300">
    <view>
      <text>左侧滑入内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="downVisible" name="slide-down" :duration="300">
    <view>
      <text>下沉内容</text>
    </view>
  </ms-transition>
  <ms-transition :visible="zoomVisible" name="zoom" :duration="300">
    <view>
      <text>缩放过渡内容</text>
    </view>
  </ms-transition>
</template>

<script setup lang="uts">
const fadeVisible = ref(true)
const slideVisible = ref(true)
const destroyVisible = ref(true)
const leftVisible = ref(true)
const downVisible = ref(true)
const zoomVisible = ref(true)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| name | `\| 'fade'` | `'fade'` | Name / field name |
| duration | `number` | `300` | Duration (ms) |
| appear | `boolean` | `false` | Whether to animate on appear |
| destroyOnHide | `boolean` | `false` | Whether to destroy when hidden |

## Events

| Event | Description |
| --- | --- |
| before-enter | before-enter |
| after-enter | after-enter |
| before-leave | before-leave |
| after-leave | after-leave |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-transition/`
- Demo: `#/pages/demo/basic/transition`
- Chinese docs: [/uniappx/components/transition](/uniappx/components/transition)
