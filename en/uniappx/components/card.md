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
| subtitle | `string` | `''` | subtitle string value |
| content | `string` | `''` | Content text |
| image | `string` | `''` | Image URL |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | imageHeight |
| statusIcon | `string` | `''` | statusIcon string value |
| radius | `'md' \| 'lg'` | `'lg'` | Border radius (px) |
| bordered | `boolean` | `false` | Whether bordered |
| shadow | `boolean` | `false` | Whether shadow is enabled |

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
