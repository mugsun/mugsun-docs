---
title: Config Provider
demo: pages/demo/basic/config-provider
---

# Config Provider

`ms-config-provider` — Config Provider for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-config-provider`).
Demo route: `#/pages/demo/basic/config-provider`.

## Basic usage

```vue
<template>
  <ms-config-provider theme="…">
    …
  </ms-config-provider>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| themeVars | `UTSJSONObject \| null` | `null` | `null` |
| theme | `string` | `'light'` | `light` / `dark` |
| block | `boolean` | `true` | Whether to fill width |

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
