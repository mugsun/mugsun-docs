---
title: Swipe Cell
demo: pages/demo/feedback/swipe-cell
---

# Swipe Cell

`ms-swipe-cell` — Swipe Cell for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-swipe-cell`).
Demo route: `#/pages/demo/feedback/swipe-cell`.

## Basic usage

```vue
<template>
  <ms-swipe-cell>
    …
  </ms-swipe-cell>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Controlled: whether the right panel is open |
| openedLeft | `boolean` | `false` | Controlled: whether the left panel is open |
| disabled | `boolean` | `false` | Disable gestures |
| threshold | `number` | `20` | Distance threshold before snapping into place |
| bordered | `boolean` | `true` | Bottom divider |

## Events

| Event | Description |
| --- | --- |
| update:opened | update:opened |
| update:openedLeft | update:openedLeft |
| open | Opened |
| close | Closed |
| click | Click |
| dragstart | dragstart |
| dragend | dragend |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| actions | `actions` slot |
| left | `left` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-swipe-cell/`
- Demo: `#/pages/demo/feedback/swipe-cell`
- Chinese docs: [/uniappx/components/swipe-cell](/uniappx/components/swipe-cell)
