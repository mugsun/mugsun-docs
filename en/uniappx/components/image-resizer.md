---
title: Image Resizer
demo: pages/demo/display/image-resizer
---

# Image Resizer

`ms-image-resizer` crops images with a fixed, centered crop frame. It supports dragging to pan, slider zoom, horizontal and vertical flips, reset, and cancel or confirm to export.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-image-resizer`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/image-resizer`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/image-resizer.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-image-resizer
    ref="squareRef"
    :src="src"
    :crop-width="200"
    :crop-height="200"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <ms-image-resizer
    :src="src"
    :crop-width="280"
    :crop-height="140"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <!-- Styles -->
  <ms-image-resizer
    :src="src"
    :crop-width="200"
    :crop-height="200"
    hide-flip
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
</template>

<script setup lang="uts">
const src = ref('/static/demo-crop.png')

function onConfirm(payload: UTSJSONObject) : void {
  console.log('onConfirm')
}

function onCancel() : void {
  console.log('onCancel')
}

function onError(msg: string) : void {
  console.log('onError')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
