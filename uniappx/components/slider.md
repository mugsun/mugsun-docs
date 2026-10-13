---
title: Slider 滑块
demo: pages/demo/form/slider
---

# Slider 滑块

`ms-slider`：单游标 / 双游标滑块：`default` 细轨 / `capsule` 胶囊轨。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-slider`）。
演示路由：`#/pages/demo/form/slider`。

## 基础用法

```vue
<template>
  <ms-slider theme="default" v-model="value">
    …
  </ms-slider>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

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
