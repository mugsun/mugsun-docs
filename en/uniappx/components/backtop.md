---
title: Backtop
demo: pages/demo/nav/backtop
---

# Backtop

回顶按钮：`scrollTop` ≥ `visibilityHeight` 才显示。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-backtop`).
Demo route: `#/pages/demo/nav/backtop`.

## Basic usage

```vue
<template>
  <ms-backtop theme="round" text="…">
    …
  </ms-backtop>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | — |
| visibilityHeight | `number` | `200` | — |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | — |
| text | `string` | `''` | — |
| icon | `string` | `'skip-up-fill'` | — |
| fixed | `boolean` | `true` | — |
| local | `boolean` | `false` | — |

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
