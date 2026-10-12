---
title: Form
demo: pages/demo/form/form
---

# Form

表单容器：下发 `labelAlign`（`left/right/top`）、`labelWidth`、`colon`、`showErrorMessage`、`disabled` 给 `ms-form-item`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-form`).
Demo route: `#/pages/demo/form/form`.

## Basic usage

```vue
<template>
  <ms-form :disabled="true">
    …
  </ms-form>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| labelAlign | `'left' \| 'right' \| 'top'` | `'right'` | — |
| labelWidth | `number` | `81` | — |
| colon | `boolean` | `false` | — |
| showErrorMessage | `boolean` | `true` | — |
| disabled | `boolean` | `false` | — |
| validateTick | `number` | `0` | +1 触发一次全量校验（避免页面持有组件 ref 调方法） |
| resetTick | `number` | `0` | +1 清空全部错误 |

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
