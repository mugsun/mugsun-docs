---
title: Snackbar 消息条
demo: pages/demo/feedback/snackbar
---

# Snackbar 消息条

`ms-snackbar` 是显示在顶部或底部的消息条，由浅色语义底色、图标和文字组成，可带关闭或操作按钮，到达设定时间后自动关闭。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-snackbar
    :visible="showText"
    content="这是一条纯文字的消息通知"
    :show-icon="false"
    @update:visible="onTextVisible"
  />
  <ms-snackbar
    :visible="showIcon"
    content="这是一条带图标的消息通知"
    @update:visible="onIconVisible"
  />
  <ms-snackbar
    :visible="showClose"
    content="这是一条带关闭的消息通知"
    close-btn
    :duration="0"
    @update:visible="onCloseVisible"
    @close="onClosed"
  />
</template>

<script setup lang="uts">
const showClose = ref(false)

const showIcon = ref(false)

const showText = ref(false)

function onTextVisible(value: boolean): void {
  showText.value = value
}

function onIconVisible(value: boolean): void {
  showIcon.value = value
}

function onCloseVisible(value: boolean): void {
  showClose.value = value
}

function onClosed() : void {
  console.log('onClosed')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| content | `string` | `''` | 消息文字 |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 类型，决定底色和默认图标 |
| showIcon | `boolean` | `true` | 是否显示图标 |
| icon | `string` | `''` | 自定义图标名，留空使用类型对应的默认图标 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| actionText | `string` | `''` | 右侧操作文字，留空不显示 |
| placement | `'top' \| 'bottom'` | `'top'` | 显示位置：top 顶部 / bottom 底部 |
| align | `'left' \| 'center'` | `'left'` | 文字对齐：left / center |
| block | `boolean` | `false` | 是否铺满屏幕宽度 |
| duration | `number` | `3000` | 自动关闭的时间（ms），`0` 表示不自动关闭 |
| zIndex | `number` | `1200` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| close | — | 消息条关闭时触发 |
| action | — | 点击操作文字时触发，随后消息条关闭 |
| duration-end | — | 到达 `duration` 自动关闭时触发 |
