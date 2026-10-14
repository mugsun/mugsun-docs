---
title: Progress 进度
demo: pages/demo/display/progress
---

# Progress 进度

`ms-progress` 是进度条，支持线形、文字内显和环形三种样式，通过 `percentage`、`status` 和可选的 `label` 设置。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-progress`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/display/progress`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/progress.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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
