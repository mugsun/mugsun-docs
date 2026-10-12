---
title: Picker
demo: pages/demo/form/picker
---

# Picker

选择器。扁平 `options`（`column` 分列 + `label` / `value`），内层是原生 `picker-view` / `picker-view-column`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker`).
Demo route: `#/pages/demo/form/picker`.

## Basic usage

```vue
<template>
  <ms-picker title="…" v-model:visible="open">
    …
  </ms-picker>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：column（列下标）+ label + value |
| value | `number[]` | `[]` | 各列选中项下标 |
| visible | `boolean` | `false` | 是否显示（usePopup 时生效） |
| title | `string` | `''` | 标题；空串则头部只留取消/确定 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确定按钮文案 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度 px |
| visibleItemCount | `number` | `5` | 可视项数 |
| usePopup | `boolean` | `true` | 是否用弹出层包裹；false 则内嵌 |

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
