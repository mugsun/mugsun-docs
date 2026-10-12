---
title: Link
demo: pages/demo/basic/link
---

# Link

`ms-link`: Link. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-link`).
Demo route: `#/pages/demo/basic/link`.

## Basic usage

```vue
<template>
  <ms-link theme="default" size="sm">
    …
  </ms-link>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| underline | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| href | `string` | `''` | — |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | — |
| icon | `string` | `''` | — |
| suffixIcon | `string` | `''` | — |
| content | `string` | `''` | 文案；无默认插槽内容时使用 |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-link/`
- Demo: `#/pages/demo/basic/link`
- Chinese docs: [/uniappx/components/link](/uniappx/components/link)
