---
title: Avatar 头像
demo: pages/demo/display/avatar
---

# Avatar 头像

`ms-avatar`：单头像：图片 / 字符 / 图标。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| src | `string` | `''` | 头像图片地址 |
| text | `string` | `''` | 无图时展示的文字 |
| icon | `string` | `''` | 无图无文时的图标名 |
| shape | `'circle' \| 'round'` | `'circle'` | 外形：circle / round / square |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸档位 |
| mode | `string` | `'aspectFill'` | 图片 mode（如 aspectFill） |

## 事件

| 事件 | 说明 |
| --- | --- |
| click | 点击 |
| error | 错误 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-avatar/`
- 演示: `#/pages/demo/display/avatar`
