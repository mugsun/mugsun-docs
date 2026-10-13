---
title: Tree 树
demo: pages/demo/display/tree
---

# Tree 树

`ms-tree`：树形列表：扁平可见行渲染（不递归组件），支持展开/折叠、多选勾选、子父关联半选、禁父框。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-tree`（源码仓暂未公开）。
演示路由：`#/pages/demo/display/tree`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/tree.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| value | `string[]` | `[]` | 当前值 |
| folderIds | `string[]` | `[]` | 文件夹 id 列表 |
| checkable | `boolean` | `true` | 是否可选中 |
| parentLink | `boolean` | `false` | 选父是否联动子；选子是否回写父 |
| disabledParent | `boolean` | `false` | 是否禁用父级联动 |
| disabled | `boolean` | `false` | 是否禁用 |
| idKey | `string` | `'id'` | id 字段名 |
| labelKey | `string` | `'text'` | 标签字段名 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:value | v-model:value 更新 |
| update:folderIds | update:folderIds |
| change | 值变化 |
| expand-change | expand-change |
| node-click | 点击节点 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree/`
- 演示: `#/pages/demo/display/tree`
