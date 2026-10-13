---
title: Image Resizer
demo: pages/demo/display/image-resizer
---

# Image Resizer

`ms-image-resizer` — Image Resizer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-image-resizer`).
Demo route: `#/pages/demo/display/image-resizer`.

## Basic usage

```vue
<template>
  <ms-image-resizer src="…">
    …
  </ms-image-resizer>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| cropWidth | `number` | `240` | Crop width (px) |
| cropHeight | `number` | `240` | Crop height (px) |
| height | `number` | `320` | Height (px) |
| quality | `number` | `1` | Output image quality 0–1 |
| hideFlip | `boolean` | `false` | Whether to hide flip |

## Events

| Event | Description |
| --- | --- |
| confirm | Confirm |
| cancel | Cancel |
| error | Error |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-resizer/`
- Demo: `#/pages/demo/display/image-resizer`
- Chinese docs: [/uniappx/components/image-resizer](/uniappx/components/image-resizer)
