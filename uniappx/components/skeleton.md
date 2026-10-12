---
title: Skeleton 骨架
demo: pages/demo/display/skeleton
---

# Skeleton 骨架

`ms-skeleton`：骨架屏：`theme` 预设 + 可选 `flashed` opacity 闪烁；`loading=false` 出默认 slot。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-skeleton`）。
演示路由：`#/pages/demo/display/skeleton`。

## 基础用法

```vue
<template>
  <ms-skeleton theme="avatar" :loading="true">
    …
  </ms-skeleton>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| loading | `boolean` | `true` | — |
| delay | `number` | `0` | — |
| theme | `'avatar' \| 'image' \| 'text' \| 'paragraph' \| 'card'` | `'text'` | — |
| animation | `'none' \| 'flashed'` | `'none'` | — |
| row | `number` | `0` | paragraph/text 行数（2–6） |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-skeleton/`
- 演示：`#/pages/demo/display/skeleton`
