---
title: Color Picker
demo: pages/demo/form/color-picker
---

# Color Picker

`ms-color-picker`: Color Picker. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-color-picker`).
Demo route: `#/pages/demo/form/color-picker`.

## Basic usage

```vue
<template>
  <ms-color-picker v-model="value" :disabled="true">
    …
  </ms-color-picker>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `'#0579ff'` | 当前色值，hex / rgb / rgba 可入 |
| type | `string` | `'multiple'` | base 仅色板；multiple 色板 + 滑块 |
| format | `string` | `'hex'` | 输出格式：hex / rgb / hsl |
| enableAlpha | `boolean` | `false` | 是否开透明度滑块 |
| swatchColors | `string[]` | `[]` | 预设色，空则用内置 |
| columns | `number` | `8` | 色板每行格数 |
| showPreview | `boolean` | `true` | 是否显示预览块与色值 |
| disabled | `boolean` | `false` | 禁用 |

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
