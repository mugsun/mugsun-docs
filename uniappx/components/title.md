---
title: Title 标题
demo: pages/demo/nav/title
---

# Title 标题

`ms-title`：标题块。等级 `h1`–`h6`，可选行数省略。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-title`）。
演示路由：`#/pages/demo/nav/title`。

## 基础用法

```vue
<template>
  <ms-title>
    …
  </ms-title>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 内容文案 |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | 级数 |
| lines | `number` | `0` | 行数 |
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

- 组件目录: `uni_modules/ms-ui/components/ms-title/`
- 演示: `#/pages/demo/nav/title`
