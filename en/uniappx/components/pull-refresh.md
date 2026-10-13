---
title: Pull Refresh
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh

`ms-pull-refresh` — Pull Refresh for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-pull-refresh` (commercial edition; source not public).
Demo route: `#/pages/demo/feedback/pull-refresh`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/pull-refresh.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
  <ms-pull-refresh
    v-model="baseRefreshing"
    :height="220"
    @refresh="onBaseRefresh"
    @restore="onBaseRestore"
  >
    <view v-for="row in baseRows" :key="row">
      <text>{{ row }}</text>
    </view>
  </ms-pull-refresh>
  <ms-pull-refresh v-model="customRefreshing" :height="180" @refresh="onCustomRefresh">
    <template #refresher>
      <text>Custom refresh hint</text>
    </template>
    <view v-for="row in customRows" :key="row">
      <text>{{ row }}</text>
    </view>
  </ms-pull-refresh>
  <!-- States -->
  <ms-pull-refresh :disabled="true" :height="140">
    <view>
      <text>Pull-to-refresh disabled</text>
    </view>
    <view>
      <text>Pull gesture has no effect</text>
    </view>
  </ms-pull-refresh>
  <!-- Threshold and height -->
  <ms-pull-refresh :threshold="100" :height="160" @refresh="onLargeRefresh">
    <view>
      <text>Triggers after pulling 100px</text>
    </view>
    <view>
      <text>Container height 160px</text>
    </view>
  </ms-pull-refresh>
</template>

<script setup lang="uts">
const baseRefreshing = ref(false)

const baseRows = ['List item 1', 'List item 2', 'List item 3', 'List item 4', 'List item 5']

const customRefreshing = ref(false)

const customRows = ['Custom list A', 'Custom list B', 'Custom list C']

function onBaseRefresh() : void {
  console.log('onBaseRefresh')
}

function onBaseRestore() : void {
  console.log('onBaseRestore')
}

function onCustomRefresh() : void {
  console.log('onCustomRefresh')
}

function onLargeRefresh() : void {
  console.log('onLargeRefresh')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Refreshing; set false when done to collapse |
| disabled | `boolean` | `false` | Disable pull-to-refresh |
| threshold | `number` | `60` | Trigger distance (px); also fixed refresher slot height |
| height | `number` | `360` | Fixed container height (px; vapor forbids %) |
| texts | `UTSJSONObject[]` | `[]` | Override four-state texts: { status, text } |
| successDuration | `number` | `500` | How long (ms) to keep the “refresh done” state |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| refresh | Refresh |
| pulling | pulling |
| restore | restore |
| scrolltolower | Scrolled to lower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| refresher | `refresher` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-pull-refresh/`
- Demo: `#/pages/demo/feedback/pull-refresh`
- Chinese docs: [/uniappx/components/pull-refresh](/uniappx/components/pull-refresh)
