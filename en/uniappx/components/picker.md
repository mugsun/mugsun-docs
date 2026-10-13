---
title: Picker
demo: pages/demo/form/picker
---

# Picker

`ms-picker` — Picker for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-picker` (repository not yet public).
Demo route: `#/pages/demo/form/picker`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/picker.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-picker
    ref="probePicker"
    :options="cityOptions"
    :value="cityValue"
    title="选择城市"
    @change="onCityChange"
    @confirm="onCityConfirm"
    @cancel="onCityCancel"
  >
    <ms-cell title="选择城市" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="seasonOptions"
    :value="seasonValue"
    title="选择时间"
    @confirm="onSeasonConfirm"
    @cancel="onSeasonCancel"
  >
    <ms-cell title="选择时间" :note="seasonLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="inlineValue"
    title="内嵌"
    :use-popup="false"
    @change="onInlineChange"
    @confirm="onInlineConfirm"
  />
  <!-- 样式 -->
  <ms-picker
    :options="cityOptions"
    :value="cityValue"
    title="选择城市"
    @confirm="onCityConfirm"
  >
    <ms-cell title="带标题选择器" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="plainValue"
    @confirm="onPlainConfirm"
  >
    <ms-cell title="无标题选择器" :note="plainLabel" arrow :bordered="false" />
  </ms-picker>
</template>

<script setup lang="uts">
const cityLabel = ref('上海')

const cityOptions = [
  { column: 0, label: '北京', value: 'bj' } as UTSJSONObject,
  { column: 0, label: '上海', value: 'sh' } as UTSJSONObject,
  { column: 0, label: '广州', value: 'gz' } as UTSJSONObject,
  { column: 0, label: '深圳', value: 'sz' } as UTSJSONObject,
  { column: 0, label: '杭州', value: 'hz' } as UTSJSONObject,
] as UTSJSONObject[]

const cityValue = [1] as number[]

const inlineValue = [2] as number[]

const plainLabel = ref('北京')

const plainValue = [0] as number[]

const seasonLabel = ref('2025 年 第三季度')

const seasonOptions = [
  { column: 0, label: '2024 年', value: '2024' } as UTSJSONObject,
  { column: 0, label: '2025 年', value: '2025' } as UTSJSONObject,
  { column: 0, label: '2026 年', value: '2026' } as UTSJSONObject,
  { column: 1, label: '第一季度', value: 'q1' } as UTSJSONObject,
  { column: 1, label: '第二季度', value: 'q2' } as UTSJSONObject,
  { column: 1, label: '第三季度', value: 'q3' } as UTSJSONObject,
  { column: 1, label: '第四季度', value: 'q4' } as UTSJSONObject,
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
