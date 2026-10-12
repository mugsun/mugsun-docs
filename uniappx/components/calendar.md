---
title: Calendar 日历
demo: pages/demo/form/calendar
---

# Calendar 日历

`ms-calendar`：月网格日历。`type`：`single` / `multiple` / `range`。`value` 为 `YYYY-MM-DD` 逗号串。`marks` 扁平上下标。`switchMode=month` 翻月；`none` 平铺。弹层 `ms-popup`；`usePopup=false` 内嵌。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-calendar`）。
演示路由：`#/pages/demo/form/calendar`。

## 基础用法

```vue
<template>
  <ms-calendar title="…" v-model:visible="open">
    …
  </ms-calendar>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'single'` | — |
| value | `string` | `''` | — |
| minDate | `string` | `''` | — |
| maxDate | `string` | `''` | — |
| firstDayOfWeek | `number` | `0` | — |
| disabledDates | `string[]` | `[]` | — |
| marks | `UTSJSONObject[]` | `[]` | — |
| switchMode | `string` | `'none'` | — |
| title | `string` | `''` | — |
| weekdays | `string[]` | `[]` | — |
| readonly | `boolean` | `false` | — |
| allowSameDay | `boolean` | `false` | — |
| showConfirm | `boolean` | `true` | — |
| confirmText | `string` | `'确定'` | — |
| visible | `boolean` | `false` | — |
| usePopup | `boolean` | `true` | — |
| autoClose | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| select | select |
| change | 值变化 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |
| panel-change | panel-change |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-calendar/`
- 演示：`#/pages/demo/form/calendar`
