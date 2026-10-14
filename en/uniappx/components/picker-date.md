---
title: Picker Date
demo: pages/demo/form/picker-date
---

# Picker Date

`ms-picker-date` is a date and time picker. `mode` sets the finest column shown, in the order `year`, `month`, `date`, `hour`, `minute`, `second`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-picker-date`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/picker-date`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/picker-date.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-picker-date
    :value="dateText"
    mode="date"
    title="Select date"
    @change="onDateChange"
    @confirm="onDateConfirm"
    @cancel="onDateCancel"
  >
    <ms-cell title="Select date" :note="dateText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="monthText"
    mode="month"
    title="Select month"
    @confirm="onMonthConfirm"
  >
    <ms-cell title="Select month" :note="monthText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="minuteText"
    mode="minute"
    title="Select time"
    @confirm="onMinuteConfirm"
  >
    <ms-cell title="Select time" :note="minuteText" arrow :bordered="false" />
  </ms-picker-date>
  <!-- Usage -->
  <ms-picker-date
    :value="stepText"
    mode="minute"
    :minute-step="5"
    title="5-minute step"
    @confirm="onStepConfirm"
  >
    <ms-cell title="5-minute step" :note="stepText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    value="2026-03-15"
    mode="date"
    title="Inline date"
    :use-popup="false"
    @change="onInlineChange"
    @confirm="onInlineConfirm"
  />
</template>

<script setup lang="uts">
const dateText = ref('2026-03-15')

const minuteText = ref('2026-03-15 09:30')

const monthText = ref('2026-03')

const stepText = ref('2026-03-15 09:30')

function onDateChange(value: string) : void {
  console.log('onDateChange')
}

function onDateConfirm(value: string) : void {
  console.log('onDateConfirm')
}

function onDateCancel() : void {
  console.log('onDateCancel')
}

function onMonthConfirm(value: string) : void {
  console.log('onMonthConfirm')
}

function onMinuteConfirm(value: string) : void {
  console.log('onMinuteConfirm')
}

function onStepConfirm(value: string) : void {
  console.log('onStepConfirm')
}

function onInlineChange(value: string) : void {
  console.log('onInlineChange')
}

function onInlineConfirm(value: string) : void {
  console.log('onInlineConfirm')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
