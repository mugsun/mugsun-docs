---
title: Progress
demo: pages/demo/display/progress
---

# Progress

进度条：线形 / 内显 / 环形；`percentage` + `status` + 可选 `label`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-progress`).
Demo route: `#/pages/demo/display/progress`.

## Basic usage

```vue
<template>
  <ms-progress variant="line" size="xs">
    …
  </ms-progress>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| percentage | `number` | `0` | — |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | — |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | — |
| strokeWidth | `number` | `6` | — |
| label | `boolean \| string` | `true` | — |
| size | `'xs' \| 'md'` | `'md'` | — |

## See also

- Component: `uni_modules/ms-ui/components/ms-progress/`
- Demo: `#/pages/demo/display/progress`
- Chinese docs: [/uniappx/components/progress](/uniappx/components/progress)
