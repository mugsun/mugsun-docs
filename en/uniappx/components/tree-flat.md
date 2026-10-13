---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat` — Tree Flat for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tree-flat` (commercial edition; source not public).
Demo route: `#/pages/demo/display/tree-flat`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/tree-flat.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
