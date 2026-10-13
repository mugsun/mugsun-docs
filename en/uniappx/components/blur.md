---
title: Blur
demo: pages/demo/media/blur
---

# Blur

`ms-blur`: Frosted overlay: translucent tint (light/dark) for functional masks on sheets, toolbars, and image captions (not decorative glassmorphism).

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-blur/components/ms-blur` (repository not yet public).
Optional plugin: install `uni_modules/ms-blur` alongside `ms-ui`.
Demo route: `#/pages/demo/media/blur`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/blur.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-blur :blur="blur" tint="light" :radius="12">
    <text>工具条底衬</text>
    <text>半透明底 + 模糊，用于浮层与工具条</text>
  </ms-blur>
  <ms-blur :blur="blur" tint="dark" :radius="12" :opacity="0.7">
    <text>深色底衬</text>
    <text>用于图片上的说明条</text>
  </ms-blur>
  <!-- 组件样式 -->
  <ms-blur :blur="4" tint="light" :radius="8" :padding="8">
    <text>轻度模糊 4</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :radius="8" :padding="8">
    <text>中度模糊 20</text>
  </ms-blur>
  <ms-blur :blur="12" tint="light" :radius="0" :padding="16">
    <text>直角 · 内边距 16</text>
  </ms-blur>
  <!-- 组件深度 -->
  <ms-blur :blur="16" tint="light" :opacity="0.4" :radius="12" :padding="12">
    <text>透明度 0.4</text>
  </ms-blur>
  <ms-blur :blur="12" tint="dark" :opacity="0.75" :radius="24" :padding="12">
    <text>圆角 24</text>
  </ms-blur>
  <ms-blur :blur="20" tint="light" :opacity="0.92" :radius="12" :padding="12">
    <text>透明度 0.92</text>
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
