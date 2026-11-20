---
title: Tree
demo: pages/demo/display/tree
---

# Tree

`ms-tree` is a tree list. Nodes expand and collapse, can be multi-selected with checkboxes, and parent and child checkboxes can be linked.

Bind the checked and expanded nodes with `v-model:value` and `v-model:folderIds`; the component keeps neither state itself.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Basic tree -->
  <ms-tree
    :list="treeList"
    :folder-ids="basicFolders"
    :checkable="false"
    @update:folderIds="onBasicFolders"
    @expand-change="onBasicExpand"
    @node-click="onNodeClick"
  />
  <!-- Selectable -->
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
  <!-- States -->
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Nodes; by default each has `id` and `text`, plus optional `children` and `disabled` |
| value | `string[]` | `[]` | Ids of the checked nodes. Works with `v-model:value` |
| folderIds | `string[]` | `[]` | Ids of the expanded nodes. Works with `v-model:folderIds`; listing a deep node also expands its ancestors |
| checkable | `boolean` | `true` | Whether to show checkboxes |
| parentLink | `boolean` | `false` | Whether parents and children are linked: checking a parent checks or clears all its descendants, and a parent's state follows its children |
| disabledParent | `boolean` | `false` | Whether nodes with children cannot be checked; they can still be expanded |
| disabled | `boolean` | `false` | Whether to disable all checkboxes |
| idKey | `string` | `'id'` | Field name of the node id |
| labelKey | `string` | `'text'` | Field name of the node text |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:value | `ids: string[]` | Fires when the checked nodes change; used by `v-model:value` |
| update:folderIds | `ids: string[]` | Fires when a node is expanded or collapsed; used by `v-model:folderIds` |
| change | `ids: string[]` | Fires when the checked nodes change; `ids` lists every checked node |
| expand-change | `ids: string[]` | Fires when a node is expanded or collapsed; `ids` lists every expanded node |
| node-click | `id: string` | Fires when a node's text is tapped; `id` is that node's id |
