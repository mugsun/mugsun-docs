---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

`ms-indexbar` is an indexed list. Side index characters jump to sections with scroll-into-view, and the current index binds with `v-model:current`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-indexbar`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/nav/indexbar`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/indexbar.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-indexbar
    :items="cityItems"
    :height="300"
    @change="onBaseChange"
    @select="onBaseSelect"
    @click="onBaseClick"
  />
  <ms-indexbar
    :items="customItems"
    :index-list="customKeys"
    :height="260"
    @select="onCustomSelect"
  />
  <!-- States -->
  <ms-indexbar :items="shortItems" :show-anchor="false" :height="200" @select="onPlainSelect" />
  <ms-indexbar :items="disabledItems" :height="200" @click="onDisabledClick" />
  <!-- Advanced -->
  <ms-indexbar :items="cityItems" current="C" :height="240" @change="onControlledChange" />
  <ms-indexbar :items="shortItems" :show-tip="false" :height="200" />
  <ms-indexbar
    v-model:current="modelCurrent"
    :items="cityItems"
    :height="240"
  />
</template>

<script setup lang="uts">
const cityItems = [
  { index: 'B', label: 'Beijing' } as UTSJSONObject,
  { index: 'B', label: 'Baoding' } as UTSJSONObject,
  { index: 'C', label: 'Chengdu' } as UTSJSONObject,
  { index: 'C', label: 'Changsha' } as UTSJSONObject,
  { index: 'G', label: 'Guangzhou' } as UTSJSONObject,
  { index: 'G', label: 'Guiyang' } as UTSJSONObject,
  { index: 'H', label: 'Hangzhou' } as UTSJSONObject,
  { index: 'H', label: 'Hefei' } as UTSJSONObject,
  { index: 'N', label: 'Nanjing' } as UTSJSONObject,
  { index: 'S', label: 'Shanghai' } as UTSJSONObject,
  { index: 'S', label: 'Suzhou' } as UTSJSONObject,
  { index: 'W', label: 'Wuhan' } as UTSJSONObject,
]

const customItems = [
  { index: 'Hot', label: 'Beijing' } as UTSJSONObject,
  { index: 'Hot', label: 'Shanghai' } as UTSJSONObject,
  { index: 'East', label: 'Hangzhou' } as UTSJSONObject,
  { index: 'East', label: 'Nanjing' } as UTSJSONObject,
  { index: 'South', label: 'Guangzhou' } as UTSJSONObject,
  { index: 'South', label: 'Shenzhen' } as UTSJSONObject,
  { index: 'Southwest', label: 'Chengdu' } as UTSJSONObject,
]

const customKeys = [
  { key: 'Hot', label: 'H' } as UTSJSONObject,
  { key: 'East', label: 'E' } as UTSJSONObject,
  { key: 'South', label: 'S' } as UTSJSONObject,
  { key: 'Southwest', label: 'SW' } as UTSJSONObject,
]

const disabledItems = [
  { index: 'K', label: 'Kunming' } as UTSJSONObject,
  { index: 'K', label: 'Disabled city', disabled: true } as UTSJSONObject,
  { index: 'L', label: 'Lanzhou' } as UTSJSONObject,
  { index: 'L', label: 'Luoyang', disabled: true } as UTSJSONObject,
]

const modelCurrent = ref('B')

const shortItems = [
  { index: 'A', label: 'Anshan' } as UTSJSONObject,
  { index: 'A', label: 'Anqing' } as UTSJSONObject,
  { index: 'D', label: 'Dalian' } as UTSJSONObject,
  { index: 'D', label: 'Dongguan' } as UTSJSONObject,
  { index: 'F', label: 'Fuzhou' } as UTSJSONObject,
]

function onBaseChange(index: string) : void {
  console.log('onBaseChange')
}

function onBaseSelect(index: string) : void {
  console.log('onBaseSelect')
}

function onBaseClick(payload: UTSJSONObject) : void {
  console.log('onBaseClick')
}

function onCustomSelect(index: string) : void {
  console.log('onCustomSelect')
}

function onPlainSelect(index: string) : void {
  console.log('onPlainSelect')
}

function onDisabledClick(payload: UTSJSONObject) : void {
  console.log('onDisabledClick')
}

function onControlledChange(index: string) : void {
  console.log('onControlledChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Flat rows: { index, label, disabled }; same index = one group |
| current | `string` | `''` | Active index char; empty uses the first group |
| indexList | `UTSJSONObject[]` | `[]` | Index chars: { key, label }; empty = derived from items |
| height | `number` | `360` | Container height (accepts numeric px values only) |
| showTip | `boolean` | `true` | Show large bubble while dragging the index bar |
| showAnchor | `boolean` | `true` | Whether to render group headers |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| select | select |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-indexbar/`
- Demo: `#/pages/demo/nav/indexbar`
- Chinese docs: [/uniappx/components/indexbar](/uniappx/components/indexbar)
