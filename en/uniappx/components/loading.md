---
title: Loading
demo: pages/demo/basic/loading
---

# Loading

`ms-loading` — Loading for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-loading` (commercial edition; source not public).
Demo route: `#/pages/demo/basic/loading`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/loading.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 纯图标 -->
  <ms-loading text="" />
  <!-- 横向 -->
  <ms-loading layout="horizontal" text="加载中…" />
  <!-- 竖向 -->
  <ms-loading layout="vertical" text="加载中…" />
  <!-- 纯文字 -->
  <ms-loading :indicator="false" text="加载中…" />
</template>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | `string` | `'加载中…'` | Display text |
| layout | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| tone | `'default' \| 'primary' \| 'inverse'` | `'default'` | Tone: default / primary / inverse |
| indicator | `boolean` | `true` | Whether to show indicator |
| paused | `boolean` | `false` | Whether spin animation is paused |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-loading/`
- Demo: `#/pages/demo/basic/loading`
- Chinese docs: [/uniappx/components/loading](/uniappx/components/loading)
