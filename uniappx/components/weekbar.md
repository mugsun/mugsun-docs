---
title: Weekbar 周选择条
demo: pages/demo/form/weekbar
---

# Weekbar 周选择条

`ms-weekbar` 是周选择条，一行显示七天，通过左右按钮按周切换。

选中的日期用 `v-model` 绑定，格式为 `YYYY-MM-DD`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-weekbar v-model="basicDate" @change="onBasicChange" @weekchange="onWeekChange" />
  <ms-weekbar v-model="plainDate" :show-action="false" mode="none" @change="onPlainChange" />
  <!-- 组件样式 -->
  <ms-weekbar v-model="circleDate" mode="circular" :first-day="6" @change="onCircleChange" />
  <ms-weekbar
    v-model="rangeDate"
    :marked-dates="marked"
    :start-date="rangeStart"
    :end-date="rangeEnd"
    @change="onRangeChange"
  />
  <ms-weekbar v-model="basicDate" :disabled="true" />
  <!-- 组件深度 -->
  <ms-weekbar
    v-model="banDate"
    :disabled-dates="banned"
    @change="onBanChange"
  />
  <ms-weekbar
    v-model="manualDate"
    :auto-select-today="false"
    @change="onManualChange"
  />
  <ms-weekbar
    ref="jumpRef"
    v-model="jumpDate"
    @change="onJumpChange"
  />
</template>

<script setup lang="uts">
const banDate = ref('2026-09-01')

const banned = ref(['2026-09-02', '2026-09-03'] as string[])

const basicDate = ref('2026-08-31')

const circleDate = ref('2026-09-02')

const jumpDate = ref('2026-08-31')

const manualDate = ref('')

const marked = ref(['2026-09-01', '2026-09-03'] as string[])

const plainDate = ref('2026-08-31')

const rangeDate = ref('2026-08-31')

const rangeEnd = ref('2026-09-03')

const rangeStart = ref('2026-08-30')

function onBasicChange(value: string) : void {
  console.log('onBasicChange')
}

function onWeekChange(dates: string[]) : void {
  console.log('onWeekChange')
}

function onPlainChange(value: string) : void {
  console.log('onPlainChange')
}

function onCircleChange(value: string) : void {
  console.log('onCircleChange')
}

function onRangeChange(value: string) : void {
  console.log('onRangeChange')
}

function onBanChange(value: string) : void {
  console.log('onBanChange')
}

function onManualChange(value: string) : void {
  console.log('onManualChange')
}

function onJumpChange(value: string) : void {
  console.log('onJumpChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 选中的日期，格式为 `YYYY-MM-DD` |
| startDate | `string` | `''` | 可选范围的开始日期，包含当天 |
| endDate | `string` | `''` | 可选范围的结束日期，包含当天 |
| mode | `string` | `'rect'` | 选中样式：rect 圆角方块 / circular 圆形 / none 只变色 |
| firstDay | `number` | `0` | 一周从哪天开始，`0` 是周一，`6` 是周日 |
| showAction | `boolean` | `true` | 是否显示左右两侧的切换按钮 |
| markedDates | `string[]` | `[]` | 需要在下方显示圆点的日期 |
| disabledDates | `string[]` | `[]` | 禁用的日期，仍然显示但不能点击 |
| autoSelectToday | `boolean` | `true` | `modelValue` 为空时是否默认选中今天 |
| disabled | `boolean` | `false` | 是否禁用 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 选中的日期变化时触发，用于 `v-model` |
| change | `value: string` | 选中的日期变化时触发，`value` 是 `YYYY-MM-DD` 格式的日期 |
| weekchange | `dates: string[]` | 点击左右按钮切换周时触发，`dates` 是新一周的七个日期 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getWeek(): string[]` | 返回当前显示的七个日期 |
| `toToday()` | 回到今天所在的一周并选中今天，同时触发 `change` |
