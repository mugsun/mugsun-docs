---
title: Progress 进度
demo: pages/demo/display/progress
---

# Progress 进度

`ms-progress`：进度条：线形 / 内显 / 环形；`percentage` + `status` + 可选 `label`。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-progress`）。
演示路由：`#/pages/demo/display/progress`。

## 基础用法

```vue
<template>
  <ms-progress variant="line" size="xs">
    …
  </ms-progress>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| percentage | `number` | `0` | — |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | — |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | — |
| strokeWidth | `number` | `6` | — |
| label | `boolean \| string` | `true` | — |
| size | `'xs' \| 'md'` | `'md'` | — |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-progress/`
- 演示：`#/pages/demo/display/progress`
