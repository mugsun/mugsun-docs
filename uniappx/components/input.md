---
title: Input 输入
demo: pages/demo/form/input
---

# Input 输入

`ms-input`：单行输入。`v-model` + `label` / `placeholder` / `prefixIcon` / `clearable` / `type="password"` / `status` / `tips` / `align` / `disabled`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-input`（源码仓暂未公开）。
演示路由：`#/pages/demo/form/input`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/form/input.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 基础 -->
  <ms-input v-model="baseValue" label="标签文字" placeholder="请输入文字" />
  <!-- 前置图标 -->
  <ms-input v-model="searchValue" label="搜索" placeholder="请输入关键字" prefix-icon="search" />
  <!-- 可清空 -->
  <ms-input v-model="clearValue" label="可清空" placeholder="输入后点右侧清空" clearable />
  <!-- 状态 -->
  <ms-input model-value="禁用文案" label="禁用" placeholder="不可编辑" disabled />
  <ms-input
    v-model="errorValue"
    label="错误"
    placeholder="请输入"
    status="error"
    tips="错误提示"
    clearable
  />
</template>

<script setup lang="uts">
const baseValue = ref('')
const searchValue = ref('')
const clearValue = ref('可清空')
const errorValue = ref('')
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| label | `string` | `''` | 标签文案 |
| placeholder | `string` | `''` | 占位文案 |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | 输入类型：text / number / idcard / digit / password 等 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 输入区对齐：left / center / right |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | 状态：default / success / warning / error |
| tips | `string` | `''` | 底部提示文案 |
| prefixIcon | `string` | `''` | 前缀图标名 |
| suffixIcon | `string` | `''` | 后缀图标名 |
| clearable | `boolean` | `false` | 是否可清空 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| maxlength | `number` | `-1` | 最大输入长度；-1 不限 |
| showCount | `boolean` | `false` | 显示字数统计（需 maxlength ≥ 0） |
| bordered | `boolean` | `true` | 是否显示底边框 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | 输入 |
| focus | 聚焦 |
| blur | 失焦 |
| clear | 清空 |
| confirm | 确认 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| prefix | `prefix` 插槽 |
| suffix | `suffix` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-input/`
- 演示: `#/pages/demo/form/input`
