---
title: Color Picker 颜色
demo: pages/demo/form/color-picker
---

# Color Picker 颜色

`ms-color-picker`：颜色选择：预设色板 + 离散色相条 + 饱和度/明度/透明度滑块。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-color-picker`）。
演示路由：`#/pages/demo/form/color-picker`。

## 基础用法

```vue
<template>
  <ms-color-picker v-model="value" type="…">
    …
  </ms-color-picker>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| modelValue | `string` | `'#0579ff'` | 当前色值，hex / rgb / rgba 可入 |
| type | `string` | `'multiple'` | base 仅色板；multiple 色板 + 滑块 |
| format | `string` | `'hex'` | 输出格式：hex / rgb / hsl |
| enableAlpha | `boolean` | `false` | 是否开透明度滑块 |
| swatchColors | `string[]` | `[]` | 预设色，空则用内置 |
| columns | `number` | `8` | 色板每行格数 |
| showPreview | `boolean` | `true` | 是否显示预览块与色值 |
| disabled | `boolean` | `false` | 禁用 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:modelValue | v-model 更新 |
| change | 值变化 |
| pick | 选中项变化（未确认） |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-color-picker/`
- 演示: `#/pages/demo/form/color-picker`
