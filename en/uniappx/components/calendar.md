---
title: Calendar
demo: pages/demo/form/calendar
---

# Calendar

`ms-calendar` — Calendar for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-calendar`).
Demo route: `#/pages/demo/form/calendar`.

## Basic usage

```vue
<template>
  <ms-calendar title="…" v-model:visible="open">
    …
  </ms-calendar>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `'single'` | Type |
| value | `string` | `''` | Current value |
| minDate | `string` | `''` | minDate string value |
| maxDate | `string` | `''` | maxDate string value |
| firstDayOfWeek | `number` | `0` | First day of week |
| disabledDates | `string[]` | `[]` | Disabled dates |
| marks | `UTSJSONObject[]` | `[]` | Marks |
| switchMode | `string` | `'none'` | switchMode string value |
| title | `string` | `''` | Title |
| weekdays | `string[]` | `[]` | weekdays string value |
| readonly | `boolean` | `false` | Whether read-only |
| allowSameDay | `boolean` | `false` | Allow selecting the same day |
| showConfirm | `boolean` | `true` | Whether to show confirm |
| confirmText | `string` | `'确定'` | Confirm button label |
| visible | `boolean` | `false` | Whether visible |
| usePopup | `boolean` | `true` | Whether to use popup |
| autoClose | `boolean` | `true` | Whether to auto-close |

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
