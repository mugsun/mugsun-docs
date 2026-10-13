---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat` — Tree Flat for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` (repository not yet public) (`uni_modules/ms-ui/components/ms-tree-flat`).
Demo route: `#/pages/demo/display/tree-flat`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/tree-flat.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-tree-flat ref="mainRef" :list="tree" @node-click="onNode" @change="onChange" />
  <ms-tree-flat :list="tree" direction="vertical" :height="260" />
  <!-- 组件样式 -->
  <ms-tree-flat :list="tree" line-type="curve" :height="260" />
  <ms-tree-flat :list="small" :collapsible="false" :height="200" :font-size="14" />
  <!-- 组件深度 -->
  <ms-tree-flat :list="small" line-type="straight" :height="200" />
  <ms-tree-flat :list="small" direction="vertical" :font-size="16" :height="220" />
  <ms-tree-flat :list="collapsed" :height="200" />
</template>

<script setup lang="uts">
const mainRef = ref<ComponentPublicInstance | null>(null)
const tree = ref([
const small = ref([
const collapsed = ref([
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| height | `number` | `320` | Height (px) |
| direction | `string` | `'horizontal'` | Direction |
| lineType | `string` | `'straight'` | Link style: straight / curve |
| fontSize | `number` | `13` | Font size (px) |
| collapsible | `boolean` | `true` | Whether collapsible |

## Events

| Event | Description |
| --- | --- |
| node-click | Node click |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree-flat/`
- Demo: `#/pages/demo/display/tree-flat`
- Chinese docs: [/uniappx/components/tree-flat](/uniappx/components/tree-flat)
