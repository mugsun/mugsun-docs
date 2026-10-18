---
title: Divider 分割线
demo: pages/demo/basic/divider
---

# Divider 分割线

`ms-divider` 是分割线。`layout` 设置水平或垂直方向，`align` 设置文字靠左、居中或靠右，`dashed` 显示虚线，`text` 设置中间文字；也可以用默认插槽替换文字，有插槽内容时使用带文字的布局。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-divider`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/basic/divider`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/divider.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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
