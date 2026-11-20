---
title: Title 标题
demo: pages/demo/nav/title
---

# Title 标题

`ms-title` 是标题，等级为 `h1` 到 `h6`，可选按行数省略。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-title content="一级标题" level="h1" @click="onTitleClick" />
  <ms-title content="二级标题" level="h2" />
  <ms-title content="三级标题" level="h3" />
  <!-- 组件状态 -->
  <ms-title
    level="h4"
    :lines="1"
    content="这是一段很长的标题文案用来演示单行省略截断效果请不要折行"
  />
  <!-- 组件深度 -->
  <ms-title content="四级标题" level="h4" />
  <ms-title content="五级标题" level="h5" />
  <ms-title content="六级标题" level="h6" />
</template>

<script setup lang="uts">
function onTitleClick() : void {
  console.log('onTitleClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 标题文字 |
| level | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | 标题级别，`h1` 到 `h6` |
| lines | `number` | `0` | 最多显示的行数，超出部分省略；`0` 表示不限制 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击标题时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 标题内容，默认显示 `content` |
