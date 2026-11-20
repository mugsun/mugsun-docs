---
title: Chart
demo: pages/demo/media/chart
---

# Chart

`ms-chart` draws charts on a native canvas without any third-party chart library. `type` takes eight values that cover common shapes such as line, bar and pie.

Line, area and bar charts accept a second series for comparison and can stack the two; tapping a legend item hides that series.

This is an optional plugin. Install `uni_modules/ms-chart` separately; it depends on `ms-ui`.

## Basic usage

<!-- demo-snippets:start -->
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

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `'line'` | Chart type: line / area / bar / pie / ring / radar / scatter / funnel |
| list | `UTSJSONObject[]` | `[]` | Data items, each with `label` and `value`; scatter charts may use `x` and `y` |
| compareList | `UTSJSONObject[]` | `[]` | Second series for comparison in line, area and bar charts; ignored by other types |
| height | `number` | `220` | Canvas height (px) |
| showGrid | `boolean` | `true` | Whether to show horizontal grid lines and ticks |
| showLabel | `boolean` | `true` | Whether to show value or percentage labels |
| showLegend | `boolean` | `false` | Whether to show the legend; with two series, tapping an item hides that series |
| smooth | `boolean` | `false` | Whether line and area charts use smooth curves |
| showTip | `boolean` | `false` | Show a tip bar below the chart after a data point is tapped |
| stack | `boolean` | `false` | Stack the two series when `compareList` is set on bar and area charts |
| seriesName | `string` | `'系列一'` | Primary series legend name; the default is Chinese for "Series 1" |
| compareName | `string` | `'系列二'` | Compare series legend name; the default is Chinese for "Series 2" |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| item-click | `payload: UTSJSONObject` | Fires when a data point is tapped; `payload` has `index`, `label` and `value`, plus `compareValue` and `compareLabel` when a second series is set |
| ready | `payload: UTSJSONObject` | Fires after each draw completes; `payload.points` is the number of data items |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `redraw()` | Redraws the chart |
