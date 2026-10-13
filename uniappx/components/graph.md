---
title: Graph 关系图
demo: pages/demo/media/graph
---

# Graph 关系图

`ms-graph`：原生 canvas 关系图子集：树 / 力导 / 层次 DAG。学 F6 常用布局语义，**不** npm 嵌入 `@antv/f6`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-graph/components/ms-graph`（商业版，源码不公开）。
可选插件：需单独安装 `uni_modules/ms-graph`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/graph`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/graph.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| layout | `string` | `'tree'` | 布局 |
| nodes | `UTSJSONObject[]` | `[]` | 节点列表 |
| edges | `UTSJSONObject[]` | `[]` | 边列表 |
| height | `number` | `320` | 高度（px） |
| fitView | `boolean` | `true` | 是否适配视口 |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| ready | 就绪 |

## 相关

- 组件目录: `uni_modules/ms-graph/components/ms-graph/`
- 演示: `#/pages/demo/media/graph`
