---
title: Picker 选择器
demo: pages/demo/form/picker
---

# Picker 选择器

`ms-picker`：选择器。扁平 `options`（`column` 分列 + `label` / `value`），内层是原生 `picker-view` / `picker-view-column`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-picker`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/picker`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/picker.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：column（列下标）+ label + value |
| value | `number[]` | `[]` | 各列选中项下标 |
| visible | `boolean` | `false` | 是否显示（usePopup 时生效） |
| title | `string` | `''` | 标题；空串则头部只留取消/确定 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| confirmText | `string` | `'确定'` | 确定按钮文案 |
| header | `boolean` | `true` | 是否显示头部 |
| itemHeight | `number` | `44` | 单项高度 px |
| visibleItemCount | `number` | `5` | 可视项数 |
| usePopup | `boolean` | `true` | 是否用弹出层包裹；false 则内嵌 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-picker/`
- 演示: `#/pages/demo/form/picker`
