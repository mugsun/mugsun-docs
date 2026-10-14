---
title: Toast
demo: pages/demo/feedback/toast
---

# Toast

`ms-toast` is a brief message in text, icon or loading form. It can appear at the top, middle or bottom, with an optional mask.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-toast`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/feedback/toast`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/feedback/toast.uvue`. On wide screens, the running demo appears in the phone frame on the right. On phones, tap the H5 demo bar at the bottom.

```vue
<template>
  <ms-toast
    :visible="showPlain"
    message="Success"
    @update:visible="onPlainVisible"
  />
  <ms-toast
    :visible="showMultiLine"
    message="This is a longer message that wraps onto two or three lines at most"
    @update:visible="onMultiVisible"
  />
  <ms-toast
    :visible="showRowIcon"
    message="Horizontal icon"
    icon="star-line"
    @update:visible="onRowVisible"
  />
</template>

<script setup lang="uts">
const showMultiLine = ref(false)

const showPlain = ref(false)

const showRowIcon = ref(false)

function onPlainVisible(value: boolean): void {
  showPlain.value = value
}

function onMultiVisible(value: boolean): void {
  showMultiLine.value = value
}

function onRowVisible(value: boolean): void {
  showRowIcon.value = value
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | Whether visible |
| message | `string` | `''` | Message text |
| theme | `'default' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'default'` | Theme color |
| icon | `string` | `''` | Custom icon name (icons.uts); optional when theme has a default |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| placement | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Popup / placement |
| duration | `number` | `2000` | Milliseconds; 0 = do not auto-close |
| showOverlay | `boolean` | `false` | Show overlay to block click-through |
| zIndex | `number` | `1100` | z-index |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-toast/`
- Demo: `#/pages/demo/feedback/toast`
- Chinese docs: [/uniappx/components/toast](/uniappx/components/toast)
