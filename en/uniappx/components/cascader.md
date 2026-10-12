---
title: Cascader
demo: pages/demo/form/cascader
---

# Cascader

`ms-cascader`: Cascader. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cascader`).
Demo route: `#/pages/demo/form/cascader`.

## Basic usage

```vue
<template>
  <ms-cascader theme="…" title="…">
    …
  </ms-cascader>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | 扁平节点：value + label + parent（根节点 parent 为空串） |
| value | `string` | `''` | 选中的叶子 value |
| visible | `boolean` | `false` | 是否显示 |
| title | `string` | `''` | 标题 |
| placeholder | `string` | `'选择选项'` | 未选中时的步骤占位文案 |
| theme | `string` | `'step'` | 展示风格：step / tab |
| subTitles | `string[]` | `[]` | 每级次标题 |
| checkStrictly | `boolean` | `false` | 父子不关联：任意一项可选，头部出确定 |
| closeBtn | `boolean` | `true` | 是否显示关闭按钮 |
| optionsHeight | `number` | `280` | 选项区高度 px |

## Events

| Event | Description |
| --- | --- |
| update:visible | v-model:visible update |
| change | Value changed |
| pick | Selection changed (before confirm) |
| close | Closed |

## See also

- Component: `uni_modules/ms-ui/components/ms-cascader/`
- Demo: `#/pages/demo/form/cascader`
- Chinese docs: [/uniappx/components/cascader](/uniappx/components/cascader)
