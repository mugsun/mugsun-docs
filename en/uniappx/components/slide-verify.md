---
title: Slide Verify
demo: pages/demo/form/slide-verify
---

# Slide Verify

`ms-slide-verify` — Slide Verify for uni-app x.

Source: [mugsun-uniappx-ui](https://github.com/mugsun/mugsun-uniappx-ui) (`uni_modules/ms-ui/components/ms-slide-verify`).
Demo route: `#/pages/demo/form/slide-verify`.

## Basic usage

```vue
<template>
  <ms-slide-verify>
    …
  </ms-slide-verify>
</template>
```

With easycom scanning the matching `uni_modules/.../components`, no manual registration is needed.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | Tip text |
| successTips | `string` | `'验证成功'` | Success tip text |
| showTarget | `boolean` | `false` | Whether to show Target |
| targetPercent | `number` | `100` | Target position 0–100 |
| tolerance | `number` | `8` | tolerance number |
| disabled | `boolean` | `false` | Whether disabled |

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
