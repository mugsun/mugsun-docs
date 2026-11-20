---
title: Text Cloud 词云
demo: pages/demo/display/text-cloud
---

# Text Cloud 词云

`ms-text-cloud` 是词云，按权重决定字号，权重大的词靠近中心，词与词互不重叠，用 canvas 绘制。

## 基础用法

<!-- demo-snippets:start -->
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
  const rows: UTSJSONObject[] = []
  const items = [
    ['跨端', 20, '#1d4ed8'],
    ['适配', 14, '#64748b'],
    ['组件', 10, '#94a3b8'],
    ['布局', 8, '#475569'],
    ['主题', 6, '#cbd5e1'],
  ] as (string | number)[][]
  for (let i = 0; i < items.length; i++) {
    const row = new UTSJSONObject()
    row.set('text', items[i][0] as string)
    row.set('weight', items[i][1] as number)
    row.set('color', items[i][2] as string)
    rows.push(row)
  }
  return rows
})())

function onComplete(payload: UTSJSONObject) : void {
  console.log('onComplete')
}
</script>
```
<!-- demo-snippets:end -->

## Props

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | 词列表，每项含 `text` 和 `weight`，可选 `color` |
| height | `number` | `180` | 高度（px） |
| minFontSize | `number` | `12` | 最小字号（px） |
| maxFontSize | `number` | `30` | 最大字号（px） |
| gap | `number` | `2` | 词与词之间的间距（px） |

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| complete | `payload: UTSJSONObject` | 绘制完成后触发，`payload` 含 `placed`（成功放下的词数）和 `total`（总词数） |

## 方法

通过组件的 `ref` 调用，写法见[调用组件的方法](/uniappx/#methods)。

| 方法 | 说明 |
| --- | --- |
| `redraw()` | 重新绘制 |
