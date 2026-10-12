---
title: Steps
demo: pages/demo/nav/steps
---

# Steps

`ms-steps` — Steps for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-steps`).
Demo route: `#/pages/demo/nav/steps`.

## Basic usage

```vue
<template>
  <ms-steps theme="…">
    …
  </ms-steps>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `UTSJSONObject[]` | `[]` | Each item: title / content / icon / status |
| current | `number` | `0` | Current step index; equals step count when all done |
| currentStatus | `string` | `'process'` | Status of the step at current: process / error / finish / default |
| layout | `string` | `'horizontal'` | Direction: horizontal / vertical |
| theme | `string` | `'default'` | Style: default numbered circle / dot |
| readonly | `boolean` | `false` | Read-only; does not emit change |

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
