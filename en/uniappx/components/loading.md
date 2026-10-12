---
title: Loading
demo: pages/demo/basic/loading
---

# Loading

`ms-loading`: Loading. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-loading`).
Demo route: `#/pages/demo/basic/loading`.

## Basic usage

```vue
<template>
  <ms-loading size="sm" text="…">
    …
  </ms-loading>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | — |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | — |
| indicator | `boolean` | `true` | — |
| paused | `boolean` | `false` | — |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-loading/`
- Demo: `#/pages/demo/basic/loading`
- Chinese docs: [/uniappx/components/loading](/uniappx/components/loading)
