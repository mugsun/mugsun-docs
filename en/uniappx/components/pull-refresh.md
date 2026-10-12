---
title: Pull Refresh
demo: pages/demo/feedback/pull-refresh
---

# Pull Refresh

`ms-pull-refresh`: Pull Refresh. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-pull-refresh`).
Demo route: `#/pages/demo/feedback/pull-refresh`.

## Basic usage

```vue
<template>
  <ms-pull-refresh v-model="value" :disabled="true">
    …
  </ms-pull-refresh>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `boolean` | `false` | 刷新中；业务处理完置 false 收起 |
| disabled | `boolean` | `false` | 禁用下拉 |
| threshold | `number` | `60` | 触发阈值 px，同时作 refresher 槽固定高 |
| height | `number` | `360` | 容器固定高 px（蒸汽禁百分比高） |
| texts | `UTSJSONObject[]` | `[]` | 覆盖四态文案：{ status, text } |
| successDuration | `number` | `500` | 「刷新完成」停留 ms |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| refresh | refresh |
| pulling | pulling |
| restore | restore |
| scrolltolower | scrolltolower |

## Slots

| Slot | Description |
| --- | --- |
| default | Default content |
| refresher | `refresher` slot |

## See also

- Component: `uni_modules/ms-ui/components/ms-pull-refresh/`
- Demo: `#/pages/demo/feedback/pull-refresh`
- Chinese docs: [/uniappx/components/pull-refresh](/uniappx/components/pull-refresh)
