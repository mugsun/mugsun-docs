---
title: Chart 图表
demo: pages/demo/media/chart
---

# Chart 图表

`ms-chart`：原生 canvas 图表子集：折线 / 面积 / 柱状 / 饼图 / 环形 / **雷达 / 散点 / 漏斗**；支持堆叠与多系列图例点隐。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-chart/components/ms-chart`）。
可选插件：需单独安装 `uni_modules/ms-chart`，并依赖 `ms-ui`。
演示路由：`#/pages/demo/media/chart`。

## 基础用法

```vue
<template>
  <ms-chart type="…">
    …
  </ms-chart>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| type | `string` | `'line'` | `line` / `area` / `bar` / `pie` / `ring` / `radar` / `scatter` / `funnel` |
| list | `UTSJSONObject[]` | `[]` | 每项 `label` + `value`；散点可用 `x`/`y` |
| compareList | `UTSJSONObject[]` | `[]` | 第二系列（折线/面积/柱对比）；饼图忽略 |
| height | `number` | `220` | 画布高度 px |
| showGrid | `boolean` | `true` | 直角系横向网格与刻度 |
| showLabel | `boolean` | `true` | 数值 / 占比标签 |
| showLegend | `boolean` | `false` | 饼图下方图例；多系列时为可点隐系列图例 |
| smooth | `boolean` | `false` | 折线 / 面积平滑 |
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
