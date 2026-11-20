---
title: Tree Select 树选择
demo: pages/demo/display/tree-select
---

# Tree Select 树选择

`ms-tree-select` 是多列树形选择器，按 `options` 的层级显示 2 到 3 列，前面的列逐级选择，最后一列是选项。

最后一列支持单选和多选。选中的路径用 `v-model:value` 绑定，多选时勾选的值用 `v-model:leafValues` 绑定。

## 基础用法

<!-- demo-snippets:start -->
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
const areaOptions = [
  {
    label: '北京市',
    value: '110000',
    children: [
      {
        label: '北京市',
        value: '110100',
        children: [
          { label: '东城区', value: '110101' } as UTSJSONObject,
          { label: '西城区', value: '110102' } as UTSJSONObject,
          { label: '朝阳区', value: '110105' } as UTSJSONObject,
        ] as UTSJSONObject[],
      } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: '广东省',
    value: '440000',
    children: [
      {
        label: '广州市',
        value: '440100',
        children: [
          { label: '越秀区', value: '440104' } as UTSJSONObject,
          { label: '天河区', value: '440106' } as UTSJSONObject,
        ] as UTSJSONObject[],
      } as UTSJSONObject,
      {
        label: '深圳市',
        value: '440300',
        children: [
          { label: '福田区', value: '440304' } as UTSJSONObject,
          { label: '南山区', value: '440305' } as UTSJSONObject,
          { label: '盐田区', value: '440308', disabled: true } as UTSJSONObject,
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
    label: '数码',
    value: 'digital',
    children: [
      { label: '手机', value: 'phone' } as UTSJSONObject,
      { label: '平板', value: 'pad' } as UTSJSONObject,
      { label: '耳机', value: 'earphone' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: '家电',
    value: 'home',
    children: [
      { label: '冰箱', value: 'fridge' } as UTSJSONObject,
      { label: '空调', value: 'ac' } as UTSJSONObject,
      { label: '洗衣机', value: 'washer', disabled: true } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: '服饰',
    value: 'cloth',
    children: [
      { label: '外套', value: 'coat' } as UTSJSONObject,
      { label: '鞋靴', value: 'shoes' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
] as UTSJSONObject[]

const multiLeaves = ref(['fe-ui'] as string[])

const multiPath = ref(['fe'] as string[])

const teamOptions = [
  {
    label: '前端',
    value: 'fe',
    children: [
      { label: '组件库', value: 'fe-ui' } as UTSJSONObject,
      { label: '构建', value: 'fe-build' } as UTSJSONObject,
      { label: '可视化', value: 'fe-chart' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: '后端',
    value: 'be',
    children: [
      { label: '网关', value: 'be-gw' } as UTSJSONObject,
      { label: '存储', value: 'be-store' } as UTSJSONObject,
    ] as UTSJSONObject[],
  } as UTSJSONObject,
  {
    label: '设计',
    value: 'ui',
    children: [
      { label: '规范', value: 'ui-spec' } as UTSJSONObject,
      { label: '插画', value: 'ui-art', disabled: true } as UTSJSONObject,
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

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 选项数据，每项含 `label` 和 `value`，可选 `children` 和 `disabled` |
| value | `string[]` | `[]` | 各列选中的值组成的路径，可用 `v-model:value`；单选时最后一位是末列选中的值 |
| leafValues | `string[]` | `[]` | 多选时末列勾选的值，可用 `v-model:leafValues`；单选时不使用 |
| multiple | `boolean` | `false` | 末列是否多选 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:value | `next: string[]` | 选中路径变化时触发，用于 `v-model:value` |
| update:leafValues | `next: string[]` | 多选时末列的勾选变化时触发，用于 `v-model:leafValues` |
| change | `next: string[]` | 点击选项时触发，`next` 是当前路径；单选时点击末列会包含末列的值，禁用的选项不触发 |
