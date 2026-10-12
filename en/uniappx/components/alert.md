---
title: Alert
demo: pages/demo/feedback/alert
---

# Alert

`ms-alert` — Alert for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-alert`).
Demo route: `#/pages/demo/feedback/alert`.

## Basic usage

```vue
<template>
  <ms-alert theme="primary" variant="light">
    …
  </ms-alert>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Theme |
| variant | `'light' \| 'solid'` | `'light'` | Variant |
| closable | `boolean` | `true` | Whether closable |
| icon | `string` | `''` | Icon name (icons.uts) |
| showIcon | `boolean` | `true` | Hide the left icon |
| title | `string` | `''` | Title (optional; can coexist with default slot body) |
| visible | `boolean` | `true` | Whether visible; pairs with update:visible so host can reopen |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| close | Closed |
| update:visible | v-model:visible update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-alert/`
- Demo: `#/pages/demo/feedback/alert`
- Chinese docs: [/uniappx/components/alert](/uniappx/components/alert)
