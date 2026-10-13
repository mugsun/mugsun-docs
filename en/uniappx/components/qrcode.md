---
title: Qrcode
demo: pages/demo/display/qrcode
---

# Qrcode

`ms-qrcode` — Qrcode for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-qrcode` (repository not yet public).
Demo route: `#/pages/demo/display/qrcode`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/qrcode.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-qrcode :value="demoValue" />
  <ms-qrcode :value="demoValue" logo="/static/logo.png" level="H" />
  <!-- 纠错等级 -->
  <ms-qrcode :value="demoValue" level="L" size="sm" />
  <ms-qrcode :value="demoValue" level="M" size="sm" />
  <ms-qrcode :value="demoValue" level="Q" size="sm" />
  <!-- 组件状态 -->
  <ms-qrcode :value="demoValue" status="expired" size="sm" />
  <ms-qrcode :value="demoValue" status="loading" size="sm" />
  <ms-qrcode :value="demoValue" status="scanned" size="sm" />
  <!-- 组件尺寸 -->
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
