---
title: Divider
demo: pages/demo/basic/divider
---

# Divider

`ms-divider`: Divider. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-divider`).
Demo route: `#/pages/demo/basic/divider`.

## Basic usage

```vue
<template>
  <ms-divider text="…">
    …
  </ms-divider>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | — |
| align | `'left' \| 'center' \| 'right'` | `'center'` | — |
| dashed | `boolean` | `false` | — |
| text | `string` | `''` | — |

## See also

- Component: `uni_modules/ms-ui/components/ms-divider/`
- Demo: `#/pages/demo/basic/divider`
- Chinese docs: [/uniappx/components/divider](/uniappx/components/divider)
