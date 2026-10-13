---
title: Checkbox Group
demo: pages/demo/form/checkbox
---

# Checkbox Group

`ms-checkbox-group` — Checkbox Group for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-ui/components/ms-checkbox-group` (repository not yet public).
Demo route: `#/pages/demo/form/checkbox`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/form/checkbox.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件分组 -->
  <ms-checkbox-group v-model="groupValue" :max="2" @change="onGroupChange">
    <ms-checkbox value="a" label="选项 A" block />
    <ms-checkbox value="b" label="选项 B" block />
    <ms-checkbox value="c" label="选项 C" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="rowValue" horizontal>
    <view>
      <ms-checkbox value="x" label="横排一" />
    </view>
    <view>
      <ms-checkbox value="y" label="横排二" />
    </view>
  </ms-checkbox-group>
  <!-- 组件深度 -->
  <ms-checkbox-group v-model="disabledGroup" disabled>
    <ms-checkbox value="1" label="禁用组甲" block />
    <ms-checkbox value="2" label="禁用组乙" block />
  </ms-checkbox-group>
  <ms-checkbox-group v-model="childValue" @change="onChildChange">
    <ms-checkbox value="a" label="子项 A" block />
    <ms-checkbox value="b" label="子项 B" block />
  </ms-checkbox-group>
</template>

<script setup lang="uts">
const groupValue = ref(['a'] as string[])
const rowValue = ref(['x'] as string[])
const disabledGroup = ref(['1'] as string[])
const childValue = ref(['a'] as string[])
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
