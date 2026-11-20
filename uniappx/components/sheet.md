---
title: Sheet 容器
demo: pages/demo/basic/sheet
---

# Sheet 容器

`ms-sheet` 是卡片式的容器，可以设置底色、圆角、内外边距，以及边框和投影。

设置 `url` 后点击会跳转到该页面；没有 `url` 时点击触发 `click` 事件。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-sheet radius="lg" padding="none">
    <text>默认容器</text>
    <text>统一白底面，承载列表与表单</text>
    <ms-sheet>
      <ms-text>统一白底容器，承载列表与表单内容。</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>圆角</text>
    <text>大圆角 + 浅底面</text>
    <ms-sheet radius="lg" variant="muted">
      <ms-text>圆角卡片面</ms-text>
    </ms-sheet>
  </ms-sheet>
  <ms-sheet radius="lg" bordered shadow padding="md">
    <text>描边</text>
    <text>边框强调块边界</text>
    <ms-sheet bordered radius="lg">
      <ms-text>带边框的容器块</ms-text>
    </ms-sheet>
  </ms-sheet>
</template>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | 底色：default / muted / primary |
| radius | `'md' \| 'lg'` | `'lg'` | 圆角大小：md / lg |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | 内边距：none / md / lg |
| margin | `'none' \| 'page'` | `'none'` | 外边距：none 无 / page 页面边距 |
| bordered | `boolean` | `false` | 是否显示边框 |
| shadow | `boolean` | `false` | 是否显示投影 |
| loading | `boolean` | `false` | 是否显示加载中，加载时点击无效 |
| url | `string` | `''` | 点击后跳转的页面路径 |
| pressable | `boolean` | `false` | 是否带按压效果；设置了 `url` 时自动带有 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击时触发；设置了 `url` 或正在加载时不触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 容器内容 |
