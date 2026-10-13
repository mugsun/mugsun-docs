---
title: Camera
demo: pages/demo/media/camera
---

# Camera

`ms-camera`: Controlled wrapper around official `<camera>`: fixed-height viewfinder + capture/flip toolbar; unsupported platforms show a placeholder.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-camera/components/ms-camera`).
Optional plugin: install `uni_modules/ms-camera` alongside `ms-ui`.
Demo route: `#/pages/demo/media/camera`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/camera.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-camera
    :device-position="position"
    flash="auto"
    :height="180"
    tip="真机可取景；不支持时显示占位"
    @photo="onPhoto"
    @error="onError"
    @position-change="onPositionChange"
  />
  <ms-camera device-position="front" flash="off" :height="140" :show-toolbar="false" />
  <!-- 组件样式 -->
  <ms-camera :height="120" :show-toolbar="false" resolution="low" />
  <ms-camera :height="120" resolution="high" tip="拍照与翻转两个动作" />
  <!-- 组件深度 -->
  <ms-camera
    flash="torch"
    :height="120"
    :show-toolbar="false"
    tip="常亮闪光"
  />
  <ms-camera
    flash="on"
    resolution="medium"
    :height="120"
    tip="拍照时强制开灯"
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
const cmdCamera = ref(null)
</script>
```
<!-- demo-snippets:end -->

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
