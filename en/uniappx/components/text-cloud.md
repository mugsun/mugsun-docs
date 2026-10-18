---
title: Text Cloud
demo: pages/demo/display/text-cloud
---

# Text Cloud

`ms-text-cloud` is a word cloud. Font size follows weight; heavier words are placed first, packed outward from the center along an elliptical spiral without overlapping, and drawn on a 2d canvas.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-text-cloud`. ms-ui is MIT-licensed; its source repository is not yet public.
Demo route: `#/pages/demo/display/text-cloud`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/display/text-cloud.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

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

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| list | `UTSJSONObject[]` | `[]` | Data list |
| height | `number` | `180` | Height (px) |
| minFontSize | `number` | `12` | Word-cloud min font size (px) |
| maxFontSize | `number` | `30` | Word-cloud max font size (px) |
| gap | `number` | `2` | Gap (px) |

## Events

| Event | Description |
| --- | --- |
| complete | complete |

## See also

- Component: `uni_modules/ms-ui/components/ms-text-cloud/`
- Demo: `#/pages/demo/display/text-cloud`
- Chinese docs: [/uniappx/components/text-cloud](/uniappx/components/text-cloud)
