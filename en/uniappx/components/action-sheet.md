---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet`: Action Sheet. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-action-sheet`).
Demo route: `#/pages/demo/feedback/action-sheet`.

## Basic usage

```vue
<template>
  <ms-action-sheet theme="list" v-model:visible="open">
    …
  </ms-action-sheet>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / description / icon / tone('default'\|'primary'\|'danger') / disabled |
| theme | `'list' \| 'grid'` | `'list'` | — |
| align | `'center' \| 'left'` | `'center'` | — |
| description | `string` | `''` | — |
| showCancel | `boolean` | `true` | — |
| cancelText | `string` | `'取消'` | — |
| closeOnOverlayClick | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| select | select |
| cancel | Cancel |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-action-sheet/`
- Demo: `#/pages/demo/feedback/action-sheet`
- Chinese docs: [/uniappx/components/action-sheet](/uniappx/components/action-sheet)
