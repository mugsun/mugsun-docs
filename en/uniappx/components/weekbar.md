---
title: Weekbar
demo: pages/demo/form/weekbar
---

# Weekbar

`ms-weekbar` — Weekbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-weekbar` (commercial edition; source not public).
Demo route: `#/pages/demo/form/weekbar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/weekbar.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | Selected date YYYY-MM-DD |
| startDate | `string` | `''` | Selectable range start (inclusive) |
| endDate | `string` | `''` | Selectable range end (inclusive) |
| mode | `string` | `'rect'` | Selected style: rect / circular / none |
| firstDay | `number` | `0` | Week start: 0 = Monday … 6 = Sunday |
| showAction | `boolean` | `true` | Whether to show prev/next week buttons |
| markedDates | `string[]` | `[]` | Marked dates |
| disabledDates | `string[]` | `[]` | Disabled dates (visible but not tappable) |
| autoSelectToday | `boolean` | `true` | When empty, whether to select today by default |
| disabled | `boolean` | `false` | Disable the whole group |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |
| weekchange | weekchange |

## See also

- Component: `uni_modules/ms-ui/components/ms-weekbar/`
- Demo: `#/pages/demo/form/weekbar`
- Chinese docs: [/uniappx/components/weekbar](/uniappx/components/weekbar)
