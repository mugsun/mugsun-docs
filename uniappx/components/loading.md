---
title: Loading 加载
demo: pages/demo/basic/loading
---

# Loading 加载

`ms-loading` 是加载指示，由原生 `<loading>` 和文字组成，支持横向和纵向布局以及 tone 设置；默认插槽的优先级高于 text。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-loading`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/basic/loading`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/basic/loading.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 纯图标 -->
  <ms-loading text="" />
  <!-- 横向 -->
  <ms-loading layout="horizontal" text="加载中…" />
  <!-- 竖向 -->
  <ms-loading layout="vertical" text="加载中…" />
  <!-- 纯文字 -->
  <ms-loading :indicator="false" text="加载中…" />
</template>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | 展示文案 |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | 布局 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | 色调：default / primary / inverse |
| indicator | `boolean` | `true` | 是否显示指示器 |
| paused | `boolean` | `false` | 是否暂停旋转动画 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-loading/`
- 演示: `#/pages/demo/basic/loading`
