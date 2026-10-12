---
title: Popover
demo: pages/demo/feedback/popover
---

# Popover

`ms-popover`: Popover. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-popover`).
Demo route: `#/pages/demo/feedback/popover`.

## Basic usage

```vue
<template>
  <ms-popover theme="dark" v-model:visible="open">
    …
  </ms-popover>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| visible | `boolean` | `false` | — |
| content | `string` | `''` | 纯文本内容；复杂内容用 content 插槽 |
| placement | `\| 'top'` | `'top'` | — |
| theme | `'dark' \| 'light' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'dark'` | — |
| showArrow | `boolean` | `true` | — |
| closeOnClickOutside | `boolean` | `true` | 点气泡外（透明遮罩）是否关闭 |
| zIndex | `number` | `900` | — |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| visible-change | visible-change |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| content | `content` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-popover/`
- Demo: `#/pages/demo/feedback/popover`
- Chinese docs: [/uniappx/components/popover](/uniappx/components/popover)
