---
title: Checkbox 多选
demo: pages/demo/form/checkbox
---

# Checkbox 多选

`ms-checkbox`：多选框：单独 `v-model` 或放进 `ms-checkbox-group`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-checkbox`）。
演示路由：`#/pages/demo/form/checkbox`。

## 基础用法

```vue
<template>
  <ms-checkbox label="…" v-model="value">
    …
  </ms-checkbox>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | — |
| value | `string` | `''` | — |
| label | `string` | `''` | — |
| content | `string` | `''` | — |
| contentDisabled | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| indeterminate | `boolean` | `false` | — |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | — |
| placement | `'left' \| 'right'` | `'left'` | — |
| block | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-checkbox/`
- 演示：`#/pages/demo/form/checkbox`
