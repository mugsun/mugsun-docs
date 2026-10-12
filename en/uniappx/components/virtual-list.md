---
title: Virtual List
demo: pages/demo/display/virtual-list
---

# Virtual List

`ms-virtual-list` — Virtual List for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-virtual-list`).
Demo route: `#/pages/demo/display/virtual-list`.

## Basic usage

```vue
<template>
  <ms-virtual-list>
    …
  </ms-virtual-list>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Entries |
| itemHeight | `number` | `56` | Item height (px) |
| visibleCount | `number` | `5` | Approximate visible item count |
| buffer | `number` | `3` | Overscan item count outside the viewport |
| virtual | `boolean` | `true` | Whether virtual list is enabled |
| titleKey | `string` | `'title'` | Title field name |
| descKey | `string` | `'desc'` | Description field name |
| keyField | `string` | `'id'` | Primary key field name |
| emptyText | `string` | `'暂无数据'` | Empty-state text |
| loading | `boolean` | `false` | Loading more; when true shows footer and suppresses repeat scrolltolower |
| finished | `boolean` | `false` | No more data; footer shows finishedText |
| loadingText | `string` | `'加载中…'` | Loading text |
| finishedText | `string` | `'没有更多了'` | “No more” text |
| lowerThreshold | `number` | `50` | Distance from bottom (px) to fire scrolltolower |
| showLoadMore | `boolean` | `false` | Whether to render the bottom status bar |

## Events

| Event | Description |
| --- | --- |
| item-click | Item click |
| range-change | range-change |
| scrolltolower | Scrolled to lower |

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
