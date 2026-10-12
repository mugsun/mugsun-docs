---
title: Sign Board
demo: pages/demo/form/sign-board
---

# Sign Board

`ms-sign-board`: Sign Board. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sign-board`).
Demo route: `#/pages/demo/form/sign-board`.

## Basic usage

```vue
<template>
  <ms-sign-board :disabled="true">
    …
  </ms-sign-board>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | default / pen / pencil |
| strokeWidth | `number` | `8` | 基准笔宽 px |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| end | end |
| clear | clear |

## See also

- Component: `uni_modules/ms-ui/components/ms-sign-board/`
- Demo: `#/pages/demo/form/sign-board`
- Chinese docs: [/uniappx/components/sign-board](/uniappx/components/sign-board)
