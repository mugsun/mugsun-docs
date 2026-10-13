---
title: Sticky
demo: pages/demo/nav/sticky
---

# Sticky

`ms-sticky` — Sticky for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sticky`).
Demo route: `#/pages/demo/nav/sticky`.

## Basic usage

```vue
<template>
  <ms-sticky>
    …
  </ms-sticky>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | scrollTop from host scroll-view @scroll detail |
| offsetTop | `number` | `0` | Offset from container top when stuck (px) |
| height | `number` | `0` | When >0, skip measurement and use this fixed height |
| zIndex | `number` | `10` | Sticky z-index (well below overlay) |
| disabled | `boolean` | `false` | Disable sticky; always in normal flow |
| anchorTop | `number` | `0` | Anchor offset in scroll content; >0 skips measurement (most stable cross-end) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| scroll | Scroll |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sticky/`
- Demo: `#/pages/demo/nav/sticky`
- Chinese docs: [/uniappx/components/sticky](/uniappx/components/sticky)
