---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group` groups checkboxes. Its `v-model` is a `string[]`; it supports disabling the whole group, limiting the selection with `max`, and horizontal layout with wrapping.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-checkbox-group`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/checkbox.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `string[]` | `[]` | Bound value (v-model) |
| disabled | `boolean` | `false` | Whether disabled |
| max | `number` | `-1` | Maximum |
| horizontal | `boolean` | `false` | Whether horizontal |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-checkbox-group/`
- Demo: `#/pages/demo/form/checkbox`
- Chinese docs: [/uniappx/components/checkbox-group](/uniappx/components/checkbox-group)
