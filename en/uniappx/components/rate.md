---
title: Rate
demo: pages/demo/form/rate
---

# Rate

`ms-rate` — Rate for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-rate`).
Demo route: `#/pages/demo/form/rate`.

## Basic usage

```vue
<template>
  <ms-rate size="sm" v-model="value">
    …
  </ms-rate>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `number` | `0` | Bound value (v-model) |
| count | `number` | `5` | Count |
| readonly | `boolean` | `false` | Whether read-only |
| disabled | `boolean` | `false` | Whether disabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| activeIcon | `string` | `'star-fill'` | Active icon |
| voidIcon | `string` | `'star-line'` | Inactive icon |
| halfIcon | `string` | `'star-half-fill'` | Half-star icon |
| showText | `boolean` | `false` | Whether to show Text |
| showScore | `boolean` | `false` | Show numeric score |
| allowHalf | `boolean` | `false` | Allow half stars |
| clearable | `boolean` | `false` | Tapping the current value again clears it |
| texts | `string[]` | `[]` | texts string value |
| placement | `'top' \| 'bottom' \| ''` | `''` | Brief score popover position on tap. Empty hides it; top/bottom relative to the stars. |

## Events

| Event | Description |
| --- | --- |
| update:modelValue | v-model update |
| change | Value changed |

## See also

- Component: `uni_modules/ms-ui/components/ms-rate/`
- Demo: `#/pages/demo/form/rate`
- Chinese docs: [/uniappx/components/rate](/uniappx/components/rate)
