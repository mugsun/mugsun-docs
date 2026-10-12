---
title: Sheet
demo: pages/demo/basic/sheet
---

# Sheet

卡片/容器面。`variant` / `radius` / `padding` / `margin` / `bordered` / `shadow` / `loading` / `url` / `pressable`（对齐 x-sheet isLink）。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-sheet`).
Demo route: `#/pages/demo/basic/sheet`.

## Basic usage

```vue
<template>
  <ms-sheet variant="default" :loading="true">
    …
  </ms-sheet>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'default' \| 'muted' \| 'primary'` | `'default'` | — |
| radius | `'md' \| 'lg'` | `'lg'` | — |
| padding | `'none' \| 'md' \| 'lg'` | `'md'` | — |
| margin | `'none' \| 'page'` | `'none'` | — |
| bordered | `boolean` | `false` | — |
| shadow | `boolean` | `false` | — |
| loading | `boolean` | `false` | — |
| url | `string` | `''` | — |
| pressable | `boolean` | `false` | 可点按压反馈；有 url 时默认视为可点 |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-sheet/`
- Demo: `#/pages/demo/basic/sheet`
- Chinese docs: [/uniappx/components/sheet](/uniappx/components/sheet)
