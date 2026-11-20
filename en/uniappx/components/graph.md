---
title: Graph
demo: pages/demo/media/graph
---

# Graph

`ms-graph` draws relationship graphs on a native canvas with tree, force-directed and layered layouts, without any third-party graph library.

This is an optional plugin. Install `uni_modules/ms-graph` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
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
  <!-- Styles -->
  <ms-graph
    layout="tree"
    :nodes="orgNodes"
    :edges="orgEdges"
    :height="320"
    @node-click="onNode"
  />
  <!-- Advanced -->
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
const emptyEdges = ref([] as UTSJSONObject[])

const emptyNodes = ref([] as UTSJSONObject[])

const flowEdges = ref([
  e('draft', 'leader'),
  e('leader', 'budget'),
  e('budget', 'finance'),
  e('budget', 'reject'),
  e('finance', 'legal'),
  e('finance', 'cfo'),
  e('legal', 'cfo'),
  e('cfo', 'pay'),
  e('cfo', 'reject'),
  e('pay', 'archive'),
  e('reject', 'draft'),
] as UTSJSONObject[])

const flowNodes = ref([
  n('draft', 'Submit request'),
  n('leader', 'Direct manager'),
  n('budget', 'Budget check'),
  n('finance', 'Finance review'),
  n('legal', 'Legal sign-off'),
  n('cfo', 'CFO approval'),
  n('pay', 'Cashier payment'),
  n('archive', 'Archive voucher'),
  n('reject', 'Return for changes'),
] as UTSJSONObject[])

const orgEdges = ref(buildOrgEdgesV1())

const orgNodes = ref(buildOrgV1())

const serviceEdges = ref([
  e('gateway', 'auth'),
  e('gateway', 'user'),
  e('gateway', 'order'),
  e('gateway', 'search'),
  e('auth', 'user'),
  e('order', 'inventory'),
  e('order', 'pay'),
  e('order', 'promo'),
  e('order', 'risk'),
  e('pay', 'settle'),
  e('pay', 'notify'),
  e('promo', 'notify'),
  e('search', 'inventory'),
  e('risk', 'log'),
  e('settle', 'log'),
  e('user', 'notify'),
] as UTSJSONObject[])

const serviceNodes = ref([
  n('gateway', 'Gateway'),
  n('auth', 'Auth'),
  n('user', 'User'),
  n('order', 'Order'),
  n('pay', 'Payment'),
  n('inventory', 'Inventory'),
  n('promo', 'Marketing'),
  n('search', 'Search'),
  n('notify', 'Messages'),
  n('risk', 'Risk control'),
  n('settle', 'Settlement'),
  n('log', 'Logs'),
] as UTSJSONObject[])

function onNode(payload: UTSJSONObject) : void {
  console.log('onNode')
}

function onReady(payload: UTSJSONObject) : void {
  console.log('onReady')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | Layout: tree / force (force-directed) / dagre (layered) |
| nodes | `UTSJSONObject[]` | `[]` | Nodes, each with `id` and `label` |
| edges | `UTSJSONObject[]` | `[]` | Edges, each with `source` and `target` holding node `id` values |
| height | `number` | `320` | Canvas height (px) |
| fitView | `boolean` | `true` | Whether to fit all nodes into view after layout |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| node-click | `payload: UTSJSONObject` | Fires when a node is tapped; `payload` has `index`, `id` and `label` |
| ready | `payload: UTSJSONObject` | Fires after each draw completes; `payload` has the node count `nodes` and the edge count `edges` |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `redraw()` | Redraws the graph |
| `fit()` | Lays the graph out again and resets pan and zoom |
