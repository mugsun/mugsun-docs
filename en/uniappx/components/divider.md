---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider` — Divider for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-divider`).
Demo route: `#/pages/demo/basic/divider`.

## Basic usage

```vue
<template>
  <ms-divider text="…">
    …
  </ms-divider>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
