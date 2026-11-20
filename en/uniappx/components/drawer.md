---
title: Drawer
demo: pages/demo/feedback/drawer
---

# Drawer

`ms-drawer` is a side drawer with a title, a scrollable menu list and a footer slot. It slides in from the left or right.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-drawer
    :visible="showBase"
    :items="baseItems"
    @update:visible="onBaseVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showTitled"
    :items="baseItems"
    title="Menu"
    @update:visible="onTitledVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showIcon"
    :items="iconItems"
    title="Shortcuts"
    @update:visible="onIconVisible"
    @item-click="onPick"
  />
</template>

<script setup lang="uts">
const baseItems = ref([
  { title: 'Menu 1' } as UTSJSONObject,
  { title: 'Menu 2' } as UTSJSONObject,
  { title: 'Menu 3' } as UTSJSONObject,
  { title: 'Menu 4' } as UTSJSONObject,
] as UTSJSONObject[])

const iconItems = ref([
  { title: 'Home', icon: 'home-3-line' } as UTSJSONObject,
  { title: 'Messages', icon: 'notification-line' } as UTSJSONObject,
  { title: 'Settings', icon: 'settings-3-line' } as UTSJSONObject,
] as UTSJSONObject[])

const showBase = ref(false)

const showIcon = ref(false)

const showTitled = ref(false)

function onBaseVisible(value: boolean): void {
  showBase.value = value
}

function onPick(index: number) : void {
  console.log('onPick')
}

function onTitledVisible(value: boolean): void {
  showTitled.value = value
}

function onIconVisible(value: boolean): void {
  showIcon.value = value
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| placement | `'left' \| 'right'` | `'right'` | Side the drawer slides in from |
| title | `string` | `''` | Title |
| items | `UTSJSONObject[]` | `[]` | Each item: title / icon / disabled |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| closeOnSelect | `boolean` | `true` | Whether selecting a menu item auto-closes |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the drawer opens or closes; used by `v-model:visible` |
| item-click | `index: number` | Fires when a menu item is tapped; `index` is that item's index. Disabled items do not fire it |
| overlay-click | — | Fires when the overlay is tapped |
| close | — | Fires when the drawer closes |
| open | — | Fires when the drawer opens |

## Slots

| Slot | Description |
| --- | --- |
| default | Footer area below the menu list |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the drawer; requires `v-model:visible` |
| `close()` | Closes the drawer; requires `v-model:visible` |
