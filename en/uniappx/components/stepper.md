---
title: Stepper
demo: pages/demo/form/stepper
---

# Stepper

`ms-stepper`: Stepper. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-stepper`).
Demo route: `#/pages/demo/form/stepper`.

## Basic usage

```vue
<template>
  <ms-stepper theme="normal" size="sm">
    …
  </ms-stepper>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | — |
| min | `number` | `0` | — |
| max | `number` | `100` | — |
| step | `number` | `1` | — |
| precision | `number` | `0` | — |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| disabled | `boolean` | `false` | — |
| disableInput | `boolean` | `false` | — |
| longPress | `boolean` | `true` | 长按加减钮连续步进，默认开 |

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
