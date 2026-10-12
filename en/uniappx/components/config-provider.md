---
title: Config Provider
demo: pages/demo/basic/config-provider
---

# Config Provider

`ms-config-provider`: Config Provider. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-config-provider`).
Demo route: `#/pages/demo/basic/config-provider`.

## Basic usage

```vue
<template>
  <ms-config-provider theme="…">
    …
  </ms-config-provider>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | — |
| theme | `string` | `'light'` | — |
| block | `boolean` | `true` | — |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-config-provider/`
- Demo: `#/pages/demo/basic/config-provider`
- Chinese docs: [/uniappx/components/config-provider](/uniappx/components/config-provider)
