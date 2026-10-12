---
title: Text 文本
demo: pages/demo/basic/text
---

# Text 文本

`ms-text`：语义化文字。`variant` / `size` / `bold` / `align` / `lines` / `selectable`。行高 1.7（对齐 x-text）。高亮/正则为二期。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-text`）。
演示路由：`#/pages/demo/basic/text`。

## 基础用法

```vue
<template>
  <ms-text variant="default" size="sm">
    …
  </ms-text>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 变体样式 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bold | `boolean` | `false` | 是否加粗 |
| lines | `number` | `0` | 行数 |
| selectable | `boolean` | `false` | 是否可选中文本 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-text/`
- 演示: `#/pages/demo/basic/text`
