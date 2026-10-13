---
title: Radio Group 单选组
demo: pages/demo/form/radio
---

# Radio Group 单选组

`ms-radio-group`：单选分组：`v-model` 为 `string`，互斥选中，支持整组禁用与横排换行。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-radio-group`）。
演示路由：`#/pages/demo/form/radio`。

## 基础用法

```vue
<template>
  <ms-radio-group v-model="value">
    …
  </ms-radio-group>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | 绑定值（v-model） |
| disabled | `boolean` | `false` | 是否禁用 |
| horizontal | `boolean` | `false` | 是否横向 |
| allowUncheck | `boolean` | `false` | 是否允许取消选中 |

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

- 组件目录: `uni_modules/ms-ui/components/ms-radio-group/`
- 演示: `#/pages/demo/form/radio`
