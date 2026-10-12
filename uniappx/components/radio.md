---
title: Radio 单选
demo: pages/demo/form/radio
---

# Radio 单选

`ms-radio`：单选项：填充 / 描边 / 圆点三种选框形态，选框可放左或右。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-radio`）。
演示路由：`#/pages/demo/form/radio`。

## 基础用法

```vue
<template>
  <ms-radio label="…" v-model="value">
    …
  </ms-radio>
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
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | — |
| placement | `'left' \| 'right'` | `'left'` | — |
| block | `boolean` | `false` | — |
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

- 组件目录：`uni_modules/ms-ui/components/ms-radio/`
- 演示：`#/pages/demo/form/radio`
