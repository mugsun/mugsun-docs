---
title: Indexbar
demo: pages/demo/nav/indexbar
---

# Indexbar

索引列表：侧栏字符 + scroll-into-view；`v-model:current`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-indexbar`).
Demo route: `#/pages/demo/nav/indexbar`.

## Basic usage

```vue
<template>
  <ms-indexbar>
    …
  </ms-indexbar>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 扁平行：{ index, label, disabled }，index 相同者归一组 |
| current | `string` | `''` | 当前激活索引字符，空取首组 |
| indexList | `UTSJSONObject[]` | `[]` | 侧栏字符表：{ key, label }，空则由 items 去重推导 |
| height | `number` | `360` | 容器高 px（蒸汽禁百分比高） |
| showTip | `boolean` | `true` | 拖动侧栏时显示大字气泡 |
| showAnchor | `boolean` | `true` | 是否渲染分组头 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| select | select |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-indexbar/`
- Demo: `#/pages/demo/nav/indexbar`
- Chinese docs: [/uniappx/components/indexbar](/uniappx/components/indexbar)
