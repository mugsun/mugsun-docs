---
title: Barcode
demo: pages/demo/display/barcode
---

# Barcode

`ms-barcode` — Barcode for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-barcode`).
Demo route: `#/pages/demo/display/barcode`.

## Basic usage

```vue
<template>
  <ms-barcode size="…" value="…">
    …
  </ms-barcode>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Current value |
| encode | `string` | `'ean13'` | Encoding |
| size | `string` | `'md'` | Size |
| showText | `boolean` | `true` | Whether to show readable text under the barcode |

## See also

- Component: `uni_modules/ms-ui/components/ms-barcode/`
- Demo: `#/pages/demo/display/barcode`
- Chinese docs: [/uniappx/components/barcode](/uniappx/components/barcode)
