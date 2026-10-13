---
title: Snackbar
demo: pages/demo/feedback/snackbar
---

# Snackbar

`ms-snackbar` — Snackbar for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-snackbar` (repository not yet public).
Demo route: `#/pages/demo/feedback/snackbar`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/snackbar.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-snackbar
    :visible="showText"
    content="这是一条纯文字的消息通知"
    :show-icon="false"
    @update:visible="onTextVisible"
  />
  <ms-snackbar
    :visible="showIcon"
    content="这是一条带图标的消息通知"
    @update:visible="onIconVisible"
  />
  <ms-snackbar
    :visible="showClose"
    content="这是一条带关闭的消息通知"
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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| content | `string` | `''` | Content text |
| theme | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Theme color |
| showIcon | `boolean` | `true` | Whether to show the theme default icon |
| icon | `string` | `''` | Custom icon name (icons.uts); empty uses theme default |
| closeBtn | `boolean` | `false` | Whether to show the close button |
| actionText | `string` | `''` | Right action label; empty hides it |
| placement | `'top' \| 'bottom'` | `'top'` | Popup / placement |
| align | `'left' \| 'center'` | `'left'` | Text align: left / center |
| block | `boolean` | `false` | Full bleed: drop max-width and stretch edge to edge |
| duration | `number` | `3000` | Milliseconds; 0 = do not auto-close |
| zIndex | `number` | `1200` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |
| action | Action button |
| duration-end | duration-end |

## See also

- Component: `uni_modules/ms-ui/components/ms-snackbar/`
- Demo: `#/pages/demo/feedback/snackbar`
- Chinese docs: [/uniappx/components/snackbar](/uniappx/components/snackbar)
