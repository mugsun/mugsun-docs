---
title: Transition
demo: pages/demo/basic/transition
---

# Transition

`ms-transition` is an enter and leave transition container controlled by `visible`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-transition`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/basic/transition`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/transition.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-transition :visible="fadeVisible">
    <view>
      <text>Fade in/out content</text>
    </view>
  </ms-transition>
  <ms-transition :visible="slideVisible" name="slide-right" :duration="300">
    <view>
      <text>Slide in from right</text>
    </view>
  </ms-transition>
  <!-- Styles -->
  <ms-transition :visible="true" :appear="true" name="zoom">
    <view>
      <text>Zooms in when opened</text>
    </view>
  </ms-transition>
  <ms-transition
    :visible="destroyVisible"
    :destroy-on-hide="true"
    name="slide-up"
    @after-leave="onDestroyed"
  >
    <view>
      <text>Leaves no content when hidden</text>
    </view>
  </ms-transition>
  <!-- Advanced -->
  <ms-transition :visible="leftVisible" name="slide-left" :duration="300">
    <view>
      <text>Slide in from left</text>
    </view>
  </ms-transition>
  <ms-transition :visible="downVisible" name="slide-down" :duration="300">
    <view>
      <text>Slide down content</text>
    </view>
  </ms-transition>
  <ms-transition :visible="zoomVisible" name="zoom" :duration="300">
    <view>
      <text>Zoom transition content</text>
    </view>
  </ms-transition>
</template>

<script setup lang="uts">
const destroyVisible = ref(true)

const downVisible = ref(true)

const fadeVisible = ref(true)

const leftVisible = ref(true)

const slideVisible = ref(true)

const zoomVisible = ref(true)

function onDestroyed() : void {
  console.log('onDestroyed')
}
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
