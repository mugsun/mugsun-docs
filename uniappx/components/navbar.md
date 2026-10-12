---
title: Navbar 顶栏
demo: pages/demo/nav/navbar
---

# Navbar 顶栏

`ms-navbar`：自定义顶栏。左侧返回/首页 + 中间标题 + 右侧操作，三插槽 `left` / `title` / `right`。

属于 **ms-ui · uni-app x** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-navbar`）。
演示路由：`#/pages/demo/nav/navbar`。

## 基础用法

```vue
<template>
  <ms-navbar theme="light" title="…">
    …
  </ms-navbar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| title | `string` | `''` | 标题 |
| titleAlign | `'center' \| 'left'` | `'center'` | 标题对齐：center / left |
| titleMaxLength | `number` | `0` | 标题最大字数，超出用 … 收尾；0 表示不截断 |
| leftArrow | `boolean` | `false` | 是否显示左侧返回箭头 |
| leftText | `string` | `''` | 左侧返回文案；空串只显示箭头 |
| homeIcon | `boolean` | `false` | 返回旁再放一个首页入口 |
| theme | `'light' \| 'brand'` | `'light'` | 主题色 |
| fixed | `boolean` | `true` | 是否固定定位 |
| placeholder | `boolean` | `false` | fixed 时是否在文档流里占位，避免内容被压住 |
| safeAreaInsetTop | `boolean` | `true` | 是否预留顶部安全区 |
| zIndex | `number` | `500` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| go-back | go-back |
| go-home | go-home |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| left | `left` 插槽 |
| right | `right` 插槽 |
| title | `title` 插槽 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-navbar/`
- 演示: `#/pages/demo/nav/navbar`
