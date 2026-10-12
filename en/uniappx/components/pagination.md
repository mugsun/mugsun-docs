---
title: Pagination
demo: pages/demo/nav/pagination
---

# Pagination

`ms-pagination` — Pagination for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-pagination`).
Demo route: `#/pages/demo/nav/pagination`.

## Basic usage

```vue
<template>
  <ms-pagination>
    …
  </ms-pagination>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `1` | Current page (1-based) |
| total | `number` | `0` | Total count |
| pageSize | `number` | `10` | Page size |
| maxButtons | `number` | `3` | Max middle page buttons in ellipsis mode |
| minButtons | `number` | `5` | Page-number expand threshold when total pages are few |
| simple | `boolean` | `false` | Simple mode (prev/next only) |
| showTotal | `boolean` | `true` | Whether to show total count |
| disabled | `boolean` | `false` | Whether disabled |
| showPrevNext | `boolean` | `false` | Full mode shows prev/next on both sides |
| showJumper | `boolean` | `false` | Jump to a specific page |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-pagination/`
- Demo: `#/pages/demo/nav/pagination`
- Chinese docs: [/uniappx/components/pagination](/uniappx/components/pagination)
