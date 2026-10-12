---
title: Sign Board
demo: pages/demo/form/sign-board
---

# Sign Board

`ms-sign-board` — Sign Board for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sign-board`).
Demo route: `#/pages/demo/form/sign-board`.

## Basic usage

```vue
<template>
  <ms-sign-board>
    …
  </ms-sign-board>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| penType | `string` | `'default'` | default / pen / pencil |
| strokeWidth | `number` | `8` | Base stroke width (px) |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| end | end |
| clear | Clear |

## See also

- Component: `uni_modules/ms-ui/components/ms-sign-board/`
- Demo: `#/pages/demo/form/sign-board`
- Chinese docs: [/uniappx/components/sign-board](/uniappx/components/sign-board)
