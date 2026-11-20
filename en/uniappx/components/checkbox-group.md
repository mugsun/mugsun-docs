---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group` groups checkboxes. Its `v-model` holds the selected values as a `string[]`.

It can disable the whole group, cap the number of selections with `max`, and lay items out horizontally with wrapping.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Groups -->
  <ms-checkbox-group v-model="groupValue" :max="2" @change="onGroupChange">
    <ms-checkbox value="a" label="Option A" block />
    <ms-checkbox value="b" label="Option B" block />
    <ms-checkbox value="c" label="Option C" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="rowValue" horizontal>
    <view>
      <ms-checkbox value="x" label="Inline 1" />
    </view>
    <view>
      <ms-checkbox value="y" label="Inline 2" />
    </view>
  </ms-checkbox-group>
  <!-- Advanced -->
  <ms-checkbox-group v-model="disabledGroup" disabled>
    <ms-checkbox value="1" label="Disabled group A" block />
    <ms-checkbox value="2" label="Disabled group B" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="childValue" @change="onChildChange">
    <ms-checkbox value="a" label="Child A" block />
    <ms-checkbox value="b" label="Child B" block />
  </ms-checkbox-group>
</template>

<script setup lang="uts">
const childValue = ref(['a'] as string[])

const disabledGroup = ref(['1'] as string[])

const groupValue = ref(['a'] as string[])

const rowValue = ref(['x'] as string[])

function onGroupChange(values: string[]) : void {
  console.log('onGroupChange')
}

function onChildChange(values: string[]) : void {
  console.log('onChildChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether to disable the whole group |
| max | `number` | `-1` | Maximum number of selections, `-1` for no limit; unselected items are disabled once the cap is reached |
| horizontal | `boolean` | `false` | Whether to lay items out horizontally |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:modelValue | `values: string[]` | Fires when the selection changes; used by `v-model` |
| change | `values: string[]` | Fires when the selection changes; `values` holds the selected values |

## Slots

| Slot | Description |
| --- | --- |
| default | Place `ms-checkbox` items here |
