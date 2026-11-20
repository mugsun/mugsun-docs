---
title: Navbar
demo: pages/demo/nav/navbar
---

# Navbar

`ms-navbar` is a custom top navigation bar with back and home buttons on the left, a title in the middle and actions on the right.

Tapping the back or home button only fires an event; do the navigation yourself in `go-back` and `go-home`.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| titleAlign | `'center' \| 'left'` | `'center'` | Title align: center / left |
| titleMaxLength | `number` | `0` | Max title length; overflow ends with …; 0 = no truncate |
| leftArrow | `boolean` | `false` | Whether to show left back arrow |
| leftText | `string` | `''` | Text next to the back arrow; empty shows the arrow only |
| homeIcon | `boolean` | `false` | Whether to show a home button next to the back button |
| theme | `'light' \| 'brand'` | `'light'` | Color scheme: light / brand |
| fixed | `boolean` | `true` | Whether to fix the bar to the top of the page |
| placeholder | `boolean` | `false` | When fixed, whether to reserve the same height in the page so content is not covered |
| safeAreaInsetTop | `boolean` | `true` | Whether to reserve top safe area |
| zIndex | `number` | `500` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| go-back | — | Fires when the back button is tapped |
| go-home | — | Fires when the home button is tapped |

## Slots

| Slot | Description |
| --- | --- |
| left | Extra content on the left, after the back and home buttons |
| title | Custom title |
| right | Actions on the right |
