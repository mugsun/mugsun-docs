---
title: Segmented
demo: pages/demo/nav/segmented
---

# Segmented

`ms-segmented` — Segmented for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-segmented` (commercial edition; source not public).
Demo route: `#/pages/demo/nav/segmented`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/segmented.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| options | `UTSJSONObject[]` | `[]` | Each item: label / icon / disabled |
| block | `boolean` | `false` | Fill parent width and equalize items |
| disabled | `boolean` | `false` | Disable the whole group |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Height step |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-segmented/`
- Demo: `#/pages/demo/nav/segmented`
- Chinese docs: [/uniappx/components/segmented](/uniappx/components/segmented)
