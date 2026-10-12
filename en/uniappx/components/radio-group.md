---
title: Radio Group
demo: pages/demo/form/radio
---

# Radio Group

`ms-radio-group`: Radio Group. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-radio-group`).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

```vue
<template>
  <ms-radio-group v-model="value" :disabled="true">
    …
  </ms-radio-group>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| disabled | `boolean` | `false` | — |
| horizontal | `boolean` | `false` | — |
| allowUncheck | `boolean` | `false` | — |

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

- Component: `uni_modules/ms-ui/components/ms-radio-group/`
- Demo: `#/pages/demo/form/radio`
- Chinese docs: [/uniappx/components/radio-group](/uniappx/components/radio-group)
