---
title: Rolling Number
demo: pages/demo/display/rolling-number
---

# Rolling Number

`ms-rolling-number` — Rolling Number for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-rolling-number`).
Demo route: `#/pages/demo/display/rolling-number`.

## Basic usage

```vue
<template>
  <ms-rolling-number size="md">
    …
  </ms-rolling-number>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Current value |
| start | `number` | `0` | Start value |
| duration | `number` | `400` | Duration (ms) |
| decimals | `number` | `-1` | Decimal places |
| grouping | `boolean` | `false` | Whether grouped |
| prefix | `string` | `''` | Prefix |
| suffix | `string` | `''` | Suffix |
| animated | `boolean` | `true` | Whether animation is enabled |
| size | `'md' \| 'lg'` | `'md'` | Size |

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
