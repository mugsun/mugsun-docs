---
title: Camera
demo: pages/demo/media/camera
---

# Camera

`ms-camera`: Controlled wrapper around official `<camera>`: fixed-height viewfinder + capture/flip toolbar; unsupported platforms show a placeholder.

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
| devicePosition | `string` | `'back'` | `back` / `front`; invalid falls back to `back` |
| flash | `string` | `'auto'` | `auto` / `on` / `off` / `torch` |
| resolution | `string` | `'medium'` | `low` / `medium` / `high` |
| height | `number` | `220` | Viewfinder height (px) |
| showToolbar | `boolean` | `true` | Show capture / flip toolbar |
| tip | `string` | `''` | Tip text under the viewfinder |

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
