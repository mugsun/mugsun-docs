---
title: Guide
demo: pages/demo/feedback/guide
---

# Guide

`ms-guide`: Guide. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-guide`).
Demo route: `#/pages/demo/feedback/guide`.

## Basic usage

```vue
<template>
  <ms-guide>
    …
  </ms-guide>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | — |
| current | `number` | `-1` | — |
| mode | `'popover' \| 'dialog'` | `'popover'` | — |
| showOverlay | `boolean` | `true` | — |
| highlightPadding | `number` | `8` | — |
| hideSkip | `boolean` | `false` | — |
| hideCounter | `boolean` | `false` | — |
| hideBack | `boolean` | `false` | — |

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
