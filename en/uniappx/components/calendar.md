---
title: Calendar
demo: pages/demo/form/calendar
---

# Calendar

`ms-calendar` is a month-view calendar for picking a single date, several dates or a date range.

The selected `value` is a string of `YYYY-MM-DD` dates separated by commas.

It opens in a popup by default; set `usePopup` to `false` to embed it in the page.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Usage -->
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
  <!-- Advanced -->
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
const markList2 = [
  { date: '2026-03-12', prefix: '', suffix: '¥60' } as UTSJSONObject,
  { date: '2026-03-15', prefix: '休', suffix: '' } as UTSJSONObject,
]

function onInlineChange(v: string) : void {
  console.log('onInlineChange')
}

function onResetCalChange(v: string) : void {
  console.log('onResetCalChange')
}

function onSelectDay(day: string) : void {
  console.log('onSelectDay')
}
</script>
```
<!-- demo-snippets:end -->

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
| confirmText | `string` | `'确定'` | Confirm button label; the default is Chinese for "OK" |
| visible | `boolean` | `false` | Whether the popup is visible (when usePopup) |
| usePopup | `boolean` | `true` | Whether displayed inside a popup |
| autoClose | `boolean` | `true` | Whether to auto-close popup after confirm/selection |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires with `false` when the popup closes; used by `v-model:visible` |
| select | `date: string` | Fires when a day is tapped; `date` is that day. Disabled days do not fire it |
| change | `value: string` | Fires when the selected value changes: after confirm when the confirm button is shown, otherwise as soon as the pick is complete |
| confirm | `value: string` | Fires when the confirm button is tapped |
| cancel | — | Fires when the close button is tapped; unconfirmed picks are discarded |
| close | `trigger: string` | Fires on close; `trigger` is the reason: `confirm-btn`, `close-btn`, `overlay` or `auto-close` |
| panel-change | `month: string` | Fires when the visible month changes; `month` is formatted as `YYYY-MM` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getValue(): string` | Returns the current selection in the panel, unconfirmed picks included, in the same format as `value` |
| `confirm()` | Same as tapping the confirm button |
| `cancel()` | Same as tapping the close button |
| `prev()` | Goes to the previous month |
| `next()` | Goes to the next month |
| `reset()` | Discards unconfirmed picks and restores `value` |
