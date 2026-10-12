---
title: Calendar
demo: pages/demo/form/calendar
---

# Calendar

`ms-calendar` — Calendar for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

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
| type | `string` | `'single'` | Selection mode: single / multiple / range |
| value | `string` | `''` | Selected value; multi/range uses comma-separated dates |
| minDate | `string` | `''` | Min selectable date (YYYY-MM-DD) |
| maxDate | `string` | `''` | Max selectable date (YYYY-MM-DD) |
| firstDayOfWeek | `number` | `0` | Week start: 0 = Sunday … 6 = Saturday |
| disabledDates | `string[]` | `[]` | Disabled dates (YYYY-MM-DD) |
| marks | `UTSJSONObject[]` | `[]` | Date markers (fields like date/text) |
| switchMode | `string` | `'none'` | Header switch: none = no switch; month = by month |
| title | `string` | `''` | Popup title; empty uses current year-month |
| weekdays | `string[]` | `[]` | Weekday labels; empty uses the built-in Sun/Mon/… defaults |
| readonly | `boolean` | `false` | Whether read-only |
| allowSameDay | `boolean` | `false` | In range mode, whether start and end may be the same day |
| showConfirm | `boolean` | `true` | Whether to show bottom confirm button |
| confirmText | `string` | `'确定'` | Confirm button label |
| visible | `boolean` | `false` | Whether the popup is visible (when usePopup) |
| usePopup | `boolean` | `true` | Whether displayed inside a popup |
| autoClose | `boolean` | `true` | Whether to auto-close popup after confirm/selection |

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
