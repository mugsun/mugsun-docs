---
title: Tree Flat
demo: pages/demo/display/tree-flat
---

# Tree Flat

`ms-tree-flat` — Tree Flat for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree-flat`).
Demo route: `#/pages/demo/display/tree-flat`.

## Basic usage

```vue
<template>
  <ms-tree-flat>
    …
  </ms-tree-flat>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| height | `number` | `320` | Height (px) |
| direction | `string` | `'horizontal'` | Direction |
| lineType | `string` | `'straight'` | Link style: straight / curve |
| fontSize | `number` | `13` | Font size (px) |
| collapsible | `boolean` | `true` | Whether collapsible |

## Events

| Event | Description |
| --- | --- |
| node-click | Node click |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree-flat/`
- Demo: `#/pages/demo/display/tree-flat`
- Chinese docs: [/uniappx/components/tree-flat](/uniappx/components/tree-flat)
