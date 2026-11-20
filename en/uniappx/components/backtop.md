---
title: Backtop
demo: pages/demo/nav/backtop
---

# Backtop

`ms-backtop` is a back-to-top button. It appears only when `scrollTop` is greater than or equal to `visibilityHeight`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Theme styles -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
    text="Top"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="half-round"
    text="Back"
  />
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round-dark"
  />
  <!-- Content -->
  <ms-backtop
    :scroll-top="999"
    :visibility-height="0"
    :fixed="false"
    theme="round"
  />
  <!-- Scoped scrolling -->
  <ms-backtop
    :scroll-top="localScrollY"
    :visibility-height="40"
    local
    theme="round-dark"
    @to-top="onLocalToTop"
  />
</template>

<script setup lang="uts">
const localScrollY = ref(0)

function onLocalToTop() : void {
  console.log('onLocalToTop')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | Page scroll distance (px) |
| visibilityHeight | `number` | `200` | Show only after scrolling past this distance (px) |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | Button style |
| text | `string` | `''` | Optional button text |
| icon | `string` | `'skip-up-fill'` | Icon name (icons.uts) |
| fixed | `boolean` | `true` | Whether fixed positioned |
| local | `boolean` | `false` | Position relative to the parent. When on, a tap only emits events and you scroll the container yourself |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| to-top | — | Fires on tap. Unless `local` is on, the page also scrolls back to the top |
| click | — | Fires on tap, right after `to-top` |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom button content; shows the icon by default |
