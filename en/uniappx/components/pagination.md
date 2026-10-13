---
title: Pagination
demo: pages/demo/nav/pagination
---

# Pagination

`ms-pagination` — Pagination for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-pagination`).
Demo route: `#/pages/demo/nav/pagination`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/nav/pagination.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-pagination
    :value="fullPage"
    :total="1000"
    @change="onFullChange"
  />
  <ms-pagination
    :value="simplePage"
    :total="100"
    simple
    @change="onSimpleChange"
  />
  <!-- 组件状态 -->
  <ms-pagination
    :value="3"
    :total="50"
    disabled
  />
  <!-- 组件深度 -->
  <ms-pagination
    :value="navPage"
    :total="200"
    show-prev-next
    @change="onNavChange"
  />
  <ms-pagination
    :value="jumpPage"
    :total="500"
    show-prev-next
    show-jumper
    @change="onJumpChange"
  />
  <ms-pagination
    :value="sizePage"
    :total="240"
    :page-size="20"
    show-prev-next
    @change="onSizeChange"
  />
</template>

<script setup lang="uts">
const fullPage = ref(5)
const simplePage = ref(1)
const navPage = ref(2)
const jumpPage = ref(8)
const sizePage = ref(1)
</script>
```
<!-- demo-snippets:end -->

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
