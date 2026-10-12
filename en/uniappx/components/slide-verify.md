---
title: Slide Verify
demo: pages/demo/form/slide-verify
---

# Slide Verify

`ms-slide-verify`: Slide Verify. See Chinese docs for narrative detail; API tables below are from source.

Source: private repo [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-slide-verify`).
Demo route: `#/pages/demo/form/slide-verify`.

## Basic usage

```vue
<template>
  <ms-slide-verify :disabled="true">
    …
  </ms-slide-verify>
</template>
```

With easycom scanning `uni_modules/ms-ui/components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | — |
| successTips | `string` | `'验证成功'` | — |
| showTarget | `boolean` | `false` | — |
| targetPercent | `number` | `100` | 目标位置 0~100 |
| tolerance | `number` | `8` | — |
| disabled | `boolean` | `false` | — |

## Events

| Event | Description |
| --- | --- |
| start | Started |
| success | success |
| fail | fail |
| complete | complete |
| reset | Reset |

## See also

- Component: `uni_modules/ms-ui/components/ms-slide-verify/`
- Demo: `#/pages/demo/form/slide-verify`
- Chinese docs: [/uniappx/components/slide-verify](/uniappx/components/slide-verify)
