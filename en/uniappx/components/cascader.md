---
title: Cascader
demo: pages/demo/form/cascader
---

# Cascader

`ms-cascader` — Cascader for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-cascader`).
Demo route: `#/pages/demo/form/cascader`.

## Basic usage

```vue
<template>
  <ms-cascader theme="…" title="…">
    …
  </ms-cascader>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| options | `UTSJSONObject[]` | `[]` | Flat nodes: value + label + parent (root parent = '') |
| value | `string` | `''` | Selected leaf value |
| visible | `boolean` | `false` | Whether visible |
| title | `string` | `''` | Title |
| placeholder | `string` | `'选择选项'` | Placeholder text for unselected steps |
| theme | `string` | `'step'` | Display style: step / tab |
| subTitles | `string[]` | `[]` | Subtitle per level |
| checkStrictly | `boolean` | `false` | Unlinked parent/child: any node selectable; header shows confirm |
| closeBtn | `boolean` | `true` | Whether to show the close button |
| optionsHeight | `number` | `280` | Options area height (px) |

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
