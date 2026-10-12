---
title: Picker Selected
demo: pages/demo/form/picker-selected
---

# Picker Selected

`ms-picker-selected`: Picker Selected. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-selected`).
Demo route: `#/pages/demo/form/picker-selected`.

## Basic usage

```vue
<template>
  <ms-picker-selected title="…" v-model:visible="open">
    …
  </ms-picker-selected>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| visible | `boolean` | `false` | — |
| title | `string` | `'请选择'` | — |
| cancelText | `string` | `'取消'` | — |
| confirmText | `string` | `'确定'` | — |
| placeholder | `string` | `'搜索'` | — |
| emptyText | `string` | `'暂无数据'` | — |
| valueKey | `string` | `'id'` | — |
| labelKey | `string` | `'name'` | — |
| filterKey | `string` | `''` | — |
| localSearch | `boolean` | `true` | — |
| multiple | `boolean` | `true` | — |
| required | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| update:value | v-model:value update |
| search | search |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| open | Opened |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker-selected/`
- Demo: `#/pages/demo/form/picker-selected`
- Chinese docs: [/uniappx/components/picker-selected](/uniappx/components/picker-selected)
