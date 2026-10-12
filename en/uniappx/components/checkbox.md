---
title: Checkbox
demo: pages/demo/form/checkbox
---

# Checkbox

多选框：单独 `v-model` 或放进 `ms-checkbox-group`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-checkbox`).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

```vue
<template>
  <ms-checkbox label="…" v-model="value">
    …
  </ms-checkbox>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | — |
| value | `string` | `''` | — |
| label | `string` | `''` | — |
| content | `string` | `''` | — |
| contentDisabled | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| indeterminate | `boolean` | `false` | — |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | — |
| placement | `'left' \| 'right'` | `'left'` | — |
| block | `boolean` | `false` | — |

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
