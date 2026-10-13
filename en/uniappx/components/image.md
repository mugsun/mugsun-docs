---
title: Image
demo: pages/demo/basic/image
---

# Image

`ms-image` — Image for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-image` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/image`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/image.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 裁切 -->
  <ms-image :src="demoSrc" mode="aspectFill" />
  <ms-image :src="demoSrc" mode="heightFix" />
  <ms-image :src="demoSrc" mode="scaleToFill" />
  <!-- 形状 -->
  <ms-image :src="demoSrc" shape="square" />
  <ms-image :src="demoSrc" shape="round" />
  <ms-image :src="demoSrc" shape="circle" />
  <!-- 状态 -->
  <ms-image :src="demoSrc" />
  <ms-image src="https://invalid.ms-ui.example/error.png" />
  <!-- 组件深度 -->
  <ms-image :src="demoSrc" width="120px" height="80px" shape="round" />
  <ms-image :src="demoSrc" :lazy="true" />
  <ms-image :src="demoSrc" :show-menu-by-longpress="true" />
</template>

<script setup lang="uts">
const demoSrc = '/static/demo-crop.png'
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| mode | `string` | `'aspectFill'` | Mode |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | Shape |
| width | `string` | `'72px'` | Width (px) |
| height | `string` | `'72px'` | Height (px) |
| lazy | `boolean` | `false` | Whether lazy-load |
| showMenuByLongpress | `boolean` | `false` | Long-press MP code menu (WeChat; see image.md) |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| error | `error` slot |
| loading | `loading` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-image/`
- Demo: `#/pages/demo/basic/image`
- Chinese docs: [/uniappx/components/image](/uniappx/components/image)
