---
title: Tree Select 树选择
demo: pages/demo/display/tree-select
---

# Tree Select 树选择

`ms-tree-select`：多列树形选择：按 `options` 实际深度渲染 2~3 列（最多 3 列），左栏导航 + 中间列下钻 + 末列单选/多选。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`（源码仓暂未公开）`uni_modules/ms-ui/components/ms-tree-select`）。
演示路由：`#/pages/demo/display/tree-select`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/tree-select.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项列表 |
| value | `string[]` | `[]` | 当前值 |
| leafValues | `string[]` | `[]` | 已选叶子值列表（v-model:leafValues） |
| multiple | `boolean` | `false` | 是否多选 |

## 事件

| 事件 | 说明 |
| --- | --- |
| update:value | v-model:value 更新 |
| update:leafValues | update:leafValues |
| change | 值变化 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-tree-select/`
- 演示: `#/pages/demo/display/tree-select`
