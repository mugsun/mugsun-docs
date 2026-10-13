---
title: Segmented 分段
demo: pages/demo/nav/segmented
---

# Segmented 分段

`ms-segmented`：分段控制器：`options` 驱动；block / size；`v-model:value`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-segmented`）。
演示路由：`#/pages/demo/nav/segmented`。

## 基础用法

```vue
<template>
  <ms-segmented size="sm">
    …
  </ms-segmented>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| options | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / disabled |
| block | `boolean` | `false` | 撑满父宽并均分每项 |
| disabled | `boolean` | `false` | 整体禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度阶梯 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| update:value | v-model:value 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-segmented/`
- 演示: `#/pages/demo/nav/segmented`
