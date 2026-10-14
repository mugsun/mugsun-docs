---
title: Blur
demo: pages/demo/media/blur
---

# Blur

`ms-blur` is a frosted overlay with a translucent tint in light and dark strengths. It is meant for functional masks on sheets, toolbars and image captions, not for decorative glassmorphism.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-blur/components/ms-blur`. ms-ui is a commercial edition and its source is not public.
Optional plugin: install `uni_modules/ms-blur` alongside `ms-ui`.
Demo route: `#/pages/demo/media/blur`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/blur.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-blur :blur="blur" tint="light" :radius="12">
    <text>Toolbar backdrop</text>
    <text>Translucent fill + blur, for overlays and toolbars</text>
  </ms-blur>
  <ms-blur :blur="blur" tint="dark" :radius="12" :opacity="0.7">
    <text>Dark backdrop</text>
    <text>For caption bars over images</text>
  </ms-blur>
  <!-- Styles -->
  <ms-blur :blur="4" tint="light" :radius="8" :padding="8">
    <text>Light blur 4</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :radius="8" :padding="8">
    <text>Medium blur 20</text>
  </ms-blur>
  <ms-blur :blur="12" tint="light" :radius="0" :padding="16">
    <text>Square corners · padding 16</text>
  </ms-blur>
  <!-- Advanced -->
  <ms-blur :blur="16" tint="light" :opacity="0.4" :radius="12" :padding="12">
    <text>Opacity 0.4</text>
  </ms-blur>
  <ms-blur :blur="12" tint="dark" :opacity="0.75" :radius="24" :padding="12">
    <text>Radius 24</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :opacity="0.92" :radius="12" :padding="12">
    <text>Opacity 0.92</text>
  </ms-blur>
</template>

<script setup lang="uts">
const blur = ref(12)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| blur | `number` | `12` | Blur radius (px) |
| tint | `string` | `'light'` | Tint tier |
| opacity | `number` | `0.85` | Opacity |
| radius | `number` | `0` | Border radius (px) |
| padding | `number` | `12` | Padding (px) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-blur/components/ms-blur/`
- Demo: `#/pages/demo/media/blur`
- Chinese docs: [/uniappx/components/blur](/uniappx/components/blur)
