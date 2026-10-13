---
title: Steps
demo: pages/demo/nav/steps
---

# Steps

`ms-steps` — Steps for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-steps` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/steps`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/steps.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: title / content / icon / status |
| current | `number` | `0` | Current step index; equals step count when all done |
| currentStatus | `string` | `'process'` | Status of the step at current: process / error / finish / default |
| layout | `string` | `'horizontal'` | Direction: horizontal / vertical |
| theme | `string` | `'default'` | Style: default numbered circle / dot |
| readonly | `boolean` | `false` | Read-only; does not emit change |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-steps/`
- Demo: `#/pages/demo/nav/steps`
- Chinese docs: [/uniappx/components/steps](/uniappx/components/steps)
