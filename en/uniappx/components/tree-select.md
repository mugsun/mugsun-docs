---
title: Tree Select
demo: pages/demo/display/tree-select
---

# Tree Select

`ms-tree-select`: Tree Select. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree-select`).
Demo route: `#/pages/demo/display/tree-select`.

## Basic usage

```vue
<template>
  <ms-tree-select>
    …
  </ms-tree-select>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| leafValues | `string[]` | `[]` | — |
| multiple | `boolean` | `false` | — |

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
