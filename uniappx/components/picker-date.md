---
title: Picker Date 日期
demo: pages/demo/form/picker-date
---

# Picker Date 日期

`ms-picker-date`：日期时间选择器。`mode` 决定列深度：`year` → `month` → `date` → `hour` → `minute` → `second` 递进。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-picker-date`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/picker-date`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/picker-date.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-picker-date
    :value="dateText"
    mode="date"
    title="选择日期"
    @change="onDateChange"
    @confirm="onDateConfirm"
    @cancel="onDateCancel"
  >
    <ms-cell title="选择日期" :note="dateText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="monthText"
    mode="month"
    title="选择月份"
    @confirm="onMonthConfirm"
  >
    <ms-cell title="选择月份" :note="monthText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    :value="minuteText"
    mode="minute"
    title="选择时分"
    @confirm="onMinuteConfirm"
  >
    <ms-cell title="选择时分" :note="minuteText" arrow :bordered="false" />
  </ms-picker-date>
  <!-- 组件用法 -->
  <ms-picker-date
    :value="stepText"
    mode="minute"
    :minute-step="5"
    title="五分钟步长"
    @confirm="onStepConfirm"
  >
    <ms-cell title="五分钟步长" :note="stepText" arrow :bordered="false" />
  </ms-picker-date>
  <ms-picker-date
    value="2026-03-15"
    mode="date"
    title="内嵌日期"
    :use-popup="false"
    @change="onInlineChange"
    @confirm="onInlineConfirm"
  />
</template>

<script setup lang="uts">
const dateText = ref('2026-03-15')

const minuteText = ref('2026-03-15 09:30')

const monthText = ref('2026-03')

const stepText = ref('2026-03-15 09:30')

function onDateChange(value: string) : void {
  console.log('onDateChange')
}

function onDateConfirm(value: string) : void {
  console.log('onDateConfirm')
}

function onDateCancel() : void {
  console.log('onDateCancel')
}

function onMonthConfirm(value: string) : void {
  console.log('onMonthConfirm')
}

function onMinuteConfirm(value: string) : void {
  console.log('onMinuteConfirm')
}

function onStepConfirm(value: string) : void {
  console.log('onStepConfirm')
}

function onInlineChange(value: string) : void {
  console.log('onInlineChange')
}

function onInlineConfirm(value: string) : void {
  console.log('onInlineConfirm')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
