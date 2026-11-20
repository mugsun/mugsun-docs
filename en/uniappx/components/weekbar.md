---
title: Weekbar
demo: pages/demo/form/weekbar
---

# Weekbar

`ms-weekbar` is a week selector that shows seven days in a row and switches weeks with the left and right buttons.

Bind the selected date with `v-model`, in `YYYY-MM-DD` format.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-weekbar v-model="basicDate" @change="onBasicChange" @weekchange="onWeekChange" />
  <ms-weekbar v-model="plainDate" :show-action="false" mode="none" @change="onPlainChange" />
  <!-- Styles -->
  <ms-weekbar v-model="circleDate" mode="circular" :first-day="6" @change="onCircleChange" />
  <ms-weekbar
    v-model="rangeDate"
    :marked-dates="marked"
    :start-date="rangeStart"
    :end-date="rangeEnd"
    @change="onRangeChange"
  />
  <ms-weekbar v-model="basicDate" :disabled="true" />
  <!-- Advanced -->
  <ms-weekbar
    v-model="banDate"
    :disabled-dates="banned"
    @change="onBanChange"
  />
  <ms-weekbar
    v-model="manualDate"
    :auto-select-today="false"
    @change="onManualChange"
  />
  <ms-weekbar
    ref="jumpRef"
    v-model="jumpDate"
    @change="onJumpChange"
  />
</template>

<script setup lang="uts">
const banDate = ref('2026-09-01')

const banned = ref(['2026-09-02', '2026-09-03'] as string[])

const basicDate = ref('2026-08-31')

const circleDate = ref('2026-09-02')

const jumpDate = ref('2026-08-31')

const manualDate = ref('')

const marked = ref(['2026-09-01', '2026-09-03'] as string[])

const plainDate = ref('2026-08-31')

const rangeDate = ref('2026-08-31')

const rangeEnd = ref('2026-09-03')

const rangeStart = ref('2026-08-30')

function onBasicChange(value: string) : void {
  console.log('onBasicChange')
}

function onWeekChange(dates: string[]) : void {
  console.log('onWeekChange')
}

function onPlainChange(value: string) : void {
  console.log('onPlainChange')
}

function onCircleChange(value: string) : void {
  console.log('onCircleChange')
}

function onRangeChange(value: string) : void {
  console.log('onRangeChange')
}

function onBanChange(value: string) : void {
  console.log('onBanChange')
}

function onManualChange(value: string) : void {
  console.log('onManualChange')
}

function onJumpChange(value: string) : void {
  console.log('onJumpChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Selected date in `YYYY-MM-DD` format |
| startDate | `string` | `''` | First selectable date, inclusive |
| endDate | `string` | `''` | Last selectable date, inclusive |
| mode | `string` | `'rect'` | Selected style: rect (rounded block) / circular / none (color only) |
| firstDay | `number` | `0` | First day of the week; `0` is Monday and `6` is Sunday |
| showAction | `boolean` | `true` | Whether to show the previous and next buttons |
| markedDates | `string[]` | `[]` | Dates marked with a dot below |
| disabledDates | `string[]` | `[]` | Disabled dates; still shown but not tappable |
| autoSelectToday | `boolean` | `true` | Whether today is selected by default when `modelValue` is empty |
| disabled | `boolean` | `false` | Whether it is disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the selected date changes; used by `v-model` |
| change | `value: string` | Fires when the selected date changes; `value` is the date in `YYYY-MM-DD` format |
| weekchange | `dates: string[]` | Fires when the week is switched with the buttons; `dates` holds the seven dates of the new week |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getWeek(): string[]` | Returns the seven dates currently shown |
| `toToday()` | Goes back to the current week and selects today; `change` fires as well |
