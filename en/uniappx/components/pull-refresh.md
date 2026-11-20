---
title: Pull Refresh
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh

`ms-pull-refresh` is a pull-to-refresh container: a fixed-height `scroll-view` that uses its built-in refresher.

Bind the refreshing state with `v-model`. Pulling down sets it to `true` and fires `refresh`; set it back to `false` once the data has loaded and the indicator collapses.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Whether it is refreshing; set back to `false` when the data has loaded |
| disabled | `boolean` | `false` | Whether to disable pull-to-refresh |
| threshold | `number` | `60` | Pull distance that triggers a refresh (px); also the height of the indicator area |
| height | `number` | `360` | Container height (px) |
| texts | `UTSJSONObject[]` | `[]` | Custom indicator text per state; each item has `status` and `text`, with `status` one of pulling / loosing / refreshing / done |
| successDuration | `number` | `500` | How long the done message stays (ms) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: boolean` | Fires when the refreshing state changes; used by `v-model` |
| refresh | — | Fires on release after pulling past the threshold, and when `start()` is called; load your data here |
| pulling | `dy: number` | Fires while pulling; `dy` is the pull distance (px) |
| restore | — | Fires after the indicator has collapsed |
| scrolltolower | — | Fires when scrolled to the bottom; useful for loading the next page |

## Slots

| Slot | Description |
| --- | --- |
| default | List content |
| refresher | Custom indicator area; scoped values are `status` (current state) and `dy` (pull distance) |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `start()` | Starts a refresh, as if the user had pulled down |
| `stop()` | Ends the refresh and collapses the indicator |
| `getStatus(): string` | Returns the current state: idle / pulling / loosing / refreshing / done |
