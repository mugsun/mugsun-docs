---
title: Indexbar 索引
demo: pages/demo/nav/indexbar
---

# Indexbar 索引

`ms-indexbar`：索引列表：侧栏字符 + scroll-into-view；`v-model:current`。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-indexbar`）。
演示路由：`#/pages/demo/nav/indexbar`。

## 基础用法

```vue
<template>
  <ms-indexbar>
    …
  </ms-indexbar>
</template>
```

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

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
