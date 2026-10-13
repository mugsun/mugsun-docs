---
title: Divider 分割线
demo: pages/demo/basic/divider
---

# Divider 分割线

`ms-divider`：分割线。`layout` 水平/垂直；`align` 左中右；`dashed` 虚线；`text` 中间文案；默认插槽可替换文案（`useSlots` 有插槽即走带文布局）。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-divider`（商业版，源码不公开）。
演示路由：`#/pages/demo/basic/divider`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/divider.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

```vue
<template>
  <!-- 纯分割 -->
  <ms-divider />
  <!-- 对齐 -->
  <ms-divider text="左对齐" align="left" />
  <ms-divider text="居中" align="center" />
  <ms-divider text="右对齐" align="right" />
  <!-- 垂直 -->
  <ms-divider layout="vertical" />
  <ms-divider layout="vertical" />
  <!-- 虚线 -->
  <ms-divider dashed />
  <ms-divider dashed text="文字信息" align="left" />
  <ms-divider dashed text="文字信息" align="center" />
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局 |
| align | `'left' \| 'center' \| 'right'` | `'center'` | 对齐方式 |
| dashed | `boolean` | `false` | 是否虚线 |
| text | `string` | `''` | 展示文案 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-divider/`
- 演示: `#/pages/demo/basic/divider`
