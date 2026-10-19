---
title: Picker City
demo: pages/demo/form/picker-city
---

# Picker City

`ms-picker-city` is a wheel picker for linked province, city and district selection. Its data uses the same flat `options` format as `ms-cascader` (`value`/`label`/`parent`). It does not bundle national region data; the data comes from the backend `sys_region` table.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-picker-city`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/picker-city`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/picker-city.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options list |
| value | `string[]` | `[]` | Current value |
| level | `number` | `3` | Province/city/district levels |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'选择地区'` | Title |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| separator | `string` | `' / '` | Separator |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Visible items per column |
| usePopup | `boolean` | `true` | Whether wrapped in a popup |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| update:value | v-model:value update |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker-city/`
- Demo: `#/pages/demo/form/picker-city`
- Chinese docs: [/uniappx/components/picker-city](/uniappx/components/picker-city)
