---
title: Weekbar
demo: pages/demo/form/weekbar
---

# Weekbar

`ms-weekbar`: Weekbar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-weekbar`).
Demo route: `#/pages/demo/form/weekbar`.

## Basic usage

```vue
<template>
  <ms-weekbar v-model="value" :disabled="true">
    …
  </ms-weekbar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 选中日期 YYYY-MM-DD |
| startDate | `string` | `''` | 可选范围起（含） |
| endDate | `string` | `''` | 可选范围止（含） |
| mode | `string` | `'rect'` | 选中态：rect / circular / none |
| firstDay | `number` | `0` | 一周起始：0 周一 … 6 周日 |
| showAction | `boolean` | `true` | 是否显示左右切周按钮 |
| markedDates | `string[]` | `[]` | 打点日期 |
| disabledDates | `string[]` | `[]` | 禁用日期（仍可见，不可点） |
| autoSelectToday | `boolean` | `true` | 空值时是否默认选中今天 |
| disabled | `boolean` | `false` | 整体禁用 |

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
