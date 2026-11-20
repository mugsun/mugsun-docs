---
title: Checkbox
demo: pages/demo/form/checkbox
---

# Checkbox

`ms-checkbox` is a checkbox. Use it on its own with `v-model`, or as part of a group inside [`ms-checkbox-group`](./checkbox-group).

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-checkbox v-model="vSquare" label="Square" block />
  <ms-checkbox v-model="vCircle" label="Circle" icon="circle" block />
  <ms-checkbox v-model="vLine" label="Outline" icon="line" block />
  <!-- States -->
  <ms-checkbox :model-value="false" indeterminate label="Indeterminate" block />
  <ms-checkbox :model-value="false" disabled label="Disabled" block />
  <ms-checkbox :model-value="true" disabled label="Disabled checked" block />
  <!-- Groups -->
  <ms-checkbox value="a" label="Option A" block />
  <ms-checkbox value="b" label="Option B" block />
  <ms-checkbox value="c" label="Option C" block />
  <!-- Advanced -->
  <ms-checkbox value="1" label="Disabled group A" block />
  <ms-checkbox value="2" label="Disabled group B" block />
  <ms-checkbox
    :model-value="parentChecked"
    :indeterminate="parentIndeterminate"
    label="Select all"
    block
    @change="onParentChange"
  />
</template>

<script setup lang="uts">
const parentChecked = computed((): boolean => {
  return childValue.value.length == 2
})

const parentIndeterminate = computed((): boolean => {
  return childValue.value.length == 1
})

const vCircle = ref(true)

const vLine = ref(true)

const vSquare = ref(true)

function onParentChange(on: boolean) : void {
  console.log('onParentChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Bound value (v-model) |
| value | `string` | `''` | Option value within checkbox-group |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Secondary description |
| contentDisabled | `boolean` | `false` | Tapping the text does not toggle; only the icon does |
| disabled | `boolean` | `false` | Whether disabled |
| indeterminate | `boolean` | `false` | Indeterminate state |
| icon | `'square' \| 'circle' \| 'line'` | `'square'` | Icon shape |
| placement | `'left' \| 'right'` | `'left'` | Icon position relative to text |
| block | `boolean` | `false` | Whether full-bleed / block |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: boolean` | Fires when the checked state changes in standalone use; used by `v-model` |
| change | `value: boolean` | Fires when the checked state changes in standalone use |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom content in addition to the label text |
