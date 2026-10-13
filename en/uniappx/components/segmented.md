---
title: Segmented
demo: pages/demo/nav/segmented
---

# Segmented

`ms-segmented` — Segmented for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-segmented`).
Demo route: `#/pages/demo/nav/segmented`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/segmented.uvue`; see them running in the phone frame.

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
const blockIndex = ref(0)
const iconIndex = ref(0)
const statusIndex = ref(0)
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

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
