---
title: Picker 选择器
demo: pages/demo/form/picker
---

# Picker 选择器

`ms-picker`：选择器。扁平 `options`（`column` 分列 + `label` / `value`），内层是原生 `picker-view` / `picker-view-column`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-picker`）。
演示路由：`#/pages/demo/form/picker`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/picker.uvue`，可在右侧手机框中查看运行效果。

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
const probePicker = ref(null)
const cityLabel = ref('上海')
const seasonLabel = ref('2025 年 第三季度')
const plainLabel = ref('北京')
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
