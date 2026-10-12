---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode` — Qrcode for uni-app x.

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
| size | `string` | `'md'` | 'lg'` |
| level | `string` | `'M'` | 'Q' \ |
| logo | `string` | `''` | logo string value |
| status | `string` | `'active'` | 'loading' \ |
| statusText | `string` | `''` | statusText string value |
| margin | `boolean` | `true` | Whether margin is enabled |

## See also

- Component: `uni_modules/ms-ui/components/ms-qrcode/`
- Demo: `#/pages/demo/display/qrcode`
- Chinese docs: [/uniappx/components/qrcode](/uniappx/components/qrcode)
