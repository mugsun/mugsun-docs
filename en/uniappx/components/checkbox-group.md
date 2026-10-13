---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group` — Checkbox Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-checkbox-group`).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

```vue
<template>
  <ms-checkbox-group v-model="value">
    …
  </ms-checkbox-group>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| max | `number` | `-1` | Maximum |
| horizontal | `boolean` | `false` | Whether horizontal |

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

- Component: `uni_modules/ms-ui/components/ms-checkbox-group/`
- Demo: `#/pages/demo/form/checkbox`
- Chinese docs: [/uniappx/components/checkbox-group](/uniappx/components/checkbox-group)
