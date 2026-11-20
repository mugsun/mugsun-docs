---
title: Snackbar
demo: pages/demo/feedback/snackbar
---

# Snackbar

`ms-snackbar` is a message bar at the top or bottom with a light semantic background, an icon and text. It can have a close or action button and closes automatically after a set time.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-snackbar
    :visible="showText"
    content="A text-only notification"
    :show-icon="false"
    @update:visible="onTextVisible"
  />
  <ms-snackbar
    :visible="showIcon"
    content="A notification with an icon"
    @update:visible="onIconVisible"
  />
  <ms-snackbar
    :visible="showClose"
    content="A notification with a close button"
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Message text |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Type, which sets the background and the default icon |
| showIcon | `boolean` | `true` | Whether to show the icon |
| icon | `string` | `''` | Custom icon name; empty uses the default icon of the type |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| actionText | `string` | `''` | Action label on the right; hidden when empty |
| placement | `'top' \| 'bottom'` | `'top'` | Position: top / bottom |
| align | `'left' \| 'center'` | `'left'` | Text alignment: left / center |
| block | `boolean` | `false` | Whether to span the full screen width |
| duration | `number` | `3000` | Time before it closes automatically (ms); `0` keeps it open |
| zIndex | `number` | `1200` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the bar opens or closes; used by `v-model:visible` |
| close | — | Fires when the bar closes |
| action | — | Fires when the action label is tapped; the bar then closes |
| duration-end | — | Fires when `duration` elapses and the bar closes automatically |
