---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs` — Tabs for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tabs`).
Demo route: `#/pages/demo/nav/tabs`.

## Basic usage

```vue
<template>
  <ms-tabs theme="line" size="md">
    …
  </ms-tabs>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | Selected item index |
| items | `UTSJSONObject[]` | `[]` | Each item: label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | Theme |
| size | `'md' \| 'lg'` | `'md'` | Size |
| spaceEvenly | `boolean` | `true` | Equal-width header; false = content width + horizontal scroll |
| showLine | `boolean` | `true` | Whether the line theme shows the bottom active bar |
| showContent | `boolean` | `false` | Whether to render content (items[].content or default slot) |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabs/`
- Demo: `#/pages/demo/nav/tabs`
- Chinese docs: [/uniappx/components/tabs](/uniappx/components/tabs)
