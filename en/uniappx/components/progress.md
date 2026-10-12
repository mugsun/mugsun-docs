---
title: Progress
demo: pages/demo/display/progress
---

# Progress

`ms-progress` — Progress for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-progress`).
Demo route: `#/pages/demo/display/progress`.

## Basic usage

```vue
<template>
  <ms-progress variant="line" size="xs">
    …
  </ms-progress>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| percentage | `number` | `0` | Progress percent 0–100 |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | Style variant |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | Status |
| strokeWidth | `number` | `6` | Track thickness (px) |
| label | `boolean \| string` | `true` | Label text |
| size | `'xs' \| 'md'` | `'md'` | Size |

## See also

- Component: `uni_modules/ms-ui/components/ms-progress/`
- Demo: `#/pages/demo/display/progress`
- Chinese docs: [/uniappx/components/progress](/uniappx/components/progress)
