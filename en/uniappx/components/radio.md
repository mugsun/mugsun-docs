---
title: Radio
demo: pages/demo/form/radio
---

# Radio

`ms-radio`: Radio. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-radio`).
Demo route: `#/pages/demo/form/radio`.

## Basic usage

```vue
<template>
  <ms-radio label="…" v-model="value">
    …
  </ms-radio>
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
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | — |
| placement | `'left' \| 'right'` | `'left'` | — |
| block | `boolean` | `false` | — |
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

- Component: `uni_modules/ms-ui/components/ms-radio/`
- Demo: `#/pages/demo/form/radio`
- Chinese docs: [/uniappx/components/radio](/uniappx/components/radio)
