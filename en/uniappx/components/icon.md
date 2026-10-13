---
title: Icon
demo: pages/demo/basic/icon
---

# Icon

`ms-icon` — Icon for uni-app x.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-icon`).
Demo route: `#/pages/demo/basic/icon`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/basic/icon.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 常用 -->
  <ms-icon name="search-line" tone="primary" />
  <ms-icon name="add-line" tone="primary" />
  <ms-icon name="home-3-line" tone="primary" />
  <!-- 尺寸 -->
  <ms-icon name="settings-3-line" size="sm" tone="secondary" />
  <ms-icon name="settings-3-line" size="md" tone="secondary" />
  <ms-icon name="settings-3-line" size="lg" tone="secondary" />
  <!-- 方向 -->
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="90" />
  <ms-icon name="arrow-up-s-line" size="lg" tone="primary" :rotate="180" />
  <!-- 旋转 -->
  <ms-icon name="loader-line" size="lg" tone="primary" :spin="true" />
  <ms-icon name="refresh-line" size="lg" tone="secondary" :spin="true" :spin-duration="3000" />
</template>
```
<!-- demo-snippets:end -->

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
