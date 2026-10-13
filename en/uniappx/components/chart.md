---
title: Chart
demo: pages/demo/media/chart
---

# Chart

`ms-chart`: Native canvas chart subset: line / area / bar / pie / ring / radar / scatter / funnel; stacking and multi-series legend toggle.

Part of **uni-app x (ms-ui)** (not the PC admin UI).

Source location: `mugsun-uniappx-ui` → `uni_modules/ms-chart/components/ms-chart` (commercial edition; source not public).
Optional plugin: install `uni_modules/ms-chart` alongside `ms-ui`.
Demo route: `#/pages/demo/media/chart`.

## Basic usage

<!-- demo-snippets:start -->
Snippets below are taken from the demo source `pages/demo/media/chart.uvue`. To see it running, use the phone frame on the right (wide screens) or tap the H5 demo bar at the bottom (phones).

```vue
<template>
  <!-- Types -->
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
  <!-- Styles -->
  <ms-chart type="area" :list="dauTrend" :height="240" smooth :show-label="false" show-tip />
  <ms-chart
    type="ring"
    :list="stockHealth"
    :height="260"
    show-legend
    :show-label="false"
  />
  <!-- Advanced -->
  <ms-chart
    type="line"
    :list="gmvThisYear"
    :compare-list="gmvLastYear"
    series-name="This year"
    compare-name="Last year"
    show-tip
    :show-label="false"
    @item-click="onItem"
  />
  <ms-chart
    type="bar"
    :list="storeEast"
    :compare-list="storeSouth"
    series-name="East China"
    compare-name="South China"
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
const aovTrend = ref(seriesFrom(aovWave, 0))

const categoryShare = ref([
  row('Digital accessories', 286),
  row('Home goods', 214),
  row('Beauty & personal care', 198),
  row('Baby & food', 156),
  row('Sports & outdoors', 132),
  row('Other', 88),
] as UTSJSONObject[])

const channelSales = ref([
  row('Brand flagship', 186),
  row('Own store', 142),
  row('Live stream', 218),
  row('Private community', 96),
  row('Offline stores', 128),
  row('Wholesale', 74),
] as UTSJSONObject[])

const dauTrend = ref(seriesFrom(dauWave, 0))

const gmvLastYear = ref(seriesFrom(gmvPrev, 0))

const gmvThisYear = ref(seriesFrom(gmvWave, 0))

const gmvTrend = ref(seriesFrom(gmvWave, 0))

const stockHealth = ref([
  row('Healthy turnover', 62),
  row('Warning', 23),
  row('Slow-moving', 11),
  row('Out of stock', 4),
] as UTSJSONObject[])

const storeEast = ref([
  row('Shanghai', 96),
  row('Hangzhou', 84),
  row('Nanjing', 71),
  row('Suzhou', 68),
  row('Ningbo', 55),
] as UTSJSONObject[])

const storeSouth = ref([
  row('Guangzhou', 88),
  row('Shenzhen', 92),
  row('Foshan', 61),
  row('Dongguan', 58),
  row('Zhuhai', 47),
] as UTSJSONObject[])

function onItem(payload: UTSJSONObject) : void {
  console.log('onItem')
}

function onReady(payload: UTSJSONObject) : void {
  console.log('onReady')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

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
