---
title: Tree
demo: pages/demo/display/tree
---

# Tree

`ms-tree`: Tree. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree`).
Demo route: `#/pages/demo/display/tree`.

## Basic usage

```vue
<template>
  <ms-tree :disabled="true">
    …
  </ms-tree>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| folderIds | `string[]` | `[]` | — |
| checkable | `boolean` | `true` | — |
| parentLink | `boolean` | `false` | — |
| disabledParent | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| idKey | `string` | `'id'` | — |
| labelKey | `string` | `'text'` | — |

## Events

| Event | Description |
| --- | --- |
| update:value | v-model:value update |
| update:folderIds | update:folderIds |
| change | Value changed |
| expand-change | expand-change |
| node-click | Node click |

## See also

- Component: `uni_modules/ms-ui/components/ms-tree/`
- Demo: `#/pages/demo/display/tree`
- Chinese docs: [/uniappx/components/tree](/uniappx/components/tree)
