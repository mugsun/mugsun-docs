---
title: Picker
demo: pages/demo/form/picker
---

# Picker

`ms-picker` — Picker for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-picker`).
Demo route: `#/pages/demo/form/picker`.

## Basic usage

```vue
<template>
  <ms-picker title="…" v-model:visible="open">
    …
  </ms-picker>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Flat options: column (index) + label + value |
| value | `number[]` | `[]` | Selected index per column |
| visible | `boolean` | `false` | Whether visible (when usePopup) |
| title | `string` | `''` | Title; empty keeps only cancel/confirm in the header |
| cancelText | `string` | `'取消'` | Cancel button label |
| confirmText | `string` | `'确定'` | Confirm button label |
| header | `boolean` | `true` | Whether to show the header |
| itemHeight | `number` | `44` | Item height (px) |
| visibleItemCount | `number` | `5` | Visible item count |
| usePopup | `boolean` | `true` | Wrap in popup; false = inline |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| change | Value changed |
| pick | Selection changed (before confirm) |
| confirm | Confirm |
| cancel | Cancel |
| close | Closed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-picker/`
- Demo: `#/pages/demo/form/picker`
- Chinese docs: [/uniappx/components/picker](/uniappx/components/picker)
