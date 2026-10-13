---
title: Toast
demo: pages/demo/feedback/toast
---

# Toast

`ms-toast` — Toast for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-toast`).
Demo route: `#/pages/demo/feedback/toast`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/feedback/toast.uvue`; see them running in the phone frame.

```vue
<template>
  <ms-toast
    :visible="showPlain"
    message="操作成功"
    @update:visible="onPlainVisible"
  />
  <ms-toast
    :visible="showMultiLine"
    message="这是一条比较长的提示文案，会折行显示，最多两三行"
    @update:visible="onMultiVisible"
  />
  <ms-toast
    :visible="showRowIcon"
    message="横向图标"
    icon="star-line"
    @update:visible="onRowVisible"
  />
</template>

<script setup lang="uts">
const showPlain = ref(false)
const showMultiLine = ref(false)
const showRowIcon = ref(false)
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
