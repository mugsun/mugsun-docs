---
title: Icon
demo: pages/demo/basic/icon
---

# Icon

`ms-icon` — Icon for uni-app x.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-icon`).
Demo route: `#/pages/demo/basic/icon`.

## Basic usage

```vue
<template>
  <ms-icon size="xs" name="…">
    …
  </ms-icon>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | `''` | Name / field name |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| tone | `\| 'inherit'` | `'inherit'` | Tone (inherit / primary / secondary / danger…) |
| spin | `boolean` | `false` | Spin loading: UniElement.animate on App/Web; CSS animation on WeChat MP |
| spinDuration | `number` | `1500` | One spin duration in ms (default 1500) |
| rotate | `number` | `0` | Static rotate angle (mutually exclusive with spin; spin wins) |
| pressable | `boolean` | `true` | Built-in press state; set false inside buttons to avoid double hover |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-icon/`
- Demo: `#/pages/demo/basic/icon`
- Chinese docs: [/uniappx/components/icon](/uniappx/components/icon)
