---
title: Graph
demo: pages/demo/media/graph
---

# Graph

`ms-graph` draws relationship graphs on a native canvas with tree, force-directed and layered DAG layouts. The layouts follow common F6 layouts, but `@antv/f6` is not included from npm.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-graph/components/ms-graph`. ms-ui is MIT-licensed; its source repository is not yet public.
Optional plugin: install `uni_modules/ms-graph` alongside `ms-ui`.
Demo route: `#/pages/demo/media/graph`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/media/graph.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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
