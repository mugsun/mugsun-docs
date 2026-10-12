---
title: Tree
demo: pages/demo/display/tree
---

# Tree

`ms-tree` — Tree for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tree`).
Demo route: `#/pages/demo/display/tree`.

## Basic usage

```vue
<template>
  <ms-tree value="…">
    …
  </ms-tree>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| value | `string[]` | `[]` | Current value |
| folderIds | `string[]` | `[]` | Folder id list |
| checkable | `boolean` | `true` | Whether checkable |
| parentLink | `boolean` | `false` | Whether parentLink is enabled |
| disabledParent | `boolean` | `false` | Disable parent linkage |
| disabled | `boolean` | `false` | Whether disabled |
| idKey | `string` | `'id'` | Id field key |
| labelKey | `string` | `'text'` | Label field key |

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
