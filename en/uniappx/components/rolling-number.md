---
title: Rolling Number
demo: pages/demo/display/rolling-number
---

# Rolling Number

`ms-rolling-number`: Rolling Number. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-rolling-number`).
Demo route: `#/pages/demo/display/rolling-number`.

## Basic usage

```vue
<template>
  <ms-rolling-number size="md">
    …
  </ms-rolling-number>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | — |
| start | `number` | `0` | — |
| duration | `number` | `400` | — |
| decimals | `number` | `-1` | — |
| grouping | `boolean` | `false` | — |
| prefix | `string` | `''` | — |
| suffix | `string` | `''` | — |
| animated | `boolean` | `true` | — |
| size | `'md' \| 'lg'` | `'md'` | — |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| complete | complete |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-rolling-number/`
- Demo: `#/pages/demo/display/rolling-number`
- Chinese docs: [/uniappx/components/rolling-number](/uniappx/components/rolling-number)
