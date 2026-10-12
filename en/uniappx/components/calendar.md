---
title: Calendar
demo: pages/demo/form/calendar
---

# Calendar

月网格日历。`type`：`single` / `multiple` / `range`。`value` 为 `YYYY-MM-DD` 逗号串。`marks` 扁平上下标。`switchMode=month` 翻月；`none` 平铺。弹层 `ms-popup`；`usePopup=false` 内嵌。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-calendar`).
Demo route: `#/pages/demo/form/calendar`.

## Basic usage

```vue
<template>
  <ms-calendar title="…" v-model:visible="open">
    …
  </ms-calendar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `'single'` | — |
| value | `string` | `''` | — |
| minDate | `string` | `''` | — |
| maxDate | `string` | `''` | — |
| firstDayOfWeek | `number` | `0` | — |
| disabledDates | `string[]` | `[]` | — |
| marks | `UTSJSONObject[]` | `[]` | — |
| switchMode | `string` | `'none'` | — |
| title | `string` | `''` | — |
| weekdays | `string[]` | `[]` | — |
| readonly | `boolean` | `false` | — |
| allowSameDay | `boolean` | `false` | — |
| showConfirm | `boolean` | `true` | — |
| confirmText | `string` | `'确定'` | — |
| visible | `boolean` | `false` | — |
| usePopup | `boolean` | `true` | — |
| autoClose | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| select | select |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |
| panel-change | panel-change |

## See also

- Component: `uni_modules/ms-ui/components/ms-calendar/`
- Demo: `#/pages/demo/form/calendar`
- Chinese docs: [/uniappx/components/calendar](/uniappx/components/calendar)
