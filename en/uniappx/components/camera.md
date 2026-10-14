---
title: Camera
demo: pages/demo/media/camera
---

# Camera

`ms-camera` is a controlled wrapper around the official `<camera>`, with a fixed-height viewfinder and a capture and flip toolbar. On unsupported platforms it shows a placeholder.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-camera/components/ms-camera`. ms-ui is a commercial edition and its source is not public.
Optional plugin: install `uni_modules/ms-camera` alongside `ms-ui`.
Demo route: `#/pages/demo/media/camera`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/camera.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
