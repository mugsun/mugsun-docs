---
title: Popover
demo: pages/demo/feedback/popover
---

# Popover

`ms-popover` — Popover for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-popover`).
Demo route: `#/pages/demo/feedback/popover`.

## Basic usage

```vue
<template>
  <ms-popover theme="dark" v-model:visible="open">
    …
  </ms-popover>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Plain text; use content slot for rich content |
| placement | `\| 'top'` | `'top'` | Popup / placement |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | Theme color |
| showArrow | `boolean` | `true` | Whether to show arrow |
| closeOnClickOutside | `boolean` | `true` | Whether clicking outside (transparent overlay) closes |
| zIndex | `number` | `900` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| visible-change | visible-change |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| content | `content` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-popover/`
- Demo: `#/pages/demo/feedback/popover`
- Chinese docs: [/uniappx/components/popover](/uniappx/components/popover)
