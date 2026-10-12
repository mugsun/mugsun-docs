---
title: Avatar 头像
demo: pages/demo/display/avatar
---

# Avatar 头像

`ms-avatar`：单头像：图片 / 字符 / 图标。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-avatar`）。
演示路由：`#/pages/demo/display/avatar`。

## 基础用法

```vue
<template>
  <ms-avatar size="sm" text="…">
    …
  </ms-avatar>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | — |
| text | `string` | `''` | — |
| icon | `string` | `''` | — |
| shape | `'circle' \| 'round'` | `'circle'` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| mode | `string` | `'aspectFill'` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| error | 错误 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-avatar/`
- 演示：`#/pages/demo/display/avatar`
