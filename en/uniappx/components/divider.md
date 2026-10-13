---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider` — Divider for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-divider` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/divider`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/divider.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Plain divider -->
  <ms-divider />
  <!-- Alignment -->
  <ms-divider text="Left" align="left" />
  <ms-divider text="Center" align="center" />
  <ms-divider text="Right" align="right" />
  <!-- Vertical -->
  <ms-divider layout="vertical" />
  <ms-divider layout="vertical" />
  <!-- Dashed -->
  <ms-divider dashed />
  <ms-divider dashed text="Text" align="left" />
  <ms-divider dashed text="Text" align="center" />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| align | `'left' \| 'center' \| 'right'` | `'center'` | Alignment |
| dashed | `boolean` | `false` | Whether dashed |
| text | `string` | `''` | Display text |

## See also

- Component: `uni_modules/ms-ui/components/ms-divider/`
- Demo: `#/pages/demo/basic/divider`
- Chinese docs: [/uniappx/components/divider](/uniappx/components/divider)
