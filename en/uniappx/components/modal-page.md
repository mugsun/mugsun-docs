---
title: Modal Page
demo: pages/demo/feedback/modal-page
---

# Modal Page

`ms-modal-page` is a full-page modal layer that covers the screen with `position: fixed` and does not depend on the x-design native `xModalPage`.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-modal-page`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/modal-page`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/modal-page.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| showClose | `boolean` | `true` | Whether to show close |
| closeOnOverlayClick | `boolean` | `false` | Whether clicking the overlay closes |
| zIndex | `number` | `1100` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| open | Opened |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| footer | `footer` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-modal-page/`
- Demo: `#/pages/demo/feedback/modal-page`
- Chinese docs: [/uniappx/components/modal-page](/uniappx/components/modal-page)
