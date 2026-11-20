---
title: Radio Group
demo: pages/demo/form/radio
---

# Radio Group

`ms-radio-group` groups [`ms-radio`](./radio) options so that only one can be selected. Its `v-model` holds the `value` of the selected option.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Groups -->
  <ms-radio-group v-model="groupValue">
    <ms-radio value="a" label="Option A" block />
    <ms-radio value="b" label="Option B" block />
    <ms-radio value="c" label="Option C" block />
  </ms-radio-group>
  <ms-radio-group v-model="rowValue" horizontal>
    <view>
      <ms-radio value="x" label="Inline 1" />
    </view>
    <view>
      <ms-radio value="y" label="Inline 2" />
    </view>
  </ms-radio-group>
  <!-- Advanced -->
  <ms-radio-group v-model="disabledGroup" disabled>
    <ms-radio value="1" label="Disabled group A" block />
    <ms-radio value="2" label="Disabled group B" block />
  </ms-radio-group>
  <ms-radio-group v-model="uncheckGroup" allow-uncheck>
    <ms-radio value="a" label="In group A" block />
    <ms-radio value="b" label="In group B" block />
  </ms-radio-group>
</template>

<script setup lang="uts">
const disabledGroup = ref('1')

const groupValue = ref('a')

const rowValue = ref('x')

const uncheckGroup = ref('a')
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string` | `''` | `value` of the selected option; bind with `v-model` |
| disabled | `boolean` | `false` | Whether to disable the whole group |
| horizontal | `boolean` | `false` | Whether to lay options out horizontally, wrapping when needed |
| allowUncheck | `boolean` | `false` | Whether tapping the selected option clears it |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `value: string` | Fires when the selection changes; used by `v-model` |
| change | `value: string` | Fires when the selection changes; `value` is the selected option's value, or an empty string when cleared |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-radio` options here |
