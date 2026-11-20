---
title: Picker Selected
demo: pages/demo/form/picker-selected
---

# Picker Selected

`ms-picker-selected` is a searchable picker in a popup. It filters locally or lets the page run an asynchronous search, and supports single and multiple selection.

Bind the selection with `v-model:value`; it updates only after OK is tapped.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-picker-selected
    ref="localPickerRef"
    :value="localValue"
    :options="companies"
    title="Local search"
    @open="onLocalOpen"
    @confirm="onLocalConfirm"
  >
    <ms-cell title="Partner company" :note="localLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="remoteValue"
    :options="remoteOptions"
    :local-search="false"
    title="Async search"
    @open="onRemoteOpen"
    @search="onRemoteSearch"
    @confirm="onRemoteConfirm"
  >
    <ms-cell title="Search companies" :note="remoteLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <!-- Styles -->
  <ms-picker-selected
    :value="multiValue"
    :options="companies"
    :multiple="true"
    title="Multiple companies"
    @open="onMultiOpen"
    @confirm="onMultiConfirm"
  >
    <ms-cell title="Multiple companies" :note="multiLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="singleValue"
    :options="companies"
    :multiple="false"
    :required="true"
    title="Single company"
    @open="onSingleOpen"
    @confirm="onSingleConfirm"
  >
    <ms-cell title="Single company" :note="singleLabel" arrow :bordered="false" />
  </ms-picker-selected>
</template>

<script setup lang="uts">
const companies = ref([
  { id: '1', name: 'Xinrui Cosmetics (Guangzhou)' },
  { id: '2', name: 'Chuangming Exhibition Design (Shenzhen)' },
  { id: '3', name: 'Mengwei Industrial (Shanghai)' },
  { id: '4', name: 'Guodu Futures' },
  { id: '5', name: 'Yuda Group (Shanxi)' },
  { id: '6', name: 'Boda Networks' },
  { id: '7', name: 'Xin Trading' },
  { id: '8', name: 'Donghui Instruments (Dongguan)' },
  { id: '9', name: 'Gulan Electronics' },
  { id: '10', name: 'Bangda Gifts' },
  { id: '11', name: 'Mingzhu Crafts' },
  { id: '12', name: 'Gulate Trading (Fujian)' },
] as UTSJSONObject[])

const localLabel = ref('2 selected')

const localValue = ref(['2', '8'] as string[])

const multiLabel = ref('Xinrui Cosmetics (Guangzhou)')

const multiValue = ref(['1'] as string[])

const remoteLabel = ref('None selected')

const remoteOptions = ref([] as UTSJSONObject[])

const remoteValue = ref([] as string[])

const singleLabel = ref('Guodu Futures')

const singleValue = ref(['4'] as string[])

function onLocalOpen() : void {
  console.log('onLocalOpen')
}

function onLocalConfirm(ids: string[], labels: string[]) : void {
  console.log('onLocalConfirm')
}

function onRemoteOpen() : void {
  console.log('onRemoteOpen')
}

function onRemoteSearch(keyword: string) : void {
  console.log('onRemoteSearch')
}

function onRemoteConfirm(ids: string[], labels: string[]) : void {
  console.log('onRemoteConfirm')
}

function onMultiOpen() : void {
  console.log('onMultiOpen')
}

function onMultiConfirm(ids: string[], labels: string[]) : void {
  console.log('onMultiConfirm')
}

function onSingleOpen() : void {
  console.log('onSingleOpen')
}

function onSingleConfirm(ids: string[], labels: string[]) : void {
  console.log('onSingleConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options; `valueKey` and `labelKey` name the value and text fields |
| value | `string[]` | `[]` | Values of the selected options. Works with `v-model:value` |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'请选择'` | Title; the default is Chinese for "Please select" |
| cancelText | `string` | `'取消'` | Cancel button label; the default is Chinese for "Cancel" |
| confirmText | `string` | `'确定'` | Confirm button label; the default is Chinese for "OK" |
| placeholder | `string` | `'搜索'` | Placeholder of the search box; the default is Chinese for "Search" |
| emptyText | `string` | `'暂无数据'` | Text shown when there is no data; the default is Chinese for "No data" |
| valueKey | `string` | `'id'` | Option value field name |
| labelKey | `string` | `'name'` | Field name of the option text |
| filterKey | `string` | `''` | Field matched by the search; `labelKey` when empty |
| localSearch | `boolean` | `true` | Whether to filter locally; with `false`, run the search yourself in the `search` event and update `options` |
| multiple | `boolean` | `true` | Whether multiple |
| required | `boolean` | `false` | In single selection, whether the selected option cannot be cleared |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the panel opens or closes; used by `v-model:visible` |
| update:value | `ids: string[]` | Fires when OK is tapped; used by `v-model:value` |
| search | `keyword: string` | Fires when the search text changes; `keyword` is an empty string when cleared |
| change | `ids: string[], labels: string[]` | Fires when an option is selected or cleared in the panel; nothing is confirmed yet |
| confirm | `ids: string[], labels: string[]` | Fires when OK is tapped, with the values and texts of the selected options |
| cancel | — | Fires when Cancel is tapped; the panel returns to `value` |
| open | — | Fires when the panel opens |
| close | — | Fires when the panel closes |

## Slots

| Slot | Description |
| --- | --- |
| default | Trigger element that opens the panel on tap |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `getLabels(): string[]` | Returns the texts of the options currently selected in the panel |
| `open()` | Opens the panel; does nothing while disabled |
| `close()` | Closes the panel |
