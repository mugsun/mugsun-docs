---
title: Overlay
demo: pages/demo/basic/overlay
---

# Overlay

`ms-overlay` — Overlay for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-overlay`).
Demo route: `#/pages/demo/basic/overlay`.

## Basic usage

```vue
<template>
  <ms-overlay v-model:visible="open">
    …
  </ms-overlay>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| closable | `boolean` | `true` | Whether closable |
| zIndex | `number` | `1000` | z-index |
| dim | `'light' \| 'normal' \| 'heavy'` | `'normal'` | Overlay strength: light / normal / deep (semantic; not an arbitrary color) |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| open | Opened |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-overlay/`
- Demo: `#/pages/demo/basic/overlay`
- Chinese docs: [/uniappx/components/overlay](/uniappx/components/overlay)
