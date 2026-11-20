---
title: Svg
demo: pages/demo/media/svg
---

# Svg

`ms-svg` displays vector graphics by rendering SVG with the official `<image>` in a fixed-size container. It supports inline SVG source and recoloring.

This is an optional plugin. Install `uni_modules/ms-svg` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-svg :source="check" :size="32" color="#2563eb" @load="onLoad" @error="onError" />
  <ms-svg :source="star" :size="32" color="#f59e0b" />
  <ms-svg src="/static/demo-vector.svg" :size="32" />
  <!-- Styles -->
  <ms-svg :source="check" :size="16" :color="tint" />
  <ms-svg :source="check" :size="24" :color="tint" />
  <ms-svg :source="check" :size="40" :color="tint" />
  <!-- Advanced -->
  <ms-svg :source="star" :width="64" :height="32" mode="aspectFill" color="#2563eb" />
  <ms-svg :source="check" :width="64" :height="32" mode="aspectFill" :color="tint" />
  <ms-svg :source="star" :width="72" :height="28" mode="scaleToFill" color="#0f766e" />
</template>

<script setup lang="uts">
const check =

const star =

const tint = ref('#2563eb')

function onLoad(payload: UTSJSONObject) : void {
  console.log('onLoad')
}

function onError(payload: UTSJSONObject) : void {
  console.log('onError')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Image URL: a path under `/static/` or an http(s) URL |
| source | `string` | `''` | Inline SVG source; takes precedence over `src` |
| size | `number` | `24` | Side length (px) |
| width | `number` | `0` | Width (px); overrides `size` when above 0 |
| height | `number` | `0` | Height (px); overrides `size` when above 0 |
| color | `string` | `''` | Color that replaces `currentColor` in the inline source |
| mode | `string` | `'aspectFit'` | Scaling mode: scaleToFill / aspectFit / aspectFill |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| load | `payload: UTSJSONObject` | Fires when the image has loaded; `payload` has `width` and `height` |
| error | `payload: UTSJSONObject` | Fires when loading fails; `payload.errMsg` is the error message |
