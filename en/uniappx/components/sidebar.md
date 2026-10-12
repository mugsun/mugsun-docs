---
title: Sidebar
demo: pages/demo/nav/sidebar
---

# Sidebar

`ms-sidebar`: Sidebar. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sidebar`).
Demo route: `#/pages/demo/nav/sidebar`.

## Basic usage

```vue
<template>
  <ms-sidebar>
    …
  </ms-sidebar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled |
| height | `number` | `320` | 侧栏总高（蒸汽禁百分比高度，用 token 字面量） |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sidebar/`
- Demo: `#/pages/demo/nav/sidebar`
- Chinese docs: [/uniappx/components/sidebar](/uniappx/components/sidebar)
