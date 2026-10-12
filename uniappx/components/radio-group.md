---
title: Radio Group 单选组
demo: pages/demo/form/radio
---

# Radio Group 单选组

`ms-radio-group`：单选分组：`v-model` 为 `string`，互斥选中，支持整组禁用与横排换行。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-radio-group`）。
演示路由：`#/pages/demo/form/radio`。

## 基础用法

```vue
<template>
  <ms-radio-group v-model="value" :disabled="true">
    …
  </ms-radio-group>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | — |
| disabled | `boolean` | `false` | — |
| horizontal | `boolean` | `false` | — |
| allowUncheck | `boolean` | `false` | — |

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

- 组件目录：`uni_modules/ms-ui/components/ms-radio-group/`
- 演示：`#/pages/demo/form/radio`
