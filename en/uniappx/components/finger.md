---
title: Finger
demo: pages/demo/media/finger
---

# Finger

`ms-finger`: Finger. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-finger`).
Demo route: `#/pages/demo/media/finger`.

## Basic usage

```vue
<template>
  <ms-finger :disabled="true">
    …
  </ms-finger>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| swipeThreshold | `number` | `40` | — |
| doubleTapInterval | `number` | `280` | — |
| longPressDelay | `number` | `500` | — |
| disabled | `boolean` | `false` | — |

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
