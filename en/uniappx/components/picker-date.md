---
title: Picker Date
demo: pages/demo/form/picker-date
---

# Picker Date

`ms-picker-date` — Picker Date for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-date`).
Demo route: `#/pages/demo/form/picker-date`.

## Basic usage

```vue
<template>
  <ms-picker-date title="…" v-model:visible="open">
    …
  </ms-picker-date>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Selected value as prefix of 'YYYY-MM-DD HH:mm:ss', truncated by mode |
| mode | `string` | `'date'` | year / month / date / hour / minute / second |
| startYear | `number` | `2020` | Start year |
| endYear | `number` | `2030` | End year |
| minuteStep | `number` | `1` | Minute step |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| cancelText | `string` | `'取消'` | Cancel label |
| confirmText | `string` | `'确定'` | Confirm label |
| header | `boolean` | `true` | Whether to show the header |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Visible item count |
| usePopup | `boolean` | `true` | Whether wrapped in a popup |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| change | Value changed |
| pick | Selection changed (before confirm) |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker-date/`
- Demo: `#/pages/demo/form/picker-date`
- Chinese docs: [/uniappx/components/picker-date](/uniappx/components/picker-date)
