---
title: Checkbox
demo: pages/demo/form/checkbox
---

# Checkbox

`ms-checkbox` — Checkbox for uni-app x.

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
| value | `string` | `''` | Current value |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Content text |
| contentDisabled | `boolean` | `false` | Whether content is disabled |
| disabled | `boolean` | `false` | Whether disabled |
| indeterminate | `boolean` | `false` | Indeterminate state |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | Icon name (icons.uts) |
| placement | `'left' \| 'right'` | `'left'` | Placement |
| block | `boolean` | `false` | Whether block-level / full width |

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
