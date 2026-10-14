---
title: Picker
demo: pages/demo/form/picker
---

# Picker

`ms-picker` is a picker. Pass flat `options` (split into columns by `column`, each with `label` and `value`); internally it uses the native `picker-view` and `picker-view-column`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-picker`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/picker`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/picker.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-picker
    ref="probePicker"
    :options="cityOptions"
    :value="cityValue"
    title="Select city"
    @change="onCityChange"
    @confirm="onCityConfirm"
    @cancel="onCityCancel"
  >
    <ms-cell title="Select city" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="seasonOptions"
    :value="seasonValue"
    title="Select period"
    @confirm="onSeasonConfirm"
    @cancel="onSeasonCancel"
  >
    <ms-cell title="Select period" :note="seasonLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="inlineValue"
    title="Inline"
    :use-popup="false"
    @change="onInlineChange"
    @confirm="onInlineConfirm"
  />
  <!-- Styles -->
  <ms-picker
    :options="cityOptions"
    :value="cityValue"
    title="Select city"
    @confirm="onCityConfirm"
  >
    <ms-cell title="Picker with title" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="plainValue"
    @confirm="onPlainConfirm"
  >
    <ms-cell title="Picker without title" :note="plainLabel" arrow :bordered="false" />
  </ms-picker>
</template>

<script setup lang="uts">
const cityLabel = ref('Shanghai')

const cityOptions = [
  { column: 0, label: 'Beijing', value: 'bj' } as UTSJSONObject,
  { column: 0, label: 'Shanghai', value: 'sh' } as UTSJSONObject,
  { column: 0, label: 'Guangzhou', value: 'gz' } as UTSJSONObject,
  { column: 0, label: 'Shenzhen', value: 'sz' } as UTSJSONObject,
  { column: 0, label: 'Hangzhou', value: 'hz' } as UTSJSONObject,
] as UTSJSONObject[]

const cityValue = [1] as number[]

const inlineValue = [2] as number[]

const plainLabel = ref('Beijing')

const plainValue = [0] as number[]

const seasonLabel = ref('2025 Q3')

const seasonOptions = [
  { column: 0, label: '2024', value: '2024' } as UTSJSONObject,
  { column: 0, label: '2025', value: '2025' } as UTSJSONObject,
  { column: 0, label: '2026', value: '2026' } as UTSJSONObject,
  { column: 1, label: 'Q1', value: 'q1' } as UTSJSONObject,
  { column: 1, label: 'Q2', value: 'q2' } as UTSJSONObject,
  { column: 1, label: 'Q3', value: 'q3' } as UTSJSONObject,
  { column: 1, label: 'Q4', value: 'q4' } as UTSJSONObject,
] as UTSJSONObject[]

const seasonValue = [1, 2] as number[]

function onCityChange(indexes: number[], label: string) : void {
  console.log('onCityChange')
}

function onCityConfirm(indexes: number[], label: string) : void {
  console.log('onCityConfirm')
}

function onCityCancel() : void {
  console.log('onCityCancel')
}

function onSeasonConfirm(indexes: number[], label: string) : void {
  console.log('onSeasonConfirm')
}

function onSeasonCancel() : void {
  console.log('onSeasonCancel')
}

function onInlineChange(indexes: number[], label: string) : void {
  console.log('onInlineChange')
}

function onInlineConfirm(indexes: number[], label: string) : void {
  console.log('onInlineConfirm')
}

function onPlainConfirm(indexes: number[], label: string) : void {
  console.log('onPlainConfirm')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Flat options: column (index) + label + value |
| value | `number[]` | `[]` | Selected index per column |
| visible | `boolean` | `false` | Whether visible (when usePopup) |
| title | `string` | `''` | Title; empty keeps only cancel/confirm in the header |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| header | `boolean` | `true` | Whether to show the header |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Visible item count |
| usePopup | `boolean` | `true` | Wrap in popup; false = inline |

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

- Component: `uni_modules/ms-ui/components/ms-picker/`
- Demo: `#/pages/demo/form/picker`
- Chinese docs: [/uniappx/components/picker](/uniappx/components/picker)
