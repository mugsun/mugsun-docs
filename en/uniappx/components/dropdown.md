---
title: Dropdown
demo: pages/demo/nav/dropdown
---

# Dropdown

`ms-dropdown`: Dropdown. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-dropdown`).
Demo route: `#/pages/demo/nav/dropdown`.

## Basic usage

```vue
<template>
  <ms-dropdown>
    …
  </ms-dropdown>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| menus | `UTSJSONObject[]` | `[]` | 菜单栏：label / multiple / columns(1-3) / disabled |
| options | `UTSJSONObject[]` | `[]` | 扁平选项：menu(下标) / label / value / disabled / checked |
| height | `number` | `320` | 组件占位总高（蒸汽禁百分比高度，遮罩铺满该区域） |
| showOverlay | `boolean` | `true` | 是否显示遮罩 |
| closeOnClickOverlay | `boolean` | `true` | 点遮罩是否关闭 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| open | Opened |
| close | Closed |
| confirm | Confirm |
| reset | Reset |

## See also

- Component: `uni_modules/ms-ui/components/ms-dropdown/`
- Demo: `#/pages/demo/nav/dropdown`
- Chinese docs: [/uniappx/components/dropdown](/uniappx/components/dropdown)
