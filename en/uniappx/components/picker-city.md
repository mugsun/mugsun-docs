---
title: Picker City
demo: pages/demo/form/picker-city
---

# Picker City

`ms-picker-city` — Picker City for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-city`).
Demo route: `#/pages/demo/form/picker-city`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/picker-city.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-city
    :value="popupValue"
    :options="regions"
    title="选择地区"
    @confirm="onPopupConfirm"
    @change="onChange"
  >
    <ms-cell title="所在地区" :note="popupLabel" arrow :bordered="false" />
  </ms-picker-city>
  <ms-picker-city
    :value="inlineValue"
    :options="regions"
    :use-popup="false"
    title="常驻选择"
    @confirm="onInlineConfirm"
  />
  <!-- 组件样式 -->
  <ms-picker-city
    :value="twoValue"
    :options="regions"
    :level="2"
    :use-popup="false"
    title="省市两级"
    @confirm="onTwoConfirm"
  />
</template>

<script setup lang="uts">
const regions = ref([
const popupValue = ref(['310000', '310100', '310104'] as string[])
const popupLabel = ref('上海市 / 上海城区 / 徐汇区')
const inlineValue = ref(['110000', '110100', '110102'] as string[])
const twoValue = ref(['350000', '350200'] as string[])
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
