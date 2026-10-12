---
title: Blur
demo: pages/demo/media/blur
---

# Blur

`ms-blur`: Frosted overlay: translucent tint (light/dark) for functional masks on sheets, toolbars, and image captions (not decorative glassmorphism).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-blur/components/ms-blur`).
Optional plugin: install `uni_modules/ms-blur` alongside `ms-ui`.
Demo route: `#/pages/demo/media/blur`.

## Basic usage

```vue
<template>
  <ms-blur>
    …
  </ms-blur>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| blur | `number` | `12` | Blur radius (px) |
| tint | `string` | `'light'` | Tint tier |
| opacity | `number` | `0.85` | Opacity |
| radius | `number` | `0` | Border radius (px) |
| padding | `number` | `12` | Padding (px) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-blur/components/ms-blur/`
- Demo: `#/pages/demo/media/blur`
- Chinese docs: [/uniappx/components/blur](/uniappx/components/blur)
