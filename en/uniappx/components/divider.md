---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider` is a divider line. `layout` sets horizontal or vertical, `align` places the text left, center or right, `dashed` draws a dashed line, and `text` sets the label. The default slot can replace the label; when the slot has content, the labeled layout is used.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-divider`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/basic/divider`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/basic/divider.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
