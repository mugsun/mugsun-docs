---
title: Segmented
demo: pages/demo/nav/segmented
---

# Segmented

分段控制器：`options` 驱动；block / size；`v-model:value`。

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-segmented`).
Demo route: `#/pages/demo/nav/segmented`.

## Basic usage

```vue
<template>
  <ms-segmented size="sm" :disabled="true">
    …
  </ms-segmented>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | `0` | 选中项下标 |
| options | `UTSJSONObject[]` | `[]` | 每项支持 label / icon / disabled |
| block | `boolean` | `false` | 撑满父宽并均分每项 |
| disabled | `boolean` | `false` | 整体禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度阶梯 |

## Events

| Event | Description |
| --- | --- |
| change | Value changed |
| update:value | v-model:value update |

## See also

- Component: `uni_modules/ms-ui/components/ms-segmented/`
- Demo: `#/pages/demo/nav/segmented`
- Chinese docs: [/uniappx/components/segmented](/uniappx/components/segmented)
