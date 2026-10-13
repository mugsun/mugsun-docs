---
title: Weekbar 周条
demo: pages/demo/form/weekbar
---

# Weekbar 周条

`ms-weekbar`：周选择条：一行七天，左右按钮整周切换。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-weekbar`（商业版，源码不公开）。
演示路由：`#/pages/demo/form/weekbar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/weekbar.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

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
