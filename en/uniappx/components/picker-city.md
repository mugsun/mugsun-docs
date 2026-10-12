---
title: Picker City
demo: pages/demo/form/picker-city
---

# Picker City

`ms-picker-city` — Picker City for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-city`).
Demo route: `#/pages/demo/form/picker-city`.

## Basic usage

```vue
<template>
  <ms-picker-city title="…" v-model:visible="open">
    …
  </ms-picker-city>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Options list |
| value | `string[]` | `[]` | Current value |
| level | `number` | `3` | Level |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `'选择地区'` | Title |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| separator | `string` | `' / '` | Separator |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | visibleItemCount number |
| usePopup | `boolean` | `true` | Whether to use popup |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| update:value | v-model:value update |
| change | Value changed |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker-city/`
- Demo: `#/pages/demo/form/picker-city`
- Chinese docs: [/uniappx/components/picker-city](/uniappx/components/picker-city)
