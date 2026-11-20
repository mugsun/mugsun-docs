---
title: Radio
demo: pages/demo/form/radio
---

# Radio

`ms-radio` is a radio option with filled, outlined and dot styles; the control can sit to the left or right of the label.

On its own, bind the checked state with `v-model`. Inside [`ms-radio-group`](./radio-group), `value` identifies the option and the group manages the checked state.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-radio :model-value="true" label="Solid" block />
  <ms-radio :model-value="true" label="Outline" icon="line" block />
  <ms-radio :model-value="true" label="Dot" icon="dot" block />
  <!-- States -->
  <ms-radio :model-value="false" disabled label="Disabled" block />
  <ms-radio :model-value="true" disabled label="Disabled checked" block />
  <ms-radio v-model="vUncheck" allow-uncheck label="Uncheckable" block />
  <!-- Groups -->
  <ms-radio value="a" label="Option A" block />
  <ms-radio value="b" label="Option B" block />
  <ms-radio value="c" label="Option C" block />
  <!-- Advanced -->
  <ms-radio value="1" label="Disabled group A" block />
  <ms-radio value="2" label="Disabled group B" block />
  <ms-radio v-model="vDepth" label="Outline, right" icon="line" placement="right" block />
</template>

<script setup lang="uts">
const vDepth = ref(true)

const vUncheck = ref(true)
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | Whether it is checked; bind with `v-model` when used on its own |
| value | `string` | `''` | Option value inside `ms-radio-group` |
| label | `string` | `''` | Label text |
| content | `string` | `''` | Description below the label |
| contentDisabled | `boolean` | `false` | Whether tapping the description does not toggle the option |
| disabled | `boolean` | `false` | Whether disabled |
| icon | `'circle' \| 'line' \| 'dot'` | `'circle'` | Control style: circle / line / dot |
| placement | `'left' \| 'right'` | `'left'` | Whether the control sits to the left or right of the text |
| block | `boolean` | `false` | Whether it takes the full row |
| allowUncheck | `boolean` | `false` | Whether tapping a checked option clears it |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: boolean` | Fires when the checked state changes in standalone use; used by `v-model` |
| change | `value: boolean` | Fires when the checked state changes in standalone use. Not fired inside `ms-radio-group`; listen to the group's `change` instead |

## Slots

| Slot | Description |
| --- | --- |
| default | Custom content shown below the label and description |
