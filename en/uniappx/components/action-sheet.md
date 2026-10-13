---
title: Action Sheet
demo: pages/demo/feedback/action-sheet
---

# Action Sheet

`ms-action-sheet` — Action Sheet for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-action-sheet`).
Demo route: `#/pages/demo/feedback/action-sheet`.

## Basic usage

```vue
<template>
  <ms-action-sheet theme="list" v-model:visible="open">
    …
  </ms-action-sheet>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| items | `UTSJSONObject[]` | `[]` | Each item: label / description / icon / tone('default'\|'primary'\|'danger') / disabled | 'primary' | 'danger') / disabled |
| theme | `'list' \| 'grid'` | `'list'` | Theme color |
| align | `'center' \| 'left'` | `'center'` | Alignment |
| description | `string` | `''` | Description text |
| showCancel | `boolean` | `true` | Whether to show cancel button |
| cancelText | `string` | `'取消'` | Cancel button label |
| closeOnOverlayClick | `boolean` | `true` | Whether clicking the overlay closes |
| zIndex | `number` | `1000` | z-index |

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
