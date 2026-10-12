---
title: Checkbox Group 多选组
demo: pages/demo/form/checkbox
---

# Checkbox Group 多选组

`ms-checkbox-group`：多选分组：`v-model` 为 `string[]`，支持整组禁用、`max` 上限与横排换行。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-checkbox-group`）。
演示路由：`#/pages/demo/form/checkbox`。

## 基础用法

```vue
<template>
  <ms-checkbox-group v-model="value">
    …
  </ms-checkbox-group>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| max | `number` | `-1` | 最大值 |
| horizontal | `boolean` | `false` | 是否横向 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-checkbox-group/`
- 演示: `#/pages/demo/form/checkbox`
