---
title: Picker 选择器
demo: pages/demo/form/picker
---

# Picker 选择器

`ms-picker` 是滚轮选择器，可以有一列或多列。选项用扁平的 `options` 传入，每项用 `column` 标明所在的列。

默认从底部弹出，默认插槽里的内容作为触发元素；`usePopup` 设为 `false` 时直接嵌在页面里。

`value` 是各列选中项的下标，组件不会自己修改它，需要在 `confirm` 事件里更新。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-picker
    ref="probePicker"
    :options="cityOptions"
    :value="cityValue"
    title="选择城市"
    @change="onCityChange"
    @confirm="onCityConfirm"
    @cancel="onCityCancel"
  >
    <ms-cell title="选择城市" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="seasonOptions"
    :value="seasonValue"
    title="选择时间"
    @confirm="onSeasonConfirm"
    @cancel="onSeasonCancel"
  >
    <ms-cell title="选择时间" :note="seasonLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="inlineValue"
    title="内嵌"
    :use-popup="false"
    @change="onInlineChange"
    @confirm="onInlineConfirm"
  />
  <!-- 样式 -->
  <ms-picker
    :options="cityOptions"
    :value="cityValue"
    title="选择城市"
    @confirm="onCityConfirm"
  >
    <ms-cell title="带标题选择器" :note="cityLabel" arrow :bordered="false" />
  </ms-picker>
  <ms-picker
    :options="cityOptions"
    :value="plainValue"
    @confirm="onPlainConfirm"
  >
    <ms-cell title="无标题选择器" :note="plainLabel" arrow :bordered="false" />
  </ms-picker>
</template>

<script setup lang="uts">
const cityLabel = ref('上海')

const cityOptions = [
  { column: 0, label: '北京', value: 'bj' } as UTSJSONObject,
  { column: 0, label: '上海', value: 'sh' } as UTSJSONObject,
  { column: 0, label: '广州', value: 'gz' } as UTSJSONObject,
  { column: 0, label: '深圳', value: 'sz' } as UTSJSONObject,
  { column: 0, label: '杭州', value: 'hz' } as UTSJSONObject,
] as UTSJSONObject[]

const cityValue = [1] as number[]

const inlineValue = [2] as number[]

const plainLabel = ref('北京')

const plainValue = [0] as number[]

const seasonLabel = ref('2025 年 第三季度')

const seasonOptions = [
  { column: 0, label: '2024 年', value: '2024' } as UTSJSONObject,
  { column: 0, label: '2025 年', value: '2025' } as UTSJSONObject,
  { column: 0, label: '2026 年', value: '2026' } as UTSJSONObject,
  { column: 1, label: '第一季度', value: 'q1' } as UTSJSONObject,
  { column: 1, label: '第二季度', value: 'q2' } as UTSJSONObject,
  { column: 1, label: '第三季度', value: 'q3' } as UTSJSONObject,
  { column: 1, label: '第四季度', value: 'q4' } as UTSJSONObject,
] as UTSJSONObject[]

const seasonValue = [1, 2] as number[]

function onCityChange(indexes: number[], label: string) : void {
  console.log('onCityChange')
}

function onCityConfirm(indexes: number[], label: string) : void {
  console.log('onCityConfirm')
}

function onCityCancel() : void {
  console.log('onCityCancel')
}

function onSeasonConfirm(indexes: number[], label: string) : void {
  console.log('onSeasonConfirm')
}

function onSeasonCancel() : void {
  console.log('onSeasonCancel')
}

function onInlineChange(indexes: number[], label: string) : void {
  console.log('onInlineChange')
}

function onInlineConfirm(indexes: number[], label: string) : void {
  console.log('onInlineConfirm')
}

function onPlainConfirm(indexes: number[], label: string) : void {
  console.log('onPlainConfirm')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表，每项含 `column`（列下标）、`label` 和 `value` |
| value | `number[]` | `[]` | 各列选中项的下标 |
| visible | `boolean` | `false` | 是否显示，`usePopup` 为 `true` 时有效，可用 `v-model:visible` |
| title | `string` | `''` | 标题，留空时头部只有取消和确定 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确定按钮文案 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度（px） |
| visibleItemCount | `number` | `5` | 可见的选项数 |
| usePopup | `boolean` | `true` | 是否从底部弹出；`false` 时嵌在页面里 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| change | `indexes: number[], label: string` | 滚动选择时触发，参数是各列的下标和用空格连接的标签；这时还没有确认 |
| pick | `column: number, index: number` | 滚动选择时触发，参数是发生变化的列和这一列的新下标 |
| confirm | `indexes: number[], label: string` | 点击确定时触发，参数同 `change` |
| cancel | — | 点击取消时触发，面板上的选择恢复为 `value` |
| close | — | 弹出层关闭时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 触发元素，点击后打开选择器；`usePopup` 为 `false` 时不显示 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `getLabel(): string` | 返回面板上当前选择的标签 |
| `confirm()` | 确认当前选择，等同于点击确定 |
| `cancel()` | 取消选择，等同于点击取消 |
| `open()` | 打开选择器 |
| `close()` | 关闭选择器 |
