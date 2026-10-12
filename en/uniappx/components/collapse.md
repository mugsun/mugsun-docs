---
title: Collapse
demo: pages/demo/display/collapse
---

# Collapse

折叠面板：`items` 驱动；`accordion` / `theme` / `expandIcon` / `defaultExpandAll`；受控 `value`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-collapse`).
Demo route: `#/pages/demo/display/collapse`.

## Basic usage

```vue
<template>
  <ms-collapse theme="…" :disabled="true">
    …
  </ms-collapse>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | 每项支持 label / content / note / icon / disabled |
| value | `number[]` | `[]` | 展开的项下标集合（受控） |
| accordion | `boolean` | `false` | 手风琴：每次只展开一个 |
| theme | `string` | `'default'` | 风格：default 通栏 / card 卡片 |
| expandIcon | `boolean` | `true` | 是否显示展开箭头 |
| disabled | `boolean` | `false` | 整体禁用（项上 disabled 优先） |
| defaultExpandAll | `boolean` | `false` | 首次是否全部展开（未传 value 时生效） |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| click | Click |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-collapse/`
- Demo: `#/pages/demo/display/collapse`
- Chinese docs: [/uniappx/components/collapse](/uniappx/components/collapse)
