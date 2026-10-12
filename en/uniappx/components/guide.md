---
title: Guide
demo: pages/demo/feedback/guide
---

# Guide

`ms-guide` — Guide for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-guide`).
Demo route: `#/pages/demo/feedback/guide`.

## Basic usage

```vue
<template>
  <ms-guide>
    …
  </ms-guide>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | steps |
| current | `number` | `-1` | Current index |
| mode | `'popover' \| 'dialog'` | `'popover'` | Mode |
| showOverlay | `boolean` | `true` | Whether to show overlay |
| highlightPadding | `number` | `8` | Highlight padding (px) |
| hideSkip | `boolean` | `false` | Hide skip |
| hideCounter | `boolean` | `false` | Hide counter |
| hideBack | `boolean` | `false` | Hide back |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| skip | Skipped |
| finish | Finished |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-guide/`
- Demo: `#/pages/demo/feedback/guide`
- Chinese docs: [/uniappx/components/guide](/uniappx/components/guide)
