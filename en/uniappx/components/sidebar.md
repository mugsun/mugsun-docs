---
title: Sidebar
demo: pages/demo/nav/sidebar
---

# Sidebar

`ms-sidebar` — Sidebar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-sidebar` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/sidebar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/sidebar.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled |
| height | `number` | `320` | Sidebar total height (px; vapor forbids % height) |

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

- Component: `uni_modules/ms-ui/components/ms-sidebar/`
- Demo: `#/pages/demo/nav/sidebar`
- Chinese docs: [/uniappx/components/sidebar](/uniappx/components/sidebar)
