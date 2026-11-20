---
title: Text 文本
demo: pages/demo/basic/text
---

# Text 文本

`ms-text` 是文字组件，用 `variant` 选择语义颜色，可以设置字号、加粗和对齐，也可以按行数省略。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 正文与语义色 -->
  <ms-text>这是一段默认正文，用于页面正文展示。</ms-text>
  <ms-text variant="secondary">次要</ms-text>
  <ms-text variant="primary">主色</ms-text>
  <!-- 字号与样式 -->
  <ms-text size="sm">小号 · 辅助说明与标签</ms-text>
  <ms-text size="md">中号 · 默认正文与表单</ms-text>
  <ms-text size="lg">大号 · 小标题与强调</ms-text>
  <!-- 交互 -->
  <ms-text :lines="2">
    这是一段很长的文字，用来测试最大行数与省略号。第二行继续。第三行应该被截断并显示省略号效果。
  </ms-text>
  <ms-text selectable>可选中文字，长按或拖选</ms-text>
  <ms-text variant="primary" @click="onTextClick">点我（看 toast）</ms-text>
  <!-- 组件深度 -->
  <ms-text variant="danger" bold>危险操作不可恢复，请谨慎确认</ms-text>
  <ms-text variant="warning" align="right" size="sm">余额不足，请先充值</ms-text>
  <ms-text :lines="1" selectable variant="secondary">
    这是一段很长的可复制文案，超出一行时省略，仍可长按选中复制整段内容。
  </ms-text>
</template>

<script setup lang="uts">
function onTextClick() : void {
  console.log('onTextClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'secondary' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 语义颜色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| bold | `boolean` | `false` | 是否加粗 |
| lines | `number` | `0` | 最多显示的行数，超出部分省略；`0` 表示不限制 |
| selectable | `boolean` | `false` | 文字是否可以选中 |
| align | `'left' \| 'center' \| 'right'` | `'left'` | 对齐方式 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击文字时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 文字内容 |
