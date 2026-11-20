---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs` provides tabs in line, tag and card styles. Tabs can share the width evenly or scroll horizontally, and support badges and a content area.

Bind the index of the selected tab with `v-model:value`.

## Basic usage

<!-- demo-snippets:start -->
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
  { label: 'Option 1' } as UTSJSONObject,
  { label: 'Option 2' } as UTSJSONObject,
  { label: 'Option 3' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const lgIndex = ref(0)

const mdIndex = ref(0)

const scrollIndex = ref(0)

const scrollItems = [
  { label: 'For you' } as UTSJSONObject,
  { label: 'Popular' } as UTSJSONObject,
  { label: 'New' } as UTSJSONObject,
  { label: 'Apparel' } as UTSJSONObject,
  { label: 'Digital' } as UTSJSONObject,
  { label: 'Appliances' } as UTSJSONObject,
  { label: 'Beauty' } as UTSJSONObject,
  { label: 'More' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusItems = [
  { label: 'Enabled 1' } as UTSJSONObject,
  { label: 'Enabled 2' } as UTSJSONObject,
  { label: 'Disabled', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

const tagIndex = ref(0)

const themeItems = [
  { label: 'Option 1' } as UTSJSONObject,
  { label: 'Option 2' } as UTSJSONObject,
  { label: 'Option 3' } as UTSJSONObject,
  { label: 'Option 4' } as UTSJSONObject,
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Index of the selected tab. Works with `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | Tabs; each item has `label` and optional `icon` / `count` / `badge` / `dot` / `disabled` / `content` |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | Style: line / tag / card |
| size | `'md' \| 'lg'` | `'md'` | Size |
| spaceEvenly | `boolean` | `true` | Whether tabs share the width evenly; with `false` they size to their content and scroll horizontally |
| showLine | `boolean` | `true` | Whether the `line` style shows the underline of the selected tab |
| showContent | `boolean` | `false` | Whether to show the content area, filled from the current item's `content` or the default slot |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires when the selection changes; `index` is the newly selected tab |
| click | `index: number` | Fires when any enabled tab is tapped, the current one included |
| update:value | `index: number` | Fires when the selection changes; used by `v-model:value` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content area, shown when `showContent` is `true`; the current item's `content` by default |
