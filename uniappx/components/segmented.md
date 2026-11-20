---
title: Segmented 分段
demo: pages/demo/nav/segmented
---

# Segmented 分段

`ms-segmented` 是分段控制器，选项由 `options` 生成，选中项的下标用 `v-model:value` 绑定。

## 基础用法

<!-- demo-snippets:start -->
```vue
<template>
  <!-- 组件类型 -->
  <ms-segmented
    :options="baseOptions"
    :value="baseIndex"
    @change="onBaseChange"
  />
  <ms-segmented
    :options="blockOptions"
    :value="blockIndex"
    block
    @change="onBlockChange"
  />
  <ms-segmented
    :options="iconOptions"
    :value="iconIndex"
    block
    @change="onIconChange"
  />
  <!-- 组件状态 -->
  <ms-segmented
    :options="baseOptions"
    :value="0"
    disabled
  />
  <ms-segmented
    :options="statusOptions"
    :value="statusIndex"
    @change="onStatusChange"
  />
</template>

<script setup lang="uts">
const baseIndex = ref(0)

const baseOptions = [
  { label: '日' } as UTSJSONObject,
  { label: '周' } as UTSJSONObject,
  { label: '月' } as UTSJSONObject,
] as UTSJSONObject[]

const blockIndex = ref(0)

const blockOptions = [
  { label: '全部订单' } as UTSJSONObject,
  { label: '待付款' } as UTSJSONObject,
  { label: '待收货' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconOptions = [
  { label: '消息', icon: 'inbox-line' } as UTSJSONObject,
  { label: '应用', icon: 'apps-line' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusOptions = [
  { label: '可选一' } as UTSJSONObject,
  { label: '可选二' } as UTSJSONObject,
  { label: '禁用', disabled: true } as UTSJSONObject,
] as UTSJSONObject[]

function onBaseChange(index: number) : void {
  console.log('onBaseChange')
}

function onBlockChange(index: number) : void {
  console.log('onBlockChange')
}

function onIconChange(index: number) : void {
  console.log('onIconChange')
}

function onStatusChange(index: number) : void {
  console.log('onStatusChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项的下标，可用 `v-model:value` |
| options | `UTSJSONObject[]` | `[]` | 选项列表，每项含 `label`，可选 `icon` 和 `disabled` |
| block | `boolean` | `false` | 是否撑满父容器的宽度并平分各项 |
| disabled | `boolean` | `false` | 是否禁用整个组件 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| change | `index: number` | 选中项变化时触发，`index` 是新选中项的下标 |
| update:value | `index: number` | 选中项变化时触发，用于 `v-model:value` |
