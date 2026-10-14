---
title: Indexbar 索引
demo: pages/demo/nav/indexbar
---

# Indexbar 索引

`ms-indexbar` 是索引列表，通过侧边的索引字符和 scroll-into-view 定位，当前索引可用 `v-model:current` 绑定。

本组件属于 uni-app x 跨端组件库 ms-ui，不用于 PC 管理台。

组件目录：`uni_modules/ms-ui/components/ms-indexbar`。ms-ui 为商业版，源码不公开。
演示路由：`#/pages/demo/nav/indexbar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/indexbar.uvue`。宽屏下可在页面右侧的手机框中查看运行效果；窄屏下请点击底栏的「打开 H5 演示」。

```vue
<template>
  <!-- 组件类型 -->
  <ms-indexbar
    :items="cityItems"
    :height="300"
    @change="onBaseChange"
    @select="onBaseSelect"
    @click="onBaseClick"
  />
  <ms-indexbar
    :items="customItems"
    :index-list="customKeys"
    :height="260"
    @select="onCustomSelect"
  />
  <!-- 组件状态 -->
  <ms-indexbar :items="shortItems" :show-anchor="false" :height="200" @select="onPlainSelect" />
  <ms-indexbar :items="disabledItems" :height="200" @click="onDisabledClick" />
  <!-- 组件深度 -->
  <ms-indexbar :items="cityItems" current="C" :height="240" @change="onControlledChange" />
  <ms-indexbar :items="shortItems" :show-tip="false" :height="200" />
  <ms-indexbar
    v-model:current="modelCurrent"
    :items="cityItems"
    :height="240"
  />
</template>

<script setup lang="uts">
const cityItems = [
  { index: 'B', label: '北京' } as UTSJSONObject,
  { index: 'B', label: '保定' } as UTSJSONObject,
  { index: 'C', label: '成都' } as UTSJSONObject,
  { index: 'C', label: '长沙' } as UTSJSONObject,
  { index: 'G', label: '广州' } as UTSJSONObject,
  { index: 'G', label: '贵阳' } as UTSJSONObject,
  { index: 'H', label: '杭州' } as UTSJSONObject,
  { index: 'H', label: '合肥' } as UTSJSONObject,
  { index: 'N', label: '南京' } as UTSJSONObject,
  { index: 'S', label: '上海' } as UTSJSONObject,
  { index: 'S', label: '苏州' } as UTSJSONObject,
  { index: 'W', label: '武汉' } as UTSJSONObject,
]

const customItems = [
  { index: '热门', label: '北京' } as UTSJSONObject,
  { index: '热门', label: '上海' } as UTSJSONObject,
  { index: '华东', label: '杭州' } as UTSJSONObject,
  { index: '华东', label: '南京' } as UTSJSONObject,
  { index: '华南', label: '广州' } as UTSJSONObject,
  { index: '华南', label: '深圳' } as UTSJSONObject,
  { index: '西南', label: '成都' } as UTSJSONObject,
]

const customKeys = [
  { key: '热门', label: '热' } as UTSJSONObject,
  { key: '华东', label: '东' } as UTSJSONObject,
  { key: '华南', label: '南' } as UTSJSONObject,
  { key: '西南', label: '西' } as UTSJSONObject,
]

const disabledItems = [
  { index: 'K', label: '昆明' } as UTSJSONObject,
  { index: 'K', label: '停用城市', disabled: true } as UTSJSONObject,
  { index: 'L', label: '兰州' } as UTSJSONObject,
  { index: 'L', label: '洛阳', disabled: true } as UTSJSONObject,
]

const modelCurrent = ref('B')

const shortItems = [
  { index: 'A', label: '鞍山' } as UTSJSONObject,
  { index: 'A', label: '安庆' } as UTSJSONObject,
  { index: 'D', label: '大连' } as UTSJSONObject,
  { index: 'D', label: '东莞' } as UTSJSONObject,
  { index: 'F', label: '福州' } as UTSJSONObject,
]

function onBaseChange(index: string) : void {
  console.log('onBaseChange')
}

function onBaseSelect(index: string) : void {
  console.log('onBaseSelect')
}

function onBaseClick(payload: UTSJSONObject) : void {
  console.log('onBaseClick')
}

function onCustomSelect(index: string) : void {
  console.log('onCustomSelect')
}

function onPlainSelect(index: string) : void {
  console.log('onPlainSelect')
}

function onDisabledClick(payload: UTSJSONObject) : void {
  console.log('onDisabledClick')
}

function onControlledChange(index: string) : void {
  console.log('onControlledChange')
}
</script>
```
<!-- demo-snippets:end -->

组件放在 `uni_modules/ms-ui/components` 下，uni-app x 的 easycom 会自动注册，无需手动 import。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 扁平行：{ index, label, disabled }，index 相同者归一组 |
| current | `string` | `''` | 当前激活索引字符，空取首组 |
| indexList | `UTSJSONObject[]` | `[]` | 侧栏字符表：{ key, label }，空则由 items 去重推导 |
| height | `number` | `360` | 容器高 px，只接受数值（px） |
| showTip | `boolean` | `true` | 拖动侧栏时显示大字气泡 |
| showAnchor | `boolean` | `true` | 是否渲染分组头 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| select | select |
| click | 点击 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-indexbar/`
- 演示: `#/pages/demo/nav/indexbar`
