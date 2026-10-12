---
title: Navbar
demo: pages/demo/nav/navbar
---

# Navbar

`ms-navbar`: Navbar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-navbar`).
Demo route: `#/pages/demo/nav/navbar`.

## Basic usage

```vue
<template>
  <ms-navbar theme="light" title="…">
    …
  </ms-navbar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | — |
| titleAlign | `'center' \| 'left'` | `'center'` | — |
| titleMaxLength | `number` | `0` | 标题最大字数，超出用 … 收尾；0 表示不截断 |
| leftArrow | `boolean` | `false` | — |
| leftText | `string` | `''` | 左侧返回文案；空串只显示箭头 |
| homeIcon | `boolean` | `false` | 返回旁再放一个首页入口 |
| theme | `'light' \| 'brand'` | `'light'` | — |
| fixed | `boolean` | `true` | — |
| placeholder | `boolean` | `false` | fixed 时是否在文档流里占位，避免内容被压住 |
| safeAreaInsetTop | `boolean` | `true` | — |
| zIndex | `number` | `500` | — |

## Events

| Event | Description |
| --- | --- |
| go-back | go-back |
| go-home | go-home |

## Slots

| Slot | Description |
| --- | --- |
| left | `left` slot |
| right | `right` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-navbar/`
- Demo: `#/pages/demo/nav/navbar`
- Chinese docs: [/uniappx/components/navbar](/uniappx/components/navbar)
