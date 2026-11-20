---
title: Alert 警告条
demo: pages/demo/feedback/alert
---

# Alert 警告条

`ms-alert` 是页面内的警告条，支持主题色、浅色和填充两种样式，并可关闭。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 主题 -->
  <ms-alert theme="primary" :closable="false">主色提醒</ms-alert>
  <ms-alert theme="info" :closable="false">信息提醒</ms-alert>
  <ms-alert theme="success" :closable="false">成功提醒</ms-alert>
  <!-- 形态 -->
  <ms-alert variant="light" theme="primary" :closable="false">浅色</ms-alert>
  <ms-alert variant="solid" theme="primary" :closable="false">填充</ms-alert>
  <!-- 可关闭 -->
  <ms-alert
    theme="warning"
    :visible="showClosable"
    @update:visible="onClosableVisible"
    @close="onAlertClose"
  >可关闭</ms-alert>
  <ms-alert theme="info" :closable="false">常驻</ms-alert>
  <!-- 图标 -->
  <ms-alert theme="primary" icon="information-line" :closable="false">自定义图标</ms-alert>
</template>

<script setup lang="uts">
const showClosable = ref(true)

function onClosableVisible(value: boolean): void {
  showClosable.value = value
}

function onAlertClose() : void {
  console.log('onAlertClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| theme | `'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 主题色 |
| variant | `'light' \| 'solid'` | `'light'` | 样式变体 |
| closable | `boolean` | `true` | 是否可关闭 |
| icon | `string` | `''` | 图标名（icons.uts） |
| showIcon | `boolean` | `true` | 是否显示左侧图标 |
| title | `string` | `''` | 标题（可选，与默认插槽正文并存） |
| visible | `boolean` | `true` | 是否显示；配合 update:visible，关闭后可由父页面重新打开 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| click | — | 点击警告条时触发 |
| close | — | 点击关闭按钮时触发 |
| update:visible | `value: boolean` | 点击关闭按钮后触发，值为 `false`，用于 `v-model:visible` |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 正文内容 |
