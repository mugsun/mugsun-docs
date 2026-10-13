---
title: Stepper 步进
demo: pages/demo/form/stepper
---

# Stepper 步进

`ms-stepper`：步进器：填充 / 描边 / 朴素三风格，三档尺寸，支持步长、上下限与小数位。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-stepper`）。
演示路由：`#/pages/demo/form/stepper`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/stepper.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-stepper v-model="vFilled" theme="filled" />
  <ms-stepper v-model="vOutline" theme="outline" />
  <ms-stepper v-model="vNormal" />
  <!-- 组件状态 -->
  <ms-stepper v-model="vMin" theme="filled" :min="0" :max="9" />
  <ms-stepper v-model="vMax" theme="filled" :min="5" :max="9" />
  <ms-stepper :model-value="3" theme="filled" disabled />
  <!-- 组件尺寸 -->
  <ms-stepper v-model="vSize" theme="filled" size="sm" />
  <ms-stepper v-model="vSize" theme="filled" size="md" />
  <ms-stepper v-model="vSize" theme="filled" size="lg" />
  <!-- 组件深度 -->
  <ms-stepper v-model="vDecimal" theme="filled" :step="0.1" :precision="1" :min="0" :max="10" />
  <ms-stepper v-model="vDepth" theme="outline" size="lg" :min="1" :max="99" />
  <ms-stepper v-model="vHold" theme="filled" :long-press="true" :min="0" :max="99" />
</template>

<script setup lang="uts">
const vFilled = ref(3)
const vOutline = ref(3)
const vNormal = ref(3)
const vMin = ref(0)
const vMax = ref(9)
const vSize = ref(3)
const vDecimal = ref(1.5)
const vDepth = ref(5)
const vHold = ref(1)
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | 绑定值（v-model） |
| min | `number` | `0` | 最小值 |
| max | `number` | `100` | 最大值 |
| step | `number` | `1` | 步长 |
| precision | `number` | `0` | 精度 |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | 主题色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| disableInput | `boolean` | `false` | 是否禁用输入 |
| longPress | `boolean` | `true` | 长按加减钮连续步进，默认开 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| overlimit | overlimit |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-stepper/`
- 演示: `#/pages/demo/form/stepper`
