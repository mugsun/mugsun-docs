---
title: Pagination
demo: pages/demo/nav/pagination
---

# Pagination

`ms-pagination` is a pager. It shows page-number buttons by default, and only Previous and Next in `simple` mode.

Bind the current page with `v-model:value`.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
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
  <!-- States -->
  <ms-pagination
    :value="3"
    :total="50"
    disabled
  />
  <!-- Advanced -->
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

const jumpPage = ref(8)

const navPage = ref(2)

const simplePage = ref(1)

const sizePage = ref(1)

function onFullChange(page: number) : void {
  console.log('onFullChange')
}

function onSimpleChange(page: number) : void {
  console.log('onSimpleChange')
}

function onNavChange(page: number) : void {
  console.log('onNavChange')
}

function onJumpChange(page: number) : void {
  console.log('onJumpChange')
}

function onSizeChange(page: number) : void {
  console.log('onSizeChange')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `1` | Current page, starting from 1. Works with `v-model:value` |
| total | `number` | `0` | Total count |
| pageSize | `number` | `10` | Page size |
| maxButtons | `number` | `3` | Maximum number of page buttons in the middle when there are many pages |
| minButtons | `number` | `5` | All page numbers are shown when the page count does not exceed this value |
| simple | `boolean` | `false` | Whether to use simple mode with only Previous and Next |
| showTotal | `boolean` | `true` | Whether to show total count |
| disabled | `boolean` | `false` | Whether disabled |
| showPrevNext | `boolean` | `false` | Whether to show Previous and Next buttons beside the page numbers |
| showJumper | `boolean` | `false` | Whether to show the jump-to-page input |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| change | `page: number` | Fires when the page changes; `page` is the new page |
| update:value | `page: number` | Fires when the page changes; used by `v-model:value` |
