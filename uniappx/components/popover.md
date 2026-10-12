---
title: Popover 气泡
demo: pages/demo/feedback/popover
---

# Popover 气泡

`ms-popover`：气泡提示。触发元素放默认插槽，气泡内容用 `content` prop 或 `content` 插槽。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-popover`）。
演示路由：`#/pages/demo/feedback/popover`。

## 基础用法

```vue
<template>
  <ms-popover theme="dark" v-model:visible="open">
    …
  </ms-popover>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| content | `string` | `''` | 纯文本内容；复杂内容用 content 插槽 |
| placement | `\| 'top'` | `'top'` | 弹出/摆放位置 |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | 主题色 |
| showArrow | `boolean` | `true` | 是否显示箭头 |
| closeOnClickOutside | `boolean` | `true` | 点气泡外（透明遮罩）是否关闭 |
| zIndex | `number` | `900` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| visible-change | visible-change |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |
| content | `content` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-popover/`
- 演示: `#/pages/demo/feedback/popover`
