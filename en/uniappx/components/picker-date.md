---
title: Picker Date
demo: pages/demo/form/picker-date
---

# Picker Date

`ms-picker-date` — Picker Date for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-picker-date` (repository not yet public).
Demo route: `#/pages/demo/form/picker-date`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/picker-date.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-date
    :value="dateText"
    mode="date"
    title="选择日期"
    @change="onDateChange"
    @confirm="onDateConfirm"
    @cancel="onDateCancel"
  >
    <ms-cell title="选择日期" :note="dateText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="monthText"
    mode="month"
    title="选择月份"
    @confirm="onMonthConfirm"
  >
    <ms-cell title="选择月份" :note="monthText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="minuteText"
    mode="minute"
    title="选择时分"
    @confirm="onMinuteConfirm"
  >
    <ms-cell title="选择时分" :note="minuteText" arrow :bordered="false" />
  </ms-picker-date>
  <!-- 组件用法 -->
  <ms-picker-date
    :value="stepText"
    mode="minute"
    :minute-step="5"
    title="五分钟步长"
    @confirm="onStepConfirm"
  >
    <ms-cell title="五分钟步长" :note="stepText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    value="2026-03-15"
    mode="date"
    title="内嵌日期"
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
