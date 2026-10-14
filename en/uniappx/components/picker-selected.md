---
title: Picker Selected
demo: pages/demo/form/picker-selected
---

# Picker Selected

`ms-picker-selected` is a searchable picker in a popup. It filters locally or lets the page run an asynchronous search, and supports single and multiple selection.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-picker-selected`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/picker-selected`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/picker-selected.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options list |
| value | `string[]` | `[]` | Current value |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'请选择'` | Title |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| placeholder | `string` | `'搜索'` | Placeholder |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| valueKey | `string` | `'id'` | Option value field name |
| labelKey | `string` | `'name'` | Option label field name |
| filterKey | `string` | `''` | Search match field name |
| localSearch | `boolean` | `true` | Whether to filter within local options |
| multiple | `boolean` | `true` | Whether multiple |
| required | `boolean` | `false` | Whether required |
| disabled | `boolean` | `false` | Whether disabled |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| update:value | v-model:value update |
| search | search |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| open | Opened |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker-selected/`
- Demo: `#/pages/demo/form/picker-selected`
- Chinese docs: [/uniappx/components/picker-selected](/uniappx/components/picker-selected)
