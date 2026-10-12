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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'single'` | 类型 |
| value | `string` | `''` | 当前值 |
| minDate | `string` | `''` | minDate 文案/取值 |
| maxDate | `string` | `''` | maxDate 文案/取值 |
| firstDayOfWeek | `number` | `0` | 一周起始日 |
| disabledDates | `string[]` | `[]` | 禁用日期列表 |
| marks | `UTSJSONObject[]` | `[]` | 刻度/标记 |
| switchMode | `string` | `'none'` | switchMode 文案/取值 |
| title | `string` | `''` | 标题 |
| weekdays | `string[]` | `[]` | weekdays 文案/取值 |
| readonly | `boolean` | `false` | 是否只读 |
| allowSameDay | `boolean` | `false` | 是否允许同一天 |
| showConfirm | `boolean` | `true` | 是否显示确认 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| visible | `boolean` | `false` | 是否显示 |
| usePopup | `boolean` | `true` | 是否使用弹出层 |
| autoClose | `boolean` | `true` | 是否自动关闭 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-calendar/`
- 演示: `#/pages/demo/form/calendar`
