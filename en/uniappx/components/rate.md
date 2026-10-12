---
title: Rate
demo: pages/demo/form/rate
---

# Rate

`ms-rate`: Rate. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-rate`).
Demo route: `#/pages/demo/form/rate`.

## Basic usage

```vue
<template>
  <ms-rate size="sm" v-model="value">
    …
  </ms-rate>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | — |
| count | `number` | `5` | — |
| readonly | `boolean` | `false` | — |
| disabled | `boolean` | `false` | — |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | — |
| activeIcon | `string` | `'star-fill'` | — |
| voidIcon | `string` | `'star-line'` | — |
| halfIcon | `string` | `'star-half-fill'` | — |
| showText | `boolean` | `false` | — |
| showScore | `boolean` | `false` | 显示数字分值 |
| allowHalf | `boolean` | `false` | 允许半星 |
| clearable | `boolean` | `false` | 再点当前分值可清零 |
| texts | `string[]` | `[]` | — |
| placement | `'top' \| 'bottom' \| ''` | `''` | 点选时短暂展示评分弹层位置。 空串不展示；top / bottom 相对星排。 |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-rate/`
- Demo: `#/pages/demo/form/rate`
- Chinese docs: [/uniappx/components/rate](/uniappx/components/rate)
