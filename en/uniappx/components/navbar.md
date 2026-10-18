---
title: Navbar
demo: pages/demo/nav/navbar
---

# Navbar

`ms-navbar` is a custom top navigation bar with back or home buttons on the left, a title in the middle and actions on the right. It provides three slots: `left`, `title` and `right`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-navbar`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/nav/navbar`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/navbar.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-navbar title="Title only" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="With back"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar
    title="Back and home"
    left-arrow
    home-icon
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
    @go-home="onHome"
  />
  <ms-navbar title="Centered title" left-arrow :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="Left-aligned title"
    title-align="left"
    left-arrow
    :fixed="false"
    :safe-area-inset-top="false"
  />
  <ms-navbar
    left-arrow
    left-text="Back with text"
    :fixed="false"
    :safe-area-inset-top="false"
    @go-back="onBack"
  />
  <ms-navbar title="Light" left-arrow theme="light" :fixed="false" :safe-area-inset-top="false" />
  <ms-navbar
    title="Brand"
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
