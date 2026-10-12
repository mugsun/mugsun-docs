---
title: Popup
demo: pages/demo/feedback/popup
---

# Popup

`ms-popup`: Popup. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-popup`).
Demo route: `#/pages/demo/feedback/popup`.

## Basic usage

```vue
<template>
  <ms-popup title="…" v-model:visible="open">
    …
  </ms-popup>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | — |
| title | `string` | `''` | — |
| showOverlay | `boolean` | `true` | — |
| closeOnOverlayClick | `boolean` | `true` | — |
| closeBtn | `boolean` | `false` | — |
| round | `boolean` | `true` | — |
| zIndex | `number` | `1000` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| overlay-click | Overlay click |
| open | Opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-popup/`
- Demo: `#/pages/demo/feedback/popup`
- Chinese docs: [/uniappx/components/popup](/uniappx/components/popup)
