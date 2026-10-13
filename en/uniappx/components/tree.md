---
title: Tree
demo: pages/demo/display/tree
---

# Tree

`ms-tree` — Tree for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tree` (repository not yet public).
Demo route: `#/pages/demo/display/tree`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/tree.uvue`; see them running in the phone frame.

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
const stateFolders = ref(['1', '1-1', '2'] as string[])
const checkValue = ref(['1-2-1'] as string[])
const stateValue = ref([] as string[])
const parentLink = ref(true)
const disabledParent = ref(true)
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| value | `string[]` | `[]` | Current value |
| folderIds | `string[]` | `[]` | Folder id list |
| checkable | `boolean` | `true` | Whether selectable |
| parentLink | `boolean` | `false` | Whether selecting parent links children; whether selecting child updates parent |
| disabledParent | `boolean` | `false` | Whether to disable parent linkage |
| disabled | `boolean` | `false` | Whether disabled |
| idKey | `string` | `'id'` | Id field name |
| labelKey | `string` | `'text'` | Label field name |

## Events

| Event | Description |
| --- | --- |
| update:value | v-model:value update |
| update:folderIds | update:folderIds |
| change | Value changed |
| expand-change | expand-change |
| node-click | Node click |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree/`
- Demo: `#/pages/demo/display/tree`
- Chinese docs: [/uniappx/components/tree](/uniappx/components/tree)
