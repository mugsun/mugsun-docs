---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode` — Qrcode for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-qrcode`).
Demo route: `#/pages/demo/display/qrcode`.

## Basic usage

```vue
<template>
  <ms-qrcode size="…" value="…">
    …
  </ms-qrcode>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| size | `string` | `'md'` | Size |
| level | `string` | `'M'` | Error-correction level |
| logo | `string` | `''` | Center logo image URL |
| status | `string` | `'active'` | Status |
| statusText | `string` | `''` | Overlay text when not active; empty uses built-in |
| margin | `boolean` | `true` | Whether to keep a quiet zone |

## See also

- Component: `uni_modules/ms-ui/components/ms-qrcode/`
- Demo: `#/pages/demo/display/qrcode`
- Chinese docs: [/uniappx/components/qrcode](/uniappx/components/qrcode)
