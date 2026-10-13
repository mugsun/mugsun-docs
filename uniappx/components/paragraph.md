---
title: Paragraph 段落
demo: pages/demo/display/paragraph
---

# Paragraph 段落

`ms-paragraph`：段落正文。可选次级色与行数省略。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-paragraph`）。
演示路由：`#/pages/demo/display/paragraph`。

## 基础用法

```vue
<template>
  <ms-paragraph size="sm">
    …
  </ms-paragraph>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 内容文案 |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 文案色调：default / secondary / success / warning / danger |
| lines | `number` | `0` | 行数 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-paragraph/`
- 演示: `#/pages/demo/display/paragraph`
