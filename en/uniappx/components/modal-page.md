---
title: Modal Page
demo: pages/demo/feedback/modal-page
---

# Modal Page

`ms-modal-page` — Modal Page for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-modal-page`).
Demo route: `#/pages/demo/feedback/modal-page`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/modal-page.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-modal-page v-model:visible="basicVisible" title="整页详情" @open="onOpen" @close="onClose">
    <text>这是基础整页模态内容。可滚动长文区域。</text>
    <text>第二段说明：盖住宿主页，不走原生独立窗口。</text>
  </ms-modal-page>
  <ms-modal-page v-model:visible="footerVisible" title="带底栏">
    <text>内容区下方有确认操作。</text>
    <template #footer>
      <ms-button block theme="primary" @click="footerVisible = false">完成</ms-button>
    </template>
  </ms-modal-page>
  <ms-modal-page v-model:visible="customVisible" title="订单确认 · 自定义">
    <text>自定义标题示例。</text>
  </ms-modal-page>
</template>

<script setup lang="uts">
const basicVisible = ref(false)
const footerVisible = ref(false)
const customVisible = ref(false)
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
