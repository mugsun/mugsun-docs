---
title: More
demo: pages/demo/nav/more
---

# More

`ms-more` — More for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-more`).
Demo route: `#/pages/demo/nav/more`.

## Basic usage

```vue
<template>
  <ms-more>
    …
  </ms-more>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| opened | `boolean` | `false` | Whether expanded |
| collapsedSize | `'sm' \| 'md' \| 'lg'` | `'md'` | Collapsed visible height tier: sm / md / lg |
| expandText | `string` | `'展开更多'` | Expand label |
| collapseText | `string` | `'收起'` | Collapse label |
| disabled | `boolean` | `false` | Whether disabled |
| showAction | `boolean` | `true` | Whether to show expand/collapse actions |
| showIcon | `boolean` | `true` | Whether to show expand/collapse arrow |

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
