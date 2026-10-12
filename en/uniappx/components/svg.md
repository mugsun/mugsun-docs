---
title: Svg
demo: pages/demo/media/svg
---

# Svg

`ms-svg`: SVG display: fixed-size container + official `<image>`; supports inline source and recoloring.

Part of **ms-ui · uni-app x** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-svg/components/ms-svg`).
Optional plugin: install `uni_modules/ms-svg` alongside `ms-ui`.
Demo route: `#/pages/demo/media/svg`.

## Basic usage

```vue
<template>
  <ms-svg src="…">
    …
  </ms-svg>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | `''` | Resource URL |
| source | `string` | `''` | Source / inline content |
| size | `number` | `24` | Size |
| width | `number` | `0` | Width (px) |
| height | `number` | `0` | Height (px) |
| color | `string` | `''` | Color |
| mode | `string` | `'aspectFit'` | Mode |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |

## See also

- Component: `uni_modules/ms-svg/components/ms-svg/`
- Demo: `#/pages/demo/media/svg`
- Chinese docs: [/uniappx/components/svg](/uniappx/components/svg)
