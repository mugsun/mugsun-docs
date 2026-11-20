---
title: Progress 进度
demo: pages/demo/display/progress
---

# Progress 进度

`ms-progress` 是进度条，有线形、文字在条内和环形三种样式。进度到 100% 时自动显示为成功状态。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-progress variant="line" :percentage="80" />
  <ms-progress variant="plump" :percentage="80" />
  <ms-progress variant="circle" :percentage="30" />
  <!-- 线性状态 -->
  <ms-progress variant="line" :percentage="88" status="warning" />
  <ms-progress variant="line" :percentage="88" status="error" />
  <ms-progress variant="line" :percentage="88" status="success" />
  <!-- 内显状态 -->
  <ms-progress variant="plump" :percentage="88" status="warning" />
  <ms-progress variant="plump" :percentage="88" status="error" />
  <ms-progress variant="plump" :percentage="88" status="success" />
  <!-- 环形状态 -->
  <ms-progress variant="circle" :percentage="88" status="warning" />
  <ms-progress variant="circle" :percentage="88" status="error" />
  <ms-progress variant="circle" :percentage="88" status="success" />
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| percentage | `number` | `0` | 进度百分比，范围 0–100 |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | 样式：line 线形 / plump 文字在条内 / circle 环形 |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | 状态：default / success / warning / error / active |
| strokeWidth | `number` | `6` | 进度条粗细（px） |
| label | `boolean \| string` | `true` | `true` 显示百分比，`false` 不显示，传字符串时显示该文字 |
| size | `'xs' \| 'md'` | `'md'` | 环形的尺寸，`xs` 为小号；对其他样式无效 |
