---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat`: Tree Flat. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree-flat`).
Demo route: `#/pages/demo/display/tree-flat`.

## Basic usage

```vue
<template>
  <ms-tree-flat>
    …
  </ms-tree-flat>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| height | `number` | `320` | — |
| direction | `string` | `'horizontal'` | — |
| lineType | `string` | `'straight'` | — |
| fontSize | `number` | `13` | — |
| collapsible | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| node-click | Node click |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree-flat/`
- Demo: `#/pages/demo/display/tree-flat`
- Chinese docs: [/uniappx/components/tree-flat](/uniappx/components/tree-flat)
