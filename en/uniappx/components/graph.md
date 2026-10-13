---
title: Graph
demo: pages/demo/media/graph
---

# Graph

`ms-graph`: Native canvas graph subset: tree / force / layered DAG. F6-like layout semantics without embedding `@antv/f6`.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-graph/components/ms-graph` (repository not yet public).
Optional plugin: install `uni_modules/ms-graph` alongside `ms-ui`.
Demo route: `#/pages/demo/media/graph`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/graph.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-graph
    layout="tree"
    :nodes="orgNodes"
    :edges="orgEdges"
    :height="360"
    @node-click="onNode"
    @ready="onReady"
  />
  <ms-graph
    layout="force"
    :nodes="serviceNodes"
    :edges="serviceEdges"
    :height="340"
    @node-click="onNode"
  />
  <ms-graph
    layout="dagre"
    :nodes="flowNodes"
    :edges="flowEdges"
    :height="360"
    @node-click="onNode"
  />
  <!-- 组件样式 -->
  <ms-graph
    layout="tree"
    :nodes="orgNodes"
    :edges="orgEdges"
    :height="320"
    @node-click="onNode"
  />
  <!-- 组件深度 -->
  <ms-graph
    layout="dagre"
    :nodes="flowNodes"
    :edges="flowEdges"
    :height="340"
    :fit-view="true"
    @node-click="onNode"
  />
  <ms-graph layout="tree" :nodes="emptyNodes" :edges="emptyEdges" :height="120" />
</template>

<script setup lang="uts">
const orgNodes = ref(buildOrgV1())
const orgEdges = ref(buildOrgEdgesV1())
const serviceNodes = ref([
const serviceEdges = ref([
const flowNodes = ref([
const flowEdges = ref([
const emptyNodes = ref([] as UTSJSONObject[])
const emptyEdges = ref([] as UTSJSONObject[])
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | Layout |
| nodes | `UTSJSONObject[]` | `[]` | Node list |
| edges | `UTSJSONObject[]` | `[]` | Edge list |
| height | `number` | `320` | Height (px) |
| fitView | `boolean` | `true` | Whether to fit the viewport |

## Events

| Event | Description |
| --- | --- |
| node-click | Node click |
| ready | Ready |

## See also

- Component: `uni_modules/ms-graph/components/ms-graph/`
- Demo: `#/pages/demo/media/graph`
- Chinese docs: [/uniappx/components/graph](/uniappx/components/graph)
