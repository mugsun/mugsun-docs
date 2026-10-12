---
title: More
demo: pages/demo/nav/more
---

# More

`ms-more`: More. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-more`).
Demo route: `#/pages/demo/nav/more`.

## Basic usage

```vue
<template>
  <ms-more :disabled="true">
    …
  </ms-more>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | — |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| expandText | `string` | `'展开更多'` | — |
| collapseText | `string` | `'收起'` | — |
| disabled | `boolean` | `false` | — |
| showAction | `boolean` | `true` | — |
| showIcon | `boolean` | `true` | 是否显示展开/收起箭头图标 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| action | `action` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-more/`
- Demo: `#/pages/demo/nav/more`
- Chinese docs: [/uniappx/components/more](/uniappx/components/more)
