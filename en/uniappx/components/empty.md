---
title: Empty
demo: pages/demo/basic/empty
---

# Empty

`ms-empty` — Empty for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-empty`).
Demo route: `#/pages/demo/basic/empty`.

## Basic usage

```vue
<template>
  <ms-empty title="…">
    …
  </ms-empty>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| status | `'empty' \| 'loading' \| 'error' \| 'more'` | `'empty'` | Display status: empty / loading / error / no more |
| title | `string` | `''` | Main title (optional for empty/error states) |
| description | `string` | `''` | Description text |
| icon | `string` | `'inbox-line'` | Icon name (icons.uts) |
| image | `string` | `''` | Image URL |
| actionText | `string` | `''` | Action text |
| errorText | `string` | `'加载出错了'` | Error text |
| moreText | `string` | `'没有更多了'` | Label when variant is more |
| loadingText | `string` | `'加载中…'` | Loading text |

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
