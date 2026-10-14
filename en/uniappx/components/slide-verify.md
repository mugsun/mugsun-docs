---
title: Slide Verify
demo: pages/demo/form/slide-verify
---

# Slide Verify

`ms-slide-verify` is a slide verification control. Drag the handle to the end or into the dashed target box to pass.

This component belongs to ms-ui, the uni-app x cross-platform component library. It is not used in the PC admin console.

Component directory: `uni_modules/ms-ui/components/ms-slide-verify`. ms-ui is a commercial edition and its source is not public.
Demo route: `#/pages/demo/form/slide-verify`.

## Basic usage

<!-- demo-snippets:start -->
The snippets below are taken from the demo source `pages/demo/form/slide-verify.uvue`. On wide screens, the running demo appears in the phone frame on the right. On narrow screens, tap the H5 demo bar at the bottom.

```vue
<template>
  <!-- Types -->
  <ms-slide-verify @success="onDefaultSuccess" @fail="onDefaultFail" />
  <ms-slide-verify
    ref="targetRef"
    :show-target="true"
    :target-percent="targetPercent"
    @success="onTargetSuccess"
    @fail="onTargetFail"
  />
  <!-- Advanced -->
  <ms-slide-verify
    tips="Hold and drag to the far right"
    success-tips="Verified"
    @success="onTipsSuccess"
  />
  <ms-slide-verify disabled tips="Disabled" />
  <ms-slide-verify :tolerance="24" tips="Larger tolerance, easier to pass" @success="onLooseSuccess" />
</template>

<script setup lang="uts">
const targetPercent = ref(55)

function onDefaultSuccess() : void {
  console.log('onDefaultSuccess')
}

function onDefaultFail() : void {
  console.log('onDefaultFail')
}

function onTargetSuccess() : void {
  console.log('onTargetSuccess')
}

function onTargetFail() : void {
  console.log('onTargetFail')
}

function onTipsSuccess() : void {
  console.log('onTipsSuccess')
}

function onLooseSuccess() : void {
  console.log('onLooseSuccess')
}
</script>
```
<!-- demo-snippets:end -->

Components live under `uni_modules/ms-ui/components`; uni-app x easycom registers them automatically.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tips | `string` | `'拖动滑块完成验证'` | Tip text |
| successTips | `string` | `'验证成功'` | Verification success text |
| showTarget | `boolean` | `false` | Whether to show the target gap position |
| targetPercent | `number` | `100` | Target position 0–100 |
| tolerance | `number` | `8` | Allowed slider-to-target error (px) |
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
