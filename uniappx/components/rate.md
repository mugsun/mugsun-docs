---
title: Rate 评分
demo: pages/demo/form/rate
---

# Rate 评分

`ms-rate`：评分。点选置分，支持只读/禁用、半星、清除、右侧描述与分值、点选时短暂上下提示（`placement`）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-rate`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/rate`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/rate.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| count | `number` | `5` | 星星总数 |
| readonly | `boolean` | `false` | 是否只读 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| activeIcon | `string` | `'star-fill'` | 激活态图标名 |
| voidIcon | `string` | `'star-line'` | 未激活图标名 |
| halfIcon | `string` | `'star-half-fill'` | 半星图标名 |
| showText | `boolean` | `false` | 是否显示评分文案 |
| showScore | `boolean` | `false` | 显示数字分值 |
| allowHalf | `boolean` | `false` | 允许半星 |
| clearable | `boolean` | `false` | 再点当前分值可清零 |
| texts | `string[]` | `[]` | 各分档文案；空则用内置 |
| placement | `'top' \| 'bottom' \| ''` | `''` | 点选时短暂展示评分弹层位置。 空串不展示；top / bottom 相对星排。 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-rate/`
- 演示: `#/pages/demo/form/rate`
