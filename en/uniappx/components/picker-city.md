---
title: Picker City
demo: pages/demo/form/picker-city
---

# Picker City

`ms-picker-city`: Picker City. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker-city`).
Demo route: `#/pages/demo/form/picker-city`.

## Basic usage

```vue
<template>
  <ms-picker-city title="…" v-model:visible="open">
    …
  </ms-picker-city>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | — |
| value | `string[]` | `[]` | — |
| level | `number` | `3` | — |
| visible | `boolean` | `false` | — |
| title | `string` | `'选择地区'` | — |
| cancelText | `string` | `'取消'` | — |
| confirmText | `string` | `'确定'` | — |
| separator | `string` | `' / '` | — |
| itemHeight | `number` | `44` | — |
| visibleItemCount | `number` | `5` | — |
| usePopup | `boolean` | `true` | — |

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
