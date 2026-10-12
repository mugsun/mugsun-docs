---
title: Form Item
demo: pages/demo/form/form
---

# Form Item

`ms-form-item`: Form Item. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-form-item`).
Demo route: `#/pages/demo/form/form`.

## Basic usage

```vue
<template>
  <ms-form-item label="…" name="…">
    …
  </ms-form-item>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `''` | — |
| name | `string` | `''` | — |
| value | `string` | `''` | 参与校验的当前值（由宿主把表单数据传进来） |
| required | `boolean` | `false` | — |
| requiredMark | `boolean` | `true` | — |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | — |
| min | `number` | `-1` | — |
| max | `number` | `-1` | — |
| message | `string` | `''` | — |
| help | `string` | `''` | — |
| arrow | `boolean` | `false` | — |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | — |
| labelWidth | `number` | `-1` | — |
| bordered | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| validate | Validation finished |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-form-item/`
- Demo: `#/pages/demo/form/form`
- Chinese docs: [/uniappx/components/form-item](/uniappx/components/form-item)
