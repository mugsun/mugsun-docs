---
title: Popup
demo: pages/demo/feedback/popup
---

# Popup

`ms-popup` — Popup for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-popup`).
Demo route: `#/pages/demo/feedback/popup`.

## Basic usage

```vue
<template>
  <ms-popup title="…" v-model:visible="open">
    …
  </ms-popup>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| placement | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` | Placement |
| title | `string` | `''` | Title |
| showOverlay | `boolean` | `true` | Whether to show overlay |
| closeOnOverlayClick | `boolean` | `true` | Close when overlay is clicked |
| closeBtn | `boolean` | `false` | Whether to show close button |
| round | `boolean` | `true` | Whether rounded |
| zIndex | `number` | `1000` | z-index |

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
