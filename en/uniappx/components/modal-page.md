---
title: Modal Page
demo: pages/demo/feedback/modal-page
---

# Modal Page

`ms-modal-page`: Modal Page. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-modal-page`).
Demo route: `#/pages/demo/feedback/modal-page`.

## Basic usage

```vue
<template>
  <ms-modal-page title="…" v-model:visible="open">
    …
  </ms-modal-page>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| title | `string` | `''` | — |
| showClose | `boolean` | `true` | — |
| closeOnOverlayClick | `boolean` | `false` | — |
| zIndex | `number` | `1100` | — |

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
