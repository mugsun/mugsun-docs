---
title: Drawer
demo: pages/demo/feedback/drawer
---

# Drawer

`ms-drawer` — Drawer for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drawer`).
Demo route: `#/pages/demo/feedback/drawer`.

## Basic usage

```vue
<template>
  <ms-drawer title="…" v-model:visible="open">
    …
  </ms-drawer>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| placement | `'left' \| 'right'` | `'right'` | Placement |
| title | `string` | `''` | Title |
| items | `UTSJSONObject[]` | `[]` | Each item: title / icon / disabled |
| showOverlay | `boolean` | `true` | Whether to show overlay |
| closeOnOverlayClick | `boolean` | `true` | Close when overlay is clicked |
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
