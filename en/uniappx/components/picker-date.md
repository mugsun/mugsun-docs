---
title: Picker Date
demo: pages/demo/form/picker-date
---

# Picker Date

`ms-picker-date` is a wheel picker for dates and times. `mode` sets how fine the selection goes, from year down to second.

`value` is the leading part of `YYYY-MM-DD HH:mm:ss` cut at `mode`, for example `2026-05` when `mode="month"`.

The component does not change `value`; update it in the `confirm` event.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | Selected value: the leading part of `YYYY-MM-DD HH:mm:ss` cut at `mode` |
| mode | `string` | `'date'` | Finest level to pick: year / month / date / hour / minute / second |
| startYear | `number` | `2020` | First selectable year |
| endYear | `number` | `2030` | Last selectable year |
| minuteStep | `number` | `1` | Step between minute values |
| visible | `boolean` | `false` | Whether it is shown; applies when `usePopup` is `true`. Works with `v-model:visible` |
| title | `string` | `''` | Title |
| cancelText | `string` | `'取消'` | Cancel button text; the default is Chinese for "Cancel" |
| confirmText | `string` | `'确定'` | OK button text; the default is Chinese for "OK" |
| header | `boolean` | `true` | Whether to show the header |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Number of visible items |
| usePopup | `boolean` | `true` | Whether it opens from the bottom; `false` embeds it in the page |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the picker opens or closes; used by `v-model:visible` |
| change | `value: string` | Fires while scrolling; `value` is the current value in the panel, not confirmed yet |
| pick | `value: string` | Fires together with `change`, with the same argument |
| confirm | `value: string` | Fires when OK is tapped; `value` is the selected value |
| cancel | — | Fires when Cancel is tapped; the panel returns to `value` |
| close | — | Fires when the popup closes |

## Slots

| Slot | Description |
| --- | --- |
| default | Trigger element that opens the picker on tap; not rendered when `usePopup` is `false` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getValue(): string` | Returns the current value in the panel |
| `confirm()` | Confirms the current selection, same as tapping OK |
| `cancel()` | Cancels the selection, same as tapping Cancel |
| `open()` | Opens the picker |
| `close()` | Closes the picker |
