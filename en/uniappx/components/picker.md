---
title: Picker
demo: pages/demo/form/picker
---

# Picker

`ms-picker` is a wheel picker with one or more columns. Pass the choices as a flat `options` array in which each item names its column with `column`.

By default it opens from the bottom and the default slot is the trigger; set `usePopup` to `false` to embed it in the page.

`value` holds the selected index of each column. The component does not change it, so update it in the `confirm` event.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options; each item has `column` (column index), `label` and `value` |
| value | `number[]` | `[]` | Selected index of each column |
| visible | `boolean` | `false` | Whether it is shown; applies when `usePopup` is `true`. Works with `v-model:visible` |
| title | `string` | `''` | Title; when empty the header only has Cancel and OK |
| cancelText | `string` | `'取消'` | Cancel button label; the default is Chinese for "Cancel" |
| confirmText | `string` | `'确定'` | Confirm button label; the default is Chinese for "OK" |
| header | `boolean` | `true` | Whether to show the header |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Number of visible items |
| usePopup | `boolean` | `true` | Whether it opens from the bottom; `false` embeds it in the page |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the picker opens or closes; used by `v-model:visible` |
| change | `indexes: number[], label: string` | Fires while scrolling, with the index of each column and the labels joined by spaces; nothing is confirmed yet |
| pick | `column: number, index: number` | Fires while scrolling, with the column that changed and its new index |
| confirm | `indexes: number[], label: string` | Fires when OK is tapped, with the same arguments as `change` |
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
| `getLabel(): string` | Returns the label of the current selection in the panel |
| `confirm()` | Confirms the current selection, same as tapping OK |
| `cancel()` | Cancels the selection, same as tapping Cancel |
| `open()` | Opens the picker |
| `close()` | Closes the picker |
