---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode`: Qrcode. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-qrcode`).
Demo route: `#/pages/demo/display/qrcode`.

## Basic usage

```vue
<template>
  <ms-qrcode size="…">
    …
  </ms-qrcode>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | — |
| size | `string` | `'md'` | — |
| level | `string` | `'M'` | — |
| logo | `string` | `''` | — |
| status | `string` | `'active'` | — |
| statusText | `string` | `''` | — |
| margin | `boolean` | `true` | — |

## See also

- Component: `uni_modules/ms-ui/components/ms-qrcode/`
- Demo: `#/pages/demo/display/qrcode`
- Chinese docs: [/uniappx/components/qrcode](/uniappx/components/qrcode)
