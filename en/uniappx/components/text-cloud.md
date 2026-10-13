---
title: Text Cloud
demo: pages/demo/display/text-cloud
---

# Text Cloud

`ms-text-cloud` — Text Cloud for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-text-cloud`).
Demo route: `#/pages/demo/display/text-cloud`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/text-cloud.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-text-cloud :list="baseList" @complete="onComplete" />
  <ms-text-cloud :list="colorList" @complete="onComplete" />
  <!-- 组件样式 -->
  <ms-text-cloud :list="baseList" :height="200" :min-font-size="14" :max-font-size="40" />
  <ms-text-cloud :list="baseList" :height="120" :min-font-size="10" :max-font-size="20" :gap="1" />
  <!-- 组件深度 -->
  <ms-text-cloud :list="baseList" :height="160" :gap="8" :min-font-size="12" :max-font-size="28" />
  <ms-text-cloud :list="[]" :height="100" />
  <ms-text-cloud :list="shortList" :height="120" :min-font-size="14" :max-font-size="32" />
</template>

<script setup lang="uts">
const baseList = ref(build(3, ['#1d4ed8', '#64748b', '#94a3b8'] as string[]))
const colorList = ref(build(8, ['#dc2626', '#0d9488', '#f59e0b', '#0369a1'] as string[]))
const shortList = ref(((): UTSJSONObject[] => {
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| height | `number` | `180` | Height (px) |
| minFontSize | `number` | `12` | Word-cloud min font size (px) |
| maxFontSize | `number` | `30` | Word-cloud max font size (px) |
| gap | `number` | `2` | Gap (px) |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## See also

- Component: `uni_modules/ms-ui/components/ms-text-cloud/`
- Demo: `#/pages/demo/display/text-cloud`
- Chinese docs: [/uniappx/components/text-cloud](/uniappx/components/text-cloud)
