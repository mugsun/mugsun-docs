---
title: Notice Bar 通知栏
demo: pages/demo/feedback/notice-bar
---

# Notice Bar 通知栏

`ms-notice-bar` 是通知栏。单条内容显示为一行，超出部分省略；多条内容可以纵向轮播。还可以带操作文字和关闭按钮。

uni-app x 在 App 平台不支持 `@keyframes`，所以没有横向滚动的跑马灯效果。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 主题 -->
  <ms-notice-bar theme="default" content="默认公告" />
  <ms-notice-bar theme="primary" content="主色公告" />
  <ms-notice-bar theme="success" content="成功公告" />
  <!-- 长文本 -->
  <ms-notice-bar
    theme="primary"
    content="这是一条很长的公告文案，超出宽度时应省略显示而不是撑破布局"
  />
  <!-- 竖向 -->
  <ms-notice-bar direction="vertical" theme="primary" :list="verticalList" />
  <!-- 可关闭 -->
  <ms-notice-bar theme="warning" content="可关闭公告" closable @close="onNoticeClose" />
</template>

<script setup lang="uts">
const verticalList = ['轮播公告一', '轮播公告二', '轮播公告三'] as string[]

function onNoticeClose() : void {
  console.log('onNoticeClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 主题色 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 显示方式：horizontal 单行显示 / vertical 纵向轮播 |
| content | `string` | `''` | 通知文字 |
| list | `string[]` | `[]` | 多条通知，用于纵向轮播；为空时使用 `content` |
| closable | `boolean` | `false` | 是否可关闭 |
| icon | `string` | `'megaphone-line'` | 左侧图标名 |
| showIcon | `boolean` | `true` | 是否显示左侧图标；icon 为空时也隐藏 |
| operation | `string` | `''` | 右侧操作文字 |
| suffixIcon | `string` | `''` | 右侧图标名，例如箭头；`closable` 为 `true` 时不显示 |
| interval | `number` | `3000` | 纵向轮播的间隔（ms） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击通知栏时触发，点击操作文字和右侧图标时也会触发 |
| close | — | 点击关闭按钮时触发，随后通知栏隐藏 |
| operation | — | 点击操作文字时触发 |
