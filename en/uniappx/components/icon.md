---
title: Icon
demo: pages/demo/basic/icon
---

# Icon

Remix 子集图标。`spin`：App/Web 用 `UniElement.animate`（宿主 view）；微信用 **text/image** 上 CSS `animation`（对齐 x-icon `faceSpinIcon`，勿挂宿主 view）。`rotate` 静态角度挂字形。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-icon`).
Demo route: `#/pages/demo/basic/icon`.

## Basic usage

```vue
<template>
  <ms-icon size="xs" name="…">
    …
  </ms-icon>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name | `string` | `''` | — |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | — |
| tone | `\| 'inherit'` | `'inherit'` | — |
| spin | `boolean` | `false` | 旋转加载：App/Web 用 UniElement.animate；微信小程序用 text CSS animation |
| spinDuration | `number` | `1500` | 一圈时长 ms（默认 1500） |
| rotate | `number` | `0` | 静态旋转角度（与 spin 互斥，spin 优先） |
| pressable | `boolean` | `true` | 是否自带按压态；嵌在 button 内时应为 false，避免双层 hover |

## Events

| Event | Description |
| --- | --- |
| click | Click |

## See also

- Component: `uni_modules/ms-ui/components/ms-icon/`
- Demo: `#/pages/demo/basic/icon`
- Chinese docs: [/uniappx/components/icon](/uniappx/components/icon)
