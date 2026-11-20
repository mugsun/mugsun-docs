---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

`ms-indexbar` is a grouped list with a side index. Tap or drag across the index characters to jump to a group.

Bind the current index with `v-model:current`.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Rows; each item has `index` (its group), `label` and an optional `disabled`. Items with the same `index` form one group |
| current | `string` | `''` | Current index character; empty selects the first group. Works with `v-model:current` |
| indexList | `UTSJSONObject[]` | `[]` | Side index entries, each with `key` and `label`; derived from `items` when empty |
| height | `number` | `360` | Container height (px) |
| showTip | `boolean` | `true` | Whether to show the large hint bubble while dragging the side index |
| showAnchor | `boolean` | `true` | Whether to show group headers |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: string` | Fires when the current index switches, whether by scrolling the list, using the side index or calling `scrollToIndex` |
| select | `index: string` | Fires when the side index is tapped or dragged; `index` is the selected index character |
| click | `payload: UTSJSONObject` | Fires when a row is tapped; `payload` has `index`, `label` and `rowIndex`. Disabled rows do not fire |
| update:current | `value: string` | Fires when the current index switches; used by `v-model:current` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `scrollToIndex(index: string)` | Scrolls to the group of the given index |
| `getCurrent(): string` | Returns the current index character |
