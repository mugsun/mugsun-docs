---
title: Chart 图表
demo: pages/demo/media/chart
---

# Chart 图表

`ms-chart`：原生 canvas 图表子集：折线 / 面积 / 柱状 / 饼图 / 环形 / **雷达 / 散点 / 漏斗**；支持堆叠与多系列图例点隐。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-chart/components/ms-chart`（源码仓暂未公开）。
可选插件：需单独安装 `uni_modules/ms-chart`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/chart`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/media/chart.uvue`，可在右侧手机框中查看运行效果。

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

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'line'` | 类型 |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| compareList | `UTSJSONObject[]` | `[]` | 第二系列（折线/面积/柱对比）；饼图忽略 |
| height | `number` | `220` | 高度（px） |
| showGrid | `boolean` | `true` | 是否显示网格 |
| showLabel | `boolean` | `true` | 是否显示标签 |
| showLegend | `boolean` | `false` | 是否显示图例 |
| smooth | `boolean` | `false` | 是否平滑曲线 |
| showTip | `boolean` | `false` | 点选后在图下展示简易提示条 |
| stack | `boolean` | `false` | 柱/面积 + compareList 时按堆叠绘制（堆叠语义） |
| seriesName | `string` | `'系列一'` | 主系列图例名 |
| compareName | `string` | `'系列二'` | 对比系列图例名 |

## 事件

| 事件 | 说明 |
| --- | --- |
| item-click | 点击菜单项 |
| ready | 就绪 |

## 相关

- 组件目录: `uni_modules/ms-chart/components/ms-chart/`
- 演示: `#/pages/demo/media/chart`
