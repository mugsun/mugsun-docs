---
title: Slider 滑块
demo: pages/demo/form/slider
---

# Slider 滑块

`ms-slider` 是滑块，支持单滑块和双滑块，轨道有 `default`（细轨）和 `capsule`（胶囊轨）两种样式。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-slider`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/form/slider`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/slider.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；在手机上，请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-slider v-model="vBase" />
  <ms-slider v-model="vCapsule" theme="capsule" />
  <!-- 组件状态 -->
  <ms-slider v-model="vLabel" label />
  <ms-slider :model-value="35" disabled />
  <!-- 组件刻度 -->
  <ms-slider v-model="vStep" :step="20" :marks="marks" />
  <ms-slider v-model="vExtreme" show-extreme-value />
  <ms-slider v-model="vRangeMin" :min="20" :max="100" :step="20" label />
  <!-- 组件深度 -->
  <ms-slider v-model="vDepthCap" theme="capsule" label show-extreme-value />
  <ms-slider v-model="vDecimal" :min="0" :max="1" :step="0.1" label />
  <ms-slider range v-model:range-value="vRange" label />
</template>

<script setup lang="uts">
const marks = ref<number[]>([0, 20, 40, 60, 80, 100] as number[])

const vBase = ref(23)

const vCapsule = ref(30)

const vDecimal = ref(0.3)

const vDepthCap = ref(55)

const vExtreme = ref(50)

const vLabel = ref(40)

const vRangeMin = ref(40)

const vStep = ref(60)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| rangeValue | `number[]` | `[]` | 双游标时的受控区间 [low, high] |
| range | `boolean` | `false` | 开启双游标区间模式 |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| disabled | `boolean` | `false` | 是否禁用 |
| label | `boolean` | `false` | 标签文案 |
| showExtremeValue | `boolean` | `false` | 是否显示两端最值 |
| marks | `number[]` | `[]` | 日期标记列表 |
| theme | `'default' \| 'capsule'` | `'default'` | 主题色 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| update:rangeValue | update:rangeValue |
| change | 值变化 |
| dragstart | dragstart |
| dragend | dragend |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-slider/`
- 演示: `#/pages/demo/form/slider`
