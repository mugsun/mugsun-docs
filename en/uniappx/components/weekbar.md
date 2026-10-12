---
title: Weekbar
demo: pages/demo/form/weekbar
---

# Weekbar

`ms-weekbar` — Weekbar for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-weekbar`).
Demo route: `#/pages/demo/form/weekbar`.

## Basic usage

```vue
<template>
  <ms-weekbar v-model="value">
    …
  </ms-weekbar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Selected date YYYY-MM-DD |
| startDate | `string` | `''` | Selectable range start (inclusive) |
| endDate | `string` | `''` | Selectable range end (inclusive) |
| mode | `string` | `'rect'` | Selected style: rect / circular / none |
| firstDay | `number` | `0` | Week start: 0 = Monday … 6 = Sunday |
| showAction | `boolean` | `true` | Whether to show prev/next week buttons |
| markedDates | `string[]` | `[]` | Marked dates |
| disabledDates | `string[]` | `[]` | Disabled dates (visible but not tappable) |
| autoSelectToday | `boolean` | `true` | When empty, whether to select today by default |
| disabled | `boolean` | `false` | Disable the whole group |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| weekchange | weekchange |

## See also

- Component: `uni_modules/ms-ui/components/ms-weekbar/`
- Demo: `#/pages/demo/form/weekbar`
- Chinese docs: [/uniappx/components/weekbar](/uniappx/components/weekbar)
