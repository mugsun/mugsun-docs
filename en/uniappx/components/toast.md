---
title: Toast
demo: pages/demo/feedback/toast
---

# Toast

`ms-toast` — Toast for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-toast`).
Demo route: `#/pages/demo/feedback/toast`.

## Basic usage

```vue
<template>
  <ms-toast theme="default" v-model:visible="open">
    …
  </ms-toast>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
