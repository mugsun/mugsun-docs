---
title: Segmented
demo: pages/demo/nav/segmented
---

# Segmented

`ms-segmented` is a segmented control. `options` defines the segments, and `v-model:value` binds the index of the selected one.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
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
  <!-- States -->
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
  { label: 'Day' } as UTSJSONObject,
  { label: 'Week' } as UTSJSONObject,
  { label: 'Month' } as UTSJSONObject,
] as UTSJSONObject[]

const blockIndex = ref(0)

const blockOptions = [
  { label: 'All orders' } as UTSJSONObject,
  { label: 'To pay' } as UTSJSONObject,
  { label: 'To receive' } as UTSJSONObject,
] as UTSJSONObject[]

const iconIndex = ref(0)

const iconOptions = [
  { label: 'Messages', icon: 'inbox-line' } as UTSJSONObject,
  { label: 'Apps', icon: 'apps-line' } as UTSJSONObject,
] as UTSJSONObject[]

const statusIndex = ref(0)

const statusOptions = [
  { label: 'Enabled 1' } as UTSJSONObject,
  { label: 'Enabled 2' } as UTSJSONObject,
  { label: 'Disabled', disabled: true } as UTSJSONObject,
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Index of the selected segment. Works with `v-model:value` |
| options | `UTSJSONObject[]` | `[]` | Segments; each item has `label` and optional `icon` and `disabled` |
| block | `boolean` | `false` | Whether to fill the parent width and size the segments equally |
| disabled | `boolean` | `false` | Whether to disable the whole control |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `index: number` | Fires when the selection changes; `index` is the newly selected segment |
| update:value | `index: number` | Fires when the selection changes; used by `v-model:value` |
