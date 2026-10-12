---
title: Guide 引导
demo: pages/demo/feedback/guide
---

# Guide 引导

`ms-guide`：分步引导：高亮目标 + 提示卡（上一步 / 下一步 / 跳过 / 完成 / 计数）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-guide`）。
演示路由：`#/pages/demo/feedback/guide`。

## 基础用法

```vue
<template>
  <ms-guide>
    …
  </ms-guide>
</template>
```

easycom 扫描 `uni_modules/ms-ui/components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | — |
| current | `number` | `-1` | — |
| mode | `'popover' \| 'dialog'` | `'popover'` | — |
| showOverlay | `boolean` | `true` | — |
| highlightPadding | `number` | `8` | — |
| hideSkip | `boolean` | `false` | — |
| hideCounter | `boolean` | `false` | — |
| hideBack | `boolean` | `false` | — |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| skip | 跳过 |
| finish | 完成 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录：`uni_modules/ms-ui/components/ms-guide/`
- 演示：`#/pages/demo/feedback/guide`
