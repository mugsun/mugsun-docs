---
title: Navbar
demo: pages/demo/nav/navbar
---

# Navbar

`ms-navbar` — Navbar for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-navbar`).
Demo route: `#/pages/demo/nav/navbar`.

## Basic usage

```vue
<template>
  <ms-navbar theme="light" title="…">
    …
  </ms-navbar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| titleAlign | `'center' \| 'left'` | `'center'` | Title align: center / left |
| titleMaxLength | `number` | `0` | Max title length; overflow ends with …; 0 = no truncate |
| leftArrow | `boolean` | `false` | Whether to show left back arrow |
| leftText | `string` | `''` | Left back label; empty shows arrow only |
| homeIcon | `boolean` | `false` | Show a home entry next to back |
| theme | `'light' \| 'brand'` | `'light'` | Theme color |
| fixed | `boolean` | `true` | Whether fixed positioned |
| placeholder | `boolean` | `false` | When fixed, whether to reserve flow space so content is not covered |
| safeAreaInsetTop | `boolean` | `true` | Whether to reserve top safe area |
| zIndex | `number` | `500` | z-index |

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
