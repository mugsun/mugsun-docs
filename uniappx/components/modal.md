---
title: Modal 对话框
demo: pages/demo/feedback/modal
---

# Modal 对话框

`ms-modal` 是对话框，标题和正文居中显示，底部有一个或两个按钮，按钮可以纵向排列；危险操作使用 `theme="danger"`。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <ms-modal
    :visible="showRecipeDelete"
    title="删除这条数据？"
    content="删除后不可恢复，请确认操作"
    theme="danger"
    confirm-text="删除"
    show-cancel
    @update:visible="onRecipeDeleteVisible"
    @confirm="onRecipeDeleteConfirm"
    @cancel="onRecipeDeleteCancel"
  />
  <ms-modal
    :visible="showFeedback"
    title="对话框标题"
    content="告知当前状态、信息和解决方法，描述文案尽量控制在三行内"
    @update:visible="onFeedbackVisible"
    @confirm="onConfirmTap"
  />
  <ms-modal
    :visible="showConfirm"
    title="对话框标题"
    content="确认类对话框，左取消右确定"
    show-cancel
    @update:visible="onConfirmVisible"
    @confirm="onConfirmTap"
    @cancel="onCancelTap"
  />
</template>

<script setup lang="uts">
const showConfirm = ref(false)

const showFeedback = ref(false)

const showRecipeDelete = ref(false)

function onRecipeDeleteVisible(value: boolean): void {
  showRecipeDelete.value = value
}

function onRecipeDeleteConfirm() : void {
  console.log('onRecipeDeleteConfirm')
}

function onRecipeDeleteCancel() : void {
  console.log('onRecipeDeleteCancel')
}

function onFeedbackVisible(value: boolean): void {
  showFeedback.value = value
}

function onConfirmTap() : void {
  console.log('onConfirmTap')
}

function onConfirmVisible(value: boolean): void {
  showConfirm.value = value
}

function onCancelTap() : void {
  console.log('onCancelTap')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| content | `string` | `''` | 正文文字；更复杂的内容用默认插槽 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| showCancel | `boolean` | `false` | 是否显示取消按钮 |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | 按钮排布：horizontal / vertical |
| theme | `'default' \| 'danger'` | `'default'` | 确认按钮样式，`danger` 用于危险操作 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| closeOnOverlayClick | `boolean` | `false` | 点击遮罩是否关闭 |
| closeOnConfirm | `boolean` | `true` | 点击确认后是否自动关闭 |
| confirmLoading | `boolean` | `false` | 确认按钮是否显示加载中，加载时点击无效 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:visible | `value: boolean` | 显示状态变化时触发，用于 `v-model:visible` |
| confirm | — | 点击确认按钮时触发，`confirmLoading` 为 `true` 时不触发 |
| cancel | — | 点击取消按钮时触发 |
| close | — | 对话框关闭时触发 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 自定义内容，显示在正文下方，例如输入框 |
