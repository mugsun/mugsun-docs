---
title: Chart
demo: pages/demo/media/chart
---

# Chart

`ms-chart`: Native canvas chart subset: line / area / bar / pie / ring / radar / scatter / funnel; stacking and multi-series legend toggle.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-chart/components/ms-chart`).
Optional plugin: install `uni_modules/ms-chart` alongside `ms-ui`.
Demo route: `#/pages/demo/media/chart`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/chart.uvue`; see them running in the phone frame.

```vue
<template>
  <!-- 组件类型 -->
  <ms-chart
    type="line"
    :list="gmvTrend"
    :height="260"
    show-tip
    :show-label="false"
    @item-click="onItem"
    @ready="onReady"
  />
  <ms-chart type="bar" :list="channelSales" :height="260" show-tip @item-click="onItem" />
  <ms-chart type="pie" :list="categoryShare" :height="280" @item-click="onItem" />
  <!-- 组件样式 -->
  <ms-chart type="area" :list="dauTrend" :height="240" smooth :show-label="false" show-tip />
  <ms-chart
    type="ring"
    :list="stockHealth"
    :height="260"
    show-legend
    :show-label="false"
  />
  <!-- 组件深度 -->
  <ms-chart
    type="line"
    :list="gmvThisYear"
    :compare-list="gmvLastYear"
    series-name="今年"
    compare-name="去年"
    show-tip
    :show-label="false"
    @item-click="onItem"
  />
  <ms-chart
    type="bar"
    :list="storeEast"
    :compare-list="storeSouth"
    series-name="华东"
    compare-name="华南"
    show-tip
    :show-label="false"
    @item-click="onItem"
  />
  <ms-chart
    type="line"
    :list="aovTrend"
    :show-grid="false"
    show-tip
    :show-label="false"
    @item-click="onItem"
  />
</template>

<script setup lang="uts">
const gmvTrend = ref(seriesFrom(gmvWave, 0))
const gmvThisYear = ref(seriesFrom(gmvWave, 0))
const gmvLastYear = ref(seriesFrom(gmvPrev, 0))
const dauTrend = ref(seriesFrom(dauWave, 0))
const aovTrend = ref(seriesFrom(aovWave, 0))
const channelSales = ref([
const categoryShare = ref([
const stockHealth = ref([
const storeEast = ref([
const storeSouth = ref([
</script>
```
<!-- demo-snippets:end -->

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `'line'` | Type |
| list | `UTSJSONObject[]` | `[]` | Data list |
| compareList | `UTSJSONObject[]` | `[]` | Second series (line/area/bar compare); ignored for pie |
| height | `number` | `220` | Height (px) |
| showGrid | `boolean` | `true` | Whether to show grid |
| showLabel | `boolean` | `true` | Whether to show labels |
| showLegend | `boolean` | `false` | Whether to show legend |
| smooth | `boolean` | `false` | Whether smooth curve |
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
