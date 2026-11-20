---
title: Tree Select
demo: pages/demo/display/tree-select
---

# Tree Select

`ms-tree-select` is a multi-column tree selector. It shows 2 or 3 columns depending on the depth of `options`: the leading columns drill down level by level and the last one holds the options.

The last column supports single and multiple selection. Bind the selected path with `v-model:value`, and the checked values in multiple mode with `v-model:leafValues`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
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
  <!-- States -->
  <ms-tree-select
    :options="areaOptions"
    :value="areaValue"
    @update:value="onAreaValue"
    @change="onAreaChange"
  />
  <!-- Advanced -->
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
const areaOptions = [
  {
    label: 'Beijing',
    value: '110000',
    children: [
      {
        label: 'Beijing',
        value: '110100',
        children: [
          { label: 'Dongcheng', value: '110101' } as UTSJSONObject,
          { label: 'Xicheng', value: '110102' } as UTSJSONObject,
          { label: 'Chaoyang', value: '110105' } as UTSJSONObject,
        ] as UTSJSONObject[],
      } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: 'Guangdong',
    value: '440000',
    children: [
      {
        label: 'Guangzhou',
        value: '440100',
        children: [
          { label: 'Yuexiu', value: '440104' } as UTSJSONObject,
          { label: 'Tianhe', value: '440106' } as UTSJSONObject,
        ] as UTSJSONObject[],
      } as UTSJSONObject,
      {
        label: 'Shenzhen',
        value: '440300',
        children: [
          { label: 'Futian', value: '440304' } as UTSJSONObject,
          { label: 'Nanshan', value: '440305' } as UTSJSONObject,
          { label: 'Yantian', value: '440308', disabled: true } as UTSJSONObject,
        ] as UTSJSONObject[],
      } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
] as UTSJSONObject[]

const areaValue = ref(['110000', '110100', '110101'] as string[])

const baseValue = ref(['digital', 'pad'] as string[])

const depthLeaves = ref(['440304', '440305'] as string[])

const depthPath = ref(['440000', '440300'] as string[])

const disabledLeafPath = ref(['home', 'fridge'] as string[])

const emptyValue = ref([] as string[])

const goodsOptions = [
  {
    label: 'Digital',
    value: 'digital',
    children: [
      { label: 'Phone', value: 'phone' } as UTSJSONObject,
      { label: 'Tablet', value: 'pad' } as UTSJSONObject,
      { label: 'Earphones', value: 'earphone' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: 'Appliances',
    value: 'home',
    children: [
      { label: 'Fridge', value: 'fridge' } as UTSJSONObject,
      { label: 'Air conditioner', value: 'ac' } as UTSJSONObject,
      { label: 'Washer', value: 'washer', disabled: true } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: 'Apparel',
    value: 'cloth',
    children: [
      { label: 'Coats', value: 'coat' } as UTSJSONObject,
      { label: 'Shoes', value: 'shoes' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
] as UTSJSONObject[]

const multiLeaves = ref(['fe-ui'] as string[])

const multiPath = ref(['fe'] as string[])

const teamOptions = [
  {
    label: 'Frontend',
    value: 'fe',
    children: [
      { label: 'Component library', value: 'fe-ui' } as UTSJSONObject,
      { label: 'Build', value: 'fe-build' } as UTSJSONObject,
      { label: 'Visualization', value: 'fe-chart' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: 'Backend',
    value: 'be',
    children: [
      { label: 'Gateway', value: 'be-gw' } as UTSJSONObject,
      { label: 'Storage', value: 'be-store' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: 'Design',
    value: 'ui',
    children: [
      { label: 'Guidelines', value: 'ui-spec' } as UTSJSONObject,
      { label: 'Illustration', value: 'ui-art', disabled: true } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseValue(next: string[]): void {
  baseValue.value = next
}

function onBaseChange(next: string[]) : void {
  console.log('onBaseChange')
}

function onMultiPath(next: string[]): void {
  multiPath.value = next
}

function onMultiLeaves(next: string[]) : void {
  console.log('onMultiLeaves')
}

function onAreaValue(next: string[]): void {
  areaValue.value = next
}

function onAreaChange(next: string[]) : void {
  console.log('onAreaChange')
}

function onDepthPath(next: string[]): void {
  depthPath.value = next
}

function onDepthLeaves(next: string[]) : void {
  console.log('onDepthLeaves')
}

function onEmptyValue(next: string[]): void {
  emptyValue.value = next
}

function onEmptyChange(next: string[]) : void {
  console.log('onEmptyChange')
}

function onDisabledLeafPath(next: string[]): void {
  disabledLeafPath.value = next
}

function onDisabledLeafChange(next: string[]) : void {
  console.log('onDisabledLeafChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options; each has `label` and `value`, plus optional `children` and `disabled` |
| value | `string[]` | `[]` | Path made of the value selected in each column. Works with `v-model:value`; in single mode the last entry is the value picked in the last column |
| leafValues | `string[]` | `[]` | Values checked in the last column in multiple mode. Works with `v-model:leafValues`; unused in single mode |
| multiple | `boolean` | `false` | Whether the last column allows multiple selection |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:value | `next: string[]` | Fires when the selected path changes; used by `v-model:value` |
| update:leafValues | `next: string[]` | Fires when the checked values of the last column change in multiple mode; used by `v-model:leafValues` |
| change | `next: string[]` | Fires when an option is tapped; `next` is the current path, including the last column's value when it is tapped in single mode. Disabled options do not fire it |
