---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat` shows data as a flat tree or mind map, drawing nodes and links on a canvas. Tap a parent node to expand or collapse it.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-tree-flat`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/display/tree-flat`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/tree-flat.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-tree-flat ref="mainRef" :list="tree" @node-click="onNode" @change="onChange" />
  <ms-tree-flat :list="tree" direction="vertical" :height="260" />
  <!-- Styles -->
  <ms-tree-flat :list="tree" line-type="curve" :height="260" />
  <ms-tree-flat :list="small" :collapsible="false" :height="200" :font-size="14" />
  <!-- Advanced -->
  <ms-tree-flat :list="small" line-type="straight" :height="200" />
  <ms-tree-flat :list="small" direction="vertical" :font-size="16" :height="220" />
  <ms-tree-flat :list="collapsed" :height="200" />
</template>

<script setup lang="uts">
const collapsed = ref([
  node(
    'Cross-platform',
    [node('Web', leafNone), node('Mini Program', leafNone), node('iOS', leafNone)] as UTSJSONObject[],
    false
  ),
] as UTSJSONObject[])

const small = ref([
  node('Cross-platform', [node('Web', leafNone), node('Mini Program', leafNone), node('iOS', leafNone)] as UTSJSONObject[]),
] as UTSJSONObject[])

const tree = ref([
  node('Component library', [
    node('Basics', [node('Button', leafNone), node('Icon', leafNone), node('Text', leafNone)] as UTSJSONObject[]),
    node('Form', [node('Input', leafNone), node('Picker', leafNone)] as UTSJSONObject[]),
    node('Display', [node('Table', leafNone), node('Tree', leafNone), node('Word cloud', leafNone)] as UTSJSONObject[]),
  ] as UTSJSONObject[]),
] as UTSJSONObject[])

function onNode(payload: UTSJSONObject) : void {
  console.log('onNode')
}

function onChange(payload: UTSJSONObject) : void {
  console.log('onChange')
}
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
