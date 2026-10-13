---
title: Picker Selected
demo: pages/demo/form/picker-selected
---

# Picker Selected

`ms-picker-selected` — Picker Selected for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-selected`).
Demo route: `#/pages/demo/form/picker-selected`.

## Basic usage

```vue
<template>
  <ms-picker-selected title="…" v-model:visible="open">
    …
  </ms-picker-selected>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options list |
| value | `string[]` | `[]` | Current value |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'请选择'` | Title |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| placeholder | `string` | `'搜索'` | Placeholder |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| valueKey | `string` | `'id'` | Option value field name |
| labelKey | `string` | `'name'` | Option label field name |
| filterKey | `string` | `''` | Search match field name |
| localSearch | `boolean` | `true` | Whether to filter within local options |
| multiple | `boolean` | `true` | Whether multiple |
| required | `boolean` | `false` | Whether required |
| disabled | `boolean` | `false` | Whether disabled |

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
