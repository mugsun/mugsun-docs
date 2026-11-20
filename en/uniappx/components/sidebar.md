---
title: Sidebar
demo: pages/demo/nav/sidebar
---

# Sidebar

`ms-sidebar` is a side category navigation: a category list built from `items` on the left, and the default slot content on the right.

Bind the index of the current item with `v-model:value`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-sidebar
    :items="baseItems"
    :value="baseIndex"
    :height="280"
    @change="onBaseChange"
  >
    <text>{{ baseTitle }}</text>
    <text>{{ baseBody }}</text>
  </ms-sidebar>
  <ms-sidebar
    :items="iconItems"
    :value="iconIndex"
    :height="240"
    @change="onIconChange"
  >
    <text>{{ iconTitle }}</text>
    <text>Sidebar with icons: content area</text>
  </ms-sidebar>
  <ms-sidebar
    :items="badgeItems"
    :value="badgeIndex"
    :height="240"
    @change="onBadgeChange"
  >
    <text>{{ badgeTitle }}</text>
    <text>Badges indicate unread items</text>
  </ms-sidebar>
  <ms-sidebar
    :items="disabledItems"
    :value="disabledIndex"
    :height="240"
    @change="onDisabledChange"
  >
    <text>{{ disabledTitle }}</text>
    <text>Disabled items cannot be selected</text>
  </ms-sidebar>
</template>

<script setup lang="uts">
const badgeIndex = ref(0)

const badgeItems = [
  { label: 'Messages', dot: true } as UTSJSONObject,
  { label: 'Notifications', count: 6 } as UTSJSONObject,
  { label: 'Other' } as UTSJSONObject,
] as UTSJSONObject[]

const baseIndex = ref(0)

const baseItems = [
  { label: 'Option 1' } as UTSJSONObject,
  { label: 'Option 2' } as UTSJSONObject,
  { label: 'Option 3' } as UTSJSONObject,
  { label: 'Option 4' } as UTSJSONObject,
] as UTSJSONObject[]

const disabledIndex = ref(0)

const disabledItems = [
  { label: 'Enabled' } as UTSJSONObject,
  { label: 'Disabled', disabled: true } as UTSJSONObject,
  { label: 'Enabled 2' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconItems = [
  { label: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { label: 'Discover', icon: 'search-line' } as UTSJSONObject,
  { label: 'Me', icon: 'user-3-fill' } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onBadgeChange(index: number) : void {
  console.log('onBadgeChange')
}

function onDisabledChange(index: number) : void {
  console.log('onDisabledChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Index of the selected item. Works with `v-model:value` |
| items | `UTSJSONObject[]` | `[]` | Categories; each item has `label` and optional `icon` / `count` / `badge` / `dot` / `disabled` |
| height | `number` | `320` | Component height (px) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires when the selection changes; `index` is the newly selected item |
| click | `index: number` | Fires when any enabled item is tapped, the current one included |
| update:value | `index: number` | Fires when the selection changes; used by `v-model:value` |

## Slots

| Slot | Description |
| --- | --- |
| default | Content area on the right |
