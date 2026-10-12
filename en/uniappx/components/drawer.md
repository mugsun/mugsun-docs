---
title: Drawer
demo: pages/demo/feedback/drawer
---

# Drawer

`ms-drawer`: Drawer. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-drawer`).
Demo route: `#/pages/demo/feedback/drawer`.

## Basic usage

```vue
<template>
  <ms-drawer title="…" v-model:visible="open">
    …
  </ms-drawer>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| placement | `'left' \| 'right'` | `'right'` | — |
| title | `string` | `''` | — |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / icon / disabled |
| showOverlay | `boolean` | `true` | — |
| closeOnOverlayClick | `boolean` | `true` | — |
| closeOnSelect | `boolean` | `true` | 点菜单项后是否自动关闭 |
| zIndex | `number` | `1000` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| item-click | Menu item click |
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
