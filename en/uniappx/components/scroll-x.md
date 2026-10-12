---
title: Scroll X
demo: pages/demo/display/scroll-x
---

# Scroll X

`ms-scroll-x` — Scroll X for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-scroll-x`).
Demo route: `#/pages/demo/display/scroll-x`.

## Basic usage

```vue
<template>
  <ms-scroll-x>
    …
  </ms-scroll-x>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| indicator | `boolean` | `true` | Whether to show indicator |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` | Gap (px) |
| inset | `boolean` | `false` | Whether inset style |
| showScrollbar | `boolean` | `false` | Whether to show scrollbar |
| scrollWithAnimation | `boolean` | `false` | Whether scrolling is animated |

## Events

| Event | Description |
| --- | --- |
| scroll | Scroll |
| scrolltoupper | scrolltoupper |
| scrolltolower | Scrolled to lower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-scroll-x/`
- Demo: `#/pages/demo/display/scroll-x`
- Chinese docs: [/uniappx/components/scroll-x](/uniappx/components/scroll-x)
