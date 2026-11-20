---
title: Paragraph 段落
demo: pages/demo/display/paragraph
---

# Paragraph 段落

`ms-paragraph` 用于显示段落正文，可选次要文字颜色和按行数省略。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-paragraph
    content="Mugsun 是一套面向移动端的组件库，强调设计令牌驱动与多端表现一致。"
    @click="onParaClick"
  />
  <ms-paragraph
    tone="secondary"
    content="次要说明用于补充上下文，字色更弱，不抢主信息。"
  />
  <!-- 组件状态 -->
  <ms-paragraph
    :lines="2"
    content="这是一段很长的段落文案，用来演示多行省略截断效果。超过指定行数后应以省略号收尾，避免把卡片撑得过高，也方便在列表场景里保持节奏。"
  />
  <!-- 组件深度 -->
  <ms-paragraph tone="success" content="成功提示：资料已保存。" />
  <ms-paragraph tone="warning" content="警告提示：请核对必填项。" />
  <ms-paragraph tone="danger" content="危险提示：操作不可撤销。" />
</template>

<script setup lang="uts">
function onParaClick() : void {
  console.log('onParaClick')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `''` | 文字内容 |
| tone | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | 颜色：default / secondary / success / warning / danger |
| lines | `number` | `0` | 最多显示的行数，超出部分省略；`0` 表示不限制 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击段落时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 段落内容，默认显示 `content` |
