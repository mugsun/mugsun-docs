---
title: Tabs
demo: pages/demo/nav/tabs
---

# Tabs

`ms-tabs`: Tabs. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-tabs`).
Demo route: `#/pages/demo/nav/tabs`.

## Basic usage

```vue
<template>
  <ms-tabs theme="line" size="md">
    …
  </ms-tabs>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / count / badge / dot / disabled / content |
| theme | `'line' \| 'tag' \| 'card'` | `'line'` | — |
| size | `'md' \| 'lg'` | `'md'` | — |
| spaceEvenly | `boolean` | `true` | 头部是否均分；false 时按内容撑开并可横向滚动 |
| showLine | `boolean` | `true` | line 主题是否显示底部激活条 |
| showContent | `boolean` | `false` | 是否渲染内容区（items[].content 或默认插槽） |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |

## See also

- Component: `uni_modules/ms-ui/components/ms-tabs/`
- Demo: `#/pages/demo/nav/tabs`
- Chinese docs: [/uniappx/components/tabs](/uniappx/components/tabs)
