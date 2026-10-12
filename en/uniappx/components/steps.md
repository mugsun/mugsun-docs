---
title: Steps
demo: pages/demo/nav/steps
---

# Steps

步骤条。`items` 驱动（`title` / `content` / `icon` / `status`），单组件无子组件注册。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-steps`).
Demo route: `#/pages/demo/nav/steps`.

## Basic usage

```vue
<template>
  <ms-steps theme="…">
    …
  </ms-steps>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 title / content / icon / status |
| current | `number` | `0` | 当前步骤下标；等于步骤数表示全部完成 |
| currentStatus | `string` | `'process'` | current 指向步骤的状态：process / error / finish / default |
| layout | `string` | `'horizontal'` | 方向：horizontal / vertical |
| theme | `string` | `'default'` | 风格：default 序号圈 / dot 简略圆点 |
| readonly | `boolean` | `false` | 只读：不抛 change |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:current | v-model:current update |

## See also

- Component: `uni_modules/ms-ui/components/ms-steps/`
- Demo: `#/pages/demo/nav/steps`
- Chinese docs: [/uniappx/components/steps](/uniappx/components/steps)
