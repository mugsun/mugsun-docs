---
title: Modal 对话框
demo: pages/demo/feedback/modal
---

# Modal 对话框

`ms-modal` 是对话框，标题和正文居中显示，底部有一个或两个按钮，按钮可以纵向排列；危险操作使用 `theme="danger"`。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-modal`。ms-ui 采用 MIT 许可，源码仓库暂未公开。
演示路由：`#/pages/demo/feedback/modal`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/feedback/modal.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| content | `string` | `''` | 正文文案；也可插槽覆盖 |
| confirmText | `string` | `'确定'` | 确认按钮文案 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |
| showCancel | `boolean` | `false` | 是否显示取消按钮 |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | 按钮排布：horizontal / vertical |
| theme | `'default' \| 'danger'` | `'default'` | 主题色 |
| closeBtn | `boolean` | `false` | 是否显示关闭按钮 |
| closeOnOverlayClick | `boolean` | `false` | 点击遮罩是否关闭 |
| closeOnConfirm | `boolean` | `true` | 点确认后是否关闭 |
| confirmLoading | `boolean` | `false` | 确认按钮是否加载中 |
| zIndex | `number` | `1000` | 层级 z-index |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:visible | v-model:visible 更新 |
| confirm | 确认 |
| cancel | 取消 |
| close | 关闭 |

## 插槽

| 插槽 | 说明 |
| --- | --- |
| default | 默认内容 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-modal/`
- 演示: `#/pages/demo/feedback/modal`
