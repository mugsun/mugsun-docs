---
title: Picker Selected
demo: pages/demo/form/picker-selected
---

# Picker Selected

`ms-picker-selected` — Picker Selected for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-picker-selected` (commercial edition; source not public).
Demo route: `#/pages/demo/form/picker-selected`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/picker-selected.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-selected
    ref="localPickerRef"
    :value="localValue"
    :options="companies"
    title="本地搜索"
    @open="onLocalOpen"
    @confirm="onLocalConfirm"
  >
    <ms-cell title="合作公司" :note="localLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="remoteValue"
    :options="remoteOptions"
    :local-search="false"
    title="异步搜索"
    @open="onRemoteOpen"
    @search="onRemoteSearch"
    @confirm="onRemoteConfirm"
  >
    <ms-cell title="搜索公司" :note="remoteLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <!-- 组件样式 -->
  <ms-picker-selected
    :value="multiValue"
    :options="companies"
    :multiple="true"
    title="多选公司"
    @open="onMultiOpen"
    @confirm="onMultiConfirm"
  >
    <ms-cell title="多选公司" :note="multiLabel" arrow :bordered="false" />
  </ms-picker-selected>
  <ms-picker-selected
    :value="singleValue"
    :options="companies"
    :multiple="false"
    :required="true"
    title="单选公司"
    @open="onSingleOpen"
    @confirm="onSingleConfirm"
  >
    <ms-cell title="单选公司" :note="singleLabel" arrow :bordered="false" />
  </ms-picker-selected>
</template>

<script setup lang="uts">
const companies = ref([
  { id: '1', name: '广州信瑞化妆品公司' },
  { id: '2', name: '深圳市创明展览设计有限公司' },
  { id: '3', name: '上海盟威实业发展有限公司' },
  { id: '4', name: '国都期货有限公司' },
  { id: '5', name: '山西宇达集团' },
  { id: '6', name: '博达网络有限公司' },
  { id: '7', name: '新贸易有限公司' },
  { id: '8', name: '东莞市东辉仪器有限公司' },
  { id: '9', name: '古兰电子科技有限责任公司' },
  { id: '10', name: '邦达礼品公司' },
  { id: '11', name: '明珠盘艺有限公司' },
  { id: '12', name: '福建古拉特商贸公司' },
] as UTSJSONObject[])

const localLabel = ref('已选 2 项')

const localValue = ref(['2', '8'] as string[])

const multiLabel = ref('广州信瑞化妆品公司')

const multiValue = ref(['1'] as string[])

const remoteLabel = ref('未选择')

const remoteOptions = ref([] as UTSJSONObject[])

const remoteValue = ref([] as string[])

const singleLabel = ref('国都期货有限公司')

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
