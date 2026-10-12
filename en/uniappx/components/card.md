---
title: Card
demo: pages/demo/display/card
---

# Card

`ms-card`: Card. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-card`).
Demo route: `#/pages/demo/display/card`.

## Basic usage

```vue
<template>
  <ms-card title="…">
    …
  </ms-card>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `''` | — |
| subtitle | `string` | `''` | — |
| content | `string` | `''` | — |
| image | `string` | `''` | — |
| imageHeight | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| statusIcon | `string` | `''` | — |
| radius | `'md' \| 'lg'` | `'lg'` | — |
| bordered | `boolean` | `false` | — |
| shadow | `boolean` | `false` | — |

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
