---
title: Rate 评分
demo: pages/demo/form/rate
---

# Rate 评分

`ms-rate` 是评分组件，点击星星设置分值，用 `v-model` 绑定。可以开启半星，也可以再点一次清零。

星星旁边可以显示文字说明或数字分值；设置 `placement` 后，点击时在星星上方或下方短暂显示提示。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-rate v-model="vSolid" />
  <ms-rate v-model="vCustom" active-icon="heart-fill" void-icon="heart-line" />
  <ms-rate v-model="vCount" :count="3" />
  <!-- 组件状态 -->
  <ms-rate v-model="vActive" />
  <ms-rate :model-value="4" readonly />
  <ms-rate :model-value="3" disabled />
  <!-- 组件尺寸 -->
  <ms-rate v-model="vSize" size="sm" />
  <ms-rate v-model="vSize" size="md" />
  <ms-rate v-model="vSize" size="lg" />
  <!-- 组件深度 -->
  <ms-rate v-model="vHalf" allow-half show-score />
  <ms-rate v-model="vClear" clearable show-text />
  <ms-rate v-model="vTexts" show-text :texts="customTexts" />
</template>

<script setup lang="uts">
const customTexts = ['很差', '较差', '一般', '不错', '很棒'] as string[]

const vActive = ref(3)

const vClear = ref(4)

const vCount = ref(2)

const vCustom = ref(2)

const vHalf = ref(3.5)

const vSize = ref(3)

const vSolid = ref(3)

const vTexts = ref(3)
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| count | `number` | `5` | 星星总数 |
| readonly | `boolean` | `false` | 是否只读 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| activeIcon | `string` | `'star-fill'` | 选中时的图标名 |
| voidIcon | `string` | `'star-line'` | 未选中时的图标名 |
| halfIcon | `string` | `'star-half-fill'` | 半星的图标名 |
| showText | `boolean` | `false` | 是否在星星旁边显示分值对应的文字 |
| showScore | `boolean` | `false` | 是否在星星旁边显示数字分值，优先于 `showText` |
| allowHalf | `boolean` | `false` | 是否允许半星 |
| clearable | `boolean` | `false` | 再次点击当前分值是否清零 |
| texts | `string[]` | `[]` | 各分值对应的文字，留空使用内置文字 |
| placement | `'top' \| 'bottom' \| ''` | `''` | 点击时提示出现的位置：top 上方 / bottom 下方，留空不显示 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: number` | 分值变化时触发，用于 `v-model` |
| change | `value: number` | 分值变化时触发，`value` 是新的分值 |
