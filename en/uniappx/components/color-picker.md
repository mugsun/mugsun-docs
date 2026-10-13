---
title: Color Picker
demo: pages/demo/form/color-picker
---

# Color Picker

`ms-color-picker` — Color Picker for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-color-picker` (repository not yet public).
Demo route: `#/pages/demo/form/color-picker`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/color-picker.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-color-picker v-model="baseColor" type="base" @change="onBaseChange" />
  <ms-color-picker v-model="fullColor" type="multiple" @change="onFullChange" />
  <!-- 组件样式 -->
  <ms-color-picker v-model="alphaColor" :enable-alpha="true" format="rgb" @change="onAlphaChange" />
  <ms-color-picker v-model="hslColor" format="hsl" :columns="6" @change="onHslChange" />
  <ms-color-picker v-model="disabledColor" type="base" :disabled="true" />
  <!-- 组件深度 -->
  <ms-color-picker
    v-model="swatchColor"
    type="base"
    :swatch-colors="customSwatches"
    :columns="5"
    @change="onSwatchChange"
  />
  <ms-color-picker
    v-model="noPreviewColor"
    type="base"
    :show-preview="false"
    @change="onNoPreviewChange"
  />
  <ms-color-picker ref="pickerRef" v-model="exposeColor" type="multiple" @change="onExposeChange" />
</template>

<script setup lang="uts">
const alphaColor = ref('rgba(0,155,58,0.6)')

const baseColor = ref('#0579ff')

const customSwatches = ['#e11d48', '#ea580c', '#ca8a04', '#16a34a', '#2563eb'] as string[]

const disabledColor = ref('#8c9099')

const exposeColor = ref('#2563eb')

const fullColor = ref('#ff4f00')

const hslColor = ref('#0f766e')

const noPreviewColor = ref('#2563eb')

const swatchColor = ref('#e11d48')

function onBaseChange(value: string) : void {
  console.log('onBaseChange')
}

function onFullChange(value: string) : void {
  console.log('onFullChange')
}

function onAlphaChange(value: string) : void {
  console.log('onAlphaChange')
}

function onHslChange(value: string) : void {
  console.log('onHslChange')
}

function onSwatchChange(value: string) : void {
  console.log('onSwatchChange')
}

function onNoPreviewChange(value: string) : void {
  console.log('onNoPreviewChange')
}

function onExposeChange(value: string) : void {
  console.log('onExposeChange')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `'#0579ff'` | Current color (hex / rgb / rgba) |
| type | `string` | `'multiple'` | base = swatch only; multiple = swatch + sliders |
| format | `string` | `'hex'` | Output format: hex / rgb / hsl |
| enableAlpha | `boolean` | `false` | Whether to show the opacity slider |
| swatchColors | `string[]` | `[]` | Preset colors; empty uses built-in |
| columns | `number` | `8` | Swatch columns per row |
| showPreview | `boolean` | `true` | Whether to show the preview swatch and value |
| disabled | `boolean` | `false` | Disabled |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| pick | Selection changed (before confirm) |

## See also

- Component: `uni_modules/ms-ui/components/ms-color-picker/`
- Demo: `#/pages/demo/form/color-picker`
- Chinese docs: [/uniappx/components/color-picker](/uniappx/components/color-picker)
