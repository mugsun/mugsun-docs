---
title: Stepper 步进
demo: pages/demo/form/stepper
---

# Stepper 步进

`ms-stepper`：步进器：填充 / 描边 / 朴素三风格，三档尺寸，支持步长、上下限与小数位。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-stepper`）。
演示路由：`#/pages/demo/form/stepper`。

## 基础用法

```vue
<template>
  <ms-stepper theme="normal" size="sm">
    …
  </ms-stepper>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | — |
| min | `number` | `0` | — |
| max | `number` | `100` | — |
| step | `number` | `1` | — |
| precision | `number` | `0` | — |
| theme | `'normal' \| 'filled' \| 'outline'` | `'normal'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| disabled | `boolean` | `false` | — |
| disableInput | `boolean` | `false` | — |
| longPress | `boolean` | `true` | 长按加减钮连续步进，默认开 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| overlimit | overlimit |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-stepper/`
- 演示：`#/pages/demo/form/stepper`
