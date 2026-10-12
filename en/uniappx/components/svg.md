---
title: Svg
demo: pages/demo/media/svg
---

# Svg

`ms-svg`: SVG display: fixed-size container + official `<image>`; supports inline source and recoloring.

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
| src | `string` | `''` | Image path (`/static/...` or http/https) |
| source | `string` | `''` | Inline SVG source (preferred over `src`); converted to data URI |
| size | `number` | `24` | Side length (px) |
| width | `number` | `0` | When >0, overrides width |
| height | `number` | `0` | When >0, overrides height |
| color | `string` | `''` | Replace all `currentColor` in inline source with this color |
| mode | `string` | `'aspectFit'` | Only `scaleToFill` / `aspectFit` / `aspectFill`; others fall back to `aspectFit` |

## Events

| Event | Description |
| --- | --- |
| load | Load |
| error | Error |

## See also

- Component: `uni_modules/ms-svg/components/ms-svg/`
- Demo: `#/pages/demo/media/svg`
- Chinese docs: [/uniappx/components/svg](/uniappx/components/svg)
