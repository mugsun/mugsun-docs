---
title: Empty
demo: pages/demo/basic/empty
---

# Empty

空态：icon / image / action；status loading|error|more；action 插槽。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-empty`).
Demo route: `#/pages/demo/basic/empty`.

## Basic usage

```vue
<template>
  <ms-empty title="…">
    …
  </ms-empty>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | 展示态：空 / 加载 / 错误 / 没有更多 |
| title | `string` | `''` | 主标题（空/错误态可选） |
| description | `string` | `''` | — |
| icon | `string` | `'inbox-line'` | — |
| image | `string` | `''` | — |
| actionText | `string` | `''` | — |
| errorText | `string` | `'加载出错了'` | — |
| moreText | `string` | `'没有更多了'` | — |
| loadingText | `string` | `'加载中…'` | — |

## Events

| Event | Description |
| --- | --- |
| action | Action button |

## Slots

| Slot | Description |
| --- | --- |
| action | `action` slot |
| description | `description` slot |
| image | `image` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-empty/`
- Demo: `#/pages/demo/basic/empty`
- Chinese docs: [/uniappx/components/empty](/uniappx/components/empty)
