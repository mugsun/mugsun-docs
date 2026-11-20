---
title: Tree 树
demo: pages/demo/display/tree
---

# Tree 树

`ms-tree` 是树形列表，可以展开和折叠节点，也可以用勾选框多选，父子节点的勾选可以联动。

勾选和展开的节点分别用 `v-model:value` 和 `v-model:folderIds` 绑定，组件自己不保存这两个状态。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 基础树 -->
  <ms-tree
    :list="treeList"
    :folder-ids="basicFolders"
    :checkable="false"
    @update:folderIds="onBasicFolders"
    @expand-change="onBasicExpand"
    @node-click="onNodeClick"
  />
  <!-- 可选 -->
  <ms-tree
    :list="treeList"
    :value="checkValue"
    :folder-ids="checkFolders"
    :parent-link="parentLink"
    checkable
    @update:value="onCheckValue"
    @update:folderIds="onCheckFolders"
    @change="onCheckChange"
    @node-click="onNodeClick"
  />
  <!-- 状态 -->
  <ms-tree
    :list="treeList"
    :value="stateValue"
    :folder-ids="stateFolders"
    :disabled-parent="disabledParent"
    parent-link
    checkable
    @update:value="onStateValue"
    @update:folderIds="onStateFolders"
    @node-click="onNodeClick"
  />
</template>

<script setup lang="uts">
const basicFolders = ref(['1', '2'] as string[])

const checkFolders = ref(['1', '1-2', '2'] as string[])

const checkValue = ref(['1-2-1'] as string[])

const disabledParent = ref(true)

const parentLink = ref(true)

const stateFolders = ref(['1', '1-1', '2'] as string[])

const stateValue = ref([] as string[])

function onBasicFolders(ids: string[]): void {
  basicFolders.value = ids
}

function onBasicExpand(ids: string[]) : void {
  console.log('onBasicExpand')
}

function onNodeClick(id: string) : void {
  console.log('onNodeClick')
}

function onCheckValue(ids: string[]): void {
  checkValue.value = ids
}

function onCheckFolders(ids: string[]): void {
  checkFolders.value = ids
}

function onCheckChange(ids: string[]) : void {
  console.log('onCheckChange')
}

function onStateValue(ids: string[]): void {
  stateValue.value = ids
}

function onStateFolders(ids: string[]): void {
  stateFolders.value = ids
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 节点数据，每项默认含 `id` 和 `text`，可选 `children` 和 `disabled` |
| value | `string[]` | `[]` | 勾选节点的 id 列表，可用 `v-model:value` |
| folderIds | `string[]` | `[]` | 展开节点的 id 列表，可用 `v-model:folderIds`；列出深层节点时会同时展开它的各级父节点 |
| checkable | `boolean` | `true` | 是否显示勾选框 |
| parentLink | `boolean` | `false` | 父子节点是否联动：勾选父节点会勾选或取消全部子孙节点，父节点的状态随子节点变化 |
| disabledParent | `boolean` | `false` | 有子节点的节点是否不能勾选，仍然可以展开 |
| disabled | `boolean` | `false` | 是否禁用全部勾选框 |
| idKey | `string` | `'id'` | 节点 id 的字段名 |
| labelKey | `string` | `'text'` | 节点文字的字段名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:value | `ids: string[]` | 勾选变化时触发，用于 `v-model:value` |
| update:folderIds | `ids: string[]` | 展开或折叠节点时触发，用于 `v-model:folderIds` |
| change | `ids: string[]` | 勾选变化时触发，`ids` 是全部勾选节点的 id |
| expand-change | `ids: string[]` | 展开或折叠节点时触发，`ids` 是全部展开节点的 id |
| node-click | `id: string` | 点击节点文字时触发，`id` 是该节点的 id |
