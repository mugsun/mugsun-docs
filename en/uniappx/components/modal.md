---
title: Modal
demo: pages/demo/feedback/modal
---

# Modal

`ms-modal` — Modal for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-modal` (repository not yet public).
Demo route: `#/pages/demo/feedback/modal`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/modal.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| content | `string` | `''` | Body text; can also be overridden by slot |
| confirmText | `string` | `'确定'` | Confirm button label |
| cancelText | `string` | `'取消'` | Cancel button label |
| showCancel | `boolean` | `false` | Whether to show cancel button |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | Button layout: horizontal / vertical |
| theme | `'default' \| 'danger'` | `'default'` | Theme color |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| closeOnOverlayClick | `boolean` | `false` | Whether clicking the overlay closes |
| closeOnConfirm | `boolean` | `true` | Whether to close after confirm |
| confirmLoading | `boolean` | `false` | Whether the confirm button is loading |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-modal/`
- Demo: `#/pages/demo/feedback/modal`
- Chinese docs: [/uniappx/components/modal](/uniappx/components/modal)
