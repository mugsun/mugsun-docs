---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

`ms-indexbar` — Indexbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-indexbar` (repository not yet public).
Demo route: `#/pages/demo/nav/indexbar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/indexbar.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
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
  <!-- 组件状态 -->
  <ms-indexbar :items="shortItems" :show-anchor="false" :height="200" @select="onPlainSelect" />
  <ms-indexbar :items="disabledItems" :height="200" @click="onDisabledClick" />
  <!-- 组件深度 -->
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
  { index: 'B', label: '北京' } as UTSJSONObject,
  { index: 'B', label: '保定' } as UTSJSONObject,
  { index: 'C', label: '成都' } as UTSJSONObject,
  { index: 'C', label: '长沙' } as UTSJSONObject,
  { index: 'G', label: '广州' } as UTSJSONObject,
  { index: 'G', label: '贵阳' } as UTSJSONObject,
  { index: 'H', label: '杭州' } as UTSJSONObject,
  { index: 'H', label: '合肥' } as UTSJSONObject,
  { index: 'N', label: '南京' } as UTSJSONObject,
  { index: 'S', label: '上海' } as UTSJSONObject,
  { index: 'S', label: '苏州' } as UTSJSONObject,
  { index: 'W', label: '武汉' } as UTSJSONObject,
]

const customItems = [
  { index: '热门', label: '北京' } as UTSJSONObject,
  { index: '热门', label: '上海' } as UTSJSONObject,
  { index: '华东', label: '杭州' } as UTSJSONObject,
  { index: '华东', label: '南京' } as UTSJSONObject,
  { index: '华南', label: '广州' } as UTSJSONObject,
  { index: '华南', label: '深圳' } as UTSJSONObject,
  { index: '西南', label: '成都' } as UTSJSONObject,
]

const customKeys = [
  { key: '热门', label: '热' } as UTSJSONObject,
  { key: '华东', label: '东' } as UTSJSONObject,
  { key: '华南', label: '南' } as UTSJSONObject,
  { key: '西南', label: '西' } as UTSJSONObject,
]

const disabledItems = [
  { index: 'K', label: '昆明' } as UTSJSONObject,
  { index: 'K', label: '停用城市', disabled: true } as UTSJSONObject,
  { index: 'L', label: '兰州' } as UTSJSONObject,
  { index: 'L', label: '洛阳', disabled: true } as UTSJSONObject,
]

const modelCurrent = ref('B')

const shortItems = [
  { index: 'A', label: '鞍山' } as UTSJSONObject,
  { index: 'A', label: '安庆' } as UTSJSONObject,
  { index: 'D', label: '大连' } as UTSJSONObject,
  { index: 'D', label: '东莞' } as UTSJSONObject,
  { index: 'F', label: '福州' } as UTSJSONObject,
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
| height | `number` | `360` | Container height (px; vapor forbids %) |
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
