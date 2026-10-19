---
title: Backtop
demo: pages/demo/nav/backtop
---

# Backtop

`ms-backtop` is a back-to-top button. It appears only when `scrollTop` is greater than or equal to `visibilityHeight`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-backtop`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/nav/backtop`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/nav/backtop.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | Page scroll distance (px) |
| visibilityHeight | `number` | `200` | Show only after scrolling past this distance (px) |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | Theme color |
| text | `string` | `''` | Display text |
| icon | `string` | `'skip-up-fill'` | Icon name (icons.uts) |
| fixed | `boolean` | `true` | Whether fixed positioned |
| local | `boolean` | `false` | Whether positioned relative to parent (not fixed) |

## Events

| Event | Description |
| --- | --- |
| to-top | to-top |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-backtop/`
- Demo: `#/pages/demo/nav/backtop`
- Chinese docs: [/uniappx/components/backtop](/uniappx/components/backtop)
