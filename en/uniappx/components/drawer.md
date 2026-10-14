---
title: Drawer
demo: pages/demo/feedback/drawer
---

# Drawer

`ms-drawer` is a side drawer with a title, a scrollable menu list and a footer slot. It slides in from the left or right.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-drawer`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/drawer`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/drawer.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| placement | `'left' \| 'right'` | `'right'` | Popup / placement |
| title | `string` | `''` | Title |
| items | `UTSJSONObject[]` | `[]` | Each item: title / icon / disabled |
| showOverlay | `boolean` | `true` | Whether to show the overlay |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| closeOnSelect | `boolean` | `true` | Whether selecting a menu item auto-closes |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| item-click | Item click |
| overlay-click | Overlay click |
| close | Closed |
| open | Opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-drawer/`
- Demo: `#/pages/demo/feedback/drawer`
- Chinese docs: [/uniappx/components/drawer](/uniappx/components/drawer)
