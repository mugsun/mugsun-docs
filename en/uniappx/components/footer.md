---
title: Footer
demo: pages/demo/nav/footer
---

# Footer

`ms-footer`: Footer. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-footer`).
Demo route: `#/pages/demo/nav/footer`.

## Basic usage

```vue
<template>
  <ms-footer text="…">
    …
  </ms-footer>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `''` | — |
| links | `UTSJSONObject[]` | `[]` | — |
| logoTitle | `string` | `''` | — |
| logoIcon | `string` | `''` | — |
| logoWithInfo | `boolean` | `false` | logo 模式下是否仍显示链接与版权 |

## Events

| Event | Description |
| --- | --- |
| link | link |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-footer/`
- Demo: `#/pages/demo/nav/footer`
- Chinese docs: [/uniappx/components/footer](/uniappx/components/footer)
