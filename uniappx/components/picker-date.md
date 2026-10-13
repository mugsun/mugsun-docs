---
title: Picker Date 日期
demo: pages/demo/form/picker-date
---

# Picker Date 日期

`ms-picker-date`：日期时间选择器。`mode` 决定列深度：`year` → `month` → `date` → `hour` → `minute` → `second` 递进。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-picker-date`）。
演示路由：`#/pages/demo/form/picker-date`。

## 基础用法

```vue
<template>
  <ms-picker-date title="…" v-model:visible="open">
    …
  </ms-picker-date>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
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

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-picker-date/`
- 演示: `#/pages/demo/form/picker-date`
