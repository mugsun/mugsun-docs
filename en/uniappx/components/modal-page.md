---
title: Modal Page
demo: pages/demo/feedback/modal-page
---

# Modal Page

`ms-modal-page` is a modal page that covers the whole screen, with a title bar and a close button, a scrollable body and an optional footer for actions.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <ms-modal-page v-model:visible="basicVisible" title="Full-page details" @open="onOpen" @close="onClose">
    <text>This is basic full-page modal content. The long text area scrolls.</text>
    <text>Second paragraph: it covers the host page instead of opening a native window.</text>
  </ms-modal-page>
  <ms-modal-page v-model:visible="footerVisible" title="With footer">
    <text>There is a confirm action below the content.</text>
    <template #footer>
      <ms-button block theme="primary" @click="footerVisible = false">Done</ms-button>
    </template>
  </ms-modal-page>
  <ms-modal-page v-model:visible="customVisible" title="Order confirmation · custom">
    <text>Custom title example.</text>
  </ms-modal-page>
</template>

<script setup lang="uts">
const basicVisible = ref(false)

const customVisible = ref(false)

const footerVisible = ref(false)

function onOpen() : void {
  console.log('onOpen')
}

function onClose() : void {
  console.log('onClose')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| showClose | `boolean` | `true` | Whether to show the close button |
| closeOnOverlayClick | `boolean` | `false` | Whether clicking the overlay closes |
| zIndex | `number` | `1100` | z-index |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:visible | `value: boolean` | Fires when the page opens or closes; used by `v-model:visible` |
| close | — | Fires when the page closes |
| open | — | Fires when the page opens |

## Slots

| Slot | Description |
| --- | --- |
| default | Page content; scrolls when it overflows |
| footer | Footer area for actions |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `open()` | Opens the page; requires `v-model:visible` |
| `close()` | Closes the page; requires `v-model:visible` |
