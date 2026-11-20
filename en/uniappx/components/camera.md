---
title: Camera
demo: pages/demo/media/camera
---

# Camera

`ms-camera` is a controlled wrapper around the official `<camera>`, with a fixed-height viewfinder and a capture and flip toolbar. On unsupported platforms it shows a placeholder.

This is an optional plugin. Install `uni_modules/ms-camera` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-camera
    :device-position="position"
    flash="auto"
    :height="180"
    tip="Live preview on a real device; shows a placeholder when unsupported"
    @photo="onPhoto"
    @error="onError"
    @position-change="onPositionChange"
  />
  <ms-camera device-position="front" flash="off" :height="140" :show-toolbar="false" />
  <!-- Styles -->
  <ms-camera :height="120" :show-toolbar="false" resolution="low" />
  <ms-camera :height="120" resolution="high" tip="Two actions: capture and flip" />
  <!-- Advanced -->
  <ms-camera
    flash="torch"
    :height="120"
    :show-toolbar="false"
    tip="Torch on"
  />
  <ms-camera
    flash="on"
    resolution="medium"
    :height="120"
    tip="Flash forced on capture"
  />
  <ms-camera
    ref="cmdCamera"
    :height="120"
    :show-toolbar="false"
    @photo="onPhoto"
    @error="onError"
  />
</template>

<script setup lang="uts">
const position = ref('back')

function onPhoto(payload: UTSJSONObject) : void {
  console.log('onPhoto')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}

function onPositionChange(payload: UTSJSONObject) : void {
  console.log('onPositionChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| devicePosition | `string` | `'back'` | Camera facing: back / front |
| flash | `string` | `'auto'` | Flash mode: auto / on / off / torch |
| resolution | `string` | `'medium'` | Resolution: low / medium / high |
| height | `number` | `220` | Viewfinder height (px) |
| showToolbar | `boolean` | `true` | Whether to show toolbar |
| tip | `string` | `''` | Hint text below the viewfinder |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| photo | `payload: UTSJSONObject` | Fires after a photo is taken; `payload.tempFilePath` is the temporary file path |
| error | `payload: UTSJSONObject` | Fires when capture fails, permission is denied or the camera is unavailable; `payload.errMsg` holds the message |
| stop | `payload: UTSJSONObject` | Fires when the system interrupts the camera, for example when the app goes to the background; `payload` is empty |
| position-change | `payload: UTSJSONObject` | Fires when the flip button is tapped; `payload.devicePosition` is the requested facing, and you update the `devicePosition` prop yourself |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `takePhoto()` | Takes a photo; the result arrives through the `photo` or `error` event |
