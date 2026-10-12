---
title: Modal
demo: pages/demo/feedback/modal
---

# Modal

`ms-modal`: Modal. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-modal`).
Demo route: `#/pages/demo/feedback/modal`.

## Basic usage

```vue
<template>
  <ms-modal theme="default" title="…">
    …
  </ms-modal>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| title | `string` | `''` | — |
| content | `string` | `''` | — |
| confirmText | `string` | `'确定'` | — |
| cancelText | `string` | `'取消'` | — |
| showCancel | `boolean` | `false` | — |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | — |
| theme | `'default' \| 'danger'` | `'default'` | — |
| closeBtn | `boolean` | `false` | — |
| closeOnOverlayClick | `boolean` | `false` | — |
| closeOnConfirm | `boolean` | `true` | — |
| confirmLoading | `boolean` | `false` | — |
| zIndex | `number` | `1000` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-modal/`
- Demo: `#/pages/demo/feedback/modal`
- Chinese docs: [/uniappx/components/modal](/uniappx/components/modal)
