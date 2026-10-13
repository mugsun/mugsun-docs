---
title: Tree Flat 思维导图
demo: pages/demo/display/tree-flat
---

# Tree Flat 思维导图

`ms-tree-flat`：平面树 / 思维导图：canvas 绘制节点与连线，点父节点展开收起。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-tree-flat`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/tree-flat`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/tree-flat.uvue`。运行效果：宽屏看右侧手机框，手机上点底栏「打开 H5 演示」。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| height | `number` | `320` | 高度（px） |
| direction | `string` | `'horizontal'` | 方向 |
| lineType | `string` | `'straight'` | 连线样式：straight / curve |
| fontSize | `number` | `13` | 字号（px） |
| collapsible | `boolean` | `true` | 是否可折叠 |

## 事件

| 事件 | 说明 |
| --- | --- |
| node-click | 点击节点 |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree-flat/`
- 演示: `#/pages/demo/display/tree-flat`
