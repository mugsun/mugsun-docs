---
title: Input 输入
demo: pages/demo/form/input
---

# Input 输入

`ms-input`：单行输入。`v-model` + `label` / `placeholder` / `prefixIcon` / `clearable` / `type="password"` / `status` / `tips` / `align` / `disabled`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-input`）。
演示路由：`#/pages/demo/form/input`。

## 基础用法

```vue
<template>
  <ms-input label="…" v-model="value">
    …
  </ms-input>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| label | `string` | `''` | — |
| placeholder | `string` | `''` | — |
| type | `'text' \| 'number' \| 'digit' \| 'password'` | `'text'` | — |
| align | `'left' \| 'center' \| 'right'` | `'left'` | — |
| status | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'` | — |
| tips | `string` | `''` | — |
| prefixIcon | `string` | `''` | — |
| suffixIcon | `string` | `''` | — |
| clearable | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| readonly | `boolean` | `false` | — |
| maxlength | `number` | `-1` | — |
| showCount | `boolean` | `false` | 显示字数统计（需 maxlength ≥ 0） |
| bordered | `boolean` | `true` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| input | input |
| focus | focus |
| blur | blur |
| clear | clear |
| confirm | 确认 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| label | `label` 插槽 |
| prefix | `prefix` 插槽 |
| suffix | `suffix` 插槽 |
| tips | `tips` 插槽 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-input/`
- 演示：`#/pages/demo/form/input`
