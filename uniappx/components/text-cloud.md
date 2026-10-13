---
title: Text Cloud 词云
demo: pages/demo/display/text-cloud
---

# Text Cloud 词云

`ms-text-cloud`：词云：按权重定字号，大词优先从中心椭圆螺旋向外紧凑排布，互不重叠，canvas 2d 绘制。

属于 **uni-app x（ms-ui）** 跨端组件（不是 PC 管理台）。

源码见私有仓 [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui)（`uni_modules/ms-ui/components/ms-text-cloud`）。
演示路由：`#/pages/demo/display/text-cloud`。

## 基础用法

<!-- demo-snippets:start -->
以下片段摘自演示源码 `pages/demo/display/text-cloud.uvue`，可在右侧手机框中查看运行效果。

```vue
<template>
  <!-- 组件类型 -->
  <ms-text-cloud :list="baseList" @complete="onComplete" />
  <ms-text-cloud :list="colorList" @complete="onComplete" />
  <!-- 组件样式 -->
  <ms-text-cloud :list="baseList" :height="200" :min-font-size="14" :max-font-size="40" />
  <ms-text-cloud :list="baseList" :height="120" :min-font-size="10" :max-font-size="20" :gap="1" />
  <!-- 组件深度 -->
  <ms-text-cloud :list="baseList" :height="160" :gap="8" :min-font-size="12" :max-font-size="28" />
  <ms-text-cloud :list="[]" :height="100" />
  <ms-text-cloud :list="shortList" :height="120" :min-font-size="14" :max-font-size="32" />
</template>

<script setup lang="uts">
const baseList = ref(build(3, ['#1d4ed8', '#64748b', '#94a3b8'] as string[]))
const colorList = ref(build(8, ['#dc2626', '#0d9488', '#f59e0b', '#0369a1'] as string[]))
const shortList = ref(((): UTSJSONObject[] => {
</script>
```
<!-- demo-snippets:end -->

easycom 扫描对应 `uni_modules/.../components` 后无需手动注册。

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 数据列表 |
| height | `number` | `180` | 高度（px） |
| minFontSize | `number` | `12` | 词云最小字号（px） |
| maxFontSize | `number` | `30` | 词云最大字号（px） |
| gap | `number` | `2` | 间距（px） |

## 事件

| 事件 | 说明 |
| --- | --- |
| complete | complete |

## 相关

- 组件目录: `uni_modules/ms-ui/components/ms-text-cloud/`
- 演示: `#/pages/demo/display/text-cloud`
