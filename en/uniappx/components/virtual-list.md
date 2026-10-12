---
title: Virtual List
demo: pages/demo/display/virtual-list
---

# Virtual List

`ms-virtual-list`: Virtual List. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-virtual-list`).
Demo route: `#/pages/demo/display/virtual-list`.

## Basic usage

```vue
<template>
  <ms-virtual-list :loading="true">
    …
  </ms-virtual-list>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | — |
| itemHeight | `number` | `56` | — |
| visibleCount | `number` | `5` | — |
| buffer | `number` | `3` | — |
| virtual | `boolean` | `true` | — |
| titleKey | `string` | `'title'` | — |
| descKey | `string` | `'desc'` | — |
| keyField | `string` | `'id'` | — |
| emptyText | `string` | `'暂无数据'` | — |
| loading | `boolean` | `false` | 触底加载中；为 true 时展示底栏并抑制重复 scrolltolower |
| finished | `boolean` | `false` | 已无更多；底栏展示 finishedText |
| loadingText | `string` | `'加载中…'` | — |
| finishedText | `string` | `'没有更多了'` | — |
| lowerThreshold | `number` | `50` | 距底多少 px 触发 scrolltolower（对齐 scroll-view lower-threshold） |
| showLoadMore | `boolean` | `false` | 是否渲染触底状态底栏 |

## Events

| Event | Description |
| --- | --- |
| item-click | Menu item click |
| range-change | range-change |
| scrolltolower | scrolltolower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| bottom | `bottom` slot |
| empty | `empty` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-virtual-list/`
- Demo: `#/pages/demo/display/virtual-list`
- Chinese docs: [/uniappx/components/virtual-list](/uniappx/components/virtual-list)
