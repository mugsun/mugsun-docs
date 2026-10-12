---
title: Backtop
demo: pages/demo/nav/backtop
---

# Backtop

`ms-backtop` — Backtop for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-backtop`).
Demo route: `#/pages/demo/nav/backtop`.

## Basic usage

```vue
<template>
  <ms-backtop theme="round" text="…">
    …
  </ms-backtop>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollTop | `number` | `0` | Page scroll distance (px) |
| visibilityHeight | `number` | `200` | Show only after scrolling past this distance (px) |
| theme | `'round' \| 'half-round' \| 'round-dark' \| 'half-round-dark'` | `'round'` | Theme color |
| text | `string` | `''` | Display text |
| icon | `string` | `'skip-up-fill'` | Icon name (icons.uts) |
| fixed | `boolean` | `true` | Whether fixed positioned |
| local | `boolean` | `false` | Whether positioned relative to parent (not fixed) |

## Events

| Event | Description |
| --- | --- |
| to-top | to-top |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-backtop/`
- Demo: `#/pages/demo/nav/backtop`
- Chinese docs: [/uniappx/components/backtop](/uniappx/components/backtop)
