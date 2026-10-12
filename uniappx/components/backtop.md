---
title: Backtop 回顶
demo: pages/demo/nav/backtop
---

# Backtop 回顶

`ms-backtop`：回顶按钮：`scrollTop` ≥ `visibilityHeight` 才显示。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-backtop`）。
演示路由：`#/pages/demo/nav/backtop`。

## 基础用法

```vue
<template>
  <ms-backtop theme="round" text="…">
    …
  </ms-backtop>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | 滚动位置 |
| visibilityHeight | `number` | `200` | visibilityHeight 数值 |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | 主题 |
| text | `string` | `''` | 展示文案 |
| icon | `string` | `'skip-up-fill'` | 图标名（icons.uts） |
| fixed | `boolean` | `true` | 是否固定定位 |
| local | `boolean` | `false` | 是否本地/内联 |

## 事件

| 事件 | 说明 |
| --- | --- |
| to-top | to-top |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-backtop/`
- 演示: `#/pages/demo/nav/backtop`
