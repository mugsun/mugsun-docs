---
title: Text Cloud
demo: pages/demo/display/text-cloud
---

# Text Cloud

`ms-text-cloud` is a word cloud drawn on a canvas. Font size follows weight, heavier words sit closer to the center, and words never overlap.

## Basic usage

<!-- demo-snippets:start -->
```vue
<template>
  <!-- Types -->
  <ms-text-cloud :list="baseList" @complete="onComplete" />
  <ms-text-cloud :list="colorList" @complete="onComplete" />
  <!-- Styles -->
  <ms-text-cloud :list="baseList" :height="200" :min-font-size="14" :max-font-size="40" />
  <ms-text-cloud :list="baseList" :height="120" :min-font-size="10" :max-font-size="20" :gap="1" />
  <!-- Advanced -->
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
    ['Cross-platform', 20, '#1d4ed8'],
    ['Adaptive', 14, '#64748b'],
    ['Components', 10, '#94a3b8'],
    ['Layout', 8, '#475569'],
    ['Themes', 6, '#cbd5e1'],
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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Words; each item has `text` and `weight`, plus an optional `color` |
| height | `number` | `180` | Height (px) |
| minFontSize | `number` | `12` | Minimum font size (px) |
| maxFontSize | `number` | `30` | Maximum font size (px) |
| gap | `number` | `2` | Gap between words (px) |

## Events

| Event | Arguments | Description |
| --- | --- | --- |
| complete | `payload: UTSJSONObject` | Fires after drawing; `payload` has `placed` (words that fit) and `total` (all words) |

## Methods

Call these through the component's `ref`. See [Calling component methods](/en/uniappx/#methods).

| Method | Description |
| --- | --- |
| `redraw()` | Redraws the cloud |
