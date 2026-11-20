---
title: Image Resizer
demo: pages/demo/display/image-resizer
---

# Image Resizer

`ms-image-resizer` crops images. The crop frame stays centered while you drag and zoom the image to choose the area, and the image can also be flipped.

Confirming exports the result: the `confirm` event returns the image as a data URL with its width and height.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Image URL |
| cropWidth | `number` | `240` | Crop frame width (px) |
| cropHeight | `number` | `240` | Crop frame height (px) |
| height | `number` | `320` | Component height (px) |
| quality | `number` | `1` | Output image quality 0–1 |
| hideFlip | `boolean` | `false` | Whether to hide the flip buttons |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| confirm | `payload: UTSJSONObject` | Fires when the export succeeds; `payload` has `src` (a data URL), `width` and `height` |
| cancel | — | Fires when the cancel button is tapped |
| error | `message: string` | Fires when loading or exporting the image fails; `message` describes the error |
| change | `payload: UTSJSONObject` | Fires after a drag, zoom or flip; `payload` has `scale`, `flipX` and `flipY` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `reset()` | Restores the initial zoom, position and flip state |
| `confirm()` | Exports the cropped image, same as tapping the confirm button |
