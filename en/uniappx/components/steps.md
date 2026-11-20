---
title: Steps
demo: pages/demo/nav/steps
---

# Steps

`ms-steps` is a step indicator built from `items`, laid out horizontally or vertically.

Step states are derived from `current` by default: earlier steps are finished and later ones have not started. A step's own `status` takes precedence.

Tapping a step switches to it; bind the current step with `v-model:current`, or set `readonly` to turn tapping off.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-steps :items="baseItems" v-model:current="baseCurrent" @change="onBaseChange" />
  <ms-steps
    :items="verticalItems"
    :current="1"
    layout="vertical"
    @change="onVerticalChange"
  />
  <ms-steps
    :items="iconItems"
    :current="1"
    @change="onIconChange"
  />
  <!-- States -->
  <ms-steps
    :items="errorItems"
    :current="1"
    current-status="error"
    @change="onErrorChange"
  />
  <ms-steps :items="baseItems" :current="3" readonly />
  <!-- Style -->
  <ms-steps :items="dotItems" :current="1" theme="dot" @change="onDotChange" />
  <!-- Advanced -->
  <ms-steps
    :items="errorItems"
    :current="1"
    current-status="error"
    layout="vertical"
    readonly
  />
  <ms-steps :items="baseItems" :current="1" readonly />
  <ms-steps :items="baseItems" v-model:current="depthCurrent" @change="onDepthChange" />
</template>

<script setup lang="uts">
const baseCurrent = ref(1)

const baseItems = [
  { title: 'Completed', content: 'Extra info' } as UTSJSONObject,
  { title: 'Current step', content: 'Extra info' } as UTSJSONObject,
  { title: 'Upcoming', content: 'Extra info' } as UTSJSONObject,
] as UTSJSONObject[]

const depthCurrent = ref(0)

const dotItems = [
  { title: 'Completed', content: 'Extra info' } as UTSJSONObject,
  { title: 'Current step', content: 'Extra info' } as UTSJSONObject,
  { title: 'Upcoming', content: 'Extra info' } as UTSJSONObject,
] as UTSJSONObject[]

const errorItems = [
  { title: 'Completed', content: 'Extra info' } as UTSJSONObject,
  { title: 'Error step', content: 'Please resubmit' } as UTSJSONObject,
  { title: 'Upcoming', content: 'Extra info' } as UTSJSONObject,
] as UTSJSONObject[]

const iconItems = [
  { title: 'Ordered', content: 'Extra info', icon: 'check-line' } as UTSJSONObject,
  { title: 'Shipped', content: 'Extra info', icon: 'inbox-line' } as UTSJSONObject,
  { title: 'Delivered', content: 'Extra info', icon: 'home-3-line' } as UTSJSONObject,
] as UTSJSONObject[]

const verticalItems = [
  { title: 'Completed step', content: 'Customizable content' } as UTSJSONObject,
  { title: 'Current step', content: 'Customizable content' } as UTSJSONObject,
  { title: 'Upcoming step', content: 'Customizable content' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(current: number, previous: number) : void {
  console.log('onBaseChange')
}

function onVerticalChange(current: number, previous: number) : void {
  console.log('onVerticalChange')
}

function onIconChange(current: number, previous: number) : void {
  console.log('onIconChange')
}

function onErrorChange(current: number, previous: number) : void {
  console.log('onErrorChange')
}

function onDotChange(current: number, previous: number) : void {
  console.log('onDotChange')
}

function onDepthChange(current: number, previous: number) : void {
  console.log('onDepthChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Steps; each item has `title` and optional `content` / `icon` / `status` |
| current | `number` | `0` | Index of the current step; equal to the step count means all done. Works with `v-model:current` |
| currentStatus | `string` | `'process'` | State of the current step: process / error / finish / default |
| layout | `string` | `'horizontal'` | Direction: horizontal / vertical |
| theme | `string` | `'default'` | Style: default (numbered circles) / dot (small dots) |
| readonly | `boolean` | `false` | Whether it is read-only; taps fire no events when it is |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `current: number, previous: number` | Fires when the step switches, with the new and the previous index |
| click | `index: number` | Fires when any step is tapped, the current one included |
| update:current | `index: number` | Fires when the step switches; used by `v-model:current` |
