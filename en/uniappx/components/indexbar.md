---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

`ms-indexbar` — Indexbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-indexbar`).
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
const modelCurrent = ref('B')
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
