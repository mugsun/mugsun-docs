---
title: Barcode
demo: pages/demo/display/barcode
---

# Barcode

`ms-barcode`: Barcode. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-barcode`).
Demo route: `#/pages/demo/display/barcode`.

## Basic usage

```vue
<template>
  <ms-barcode size="…">
    …
  </ms-barcode>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | — |
| encode | `string` | `'ean13'` | — |
| size | `string` | `'md'` | — |
| showText | `boolean` | `true` | — |

## See also

- Component: `uni_modules/ms-ui/components/ms-barcode/`
- Demo: `#/pages/demo/display/barcode`
- Chinese docs: [/uniappx/components/barcode](/uniappx/components/barcode)
