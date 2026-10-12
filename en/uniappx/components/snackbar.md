---
title: Snackbar
demo: pages/demo/feedback/snackbar
---

# Snackbar

`ms-snackbar` — Snackbar for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-snackbar`).
Demo route: `#/pages/demo/feedback/snackbar`.

## Basic usage

```vue
<template>
  <ms-snackbar theme="info" v-model:visible="open">
    …
  </ms-snackbar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Content text |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Theme color |
| showIcon | `boolean` | `true` | Whether to show the theme default icon |
| icon | `string` | `''` | Custom icon name (icons.uts); empty uses theme default |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| actionText | `string` | `''` | Right action label; empty hides it |
| placement | `'top' \| 'bottom'` | `'top'` | Popup / placement |
| align | `'left' \| 'center'` | `'left'` | Text align: left / center |
| block | `boolean` | `false` | Full bleed: drop max-width and stretch edge to edge |
| duration | `number` | `3000` | Milliseconds; 0 = do not auto-close |
| zIndex | `number` | `1200` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| action | Action button |
| duration-end | duration-end |

## See also

- Component: `uni_modules/ms-ui/components/ms-snackbar/`
- Demo: `#/pages/demo/feedback/snackbar`
- Chinese docs: [/uniappx/components/snackbar](/uniappx/components/snackbar)
