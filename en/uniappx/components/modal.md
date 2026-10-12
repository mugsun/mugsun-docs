---
title: Modal
demo: pages/demo/feedback/modal
---

# Modal

`ms-modal` — Modal for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-modal`).
Demo route: `#/pages/demo/feedback/modal`.

## Basic usage

```vue
<template>
  <ms-modal theme="default" title="…">
    …
  </ms-modal>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| content | `string` | `''` | Content text |
| confirmText | `string` | `'确定'` | Confirm button label |
| cancelText | `string` | `'取消'` | Cancel button label |
| showCancel | `boolean` | `false` | Whether to show cancel button |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | buttonLayout |
| theme | `'default' \| 'danger'` | `'default'` | Theme |
| closeBtn | `boolean` | `false` | Whether to show close button |
| closeOnOverlayClick | `boolean` | `false` | Close when overlay is clicked |
| closeOnConfirm | `boolean` | `true` | Close after confirm |
| confirmLoading | `boolean` | `false` | Confirm button loading |
| zIndex | `number` | `1000` | z-index |

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
