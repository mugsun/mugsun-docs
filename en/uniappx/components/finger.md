---
title: Finger
demo: pages/demo/media/finger
---

# Finger

`ms-finger` — Finger for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-finger`).
Demo route: `#/pages/demo/media/finger`.

## Basic usage

```vue
<template>
  <ms-finger>
    …
  </ms-finger>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | Swipe gesture threshold (px) |
| doubleTapInterval | `number` | `280` | Double-tap interval (ms) |
| longPressDelay | `number` | `500` | Long-press trigger delay (ms) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| move | move |
| end | end |
| tap | tap |
| click | Click |
| doubletap | doubletap |
| longpress | longpress |
| swipe | swipe |
| pinch | pinch |
| rotate | rotate |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-finger/`
- Demo: `#/pages/demo/media/finger`
- Chinese docs: [/uniappx/components/finger](/uniappx/components/finger)
