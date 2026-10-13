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
const aovTrend = ref(seriesFrom(aovWave, 0))

const categoryShare = ref([
  row('数码配件', 286),
  row('家居日用', 214),
  row('美妆个护', 198),
  row('母婴食品', 156),
  row('运动户外', 132),
  row('其它', 88),
] as UTSJSONObject[])

const channelSales = ref([
  row('品牌旗舰', 186),
  row('自营商城', 142),
  row('直播间', 218),
  row('私域社群', 96),
  row('线下门店', 128),
  row('经销批发', 74),
] as UTSJSONObject[])

const dauTrend = ref(seriesFrom(dauWave, 0))

const gmvLastYear = ref(seriesFrom(gmvPrev, 0))

const gmvThisYear = ref(seriesFrom(gmvWave, 0))

const gmvTrend = ref(seriesFrom(gmvWave, 0))

const stockHealth = ref([
  row('周转健康', 62),
  row('预警', 23),
  row('滞销', 11),
  row('缺货', 4),
] as UTSJSONObject[])

const storeEast = ref([
  row('上海', 96),
  row('杭州', 84),
  row('南京', 71),
  row('苏州', 68),
  row('宁波', 55),
] as UTSJSONObject[])

const storeSouth = ref([
  row('广州', 88),
  row('深圳', 92),
  row('佛山', 61),
  row('东莞', 58),
  row('珠海', 47),
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
