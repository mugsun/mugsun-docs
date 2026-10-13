---
title: Form
demo: pages/demo/form/form
---

# Form

`ms-form` — Form for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-form`).
Demo route: `#/pages/demo/form/form`.

## Basic usage

```vue
<template>
  <ms-form>
    …
  </ms-form>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | Label alignment |
| labelWidth | `number` | `81` | Label width (px) |
| colon | `boolean` | `false` | Whether to show a colon after the label |
| showErrorMessage | `boolean` | `true` | Whether to show validation errors |
| disabled | `boolean` | `false` | Whether disabled |
| validateTick | `number` | `0` | Increment to run a full validate (avoids holding a component ref) |
| resetTick | `number` | `0` | Increment to clear all field errors |

## Events

| Event | Description |
| --- | --- |
| validate | Validation finished |
| submit | Submit |
| error | Error |
| reset | Reset |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-form/`
- Demo: `#/pages/demo/form/form`
- Chinese docs: [/uniappx/components/form](/uniappx/components/form)
