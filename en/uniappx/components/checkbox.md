---
title: Checkbox
demo: pages/demo/form/checkbox
---

# Checkbox

`ms-checkbox` — Checkbox for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-checkbox`).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

```vue
<template>
  <ms-checkbox label="…" v-model="value">
    …
  </ms-checkbox>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| value | `string` | `''` | Option value within checkbox-group |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Secondary description |
| contentDisabled | `boolean` | `false` | Tapping content does not toggle; only the icon toggles |
| disabled | `boolean` | `false` | Whether disabled |
| indeterminate | `boolean` | `false` | Indeterminate state |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | Icon shape |
| placement | `'left' \| 'right'` | `'left'` | Icon position relative to text |
| block | `boolean` | `false` | Whether full-bleed / block |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-checkbox/`
- Demo: `#/pages/demo/form/checkbox`
- Chinese docs: [/uniappx/components/checkbox](/uniappx/components/checkbox)
