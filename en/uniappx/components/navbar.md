---
title: Navbar
demo: pages/demo/nav/navbar
---

# Navbar

`ms-navbar` — Navbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-navbar` (repository not yet public).
Demo route: `#/pages/demo/nav/navbar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/navbar.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <ms-navbar title="纯标题" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="带返回"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar
    title="返回加首页"
    left-arrow
    home-icon
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
    @go-home="onHome"
  />
  <ms-navbar title="标题居中" left-arrow :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="标题左对齐"
    title-align="left"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
  />
  <ms-navbar
    left-arrow
    left-text="返回带文案"
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar title="浅色" left-arrow theme="light" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="品牌色"
    left-arrow
    theme="brand"
    :fixed="false"
    :safe-area-inset-top="false"
  />
</template>

<script setup lang="uts">
function onBack() : void {
  console.log('onBack')
}

function onHome() : void {
  console.log('onHome')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
