---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group` — Checkbox Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-checkbox-group` (commercial edition; source not public).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/checkbox.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

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
