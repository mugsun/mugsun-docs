---
title: Camera
demo: pages/demo/media/camera
---

# Camera

`ms-camera`: Controlled wrapper around official `<camera>`: fixed-height viewfinder + capture/flip toolbar; unsupported platforms show a placeholder.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-camera/components/ms-camera`).
Optional plugin: install `uni_modules/ms-camera` alongside `ms-ui`.
Demo route: `#/pages/demo/media/camera`.

## Basic usage

```vue
<template>
  <ms-camera>
    …
  </ms-camera>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| devicePosition | `string` | `'back'` | Camera facing |
| flash | `string` | `'auto'` | Flash mode |
| resolution | `string` | `'medium'` | Resolution |
| height | `number` | `220` | Height (px) |
| showToolbar | `boolean` | `true` | Whether to show toolbar |
| tip | `string` | `''` | Tip text |

## Events

| Event | Description |
| --- | --- |
| photo | Photo taken |
| error | Error |
| stop | Stopped |
| position-change | Facing changed |

## See also

- Component: `uni_modules/ms-camera/components/ms-camera/`
- Demo: `#/pages/demo/media/camera`
- Chinese docs: [/uniappx/components/camera](/uniappx/components/camera)
