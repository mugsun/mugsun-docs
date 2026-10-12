---
title: Chart
demo: pages/demo/media/chart
---

# Chart

`ms-chart`: Native canvas chart subset: line / area / bar / pie / ring / radar / scatter / funnel; stacking and multi-series legend toggle.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-chart/components/ms-chart`).
Optional plugin: install `uni_modules/ms-chart` alongside `ms-ui`.
Demo route: `#/pages/demo/media/chart`.

## Basic usage

```vue
<template>
  <ms-chart type="…">
    …
  </ms-chart>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `'line'` | `line` / `area` / `bar` / `pie` / `ring` / `radar` / `scatter` / `funnel` |
| list | `UTSJSONObject[]` | `[]` | Each item `label` + `value`; scatter may use `x`/`y` |
| compareList | `UTSJSONObject[]` | `[]` | Second series (line/area/bar compare); ignored for pie |
| height | `number` | `220` | Canvas height (px) |
| showGrid | `boolean` | `true` | Cartesian horizontal grid and ticks |
| showLabel | `boolean` | `true` | Value / percentage labels |
| showLegend | `boolean` | `false` | Legend under pie; for multi-series a tappable show/hide legend |
| smooth | `boolean` | `false` | Smooth line / area |
| showTip | `boolean` | `false` | Show a simple tip bar under the chart after tap |
| stack | `boolean` | `false` | Stack bars/areas when compareList is set |
| seriesName | `string` | `'系列一'` | Primary series legend name |
| compareName | `string` | `'系列二'` | Compare series legend name |

## Events

| Event | Description |
| --- | --- |
| item-click | Item click |
| ready | Ready |

## See also

- Component: `uni_modules/ms-chart/components/ms-chart/`
- Demo: `#/pages/demo/media/chart`
- Chinese docs: [/uniappx/components/chart](/uniappx/components/chart)
