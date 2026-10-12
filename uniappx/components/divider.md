---
title: Divider 分割线
demo: pages/demo/basic/divider
---

# Divider 分割线

`ms-divider`：分割线。`layout` 水平/垂直；`align` 左中右；`dashed` 虚线；`text` 中间文案；默认插槽可替换文案（`useSlots` 有插槽即走带文布局）。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-divider`）。
演示路由：`#/pages/demo/basic/divider`。

## 基础用法

```vue
<template>
  <ms-divider text="…">
    …
  </ms-divider>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局 |
| align | `'left' \| 'center' \| 'right'` | `'center'` | 对齐方式 |
| dashed | `boolean` | `false` | 是否虚线 |
| text | `string` | `''` | 展示文案 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-divider/`
- 演示: `#/pages/demo/basic/divider`
