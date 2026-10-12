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

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| steps | `UTSJSONObject[]` | `[]` | 引导步骤（title/content/targetId 等） |
| current | `number` | `-1` | 当前步索引；-1 表示未开始 |
| mode | `'popover' \| 'dialog'` | `'popover'` | 模式 |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| highlightPadding | `number` | `8` | 高亮框相对目标的内边距（px） |
| hideSkip | `boolean` | `false` | 是否隐藏「跳过」 |
| hideCounter | `boolean` | `false` | 是否隐藏步数计数 |
| hideBack | `boolean` | `false` | 是否隐藏「上一步」 |

## 事件

| 事件 | 说明 |
| --- | --- |
| change | 值变化 |
| skip | 跳过 |
| finish | 完成 |
| update:current | v-model:current 更新 |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-guide/`
- 演示: `#/pages/demo/feedback/guide`
