---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat` shows data as a flat tree or mind map, drawing nodes and links on a canvas. Tap a parent node to expand or collapse it.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Nodes; each has `title`, plus optional `children` and `opened` |
| height | `number` | `320` | Height (px) |
| direction | `string` | `'horizontal'` | Layout direction: horizontal / vertical |
| lineType | `string` | `'straight'` | Link style: straight (angled lines) / curve |
| fontSize | `number` | `13` | Font size of the node text (px) |
| collapsible | `boolean` | `true` | Whether tapping a parent node expands or collapses it |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| node-click | `payload: UTSJSONObject` | Fires when a node is tapped; `payload` has `title` / `depth` / `hasChildren` / `opened`, where `opened` is the state after the tap |
| change | `payload: UTSJSONObject` | Fires after each draw; `payload` has `visible` (nodes currently shown) and `total` (all nodes) |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `redraw()` | Redraws the tree |
| `toggleFirst()` | Expands or collapses the first node that has children |
