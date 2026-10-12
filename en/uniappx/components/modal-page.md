---
title: Modal Page
demo: pages/demo/feedback/modal-page
---

# Modal Page

`ms-modal-page` — Modal Page for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-modal-page`).
Demo route: `#/pages/demo/feedback/modal-page`.

## Basic usage

```vue
<template>
  <ms-modal-page title="…" v-model:visible="open">
    …
  </ms-modal-page>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| showClose | `boolean` | `true` | Whether to show close |
| closeOnOverlayClick | `boolean` | `false` | Whether clicking the overlay closes |
| zIndex | `number` | `1100` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| open | Opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| footer | `footer` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-modal-page/`
- Demo: `#/pages/demo/feedback/modal-page`
- Chinese docs: [/uniappx/components/modal-page](/uniappx/components/modal-page)
