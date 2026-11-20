---
title: Modal
demo: pages/demo/feedback/modal
---

# Modal

`ms-modal` is a dialog with a centered title and body and one or two buttons at the bottom, which can be stacked vertically. Use `theme="danger"` for destructive actions.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-modal
    :visible="showRecipeDelete"
    title="Delete this item?"
    content="This cannot be undone. Please confirm."
    theme="danger"
    confirm-text="Delete"
    show-cancel
    @update:visible="onRecipeDeleteVisible"
    @confirm="onRecipeDeleteConfirm"
    @cancel="onRecipeDeleteCancel"
  />
  <ms-modal
    :visible="showFeedback"
    title="Dialog title"
    content="Explain the current status, details and how to resolve it; keep the text within three lines"
    @update:visible="onFeedbackVisible"
    @confirm="onConfirmTap"
  />
  <ms-modal
    :visible="showConfirm"
    title="Dialog title"
    content="Confirmation dialog: Cancel on the left, OK on the right"
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| content | `string` | `''` | Body text; use the default slot for richer content |
| confirmText | `string` | `'确定'` | Confirm button label; the default is Chinese for "OK" |
| cancelText | `string` | `'取消'` | Cancel button label; the default is Chinese for "Cancel" |
| showCancel | `boolean` | `false` | Whether to show cancel button |
| buttonLayout | `'horizontal' \| 'vertical'` | `'horizontal'` | Button layout: horizontal / vertical |
| theme | `'default' \| 'danger'` | `'default'` | Confirm button style; `danger` is for destructive actions |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| closeOnOverlayClick | `boolean` | `false` | Whether clicking the overlay closes |
| closeOnConfirm | `boolean` | `true` | Whether to close automatically after confirm |
| confirmLoading | `boolean` | `false` | Whether the confirm button shows a loading state; taps are ignored while loading |
| zIndex | `number` | `1000` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the dialog opens or closes; used by `v-model:visible` |
| confirm | — | Fires when the confirm button is tapped; not fired while `confirmLoading` is `true` |
| cancel | — | Fires when the cancel button is tapped |
| close | — | Fires when the dialog closes |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom content shown below the body text, such as an input |
