---
title: Tree Select
demo: pages/demo/display/tree-select
---

# Tree Select

`ms-tree-select` — Tree Select for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree-select`).
Demo route: `#/pages/demo/display/tree-select`.

## Basic usage

```vue
<template>
  <ms-tree-select value="…">
    …
  </ms-tree-select>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Tree data |
| value | `string[]` | `[]` | Column path; in single-select the last entry is the leaf value |
| leafValues | `string[]` | `[]` | Multi-select checked values on the last column; ignored in single-select |
| multiple | `boolean` | `false` | Whether the last column allows multi-select |

## Events

| Event | Description |
| --- | --- |
| update:value | v-model:value update |
| update:leafValues | update:leafValues |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree-select/`
- Demo: `#/pages/demo/display/tree-select`
- Chinese docs: [/uniappx/components/tree-select](/uniappx/components/tree-select)
