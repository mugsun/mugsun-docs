---
title: Image
demo: pages/demo/basic/image
---

# Image

`ms-image` wraps the native `<image>` and shows a placeholder while loading and on failure.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Fit -->
  <ms-image :src="demoSrc" mode="aspectFill" />
  <ms-image :src="demoSrc" mode="heightFix" />
  <ms-image :src="demoSrc" mode="scaleToFill" />
  <!-- Shapes -->
  <ms-image :src="demoSrc" shape="square" />
  <ms-image :src="demoSrc" shape="round" />
  <ms-image :src="demoSrc" shape="circle" />
  <!-- States -->
  <ms-image :src="demoSrc" />
  <ms-image src="https://invalid.ms-ui.example/error.png" />
  <!-- Advanced -->
  <ms-image :src="demoSrc" width="120px" height="80px" shape="round" />
  <ms-image :src="demoSrc" :lazy="true" />
  <ms-image :src="demoSrc" :show-menu-by-longpress="true" />
</template>

<script setup lang="uts">
const demoSrc = '/static/demo-crop.png'
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Image URL |
| mode | `string` | `'aspectFill'` | Scaling and cropping mode, same as `mode` on the native `image` |
| shape | `'square' \| 'round' \| 'circle'` | `'square'` | Shape |
| width | `string` | `'72px'` | Width, a string with a unit |
| height | `string` | `'72px'` | Height, a string with a unit |
| lazy | `boolean` | `false` | Whether lazy-load |
| showMenuByLongpress | `boolean` | `false` | Whether a long press opens the menu for recognizing mini program codes; WeChat mini program only |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| load | `e: UniImageLoadEvent` | Fires when the image has loaded |
| error | `e: UniImageErrorEvent` | Fires when the image fails to load |
| click | — | Fires when the image is tapped |

## Slots

| Slot | Description |
| --- | --- |
| loading | Custom placeholder while loading |
| error | Custom placeholder on failure |
