---
title: Loading
demo: pages/demo/basic/loading
---

# Loading

`ms-loading` — Loading for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-loading`).
Demo route: `#/pages/demo/basic/loading`.

## Basic usage

```vue
<template>
  <ms-loading size="sm" text="…">
    …
  </ms-loading>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | Display text |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | Tone: default / primary / inverse |
| indicator | `boolean` | `true` | Whether to show indicator |
| paused | `boolean` | `false` | Whether spin animation is paused |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-loading/`
- Demo: `#/pages/demo/basic/loading`
- Chinese docs: [/uniappx/components/loading](/uniappx/components/loading)
