---
title: Svg
demo: pages/demo/media/svg
---

# Svg

`ms-svg`: SVG display: fixed-size container + official `<image>`; supports inline source and recoloring.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-svg/components/ms-svg`).
Optional plugin: install `uni_modules/ms-svg` alongside `ms-ui`.
Demo route: `#/pages/demo/media/svg`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/svg.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-svg :source="check" :size="32" color="#2563eb" @load="onLoad" @error="onError" />
  <ms-svg :source="star" :size="32" color="#f59e0b" />
  <ms-svg src="/static/demo-vector.svg" :size="32" />
  <!-- 组件样式 -->
  <ms-svg :source="check" :size="16" :color="tint" />
  <ms-svg :source="check" :size="24" :color="tint" />
  <ms-svg :source="check" :size="40" :color="tint" />
  <!-- 组件深度 -->
  <ms-svg :source="star" :width="64" :height="32" mode="aspectFill" color="#2563eb" />
  <ms-svg :source="check" :width="64" :height="32" mode="aspectFill" :color="tint" />
  <ms-svg :source="star" :width="72" :height="28" mode="scaleToFill" color="#0f766e" />
</template>

<script setup lang="uts">
const tint = ref('#2563eb')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| source | `string` | `''` | Source / inline content |
| size | `number` | `24` | Size |
| width | `number` | `0` | Width (px) |
| height | `number` | `0` | Height (px) |
| color | `string` | `''` | Color |
| mode | `string` | `'aspectFit'` | Mode |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |

## See also

- Component: `uni_modules/ms-svg/components/ms-svg/`
- Demo: `#/pages/demo/media/svg`
- Chinese docs: [/uniappx/components/svg](/uniappx/components/svg)
