---
title: Image Resizer
demo: pages/demo/display/image-resizer
---

# Image Resizer

`ms-image-resizer` — Image Resizer for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-image-resizer` (repository not yet public).
Demo route: `#/pages/demo/display/image-resizer`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/image-resizer.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-image-resizer
    ref="squareRef"
    :src="src"
    :crop-width="200"
    :crop-height="200"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <ms-image-resizer
    :src="src"
    :crop-width="280"
    :crop-height="140"
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
  <!-- 组件样式 -->
  <ms-image-resizer
    :src="src"
    :crop-width="200"
    :crop-height="200"
    hide-flip
    @confirm="onConfirm"
    @cancel="onCancel"
    @error="onError"
  />
</template>

<script setup lang="uts">
const squareRef = ref<MsImageResizerComponentPublicInstance | null>(null)
const src = ref('/static/demo-crop.png')
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| cropWidth | `number` | `240` | Crop width (px) |
| cropHeight | `number` | `240` | Crop height (px) |
| height | `number` | `320` | Height (px) |
| quality | `number` | `1` | Output image quality 0–1 |
| hideFlip | `boolean` | `false` | Whether to hide flip |

## Events

| Event | Description |
| --- | --- |
| confirm | Confirm |
| cancel | Cancel |
| error | Error |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-image-resizer/`
- Demo: `#/pages/demo/display/image-resizer`
- Chinese docs: [/uniappx/components/image-resizer](/uniappx/components/image-resizer)
