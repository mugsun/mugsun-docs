---
title: Picker City
demo: pages/demo/form/picker-city
---

# Picker City

`ms-picker-city` is a wheel picker for linked province, city and district selection, down to city or district level.

Pass the data as a flat `options` array whose items have `value`, `label` and `parent`, the same format as [`ms-cascader`](./cascader).

No national region data is bundled; it can come from the backend `sys_region` table.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-picker-city
    :value="popupValue"
    :options="regions"
    title="Select region"
    @confirm="onPopupConfirm"
    @change="onChange"
  >
    <ms-cell title="Region" :note="popupLabel" arrow :bordered="false" />
  </ms-picker-city>
  <ms-picker-city
    :value="inlineValue"
    :options="regions"
    :use-popup="false"
    title="Always visible"
    @confirm="onInlineConfirm"
  />
  <!-- Styles -->
  <ms-picker-city
    :value="twoValue"
    :options="regions"
    :level="2"
    :use-popup="false"
    title="Province and city only"
    @confirm="onTwoConfirm"
  />
</template>

<script setup lang="uts">
const inlineValue = ref(['110000', '110100', '110102'] as string[])

const popupLabel = ref('上海市 / 上海城区 / 徐汇区')

const popupValue = ref(['310000', '310100', '310104'] as string[])

const regions = ref([
  { value: '110000', label: '北京市', parent: '' },
  { value: '110100', label: '北京城区', parent: '110000' },
  { value: '110101', label: '东城区', parent: '110100' },
  { value: '110102', label: '西城区', parent: '110100' },
  { value: '110105', label: '朝阳区', parent: '110100' },
  { value: '310000', label: '上海市', parent: '' },
  { value: '310100', label: '上海城区', parent: '310000' },
  { value: '310101', label: '黄浦区', parent: '310100' },
  { value: '310104', label: '徐汇区', parent: '310100' },
  { value: '350000', label: '福建省', parent: '' },
  { value: '350100', label: '福州市', parent: '350000' },
  { value: '350102', label: '鼓楼区', parent: '350100' },
  { value: '350103', label: '台江区', parent: '350100' },
  { value: '350200', label: '厦门市', parent: '350000' },
  { value: '350203', label: '思明区', parent: '350200' },
  { value: '350205', label: '海沧区', parent: '350200' },
] as UTSJSONObject[])

const twoValue = ref(['350000', '350200'] as string[])

function onPopupConfirm(values: string[], label: string) : void {
  console.log('onPopupConfirm')
}

function onChange(values: string[], label: string) : void {
  console.log('onChange')
}

function onInlineConfirm(values: string[], label: string) : void {
  console.log('onInlineConfirm')
}

function onTwoConfirm(values: string[], label: string) : void {
  console.log('onTwoConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Regions; each item has `value`, `label` and `parent` |
| value | `string[]` | `[]` | Selected `value` of each level; empty selects the first item of each level. Works with `v-model:value` |
| level | `number` | `3` | Levels: `2` down to city, `3` down to district |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'选择地区'` | Title; the default is Chinese for "Select a region" |
| cancelText | `string` | `'取消'` | Cancel button label; the default is Chinese for "Cancel" |
| confirmText | `string` | `'确定'` | Confirm button label; the default is Chinese for "OK" |
| separator | `string` | `' / '` | Separator between the labels of each level |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Number of visible items |
| usePopup | `boolean` | `true` | Whether it opens from the bottom; `false` embeds it in the page |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the picker opens or closes; used by `v-model:visible` |
| update:value | `values: string[]` | Fires when OK is tapped; used by `v-model:value` |
| change | `values: string[], label: string` | Fires while scrolling, with the `value` of each level and the labels joined by the separator; nothing is confirmed yet |
| confirm | `values: string[], label: string` | Fires when OK is tapped, with the same arguments as `change` |
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
