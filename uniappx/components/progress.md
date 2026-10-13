---
title: Progress 进度
demo: pages/demo/display/progress
---

# Progress 进度

`ms-progress`：进度条：线形 / 内显 / 环形；`percentage` + `status` + 可选 `label`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-progress`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/progress`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/progress.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| percentage | `number` | `0` | 进度百分比 0–100 |
| variant | `'line' \| 'plump' \| 'circle'` | `'line'` | 样式变体 |
| status | `'default' \| 'success' \| 'warning' \| 'error' \| 'active'` | `'default'` | 状态 |
| strokeWidth | `number` | `6` | 轨道粗细（px） |
| label | `boolean \| string` | `true` | 标签文案 |
| size | `'xs' \| 'md'` | `'md'` | 尺寸 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-progress/`
- 演示: `#/pages/demo/display/progress`
