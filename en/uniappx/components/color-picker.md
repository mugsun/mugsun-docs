---
title: Color Picker
demo: pages/demo/form/color-picker
---

# Color Picker

`ms-color-picker` — Color Picker for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-color-picker`).
Demo route: `#/pages/demo/form/color-picker`.

## Basic usage

```vue
<template>
  <ms-color-picker v-model="value" type="…">
    …
  </ms-color-picker>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
