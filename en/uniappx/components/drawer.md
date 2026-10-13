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
const baseItems = ref([
  { title: '菜单一' } as UTSJSONObject,
  { title: '菜单二' } as UTSJSONObject,
  { title: '菜单三' } as UTSJSONObject,
  { title: '菜单四' } as UTSJSONObject,
] as UTSJSONObject[])

const iconItems = ref([
  { title: '首页', icon: 'home-3-line' } as UTSJSONObject,
  { title: '消息', icon: 'notification-line' } as UTSJSONObject,
  { title: '设置', icon: 'settings-3-line' } as UTSJSONObject,
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
