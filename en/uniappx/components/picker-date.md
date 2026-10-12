---
title: Picker Date
demo: pages/demo/form/picker-date
---

# Picker Date

日期时间选择器。`mode` 决定列深度：`year` → `month` → `date` → `hour` → `minute` → `second` 递进。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-date`).
Demo route: `#/pages/demo/form/picker-date`.

## Basic usage

```vue
<template>
  <ms-picker-date title="…" v-model:visible="open">
    …
  </ms-picker-date>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | `''` | 选中值：'YYYY-MM-DD HH:mm:ss' 的前缀，按 mode 截断 |
| mode | `string` | `'date'` | year / month / date / hour / minute / second |
| startYear | `number` | `2020` | 起始年 |
| endYear | `number` | `2030` | 结束年 |
| minuteStep | `number` | `1` | 分钟步长 |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| cancelText | `string` | `'取消'` | 取消文案 |
| confirmText | `string` | `'确定'` | 确定文案 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度 px |
| visibleItemCount | `number` | `5` | 可视项数 |
| usePopup | `boolean` | `true` | 是否弹出层包裹 |

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

- Component: `uni_modules/ms-ui/components/ms-picker-date/`
- Demo: `#/pages/demo/form/picker-date`
- Chinese docs: [/uniappx/components/picker-date](/uniappx/components/picker-date)
