---
title: Graph 关系图
demo: pages/demo/media/graph
---

# Graph 关系图

`ms-graph` 用原生 canvas 画关系图，提供树形、力导向和分层三种布局，不依赖第三方图形库。

这是可选插件，需要单独安装 `uni_modules/ms-graph`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | 布局：tree 树形 / force 力导向 / dagre 分层 |
| nodes | `UTSJSONObject[]` | `[]` | 节点列表，每项含 `id` 和 `label` |
| edges | `UTSJSONObject[]` | `[]` | 连线列表，每项含 `source` 和 `target`，值为节点的 `id` |
| height | `number` | `320` | 画布高度（px） |
| fitView | `boolean` | `true` | 布局完成后是否自动缩放到能看到全部节点 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| node-click | `payload: UTSJSONObject` | 点击节点时触发，`payload` 含 `index`、`id` 和 `label` |
| ready | `payload: UTSJSONObject` | 每次绘制完成后触发，`payload` 含节点数 `nodes` 和连线数 `edges` |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `redraw()` | 重新绘制 |
| `fit()` | 重新布局并复位平移和缩放 |
