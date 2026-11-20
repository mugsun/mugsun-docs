---
title: Color Picker
demo: pages/demo/form/color-picker
---

# Color Picker

`ms-color-picker` is a color picker with preset swatches, a stepped hue bar, and sliders for saturation, brightness and opacity.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-color-picker v-model="baseColor" type="base" @change="onBaseChange" />
  <ms-color-picker v-model="fullColor" type="multiple" @change="onFullChange" />
  <!-- Styles -->
  <ms-color-picker v-model="alphaColor" :enable-alpha="true" format="rgb" @change="onAlphaChange" />
  <ms-color-picker v-model="hslColor" format="hsl" :columns="6" @change="onHslChange" />
  <ms-color-picker v-model="disabledColor" type="base" :disabled="true" />
  <!-- Advanced -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `'#0579ff'` | Current color; accepts hex, rgb or rgba |
| type | `string` | `'multiple'` | base = swatch only; multiple = swatch + sliders |
| format | `string` | `'hex'` | Output format: hex / rgb / hsl; with opacity, hex output switches to rgba |
| enableAlpha | `boolean` | `false` | Whether to show the opacity slider |
| swatchColors | `string[]` | `[]` | Preset colors; empty uses the 12 built-in ones |
| columns | `number` | `8` | Swatch columns per row |
| showPreview | `boolean` | `true` | Whether to show the preview swatch and value |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the color changes; used by `v-model` |
| change | `value: string` | Fires when the color changes; `value` uses the format set by `format` |
| pick | `value: string` | Fires when a preset swatch is tapped |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getHex(): string` | Returns the current color as hex |
| `getRgba(): string` | Returns the current color as an `rgba()` string |
| `getAlpha(): number` | Returns the current opacity, from 0 to 1 |
