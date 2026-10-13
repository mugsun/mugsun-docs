---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs` — Tabs for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tabs` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/tabs`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/tabs.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-tabs
    :items="baseItems"
    :value="baseIndex"
    @change="onBaseChange"
  />
  <ms-tabs
    :items="scrollItems"
    :value="scrollIndex"
    :space-evenly="false"
    @change="onScrollChange"
  />
  <ms-tabs
    :items="iconItems"
    :value="iconIndex"
    @change="onIconChange"
  />
  <ms-tabs
    :items="statusItems"
    :value="statusIndex"
    @change="onStatusChange"
  />
  <ms-tabs :items="themeItems" :value="mdIndex" size="md" @change="onMdChange" />
  <ms-tabs
    :items="themeItems"
    :value="lgIndex"
    size="lg"
    @change="onLgChange"
  />
  <ms-tabs
    :items="themeItems"
    :value="tagIndex"
    theme="tag"
    @change="onTagChange"
  />
</template>

<script setup lang="uts">
const baseIndex = ref(0)

const baseItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { label: '发现', icon: 'search-line' } as UTSJSONObject,
  { label: '我的', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const lgIndex = ref(0)

const mdIndex = ref(0)

const scrollIndex = ref(0)

const scrollItems = [
  { label: '推荐' } as UTSJSONObject,
  { label: '热门' } as UTSJSONObject,
  { label: '新品' } as UTSJSONObject,
  { label: '服饰' } as UTSJSONObject,
  { label: '数码' } as UTSJSONObject,
  { label: '家电' } as UTSJSONObject,
  { label: '美妆' } as UTSJSONObject,
  { label: '更多' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusItems = [
  { label: '可选一' } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
  { label: '禁用', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const tagIndex = ref(0)

const themeItems = [
  { label: '选项一' } as UTSJSONObject,
  { label: '选项二' } as UTSJSONObject,
  { label: '选项三' } as UTSJSONObject,
  { label: '选项四' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onScrollChange(index: number) : void {
  console.log('onScrollChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onStatusChange(index: number) : void {
  console.log('onStatusChange')
}

function onMdChange(index: number) : void {
  console.log('onMdChange')
}

function onLgChange(index: number) : void {
  console.log('onLgChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | Theme color |
| size | `'md' \| 'lg'` | `'md'` | Size |
| spaceEvenly | `boolean` | `true` | Equal-width header; false = content width + horizontal scroll |
| showLine | `boolean` | `true` | Whether the line theme shows the bottom active bar |
| showContent | `boolean` | `false` | Whether to render content (items[].content or default slot) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabs/`
- Demo: `#/pages/demo/nav/tabs`
- Chinese docs: [/uniappx/components/tabs](/uniappx/components/tabs)
