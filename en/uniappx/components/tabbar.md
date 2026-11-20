---
title: Tabbar
demo: pages/demo/nav/tabbar
---

# Tabbar

`ms-tabbar` is a bottom navigation bar. `items` defines the entries, which can have icons and badges, and `v-model:value` binds the index of the current one.

It is fixed to the bottom of the page by default. Set `placeholder` to `true` to reserve the same height in the page so content is not covered.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-tabbar
    :items="textItems"
    :value="textIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTextChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="iconTextIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconTextChange"
  />
  <ms-tabbar
    :items="iconItems"
    :value="iconIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onIconChange"
  />
  <ms-tabbar
    :items="iconTextItems"
    :value="tagIndex"
    theme="tag"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onTagChange"
  />
  <ms-tabbar
    :items="disabledItems"
    :value="disabledIndex"
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onDisabledChange"
  />
  <ms-tabbar
    :items="textItems"
    :value="splitIndex"
    split
    :fixed="false"
    :safe-area-inset-bottom="false"
    @change="onSplitChange"
  />
</template>

<script setup lang="uts">
const disabledIndex = ref(0)

const disabledItems = [
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Disabled', icon: 'megaphone-line', disabled: true } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { icon: 'home-3-line' } as UTSJSONObject,
  { icon: 'search-line' } as UTSJSONObject,
  { icon: 'megaphone-line' } as UTSJSONObject,
  { icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const iconTextIndex = ref(0)

const iconTextItems = [
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Messages', icon: 'megaphone-line' } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

const splitIndex = ref(0)

const tagIndex = ref(1)

const textIndex = ref(0)

const textItems = [
  { label: 'Home' } as UTSJSONObject,
  { label: 'Apps' } as UTSJSONObject,
  { label: 'Chat' } as UTSJSONObject,
  { label: 'Me' } as UTSJSONObject,
] as UTSJSONObject[]

function onTextChange(index: number) : void {
  console.log('onTextChange')
}

function onIconTextChange(index: number) : void {
  console.log('onIconTextChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onTagChange(index: number) : void {
  console.log('onTagChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}

function onSplitChange(index: number) : void {
  console.log('onSplitChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Index of the selected item. Works with `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | Entries; each item has `label` and optional `icon` / `count` / `badge` / `dot` / `disabled` |
| theme | `'normal' \| 'tag'` | `'normal'` | Selected style: normal (theme color) / tag (bold text only) |
| shape | `'normal' \| 'round'` | `'normal'` | Shape: normal (full width) / round (floating capsule) |
| bordered | `boolean` | `true` | Whether to show the top border |
| split | `boolean` | `false` | Whether to show dividers between items |
| fixed | `boolean` | `true` | Whether to fix the bar to the bottom of the page |
| placeholder | `boolean` | `false` | When fixed, whether to reserve the same height in the page so content is not covered |
| safeAreaInsetBottom | `boolean` | `true` | Whether to reserve bottom safe area |
| zIndex | `number` | `400` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires when the selection changes; `index` is the newly selected item |
| update:value | `index: number` | Fires when the selection changes; used by `v-model:value` |
