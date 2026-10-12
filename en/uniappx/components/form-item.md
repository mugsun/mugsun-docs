---
title: Form Item
demo: pages/demo/form/form
---

# Form Item

`ms-form-item` — Form Item for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-form-item`).
Demo route: `#/pages/demo/form/form`.

## Basic usage

```vue
<template>
  <ms-form-item label="…" name="…">
    …
  </ms-form-item>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `''` | Label text |
| name | `string` | `''` | Name / field name |
| value | `string` | `''` | Value under validation (host passes form data in) |
| required | `boolean` | `false` | Whether required |
| requiredMark | `boolean` | `true` | Whether to show a red asterisk when required |
| rule | `'none' \| 'phone' \| 'email' \| 'number'` | `'none'` | Built-in validation: none / phone / email / number |
| min | `number` | `-1` | Minimum |
| max | `number` | `-1` | Maximum |
| message | `string` | `''` | Validation failure message |
| help | `string` | `''` | Help text |
| arrow | `boolean` | `false` | Whether to show a right arrow |
| labelAlign | `'left' \| 'right' \| 'top' \| ''` | `''` | Label alignment |
| labelWidth | `number` | `-1` | Label width (px) |
| bordered | `boolean` | `true` | Whether to show border |

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
