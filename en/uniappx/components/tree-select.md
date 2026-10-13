---
title: Tree Select
demo: pages/demo/display/tree-select
---

# Tree Select

`ms-tree-select` — Tree Select for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-tree-select` (repository not yet public).
Demo route: `#/pages/demo/display/tree-select`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/display/tree-select.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-tree-select
    :options="goodsOptions"
    :value="baseValue"
    @update:value="onBaseValue"
    @change="onBaseChange"
  />
  <ms-tree-select
    :options="teamOptions"
    :value="multiPath"
    :leaf-values="multiLeaves"
    multiple
    @update:value="onMultiPath"
    @update:leafValues="onMultiLeaves"
  />
  <!-- 组件状态 -->
  <ms-tree-select
    :options="areaOptions"
    :value="areaValue"
    @update:value="onAreaValue"
    @change="onAreaChange"
  />
  <!-- 组件深度 -->
  <ms-tree-select
    :options="areaOptions"
    :value="depthPath"
    :leaf-values="depthLeaves"
    multiple
    @update:value="onDepthPath"
    @update:leafValues="onDepthLeaves"
  />
  <ms-tree-select
    :options="goodsOptions"
    :value="emptyValue"
    @update:value="onEmptyValue"
    @change="onEmptyChange"
  />
  <ms-tree-select
    :options="goodsOptions"
    :value="disabledLeafPath"
    @update:value="onDisabledLeafPath"
    @change="onDisabledLeafChange"
  />
</template>

<script setup lang="uts">
const baseValue = ref(['digital', 'pad'] as string[])
const multiPath = ref(['fe'] as string[])
const multiLeaves = ref(['fe-ui'] as string[])
const areaValue = ref(['110000', '110100', '110101'] as string[])
const depthPath = ref(['440000', '440300'] as string[])
const depthLeaves = ref(['440304', '440305'] as string[])
const emptyValue = ref([] as string[])
const disabledLeafPath = ref(['home', 'fridge'] as string[])
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options list |
| value | `string[]` | `[]` | Current value |
| leafValues | `string[]` | `[]` | Selected leaf values (v-model:leafValues) |
| multiple | `boolean` | `false` | Whether multiple |

## Events

| Event | Description |
| --- | --- |
| update:value | v-model:value update |
| update:leafValues | update:leafValues |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree-select/`
- Demo: `#/pages/demo/display/tree-select`
- Chinese docs: [/uniappx/components/tree-select](/uniappx/components/tree-select)
