---
title: Snackbar
demo: pages/demo/feedback/snackbar
---

# Snackbar

`ms-snackbar` is a message bar at the top or bottom with a light semantic background, an icon and text. It can have a close or action button and closes automatically after a set time.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-snackbar`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/snackbar`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/snackbar.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
