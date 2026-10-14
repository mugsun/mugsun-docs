---
title: Modal
demo: pages/demo/feedback/modal
---

# Modal

`ms-modal` is a dialog with a centered title and body and one or two buttons at the bottom, which can be stacked vertically. Use `theme="danger"` for destructive actions.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-modal`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/modal`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/modal.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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
