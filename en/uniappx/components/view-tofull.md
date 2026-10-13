---
title: View To Full
demo: pages/demo/media/view-tofull
---

# View To Full

`ms-view-tofull` — fullscreen container helper for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-view-tofull` (commercial edition; source not public).
Demo route: `#/pages/demo/media/view-tofull`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/view-tofull.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-view-tofull v-model:opened="openedA" @opened="onOpened">
    <view :class="openedA ? 'demo-full-card--open' : ''">
      <text>点开展开示例</text>
      <text>点击卡片进入全屏</text>
      <view v-if="openedA">
        <text>加量内容：展开后可见的详细说明与列表。</text>
        <text>适用于视频、详情等不想新开页的场景。</text>
      </view>
    </view>
  </ms-view-tofull>
  <!-- 组件样式 -->
  <ms-view-tofull v-model:opened="openedB">
    <view :class="openedB ? 'demo-full-card--open' : ''">
      <text>卡片甲</text>
      <text v-if="openedB">甲的加量内容</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedC">
    <view :class="openedC ? 'demo-full-card--open' : ''">
      <text>卡片乙</text>
      <text v-if="openedC">乙的加量内容</text>
    </view>
  </ms-view-tofull>
  <!-- 组件深度 -->
  <ms-view-tofull v-model:opened="openedSlow" :duration="600">
    <view :class="openedSlow ? 'demo-full-card--open' : ''">
      <text>慢展开 600ms</text>
      <text v-if="openedSlow">慢动画加量内容</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedNoClose" :show-close="false" :duration="280">
    <view :class="openedNoClose ? 'demo-full-card--open' : ''" @click.stop="toggleNoClose">
      <text>无关闭钮 · 再点回落</text>
      <text v-if="openedNoClose">点此区域可关闭</text>
    </view>
  </ms-view-tofull>
  <ms-view-tofull v-model:opened="openedFast" :duration="120">
    <view :class="openedFast ? 'demo-full-card--open' : ''">
      <text>快展开 120ms</text>
      <text v-if="openedFast">短时长过渡</text>
    </view>
  </ms-view-tofull>
</template>

<script setup lang="uts">
const openedA = ref(false)

const openedB = ref(false)

const openedC = ref(false)

const openedFast = ref(false)

const openedNoClose = ref(false)

const openedSlow = ref(false)

function onOpened() : void {
  console.log('onOpened')
}

function toggleNoClose() : void {
  console.log('toggleNoClose')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| duration | `number` | `300` | Duration (ms) |
| showClose | `boolean` | `true` | Whether to show close when fullscreen |
| opened | `boolean` | `false` | Whether to open fullscreen |

## Events

| Event | Description |
| --- | --- |
| open | Opened |
| close | Closed |
| opened | opened |
| closed | closed |
| update:opened | update:opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-view-tofull/`
- Demo: `#/pages/demo/media/view-tofull`
- Chinese docs: [/uniappx/components/view-tofull](/uniappx/components/view-tofull)
