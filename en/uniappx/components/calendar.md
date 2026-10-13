---
title: Calendar
demo: pages/demo/form/calendar
---

# Calendar

`ms-calendar` — Calendar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-calendar`).
Demo route: `#/pages/demo/form/calendar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/calendar.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件用法 -->
  <ms-calendar
    value="2026-03-10,2026-03-18"
    type="range"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    min-date="2026-03-01"
    max-date="2026-03-31"
    :marks="markList2"
    @change="onInlineChange"
  />
  <!-- 组件深度 -->
  <ms-calendar
    ref="resetCalRef"
    value="2026-04-10"
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-04-01"
    max-date="2026-04-30"
    @change="onResetCalChange"
  />
  <ms-calendar
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-05-01"
    max-date="2026-05-31"
    @select="onSelectDay"
  />
</template>

<script setup lang="uts">
const resetCalRef = ref(null)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
