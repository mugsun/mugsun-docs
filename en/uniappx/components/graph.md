---
title: Graph
demo: pages/demo/media/graph
---

# Graph

`ms-graph`: Native canvas graph subset: tree / force / layered DAG. F6-like layout semantics without embedding `@antv/f6`.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-graph/components/ms-graph` (commercial edition; source not public).
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
  n('draft', '提交申请'),
  n('leader', '直属主管'),
  n('budget', '预算校验'),
  n('finance', '财务初审'),
  n('legal', '法务会签'),
  n('cfo', 'CFO 审批'),
  n('pay', '出纳付款'),
  n('archive', '凭证归档'),
  n('reject', '驳回修改'),
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
  n('gateway', '网关'),
  n('auth', '认证'),
  n('user', '用户'),
  n('order', '订单'),
  n('pay', '支付'),
  n('inventory', '库存'),
  n('promo', '营销'),
  n('search', '搜索'),
  n('notify', '消息'),
  n('risk', '风控'),
  n('settle', '结算'),
  n('log', '日志'),
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
