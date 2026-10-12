---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group`: Checkbox Group. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-checkbox-group`).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

```vue
<template>
  <ms-checkbox-group v-model="value" :disabled="true">
    …
  </ms-checkbox-group>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | — |
| disabled | `boolean` | `false` | — |
| max | `number` | `-1` | — |
| horizontal | `boolean` | `false` | — |

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
