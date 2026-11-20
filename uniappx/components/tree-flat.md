---
title: Tree Flat 思维导图
demo: pages/demo/display/tree-flat
---

# Tree Flat 思维导图

`ms-tree-flat` 以平面树或思维导图的形式展示数据，用 canvas 绘制节点和连线，点击父节点可展开或收起。

## 基础用法

<!-- demo-snippets:start -->
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
const collapsed = ref([
  node(
    '跨端适配',
    [node('Web', leafNone), node('小程序', leafNone), node('iOS', leafNone)] as UTSJSONObject[],
    false
  ),
] as UTSJSONObject[])

const small = ref([
  node('跨端适配', [node('Web', leafNone), node('小程序', leafNone), node('iOS', leafNone)] as UTSJSONObject[]),
] as UTSJSONObject[])

const tree = ref([
  node('组件库', [
    node('基础', [node('按钮', leafNone), node('图标', leafNone), node('文本', leafNone)] as UTSJSONObject[]),
    node('表单', [node('输入框', leafNone), node('选择器', leafNone)] as UTSJSONObject[]),
    node('展示', [node('表格', leafNone), node('树形', leafNone), node('词云', leafNone)] as UTSJSONObject[]),
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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 节点数据，每项含 `title`，可选 `children` 和 `opened` |
| height | `number` | `320` | 高度（px） |
| direction | `string` | `'horizontal'` | 展开方向：horizontal 横向 / vertical 纵向 |
| lineType | `string` | `'straight'` | 连线样式：straight 折线 / curve 曲线 |
| fontSize | `number` | `13` | 节点文字的字号（px） |
| collapsible | `boolean` | `true` | 点击父节点时是否展开或收起 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| node-click | `payload: UTSJSONObject` | 点击节点时触发，`payload` 含 `title` / `depth` / `hasChildren` / `opened`，其中 `opened` 是点击后的状态 |
| change | `payload: UTSJSONObject` | 每次绘制完成后触发，`payload` 含 `visible`（显示中的节点数）和 `total`（节点总数） |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `redraw()` | 重新绘制 |
| `toggleFirst()` | 展开或收起第一个有子节点的节点 |
