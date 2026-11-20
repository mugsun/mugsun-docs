---
title: Picker Date 日期
demo: pages/demo/form/picker-date
---

# Picker Date 日期

`ms-picker-date` 是滚轮式的日期时间选择器，`mode` 决定选到哪一级，从年一直到秒。

`value` 是 `YYYY-MM-DD HH:mm:ss` 按 `mode` 截取的前一部分，例如 `mode="month"` 时是 `2026-05`。

组件不会自己修改 `value`，需要在 `confirm` 事件里更新。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `string` | `''` | 选中的值，格式是 `YYYY-MM-DD HH:mm:ss` 按 `mode` 截取的前一部分 |
| mode | `string` | `'date'` | 选到哪一级：year / month / date / hour / minute / second |
| startYear | `number` | `2020` | 可选的起始年份 |
| endYear | `number` | `2030` | 可选的结束年份 |
| minuteStep | `number` | `1` | 分钟的间隔 |
| visible | `boolean` | `false` | 是否显示，`usePopup` 为 `true` 时有效，可用 `v-model:visible` |
| title | `string` | `''` | 标题 |
| cancelText | `string` | `'取消'` | 取消按钮文字 |
| confirmText | `string` | `'确定'` | 确定按钮文字 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度（px） |
| visibleItemCount | `number` | `5` | 可见的选项数 |
| usePopup | `boolean` | `true` | 是否从底部弹出；`false` 时嵌在页面里 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| change | `value: string` | 滚动选择时触发，`value` 是面板上当前的值；这时还没有确认 |
| pick | `value: string` | 与 `change` 同时触发，参数相同 |
| confirm | `value: string` | 点击确定时触发，`value` 是选中的值 |
| cancel | — | 点击取消时触发，面板恢复为 `value` |
| close | — | 弹出层关闭时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 触发元素，点击后打开选择器；`usePopup` 为 `false` 时不显示 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getValue(): string` | 返回面板上当前的值 |
| `confirm()` | 确认当前选择，等同于点击确定 |
| `cancel()` | 取消选择，等同于点击取消 |
| `open()` | 打开选择器 |
| `close()` | 关闭选择器 |
