---
title: Indexbar 索引
demo: pages/demo/nav/indexbar
---

# Indexbar 索引

`ms-indexbar`：索引列表：侧栏字符 + scroll-into-view；`v-model:current`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码位置：`mugsun-uniappx-ui`仓 `uni_modules/ms-ui/components/ms-indexbar`（源码仓暂未公开）。
演示路由：`#/pages/demo/nav/indexbar`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/nav/indexbar.uvue`，可在右侧手机框中查看运行效果。

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
const modelCurrent = ref('B')
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
| height | `number` | `360` | 容器高 px（蒸汽禁百分比高） |
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
