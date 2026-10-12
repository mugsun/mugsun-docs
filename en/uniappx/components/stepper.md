---
title: Stepper
demo: pages/demo/form/stepper
---

# Stepper

`ms-stepper` — Stepper for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-stepper`).
Demo route: `#/pages/demo/form/stepper`.

## Basic usage

```vue
<template>
  <ms-stepper theme="normal" size="sm">
    …
  </ms-stepper>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| min | `number` | `0` | Minimum |
| max | `number` | `100` | Maximum |
| step | `number` | `1` | Step |
| precision | `number` | `0` | Precision |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | Theme color |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| disabled | `boolean` | `false` | Whether disabled |
| disableInput | `boolean` | `false` | Whether input is disabled |
| longPress | `boolean` | `true` | Long-press +/- for continuous step (on by default) |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| overlimit | overlimit |

## See also

- Component: `uni_modules/ms-ui/components/ms-stepper/`
- Demo: `#/pages/demo/form/stepper`
- Chinese docs: [/uniappx/components/stepper](/uniappx/components/stepper)
