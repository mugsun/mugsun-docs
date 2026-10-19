---
title: Skeleton
demo: pages/demo/display/skeleton
---

# Skeleton

`ms-skeleton` is a loading skeleton with `theme` presets and an optional `flashed` opacity pulse. When `loading=false`, the default slot content is shown.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-skeleton`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/skeleton`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/skeleton.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Skeleton types -->
  <ms-skeleton theme="avatar" />
  <ms-skeleton theme="image" />
  <ms-skeleton theme="text" />
  <!-- Composite layout -->
  <ms-skeleton theme="paragraph" />
  <!-- Animation -->
  <ms-skeleton theme="paragraph" animation="none" />
  <ms-skeleton theme="paragraph" animation="flashed" />
  <!-- Advanced -->
  <ms-skeleton theme="card" :row="3" animation="flashed" />
  <ms-skeleton theme="paragraph" :row="5" />
  <ms-skeleton theme="text" :row="2" :delay="400" :loading="true" />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | Whether loading |
| delay | `number` | `0` | Delay (ms) |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | Theme color |
| animation | `'none' \| 'flashed'` | `'none'` | Animation: none / flashed |
| row | `number` | `0` | Paragraph/text line count (2–6) |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-skeleton/`
- Demo: `#/pages/demo/display/skeleton`
- Chinese docs: [/uniappx/components/skeleton](/uniappx/components/skeleton)
