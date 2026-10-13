---
title: Drawer
demo: pages/demo/feedback/drawer
---

# Drawer

`ms-drawer` — Drawer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-drawer` (repository not yet public).
Demo route: `#/pages/demo/feedback/drawer`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/drawer.uvue`; see them running in the phone frame.

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
    title="菜单"
    @update:visible="onTitledVisible"
    @item-click="onPick"
  />
  <ms-drawer
    :visible="showIcon"
    :items="iconItems"
    title="快捷入口"
    @update:visible="onIconVisible"
    @item-click="onPick"
  />
</template>

<script setup lang="uts">
const showBase = ref(false)
const showTitled = ref(false)
const showIcon = ref(false)
const baseItems = ref([
const iconItems = ref([
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
