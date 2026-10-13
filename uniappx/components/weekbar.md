---
title: Weekbar 周条
demo: pages/demo/form/weekbar
---

# Weekbar 周条

`ms-weekbar`：周选择条：一行七天，左右按钮整周切换。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-weekbar`）。
演示路由：`#/pages/demo/form/weekbar`。

## 基础用法

```vue
<template>
  <ms-weekbar v-model="value">
    …
  </ms-weekbar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 选中日期 YYYY-MM-DD |
| startDate | `string` | `''` | 可选范围起（含） |
| endDate | `string` | `''` | 可选范围止（含） |
| mode | `string` | `'rect'` | 选中态：rect / circular / none |
| firstDay | `number` | `0` | 一周起始：0 周一 … 6 周日 |
| showAction | `boolean` | `true` | 是否显示左右切周按钮 |
| markedDates | `string[]` | `[]` | 打点日期 |
| disabledDates | `string[]` | `[]` | 禁用日期（仍可见，不可点） |
| autoSelectToday | `boolean` | `true` | 空值时是否默认选中今天 |
| disabled | `boolean` | `false` | 整体禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| weekchange | weekchange |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-weekbar/`
- 演示: `#/pages/demo/form/weekbar`
