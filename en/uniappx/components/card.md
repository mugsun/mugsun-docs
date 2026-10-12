---
title: Card
demo: pages/demo/display/card
---

# Card

`ms-card` — Card for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-card`).
Demo route: `#/pages/demo/display/card`.

## Basic usage

```vue
<template>
  <ms-card title="…">
    …
  </ms-card>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | Title |
| subtitle | `string` | `''` | Subtitle |
| content | `string` | `''` | Content text |
| image | `string` | `''` | Image URL |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | Cover height tier: sm / md / lg |
| statusIcon | `string` | `''` | Top-right status icon name |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| bordered | `boolean` | `false` | Whether to show border |
| shadow | `boolean` | `false` | Whether shadowed |

## Events

| Event | Description |
| --- | --- |
| click | Click |
| status | Status changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| footer | `footer` slot |
| image | `image` slot |
| subtitle | `subtitle` slot |
| title | `title` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-card/`
- Demo: `#/pages/demo/display/card`
- Chinese docs: [/uniappx/components/card](/uniappx/components/card)
