---
title: Link
demo: pages/demo/basic/link
---

# Link

`ms-link` — Link for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-link`).
Demo route: `#/pages/demo/basic/link`.

## Basic usage

```vue
<template>
  <ms-link theme="default" size="sm">
    …
  </ms-link>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| theme | `'default' \| 'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Theme |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| underline | `boolean` | `false` | Whether underline is enabled |
| disabled | `boolean` | `false` | Whether disabled |
| href | `string` | `''` | Link URL |
| openType | `'navigate' \| 'redirect' \| 'switchTab' \| 'reLaunch'` | `'navigate'` | openType |
| icon | `string` | `''` | Icon name (icons.uts) |
| suffixIcon | `string` | `''` | Suffix icon |
| content | `string` | `''` | Text used when default slot is empty |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-link/`
- Demo: `#/pages/demo/basic/link`
- Chinese docs: [/uniappx/components/link](/uniappx/components/link)
