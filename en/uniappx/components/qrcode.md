---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode` renders text as a QR code. The encoding matrix is implemented in-house following the Nayuki approach, and modules are drawn with views.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-qrcode`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/qrcode`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/qrcode.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-qrcode :value="demoValue" />
  <ms-qrcode :value="demoValue" logo="/static/logo.png" level="H" />
  <!-- Error correction level -->
  <ms-qrcode :value="demoValue" level="L" size="sm" />
  <ms-qrcode :value="demoValue" level="M" size="sm" />
  <ms-qrcode :value="demoValue" level="Q" size="sm" />
  <!-- States -->
  <ms-qrcode :value="demoValue" status="expired" size="sm" />
  <ms-qrcode :value="demoValue" status="loading" size="sm" />
  <ms-qrcode :value="demoValue" status="scanned" size="sm" />
  <!-- Sizes -->
  <ms-qrcode :value="demoValue" size="sm" />
  <ms-qrcode :value="demoValue" size="md" />
  <ms-qrcode :value="demoValue" size="lg" />
</template>

<script setup lang="uts">
const demoValue = 'https://mugsun.example/qr'
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
