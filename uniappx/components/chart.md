---
title: Chart 图表
demo: pages/demo/media/chart
---

# Chart 图表

`ms-chart` 用原生 canvas 画图表，不依赖第三方图表库。`type` 有八种取值，覆盖折线、柱状、饼图等常见图形。

折线、面积和柱状图可以再传一组对比数据，并按堆叠方式显示；点击图例可以隐藏对应的系列。

这是可选插件，需要单独安装 `uni_modules/ms-chart`，并依赖 `ms-ui`。

## 基础用法

<!-- demo-snippets:start -->
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

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'line'` | 图表类型：line / area / bar / pie / ring / radar / scatter / funnel |
| list | `UTSJSONObject[]` | `[]` | 数据项，每项含 `label` 和 `value`；散点图可用 `x` 和 `y` |
| compareList | `UTSJSONObject[]` | `[]` | 第二组数据，用于折线、面积和柱状图的对比；其他类型忽略 |
| height | `number` | `220` | 画布高度（px） |
| showGrid | `boolean` | `true` | 是否显示横向网格和刻度 |
| showLabel | `boolean` | `true` | 是否显示数值或占比标签 |
| showLegend | `boolean` | `false` | 是否显示图例；有两组数据时点击图例可隐藏对应系列 |
| smooth | `boolean` | `false` | 折线图和面积图是否用平滑曲线 |
| showTip | `boolean` | `false` | 点击数据后在图表下方显示提示条 |
| stack | `boolean` | `false` | 柱状图和面积图传入 `compareList` 时按堆叠绘制 |
| seriesName | `string` | `'系列一'` | 主系列图例名 |
| compareName | `string` | `'系列二'` | 对比系列图例名 |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| item-click | `payload: UTSJSONObject` | 点击数据点时触发，`payload` 含 `index`、`label` 和 `value`，有对比数据时还有 `compareValue` 和 `compareLabel` |
| ready | `payload: UTSJSONObject` | 图表每次绘制完成后触发，`payload.points` 是数据项数量 |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `redraw()` | 重新绘制图表 |
