---
title: Calendar 日历
demo: pages/demo/form/calendar
---

# Calendar 日历

`ms-calendar` 是按月显示的日历，可以选单个日期、多个日期或一段日期范围。

选中值 `value` 是字符串，日期格式为 `YYYY-MM-DD`，多个日期之间用逗号分隔。

日历默认在弹层里打开，把 `usePopup` 设为 `false` 后直接嵌在页面中。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件用法 -->
  <ms-calendar
    value="2026-03-10,2026-03-18"
    type="range"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    min-date="2026-03-01"
    max-date="2026-03-31"
    :marks="markList2"
    @change="onInlineChange"
  />
  <!-- 组件深度 -->
  <ms-calendar
    ref="resetCalRef"
    value="2026-04-10"
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-04-01"
    max-date="2026-04-30"
    @change="onResetCalChange"
  />
  <ms-calendar
    type="single"
    switch-mode="month"
    :use-popup="false"
    :show-confirm="false"
    :auto-close="false"
    min-date="2026-05-01"
    max-date="2026-05-31"
    @select="onSelectDay"
  />
</template>

<script setup lang="uts">
const markList2 = [
  { date: '2026-03-12', prefix: '', suffix: '¥60' } as UTSJSONObject,
  { date: '2026-03-15', prefix: '休', suffix: '' } as UTSJSONObject,
]

function onInlineChange(v: string) : void {
  console.log('onInlineChange')
}

function onResetCalChange(v: string) : void {
  console.log('onResetCalChange')
}

function onSelectDay(day: string) : void {
  console.log('onSelectDay')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'single'` | 选择模式：single / multiple / range |
| value | `string` | `''` | 选中值；多选/区间为逗号分隔日期 |
| minDate | `string` | `''` | 可选最小日期（YYYY-MM-DD） |
| maxDate | `string` | `''` | 可选最大日期（YYYY-MM-DD） |
| firstDayOfWeek | `number` | `0` | 一周起始：0=周日 … 6=周六 |
| disabledDates | `string[]` | `[]` | 禁用日期列表（YYYY-MM-DD） |
| marks | `UTSJSONObject[]` | `[]` | 日期标记（含 date/text 等字段） |
| switchMode | `string` | `'none'` | 头部切换：none 不切换；month 按月切换 |
| title | `string` | `''` | 弹层标题；空则用当前年月 |
| weekdays | `string[]` | `[]` | 星期栏文案；空则用默认日一二… |
| readonly | `boolean` | `false` | 是否只读 |
| allowSameDay | `boolean` | `false` | range 模式下是否允许起止同一天 |
| showConfirm | `boolean` | `true` | 是否显示底部确认按钮 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| visible | `boolean` | `false` | 弹层是否显示（usePopup 时） |
| usePopup | `boolean` | `true` | 是否包在弹出层内展示 |
| autoClose | `boolean` | `true` | 确认/选完后是否自动关闭弹层 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 弹层关闭时触发，值为 `false`，用于 `v-model:visible` |
| select | `date: string` | 点击某一天时触发，`date` 是该日期；禁用的日期不触发 |
| change | `value: string` | 选中值变化时触发。有确认按钮时点确认后触发，否则选完就触发 |
| confirm | `value: string` | 点击确认按钮时触发 |
| cancel | — | 点击关闭按钮时触发，未确认的选择会被丢弃 |
| close | `trigger: string` | 关闭时触发，`trigger` 是关闭原因：`confirm-btn`、`close-btn`、`overlay` 或 `auto-close` |
| panel-change | `month: string` | 切换月份时触发，`month` 的格式为 `YYYY-MM` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getValue(): string` | 返回面板上当前的选择，包括还没确认的，格式同 `value` |
| `confirm()` | 等同于点击确认按钮 |
| `cancel()` | 等同于点击关闭按钮 |
| `prev()` | 翻到上一个月 |
| `next()` | 翻到下一个月 |
| `reset()` | 丢弃未确认的选择，恢复为 `value` |
